import { NextResponse } from 'next/server';
import { processRevitPurchase } from '@/lib/qnect-api';

export async function POST(req: Request) {
  try {
    const { customer } = await req.json();

    // Validate required fields
    if (!customer.firstName || !customer.lastName || !customer.username || !customer.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process the free trial with transaction data
    const purchaseData = {
      action: 'TRIAL',
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
      message: 'Free trial activated successfully'
    });
  } catch (error) {
    console.error('Error processing free trial:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 