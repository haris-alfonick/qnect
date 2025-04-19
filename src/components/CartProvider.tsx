'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeCart } from '@/lib/features/cart/cartSlice';

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      const initialCart = storedCart ? JSON.parse(storedCart) : [];
      dispatch(initializeCart(initialCart));
    }
  }, [dispatch]);

  return <>{children}</>;
} 