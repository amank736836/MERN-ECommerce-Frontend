import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { ShippingInfo, User } from "../../types/types";

const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = initialState.user;
    },
    updateShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      if (state.user === null) return;
      state.user.shippingInfo = action.payload;
    },
  },
});

export const { userExist, userNotExist, updateShippingInfo } =
  userReducer.actions;
