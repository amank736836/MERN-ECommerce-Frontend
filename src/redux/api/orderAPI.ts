import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderRequest,
  NewOrderResponse,
  OrderDetailsResponse,
  UpdateOrderRequest,
} from "../../types/api-types";

export const orderAPI = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `my`,
        params: { id },
      }),
      providesTags: ["orders"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `all`,
        params: { id },
      }),
      providesTags: ["orders"],
    }),
    orderDetails: builder.query<OrderDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["orders"],
    }),
    newOrder: builder.mutation<NewOrderResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ id, orderId }) => ({
        url: `${orderId}`,
        params: { id },
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ id, orderId }) => ({
        url: `${orderId}`,
        params: { id },
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    cancelOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ id, orderId }) => ({
        url: `${orderId}`,
        params: { id },
        method: "POST",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCancelOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
} = orderAPI;
