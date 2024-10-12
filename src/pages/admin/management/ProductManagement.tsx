import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { SkeletonLoader } from "../../../components/loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState, server } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { responseToast } from "../../../utils/features";

const defaultProduct = {
  name: "",
  price: 0,
  stock: 0,
  photo: "",
  category: "",
};

const ProductManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading, isError, error } = useProductDetailsQuery(
    params.id!
  );

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setPhotoUpdate(`${server}/${data.product.photo}`);
      setCategoryUpdate(data.product.category);
    }
  }, [data, isError]);

  const { name, price, stock, photo, category } =
    data?.product || defaultProduct;

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [photoFile, setPhotoFile] = useState<File>();
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (nameUpdate !== name) {
      formData.append("name", nameUpdate);
    }
    if (priceUpdate !== price) {
      formData.append("price", String(priceUpdate));
    }
    if (stockUpdate !== stock) {
      formData.append("stock", String(stockUpdate));
    }
    if (categoryUpdate !== category) {
      formData.append("category", categoryUpdate);
    }
    if (photoFile) {
      formData.append("photo", photoFile);
    }
    const res = await updateProduct({
      formData,
      id: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/products");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      id: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/products");
  };

  if (!isLoading && isError) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        {isLoading ? (
          <SkeletonLoader length={2} width="500px" height="85vh" />
        ) : (
          <>
            <section>
              <strong>ID - {data?.product._id}</strong>
              <img src={`${server}/${photo}`} alt="Product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red">Not Available</span>
              )}
              <h3>${price}</h3>
            </section>
            <article>
              <button className="productDeleteBtn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label htmlFor="productName">Name</label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    id="productName"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="productPrice">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    id="productPrice"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="productStock">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    id="productStock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label htmlFor="productCategory">Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc."
                    id="productCategory"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="productPhoto">Photo</label>
                  <input
                    type="file"
                    id="productPhoto"
                    onChange={changeImageHandler}
                  />
                </div>
                {photo && <img src={photoUpdate} alt="product-photo" />}
                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
