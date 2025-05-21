import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { processRevitPurchase, addTokens } from '@/lib/qnect-api';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.StripeSecretKey!, {
  apiVersion: '2025-02-24.acacia',
});

// This is your Stripe webhook secret for testing your endpoint locally
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get customer details from session metadata
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name;
        // const autodeskToken = session.metadata?.autodesk_token;
        
        // Get line items from the session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        
        // Process the purchase
        if (lineItems.data.length > 0) {
          const item = lineItems.data[0];
          const productName = item.description?.toLowerCase();

          if (productName === 'revit') {
            // Process Revit purchase
            const purchaseData = {
              action: 'revit_license',
              txn_id: session.id,
              company_id: session.metadata?.company_id || '',
              quantity: item.quantity || 1,
              txn_type: 'subscr_payment' as const,
              last_name: customerName?.split(' ').slice(1).join(' ') || '',
              first_name: customerName?.split(' ')[0] || '',
              buyer_adsk_account: customerEmail || '',
              referer_account: session.metadata?.referEmail || ''
            };
            
            const purchaseResponse = await processRevitPurchase(purchaseData);
            
            if (purchaseResponse.code !== 1) {
              console.error('Failed to process Revit purchase:', purchaseResponse.message);
              // You might want to implement retry logic here
            }
          } else if (productName === 'token') {
            // Process Token purchase
            const companyId = parseInt(session.metadata?.company_id || '0', 10);
            const tokenCount = item.quantity || 1;
            const customMessage = `Purchase of ${tokenCount} tokens`;
            const ref = `TOKEN-${session.id}`; // Unique reference using session ID
            
            const tokenResponse = await addTokens('TEKLA', companyId, tokenCount, customMessage, ref);
            
            if (tokenResponse.code !== 1) {
              console.error('Failed to process Token purchase:', tokenResponse.message);
              // You might want to implement retry logic here
            }
          } else {
            console.error('Unknown product type:', productName);
          }
        }
        
        break;
      }
      // Add other event types as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 