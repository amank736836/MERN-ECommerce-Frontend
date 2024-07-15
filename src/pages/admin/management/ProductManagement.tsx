import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { ChangeEvent, FormEvent, useState } from "react";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(10);
  const [photo, setPhoto] = useState<string>(img);
 
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
        }
      };
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  }


  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        <section>
          <strong>ID - fnjkkfndjfd</strong>
          <img src={photo} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h3>${price}</h3>
        </section>
        <article>
          <form onSubmit={submitHandler}>
            <h2>Manage Product</h2>
            <div>
              <label htmlFor="product-name">Product Name</label>
              <input
                required
                type="text"
                placeholder="Product Name"
                id="product-name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="product-price">Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                id="product-price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="product-stock">Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                id="product-stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
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
            {photo && <img src={photoUpdate} alt="product-photo" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
