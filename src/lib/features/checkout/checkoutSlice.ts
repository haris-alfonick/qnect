import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  referrerEmail: string;
}

const initialState: CheckoutState = {
  referrerEmail: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setReferrerEmail(state, action: PayloadAction<string>) {
      state.referrerEmail = action.payload;
    },
    // ...other reducers
  },
});

export const { setReferrerEmail } = checkoutSlice.actions;
export default checkoutSlice.reducer;