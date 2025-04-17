import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const stripe = new Stripe(process.env.StripeSecretKey!); // No apiVersion needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: body.items.map((item: CartItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            //images: [`http://localhost:3000/images/revit.png`], // Image logic applied
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      automatic_tax: { enabled: true },
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}