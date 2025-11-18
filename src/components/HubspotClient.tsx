"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { addToCart, setCartOpen } from '@/lib/features/cart/cartSlice'
import { useEffect } from "react";

//import { useDispatch } from "react-redux";
// import { addToCart } from "@/store/cartSlice";

export default function HubspotAddPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch()

  const handleRevitLicense = (productId: string) => {
    const item = {
      id: productId === 'Free Trial' ? '1' : productId === 'express' ? '2' : '3',
      name: 'Revit',
      plan: productId,
      quantity: 1,
      price: productId === 'Free Trial' ? 0 : productId == 'express' ? 950 : 1900
    };    

    dispatch(addToCart(item))
    router.push("/");
    dispatch(setCartOpen(true))
  }

  useEffect(() => {
    const productId = searchParams.get("productId");
    handleRevitLicense(productId!)
    if (productId) {
      console.log(productId);
      // dispatch(addToCart({ id: productId, quantity: qty }));
      // router.push("/cart");
    } else {
      router.push("/");
    }
  }, [searchParams]);

  return <p>Adding item to your cart...</p>;
}
