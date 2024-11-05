import { ReactElement } from "react";
import { Column } from "react-table";
import TableHOC from "./TableHOC";

export interface ProductDataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
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
    Header: "Action",
    accessor: "action",
  },
];

const ProductTable = ({ data = [] }: { data: ProductDataType[] }) => {
  return TableHOC<ProductDataType>(
    columns,
    data,
    "dashboardProductBox",
    "Products",
    data.length > 5
  )();
};

export default ProductTable;
