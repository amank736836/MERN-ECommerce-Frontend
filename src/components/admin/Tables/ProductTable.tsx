import { ReactElement } from "react";
import { Column } from "react-table";
import TableHOC from "./TableHOC";

export interface ProductDataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action1: ReactElement;
  action2: ReactElement;
}

const columns: Column<ProductDataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
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

const ProductTable = ({ data = [] }: { data: ProductDataType[] }) => {
  return TableHOC<ProductDataType>(
    columns,
    data,
    "dashboardProductBox",
    "Products",
    data.length > 6,
    6
  )();
};

export default ProductTable;
