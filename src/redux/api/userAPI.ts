import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  AllUsersResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    allUsers: builder.query<AllUsersResponse, string>({
      query: (id) => ({
        url: "all",
        params: { id },
      }),
      providesTags: ["users"],
    }),
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: ({ userId, id }) => ({
        url: `${userId}`,
        params: { id },
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/user/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation } =
  userAPI;
