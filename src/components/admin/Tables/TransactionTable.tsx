import { ReactElement } from "react";
import { Column } from "react-table";
import TableHOC from "./TableHOC";

export interface TransactionDataType {
    user : string;
    amount : number;
    discount : number;
    quantity : number;
    status : ReactElement;
    action : ReactElement;
}

const columns: Column<TransactionDataType>[] = [
    {
        Header: "User",
        accessor: "user",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
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

const TransactionTable = ({ data = [] }: { data: TransactionDataType[] }) => {
  return (
    TableHOC<TransactionDataType>(columns, data, "dashboardProductBox", "Transactions" , true)()
  );
};

export default TransactionTable;