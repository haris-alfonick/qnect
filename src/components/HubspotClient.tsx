"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
//import { useDispatch } from "react-redux";
// import { addToCart } from "@/store/cartSlice";

export default function HubspotAddPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  //const dispatch = useDispatch();

  useEffect(() => {
    const productId = searchParams.get("productId");
    const qty = Number(searchParams.get("qty")) || 1;

    if (productId) {
      console.log(qty);
      // dispatch(addToCart({ id: productId, quantity: qty }));
      // router.push("/cart");
    } else {
      router.push("/");
    }
  }, [searchParams]);

  return <p>Adding item to your cart...</p>;
}
