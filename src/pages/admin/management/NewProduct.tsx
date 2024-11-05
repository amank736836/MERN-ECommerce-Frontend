import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import toast from "react-hot-toast";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(Number(""));
  const [stock, setStock] = useState<number>(Number(""));
  const [photo, setPhoto] = useState<File>();
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement;
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      console.log(file.size);
      if (file.size > MAX_FILE_SIZE) {
        fileInput.value = "";
        toast.error("File size should be less than 10MB");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setPhotoPreview(reader.result);
            setPhoto(file);
          }
        };
      }
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !category || !photo || stock < 0 || !price || price < 0) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    formData.append("category", category);
    formData.append("photo", photo);

    const res = await newProduct({ formData, id: user?._id! });
    responseToast(res, navigate, "/admin/products");
  };

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
                id="productPhoto"
                onChange={changeImageHandler}
              />
            </div>
            {photo && <img src={photoPreview} alt="product-photo" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
