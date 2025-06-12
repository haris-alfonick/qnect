import { NextResponse } from 'next/server';
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
    console.log('Webhook received');
    
    // Get the raw body as text
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');

    console.log('Webhook signature:', signature ? 'Present' : 'Missing');
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    if (!signature) {
      console.error('No Stripe signature found in request headers');
      return NextResponse.json({ error: 'No signature found' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      // Parse the raw body to ensure it's properly formatted
      const body = JSON.parse(rawBody);
      const formattedBody = JSON.stringify(body, null, 2);
      
      // Use the formatted body for signature verification
      event = stripe.webhooks.constructEvent(formattedBody, signature, webhookSecret);
      console.log('Webhook event constructed successfully:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      if (err instanceof SyntaxError) {
        console.error('Failed to parse webhook body:', rawBody);
      }
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('Processing checkout.session.completed event');
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get customer details from session metadata
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name;
        
        console.log('Customer details:', {
          email: customerEmail,
          name: customerName,
          companyId: session.metadata?.company_id
        });
        
        // Get line items from the session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        console.log('Line items:', lineItems.data);
        
        // Process the purchase
        if (lineItems.data.length > 0) {
          const item = lineItems.data[0];
          const productName = item.description?.toLowerCase();
          console.log('Processing product:', productName);

          if (productName === 'revit') {
            console.log('Processing Revit purchase');
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
            
            console.log('Revit purchase data:', purchaseData);
            const purchaseResponse = await processRevitPurchase(purchaseData);
            console.log('Revit purchase response:', purchaseResponse);
            
            if (purchaseResponse.code !== 1) {
              console.error('Failed to process Revit purchase:', purchaseResponse.message);
            }
          } else if (productName === 'token') {
            console.log('Processing Token purchase');
            // Process Token purchase
            const companyId = parseInt(session.metadata?.company_id || '0', 10);
            const tokenCount = item.quantity || 1;
            const customMessage = `Purchase of ${tokenCount} tokens`;
            const ref = `TOKEN-${session.id}`;
            
            console.log('Token purchase data:', {
              companyId,
              tokenCount,
              customMessage,
              ref
            });
            
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
        console.log('Processing payment_intent.succeeded event');
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment Intent:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status
        });
        break;
      }
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