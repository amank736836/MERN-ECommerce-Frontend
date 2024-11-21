import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllCouponsResponse,
  CreateCouponRequest,
  CreatePaymentRequest,
  CreateRazorpayResponse,
  DeleteCouponRequest,
  MessageResponse,
  RazorpayResponse,
  VerificationResponse,
} from "../../types/api-types";

export const paymentAPI = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/payment/`,
  }),
  tagTypes: ["payment"],
  endpoints: (builder) => ({
    allCoupons: builder.query<AllCouponsResponse, string>({
      query: (id) => ({
        url: "/coupon/all",
        params: { id },
      }),
    }),
    newCoupon: builder.mutation<MessageResponse, CreateCouponRequest>({
      query: ({ code, amount, id }) => ({
        url: "/coupon/new",
        method: "POST",
        body: { code, amount },
        params: { id },
      }),
    }),
    deleteCoupon: builder.mutation<MessageResponse, DeleteCouponRequest>({
      query: ({ couponId, id }) => ({
        url: `/coupon/${couponId}`,
        method: "DELETE",
        params: { id },
      }),
    }),
    createRazorpay: builder.mutation<CreateRazorpayResponse, number>({
      query: (amount) => ({
        url: "createRazorpay",
        method: "POST",
        body: { amount },
      }),
    }),
    verifyPayment: builder.mutation<VerificationResponse, RazorpayResponse>({
      query: (data) => ({
        url: "razorpayPaymentVerification",
        method: "POST",
        body: data,
      }),
    }),
    createPayment: builder.mutation<MessageResponse, CreatePaymentRequest>({
      query: (data) => ({
        url: "createPayment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateRazorpayMutation,
  useVerifyPaymentMutation,
  useCreatePaymentMutation,
  useAllCouponsQuery,
  useNewCouponMutation,
  useDeleteCouponMutation,
} = paymentAPI;
