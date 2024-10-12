import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  coupon: "",
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.cartItems[index].quantity = action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }

      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state, action: PayloadAction<number>) => {
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.shippingCharges =
        state.subtotal > 1000 ? 0 : state.subtotal == 0 ? 0 : 100;
      state.tax = Math.round(state.subtotal * 0.18);
      state.discount = action.payload;
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
    updateCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  saveShippingInfo,
  resetCart,
  updateCoupon,
} = cartReducer.actions;
