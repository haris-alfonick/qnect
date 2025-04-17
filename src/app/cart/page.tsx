'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectCartItems, selectCartTotal } from '@/lib/features/cart/cartSlice';
import CartItem from '@/components/CartItem';
import CheckoutButton from '@/components/CheckoutButton';

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            
            <div className="mt-4">
              <CheckoutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
