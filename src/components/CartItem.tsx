'use client';

import { useAppDispatch } from '@/lib/hooks';
import { removeFromCart, updateQuantity } from '@/lib/features/cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

type CartItemProps = {
  item: {
    id: string;
    name: string;
    plan: string;
    quantity: number;
    price: number;
  };
};

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    dispatch(updateQuantity({ id: item.id, type }));
  };

  const shouldShowQuantity = item.plan !== 'Free Trial' && item.name !== 'Token';

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.plan}</p>
        <p className="text-gray-800 font-medium">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        {shouldShowQuantity && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange('decrement')}
              className="p-1 rounded-full hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange('increment')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 