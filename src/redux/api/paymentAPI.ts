import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  CreatePaymentRequest,
  CreateRazorpayResponse,
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
} = paymentAPI;
