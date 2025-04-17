import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.StripeSecretKey!, {
  apiVersion: '2025-02-24.acacia'
});

export async function POST() {
  try {
    // const body = await req.json();
    // const { items, email, billing } = body; 
    
    // const orangedItems = items.map((item: any) => ({
    //   price_data: {
    //     unit_amount: Math.floor(item.price * 100), // Ensure price is in cents
    //     currency: 'usd',
    //     product_data: {
    //       name: item.name,
    //       images: [item.image],
    //     },
    //   },
    //   quantity: item.quantity,
    // }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.floor(25 * 100),
              currency: 'usd',
            },
            display_name: 'Shipping Charges',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 10,
              },
              maximum: {
                unit: 'business_day',
                value: 12,
              },
            },
          },
        }
      ],
      line_items: [
        {
          price_data: {
          unit_amount: 1000, // Ensure price is in cents
          currency: 'usd',
          product_data: {
            name: "Revit"
            },
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      automatic_tax: {enabled: true},
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/checkout`,
      //customer_email: email, // Autofills the email
      
      metadata: {
        //email,
        shipping_name: "Haris",
        shipping_address: "R-174",
        shipping_country: "uni",
      },
    });

    return NextResponse.json({ 
      id: session.id, 
      client_secret: session.client_secret 
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 });
  }
}
