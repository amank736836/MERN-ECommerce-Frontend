import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllCouponsResponse,
  CouponRequest,
  CreatePaymentRequest,
  CreateRazorpayResponse,
  GetCouponResponse,
  MessageResponse,
  RazorpayResponse,
  UpdateCouponRequest,
  VerificationResponse
} from "../../types/api-types";
import { Coupon } from "../../types/types";

export const paymentAPI = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/payment/`,
  }),
  tagTypes: ["payment", "coupon"],
  endpoints: (builder) => ({
    allCoupons: builder.query<AllCouponsResponse, string>({
      query: (id) => ({
        url: "/coupon/all",
        params: { id },
      }),
      providesTags: ["coupon"],
    }),
    getCoupon: builder.query<GetCouponResponse, CouponRequest>({
      query: ({ id, couponId }) => ({
        url: `/coupon/${couponId}`,
        params: { id },
      }),
      providesTags: ["coupon"],
    }),
    newCoupon: builder.mutation<MessageResponse, Coupon>({
      query: ({
        _id,
        code,
        amount,
        prefix,
        postfix,
        includeNumbers,
        includeCharacters,
        includeSymbols,
      }) => ({
        url: "/coupon/new",
        method: "POST",
        body: {
          code,
          amount,
          prefix,
          postfix,
          includeNumbers,
          includeCharacters,
          includeSymbols,
        },
        params: { id: _id },
      }),
      invalidatesTags: ["coupon"],
    }),
    updateCoupon: builder.mutation<MessageResponse, UpdateCouponRequest>({
      query: ({
        id,
        couponId,
        code,
        size,
        amount,
        prefix,
        postfix,
        includeNumbers,
        includeCharacters,
        includeSymbols,
      }) => ({
        url: `/coupon/${couponId}`,
        method: "PUT",
        body: {
          code,
          amount,
          size,
          prefix,
          postfix,
          includeNumbers,
          includeCharacters,
          includeSymbols,
        },
        params: { id },
      }),
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation<MessageResponse, CouponRequest>({
      query: ({ couponId, id }) => ({
        url: `/coupon/${couponId}`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["coupon"],
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
  useGetCouponQuery,
  useAllCouponsQuery,
  useCreateRazorpayMutation,
  useVerifyPaymentMutation,
  useCreatePaymentMutation,
  useNewCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} = paymentAPI;
