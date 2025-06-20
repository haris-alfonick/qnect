import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { processRevitPurchase, addTokens } from '@/lib/qnect-api';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.StripeSecretKey!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    console.log('Webhook received');

    const rawBody = await req.text(); // Get raw body as text
    //const signature = req.headers.get('stripe-signature');
    const signature = (await headers()).get('stripe-signature') as string;

    console.log('Raw body length:', rawBody.length);
    console.log('Signature present:', !!signature);
    console.log('Webhook secret present:', !!webhookSecret);

    if (!signature) {
      console.error('No Stripe signature found in request headers');
      return NextResponse.json({ error: 'No signature found' }, { status: 400 });
    }

    if (!webhookSecret) {
      console.error('No webhook secret configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
      // Try to parse and reformat the body to match Stripe's expected format
      const parsedBody = JSON.parse(rawBody);
      const formattedBody = JSON.stringify(parsedBody);
      
      console.log('Original body length:', rawBody.length);
      console.log('Formatted body length:', formattedBody.length);
      console.log('Body format matches:', rawBody === formattedBody);
      
      // Try with the formatted body first
      try {
        event = stripe.webhooks.constructEvent(
          formattedBody,
          signature,
          webhookSecret
        );
        console.log('Webhook event constructed successfully with formatted body:', event.type);
      } catch (formatError) {
        console.log('Formatted body failed, trying original body...', formatError);
        // If formatted body fails, try with the original raw body
        event = stripe.webhooks.constructEvent(
          rawBody,
          signature,
          webhookSecret
        );
        console.log('Webhook event constructed successfully with original body:', event.type);
      }
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      console.error('Raw body preview:', rawBody.substring(0, 200) + '...');
      console.error('Webhook secret starts with:', webhookSecret.substring(0, 10) + '...');
      console.error('Signature header:', signature);
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
            const companyId = parseInt(session.metadata?.company_id || '1', 10);
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