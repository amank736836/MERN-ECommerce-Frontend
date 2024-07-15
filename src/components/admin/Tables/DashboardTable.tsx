import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface DashboardDataType {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<DashboardDataType>[] = [
  {
    Header: "Id",
    accessor: "id",
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

const DashboardTable = ({ data = [] }: { data: DashboardDataType[] }) => {
  return TableHOC<DashboardDataType>(
    columns,
    data,
    "transactionBox",
    "Top Transaction"
  )();
};

export default DashboardTable;
