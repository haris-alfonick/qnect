import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/features/cart/cartSlice'


export const store = () => {
  return configureStore({
    reducer: {
      cart: cartReducer
    }
  })
}

// export const store = configureStore({
//   reducer: reducer,
// })

// Infer the type of the store
export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']