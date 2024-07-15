import { ReactElement } from "react";
import { Column } from "react-table";
import TableHOC from "./TableHOC";

export interface CustomerDataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<CustomerDataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const CustomerTable = ({ data = [] }: { data: CustomerDataType[] }) => {
  return TableHOC<CustomerDataType>(
    columns,
    data,
    "dashboardProductBox",
    "Customers",
    true
  )();
};

export default CustomerTable;
