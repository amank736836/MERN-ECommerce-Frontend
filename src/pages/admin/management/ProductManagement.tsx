import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { ChangeEvent, FormEvent, useState } from "react";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(10);
  const [photo, setPhoto] = useState<string>(img);
  const [category, setCategory] = useState<string>("footwear");

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);

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
    setCategory(categoryUpdate);
  };

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
          <button className="productDeleteBtn">
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
      </main>
    </div>
  );
};

export default ProductManagement;
