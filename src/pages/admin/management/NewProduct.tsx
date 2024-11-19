import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import toast from "react-hot-toast";
import Loader from "../../../components/admin/Loader";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ERROR_MESSAGES = {
  size: "Each file should be less than 10MB",
  type: "Only image files are allowed",
};

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(Number(""));
  const [stock, setStock] = useState<number>(Number(""));
  const [category, setCategory] = useState<string>("");

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string>("");

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0)
      return setPhotoError("Please select an image");

    if (files.length > 7) {
      toast.error("You can only upload 7 images");
      setPhotoError("You can only upload 7 images");
      return;
    }

    const validFiles: File[] = [];
    const previews: string[] = [];

    Array.from(files).forEach((file, index) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} - ${ERROR_MESSAGES.size}`);
        setPhotoError(ERROR_MESSAGES.size);
        setPhotoPreviews([]);
        setPhotos([]);
      } else if (!file.type.includes("image/")) {
        toast.error(`${file.name} - ${ERROR_MESSAGES.type}`);
        setPhotoError(ERROR_MESSAGES.type);
        setPhotoPreviews([]);
        setPhotos([]);
      } else {
        if (index < 7) {
          validFiles.push(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              previews.push(reader.result);
              setPhotoPreviews([...previews]);
            }
          };
        }
        setPhotoError("");
      }
    });

    setPhotos(validFiles);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !category || !photos || stock < 0 || !price || price < 0) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!photos || photos.length === 0) {
      toast.error("Please upload product photos");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", String(price));
    formData.set("stock", String(stock));
    formData.set("category", category);
    photos.forEach((photo) => formData.append("photos", photo));

    const res = await newProduct({ formData, id: user?._id! });
    responseToast(res, navigate, "/admin/products");
    setLoading(false);
  };

  if (loading) return <Loader />;
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label htmlFor="productName">Name</label>
              <input
                required
                type="text"
                placeholder="Product Name"
                id="productName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productPrice">Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                id="productPrice"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="productStock">Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                id="productStock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label htmlFor="productCategory">Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc."
                id="productCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="productPhoto">Photo</label>
              <input
                required
                type="file"
                multiple
                id="productPhoto"
                onChange={changeImageHandler}
              />
            </div>
            <div>
              {photoError && <span style={{ color: "red" }}>{photoError}</span>}
              {photoPreviews &&
                photoPreviews.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${name} photo preview`}
                    style={{
                      width: 20 / photoPreviews.length + "rem",
                      height: 10 / photoPreviews.length + "rem",
                      objectFit: "scale-down",
                      margin: "0.5rem",
                    }}
                  />
                ))}
            </div>
            <button disabled={loading} type="submit">
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
