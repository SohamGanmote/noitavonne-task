import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.push(newItem);
        toast.success("Item added to cart!");
      } else {
        toast.warning("Item already exists in cart!");
      }
    },
    removeItemFromCart(state, action) {
      toast.success("Item removed from cart");
      return state.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state = [];
    }
  }
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
