import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BarResponse,
  LineResponse,
  PieResponse,
  StatsResponse,
} from "../../types/api-types";

export const dashboardAPI = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://backend-vs.mooo.com/api/v1/dashboard/`,
  }),
  tagTypes: ["dashboard"],
  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, string>({
      query: (id) => ({
        url: "stats",
        params: { id },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["dashboard"],
    }),
    bar: builder.query<BarResponse, string>({
      query: (id) => ({
        url: "bar",
        params: { id },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["dashboard"],
    }),
    pie: builder.query<PieResponse, string>({
      query: (id) => ({
        url: "pie",
        params: { id },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["dashboard"],
    }),
    line: builder.query<LineResponse, string>({
      query: (id) => ({
        url: "line",
        params: { id },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useStatsQuery, useBarQuery, usePieQuery, useLineQuery } =
  dashboardAPI;
