import { ReactElement } from "react";
import { Column } from "react-table";
import TableHOC from "./TableHOC";

export interface CouponDataType {
  _id: string;
  code: string;
  amount: number;
  action1: ReactElement;
  action2: ReactElement;
}

const columns: Column<CouponDataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action 1",
    accessor: "action1",
  },
  {
    Header: "Action 2",
    accessor: "action2",
  },
];

const CouponTable = ({ data = [] }: { data: CouponDataType[] }) => {
  return TableHOC<CouponDataType>(
    columns,
    data,
    "dashboardProductBox",
    "Discount Coupons",
    data.length > 8,
    8
  )();
};

export default CouponTable;
