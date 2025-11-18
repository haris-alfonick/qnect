"use client";

import { useAppDispatch } from "@/lib/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { addToCart, setCartOpen } from '@/lib/features/cart/cartSlice'
import { useEffect } from "react";

export default function HubspotTokenAddPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const productId = searchParams.get("productId");
    const priceParam = searchParams.get("price");

    if (!productId || !priceParam) {
      router.push("/");
      return;
    }

    const price = Number(priceParam);

    const item = {
      id: productId,
      name: 'Token',
      plan:
        productId === "t1"
          ? "1000 Tokens"
          : productId === "t2"
          ? "5000 Tokens"
          : "15000 Tokens",
      quantity: 1,
      price,
    };

    dispatch(addToCart(item));
    dispatch(setCartOpen(true));
    router.push("/tokens");
  }, [searchParams, router, dispatch]);

  return <p>Adding item to your cart...</p>;
}