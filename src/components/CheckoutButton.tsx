"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "@/lib/hooks";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_StripePublishableKey!);

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const cartItemsData = useAppSelector((state) => state.cart.items); // Get cart items from Redux

  const handleCheckout = async () => {
    if (cartItemsData.length === 0) return; // Prevent checkout if cart is empty

    setLoading(true);

    const items = cartItemsData.map((item) => ({
      name: item.name,
      price: item.price, // USD
      image: `/images/${item.name === "Revit" ? "revit" : "coin"}.png`,
      quantity: item.quantity,
    }));

    const res = await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({
      sessionId: data.sessionId,
    });

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="p-3 bg-black text-white rounded"
    >
      {loading ? "Redirecting..." : "Checkout"}
    </button>
  );
}