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
  initialized: boolean
};

const initialState: CartState = {
  items: [],
  isCartOpen: false,
  initialized: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.initialized = true;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const hasRevitItem = state.items.some(item => item.name === 'Revit');
      
      // If trying to add a free trial and there's already a Revit item in cart, don't add it
      if (action.payload.plan === 'Free Trial' && hasRevitItem) {
        return;
      }
      
      // If it's a free trial, don't allow adding more than one
      if (action.payload.plan === 'Free Trial') {
        if (!existingItem) {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      } else if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    updateQuantity(state, action: PayloadAction<{ id: string; type: 'increment' | 'decrement' }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        // Don't allow increasing quantity for free trial
        if (item.plan === 'Free Trial') {
          return;
        }
        
        if (action.payload.type === 'increment') {
          item.quantity += 1;
        } else if (action.payload.type === 'decrement' && item.quantity > 1) {
          item.quantity -= 1;
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.items));
        }
      }
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    clearCart(state) {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    }
  }
});

export const { 
  initializeCart,
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  setCartOpen, 
  clearCart 
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartInitialized = (state: { cart: CartState }) => state.cart.initialized;

export default cartSlice.reducer;