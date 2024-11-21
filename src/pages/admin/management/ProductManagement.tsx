import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import Loader from "../../../components/admin/Loader";
import { SkeletonLoader } from "../../../components/loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { responseToast } from "../../../utils/features";

const defaultProduct = {
  name: "",
  price: 0,
  stock: 0,
  photos: [],
  category: "",
  description: "",
};

const ERROR_MESSAGES = {
  size: "Each file should be less than 10MB",
  type: "Only image files are allowed",
};

const ProductManagement = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useProductDetailsQuery(
    params.id!
  );

  const { name, price, stock, photos, category, description } =
    data?.product || defaultProduct;

  const [loading, setLoading] = useState<boolean>(false);

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [descriptionUpdate, setDescriptionUpdate] =
    useState<string>(description);

  const [photosFile, setPhotosFile] = useState<File[]>();
  const [photoPreviews, setPhotoPreviews] = useState<String[]>([]);
  const [photoError, setPhotoError] = useState<string>("");

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch product details");
    }
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setDescriptionUpdate(data.product.description);
      setPhotoPreviews(data.product.photos.map((photo) => photo.url));
    }
  }, [data, isError, error]);

  if (isError || error) {
    return <Navigate to="/admin/products" />;
  }

  const changeImageHandler = (
    e: ChangeEvent<HTMLInputElement>,
    limit: number = 7,
    MAX_FILE_SIZE: number = 10 * 1024 * 1024
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    if (files.length > limit) {
      toast.error(`You can only upload ${limit} photos`);
      return;
    }

    const validFiles: File[] = [];
    const previews: string[] = [];

    Array.from(files).forEach((file, index) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} - ${ERROR_MESSAGES.size}`);
        setPhotoError(ERROR_MESSAGES.size);
      } else if (!file.type.includes("image/")) {
        toast.error(`${file.name} - ${ERROR_MESSAGES.type}`);
        setPhotoError(ERROR_MESSAGES.type);
      } else {
        if (index < limit) {
          validFiles.push(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              previews.push(reader.result);
              setPhotosFile([...validFiles]);
              setPhotoPreviews([...previews]);
            }
          };
        }
        setPhotoError("");
      }
    });
  };

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Updating product...");
    try {
      const formData = new FormData();
      if (nameUpdate !== name) {
        formData.set("name", nameUpdate);
      }
      if (priceUpdate !== price) {
        formData.set("price", String(priceUpdate));
      }
      if (stockUpdate !== stock) {
        formData.set("stock", String(stockUpdate));
      }
      if (categoryUpdate !== category) {
        formData.set("category", categoryUpdate);
      }
      if (descriptionUpdate !== description) {
        formData.set("description", descriptionUpdate);
      }
      if (
        photosFile != data?.product.photos &&
        photosFile &&
        photosFile.length > 0
      ) {
        photosFile.forEach((photo) => {
          formData.append("photos", photo);
        });
      }

      const res = await updateProduct({
        formData,
        id: user?._id!,
        productId: data?.product._id!,
      });
      responseToast(res, navigate, "/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const deleteHandler = async () => {
    try {
      setLoading(true);
      const res = await deleteProduct({
        id: user?._id!,
        productId: data?.product._id!,
      });
      responseToast(res, navigate, "/admin/products");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoading && isError) {
    return <Navigate to="/admin/products" />;
  }

  if (loading) return <Loader />;
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
              <img src={`${photos[0].url}`} alt="Product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red">Not Available</span>
              )}
              <h3>₹{price}</h3>
            </section>
            <article>
              <button
                className="productDeleteBtn"
                disabled={loading}
                onClick={deleteHandler}
              >
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
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    required
                    placeholder="Product Description"
                    id="productDescription"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
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
                  <label htmlFor="productPhoto">Photos</label>
                  <input
                    type="file"
                    id="productPhoto"
                    accept="image/*"
                    multiple
                    onChange={changeImageHandler}
                  />
                </div>
                {photoError && (
                  <span style={{ color: "red" }}>{photoError}</span>
                )}
                {photoPreviews && (
                  <div
                    style={{
                      display: "flex",
                      // flexWrap: "wrap",
                      gap: "1rem",
                      overflowX: "auto",
                      // marginTop: "1rem",
                    }}
                  >
                    {photoPreviews.map((photo, index) => (
                      <img
                        key={index}
                        src={photo as string}
                        alt={`${name} photo preview`}
                        style={{
                          width: "20rem",
                          height: "5rem",
                          objectFit: "scale-down",
                        }}
                      />
                    ))}
                  </div>
                )}
                <button disabled={loading} type="submit">
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
