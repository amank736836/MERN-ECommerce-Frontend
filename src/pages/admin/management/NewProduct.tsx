import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhoto(reader.result);
        }
      };
    }
  };

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        <article>
          <form>
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
            {photo && <img src={photo} alt="product-photo" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
