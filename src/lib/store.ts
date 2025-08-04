import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/features/cart/cartSlice'
import checkoutReducer from '@/lib/features/checkout/checkoutSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer
  }
})

// Infer the type of the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store