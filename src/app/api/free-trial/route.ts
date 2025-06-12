import { NextResponse } from 'next/server';
import { processRevitPurchase } from '@/lib/qnect-api';

export async function POST(req: Request) {
  try {
    const { customer } = await req.json();

    // Validate required fields
    if (!customer.firstName || !customer.lastName || !customer.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process the free trial with transaction data
    const purchaseData = {
      action: 'revit_license',
      txn_id: `TRIAL-${Date.now()}`,
      company_id: '',
      quantity: 1,
      txn_type: 'TRIAL' as const,
      last_name: customer.lastName,
      first_name: customer.firstName,
      buyer_adsk_account: customer.email,
      referer_account: customer.referEmail

      //custom: 'Free Trial',
      //payment_status: 'Completed' as const,
      //item_number: 'REVIT-TRIAL',
      //item_name: 'Qnect for Autodesk Revit',
      //payment_gross: 0.00,
      //user_name: customer.username,
    };
    console.log('purchaseData', purchaseData);
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