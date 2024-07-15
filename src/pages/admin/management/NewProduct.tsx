import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>("");

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
              <label htmlFor="product-name">Product Name</label>
              <input
                required
                type="text"
                placeholder="Product Name"
                id="product-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="product-price">Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                id="product-price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="product-stock">Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                id="product-stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="product-photo">Photo</label>
              <input
                required
                type="file"
                id="product-photo"
                onChange={changeImageHandler}
              />
            </div>
            {photo && (
                <img src={photo} alt="product-photo" />
            )}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
