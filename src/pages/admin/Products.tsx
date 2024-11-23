import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import ProductTable, {
  ProductDataType,
} from "../../components/admin/Tables/ProductTable";
import { SkeletonLoader } from "../../components/Loaders/SkeletonLoader";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";

const Product = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [products, setProducts] = useState<ProductDataType[]>([]);

  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!);
  const [loading, setLoading] = useState<boolean>(false);

  const [deleteProduct] = useDeleteProductMutation();

  const navigate = useNavigate();

  const deleteHandler = async (productId: string) => {
    setLoading(true);
    const toastId = toast.loading("Deleting product...");
    try {
      const res = await deleteProduct({
        id: user?._id!,
        productId,
      });
      responseToast(res, navigate, "/admin/products");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch products");
    }
    if (data) {
      setProducts(
        data.products.map((product) => ({
          photo: (
            <img src={`${product.photos[0].url}`} alt={`${product.category}`} />
          ),
          name: product.name,
          price: product.price,
          stock: product.stock,
          action1: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
          action2: (
            <button
              disabled={loading}
              onClick={() => deleteHandler(product._id)}
            >
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data, isError, error]);

  if (isError || error) {
    return <Navigate to="/admin/dashboard" />;
  }

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
