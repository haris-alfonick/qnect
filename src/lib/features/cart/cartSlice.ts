import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  name: string;
  plan: string;
  quantity: number;
  price: number;
};

type CartState = {
  items: CartItem[]
  isCartOpen: boolean
};

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  console.log(cart)
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  isCartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      console.log(state.items)
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; type: 'increment' | 'decrement' }>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (action.payload.type === 'increment') {
          existingItem.quantity += 1;
        } else if (action.payload.type === 'decrement' && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }

      saveCartToLocalStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen
    },

    // Action to explicitly set cart state (open or close)
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, setCartOpen } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;