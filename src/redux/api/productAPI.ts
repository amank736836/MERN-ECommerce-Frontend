import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllReviewsResponse,
  CategoryResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  NewReviewRequest,
  ProductResponse,
  ReviewRequest,
  SearchProductsRequest,
  searchProductsResponse,
  SingleProductResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/`,
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    productAllReview: builder.query<AllReviewsResponse, ReviewRequest>({
      query: ({ productId, id }) => ({
        url: `review/${productId}`,
        params: { id },
      }),
      providesTags: ["products"],
    }),
    productNewReview: builder.mutation<MessageResponse, NewReviewRequest>({
      query: ({ productId, id, rating, comment }) => ({
        url: `review/${productId}`,
        method: "POST",
        body: { rating, comment },
        params: { id },
      }),
      invalidatesTags: ["products"],
    }),
    productDeleteReview: builder.mutation<MessageResponse, ReviewRequest>({
      query: ({ productId, id }) => ({
        url: `review/${productId}`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["products"],
    }),
    latestProducts: builder.query<ProductResponse, string>({
      query: () => "latest",
      providesTags: ["products"],
    }),
    allProducts: builder.query<ProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["products"],
    }),
    categories: builder.query<CategoryResponse, string>({
      query: () => "categories",
      providesTags: ["products"],
    }),
    searchProducts: builder.query<
      searchProductsResponse,
      SearchProductsRequest
    >({
      query: (params) => ({
        url: "search",
        params,
      }),
      providesTags: ["products"],
    }),
    productDetails: builder.query<SingleProductResponse, string>({
      query: (id) => id,
      providesTags: ["products"],
    }),
    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: "new",
        method: "POST",
        body: formData,
        params: { id },
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ id, formData, productId }) => ({
        url: `${productId}`,
        method: "PUT",
        body: formData,
        params: { id },
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ id, productId }) => ({
        url: `${productId}`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useProductAllReviewQuery,
  useProductNewReviewMutation,
  useProductDeleteReviewMutation,
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useProductDetailsQuery,
  useNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
