import { Column } from "react-table";
import TableHOC from "./TableHOC";
import { ReactElement } from "react";

export interface OrderDataType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<OrderDataType>[] = [
  {
    Header: "Order ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const OrderTable = ({ data = [] }: { data: OrderDataType[] }) => {
  return TableHOC<OrderDataType>(
    columns,
    data,
    "dashboardProductBox",
    "Orders",
    data.length > 6
  )();
};

export default OrderTable;
