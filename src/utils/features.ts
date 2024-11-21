import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

export type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    navigate?.(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    console.log(error);
    const data = error.data as MessageResponse;
    data ? toast.error(data.message) : toast.error("Failed to perform action");
  }
};

export const getLastMonths = () => {
  const date = new Date(new Date().getFullYear(), new Date().getMonth());

  const last6Months: string[] = [];
  for (let i = 0; i < 6; i++) {
    const newDate = new Date(date.getFullYear(), date.getMonth() - i);
    const monthName = newDate.toLocaleString("default", { month: "long" });
    last6Months.unshift(monthName);
  }

  const last12Months: string[] = [];
  for (let i = 0; i < 12; i++) {
    const newDate = new Date(date.getFullYear(), date.getMonth() - i);
    const monthName = newDate.toLocaleString("default", { month: "long" });
    last12Months.unshift(monthName);
  }

  return { last6Months, last12Months };
};
