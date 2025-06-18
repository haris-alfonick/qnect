import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { processRevitPurchase, addTokens } from '@/lib/qnect-api';

const stripe = new Stripe(process.env.StripeSecretKey!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    console.log('Webhook received');

    const rawBody = await req.text(); // Get raw body as text
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found in request headers');
      return NextResponse.json({ error: 'No signature found' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      // ✅ Important: Stripe requires raw buffer of the body
      event = stripe.webhooks.constructEvent(
        Buffer.from(rawBody),
        signature,
        webhookSecret
      );
      console.log('Webhook event constructed successfully:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // ✅ Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('Processing checkout.session.completed event');
        const session = event.data.object as Stripe.Checkout.Session;

        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name;

        console.log('Customer details:', {
          email: customerEmail,
          name: customerName,
          companyId: session.metadata?.company_id
        });

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        console.log('Line items:', lineItems.data);

        if (lineItems.data.length > 0) {
          const item = lineItems.data[0];
          const productName = item.description?.toLowerCase();

          if (productName === 'revit') {
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
            console.log('Revit purchase response:', purchaseResponse);

            if (purchaseResponse.code !== 1) {
              console.error('Failed to process Revit purchase:', purchaseResponse.message);
            }
          } else if (productName === 'token') {
            const companyId = parseInt(session.metadata?.company_id || '0', 10);
            const tokenCount = item.quantity || 1;
            const customMessage = `Purchase of ${tokenCount} tokens`;
            const ref = `TOKEN-${session.id}`;

            const tokenResponse = await addTokens('TEKLA', companyId, tokenCount, customMessage, ref);
            console.log('Token purchase response:', tokenResponse);

            if (tokenResponse.code !== 1) {
              console.error('Failed to process Token purchase:', tokenResponse.message);
            }
          } else {
            console.error('Unknown product type:', productName);
          }
        }

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}