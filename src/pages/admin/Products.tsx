import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import ProductTable, {
  ProductDataType,
} from "../../components/admin/Tables/ProductTable";
import { SkeletonLoader } from "../../components/loader";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { RootState, server } from "../../redux/store";
import { CustomError } from "../../types/api-types";

const Product = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [products, setProducts] = useState<ProductDataType[]>([]);

  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setProducts(
        data.products.map((product) => ({
          photo: (
            <img
              src={`${server}/${product.photo}`}
              alt={`${product.category}`}
            />
          ),
          name: product.name,
          price: product.price,
          stock: product.stock,
          action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data, isError]);

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>
        {isLoading ? (
          <SkeletonLoader
            height="4rem"
            width="100%"
            flexDir="column"
            padding="1rem"
            margin="4rem 0"
            length={12}
          />
        ) : products.length === 0 ? (
          <h2 className="noData">No Products Created Yet!</h2>
        ) : (
          <ProductTable data={products} />
        )}
      </main>
      <Link to="/admin/product/add" className="createProductBtn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;
