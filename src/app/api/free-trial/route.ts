import { NextResponse } from 'next/server';
import { verifyEmail, getCompanies, processRevitPurchase } from '@/lib/qnect-api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer } = body;

    // Validate required fields
    if (!customer.firstName || !customer.lastName || !customer.username || !customer.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Step 1: Verify email with Autodesk API
    const emailVerification = await verifyEmail(customer.email, 'REVIT');
    if (emailVerification.code !== 1) {
      return NextResponse.json(
        { error: 'Invalid Autodesk email or no Revit license found' },
        { status: 400 }
      );
    }

    // Step 2: Get companies for the user
    const companiesResponse = await getCompanies(customer.email, 'REVIT');
    let companyId = 22; // Default to QA generic company ID

    if (companiesResponse.code === 1 && companiesResponse.companies) {
      if (companiesResponse.companies.length === 1) {
        // If user has only one company, use that
        companyId = companiesResponse.companies[0].id;
      } else if (companiesResponse.companies.length > 1) {
        // If user has multiple companies, we'll need to handle company selection
        // For now, we'll use the generic company
        // TODO: Implement company selection UI
      }
    }

    // Step 3: Process the Revit purchase
    const purchaseData = {
      txn_id: `TRIAL-${Date.now()}`,
      custom: 'Free Trial',
      payment_status: 'Completed' as const,
      item_number: 'REVIT-TRIAL',
      item_name: 'Qnect for Autodesk Revit',
      quantity: 1,
      payment_gross: 0.00,
      txn_type: 'TRIAL' as const,
      last_name: customer.lastName,
      first_name: customer.firstName,
      user_name: customer.username,
      buyer_adsk_account: customer.email,
      referer_account: customer.referEmail
    };

    const purchaseResponse = await processRevitPurchase(purchaseData);
    if (purchaseResponse.code !== 1) {
      return NextResponse.json(
        { error: purchaseResponse.message || 'Failed to process free trial' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Free trial activated successfully',
      companyId
    });
  } catch (error) {
    console.error('Error processing free trial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 