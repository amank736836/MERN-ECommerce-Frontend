import { Column } from "react-table";
import TableHOC from "./TableHOC";
import { latestOrders } from "../../../types/types";

const columns: Column<latestOrders>[] = [
  {
    Header: "Id",
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
];

const DashboardTable = ({ data = [] }: { data: latestOrders[] }) => {
  return TableHOC<latestOrders>(columns, data, "orderBox", "Top Orders")();
};

export default DashboardTable;
