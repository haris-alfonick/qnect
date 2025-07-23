import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CartItem {
  name: string;
  plan: string;
  price: number;
  quantity: number;
}

const stripe = new Stripe(process.env.StripeSecretKey!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  try {
    console.log('Received checkout session request');
    
    const body = await req.json();
    console.log('Request body:', body);
    
    const { items, customer, company_id } = body;
    console.log('Customer:', customer);

    if (!items || !customer) {
      console.error('Missing required fields:', { items, customer });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    console.log(items)
    // Create a reference ID for the Autodesk token
    const tokenReference = `token_${Date.now()}`;

    // Store the token securely (in a real app, this would be in a database)
    // For now, we'll just log it
    console.log('Storing Autodesk token with reference:', tokenReference);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: CartItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      automatic_tax: { enabled: true },
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
      metadata: {
        customer: JSON.stringify({
          firstName: customer.firstName,
          lastName: customer.lastName,
          username: customer.username,
          email: customer.email,
          referEmail: customer.referEmail,
          message: customer.message,
          token_reference: tokenReference,
        }),
        company_id: company_id || ''
      }
    });

    console.log('Created Stripe session:', session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}