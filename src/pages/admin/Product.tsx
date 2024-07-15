import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import ProductTable, {
  ProductDataType,
} from "../components/Tables/ProductTable";

const arr: ProductDataType[] = [
  {
    photo: (
      <img
        src={
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8&w=1000&q=804"
        }
        alt="Shoes"
      />
    ),
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },
  {
    photo: (
      <img
        src={"https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg"}
        alt="Laptop"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Product = () => {
  const [products] = useState<ProductDataType[]>(arr);

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>
        <ProductTable data={products} />
      </main>
      <Link to="/admin/product/add" className="createProductBtn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;
