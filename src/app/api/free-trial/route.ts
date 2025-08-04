import { NextResponse } from 'next/server';
import { processRevitPurchase } from '@/lib/qnect-api';
import { sendMailToAdmin } from '@/lib/mail'; // helper to send email

export async function POST(req: Request) {
  try {
    const { customer } = await req.json();

    if (!customer.firstName || !customer.lastName || !customer.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const purchaseData = {
      action: 'revit_license',
      txn_id: `TRIAL-${Date.now()}`,
      company_id: '',
      quantity: 1,
      txn_type: 'TRIAL' as const,
      last_name: customer.lastName,
      first_name: customer.firstName,
      buyer_adsk_account: customer.email,
      referer_account: customer.referEmail,
    };

    const purchaseResponse = await processRevitPurchase(purchaseData);

    if (purchaseResponse.code !== 1) {
      await sendMailToAdmin(
        'Revit Trial Purchase Failed',
        `Failed to process trial:\n\nCustomer: ${JSON.stringify(customer, null, 2)}\n\nResponse: ${JSON.stringify(purchaseResponse, null, 2)}`
      );

      return NextResponse.json(
        { error: 'Something went wrong. Our team has been notified and will contact you shortly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Free trial activated successfully'
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.stack || error.message
        : String(error);
  
    await sendMailToAdmin(
      'Revit Trial API Error',
      `Unexpected error during trial processing:\n\n${errorMessage}`
    );
  
    return NextResponse.json(
      { error: 'Something went wrong. Our team has been notified and will contact you shortly.' },
      { status: 500 }
    );
  }
}