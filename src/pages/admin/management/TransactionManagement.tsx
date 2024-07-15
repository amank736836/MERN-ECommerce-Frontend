import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";
import { OrderItemType, OrderType } from "../../../types";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    price: 2000,
    quantity: 4,
    _id: "sajknaskd",
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Aman Kumar",
    address: "Kankarbagh",
    city: "Patna",
    country: "India",
    state: "Bihar",
    pinCode: "800020",
    status: "Processing",
    subtotal: 8000,
    discount: 2000,
    shippingCharges: 100,
    tax: 200,
    total: 8000 - 2000 + 100 + 200,
    orderItems: orderItems,
    _id: "sdkdjbsdjk",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    status,
    subtotal,
    discount,
    shippingCharges,
    tax,
    total,
  } = order;

  const updateHandler = () => {
    setOrder({
      ...order,
      status: status === "Processing" ? "Shipped" : "Delivered",
    });
  };

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>
          {order.orderItems.map((item) => (
            <ProductCard
              name={item.name}
              photo={item.photo}
              price={item.price}
              quantity={item.quantity}
              _id={item._id}
            />
          ))}
        </section>
        <article className="shippingInfoCard">
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name : {name}</p>
          <p>
            Address:{" "}
            {`${address},
            ${city},
            ${state},
            ${country} - 
            ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>ShippingCharges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "green"
                  : status === "Shipped"
                  ? "purple"
                  : "red"
              }
            >
              {status}
            </span>
          </p>

          <button onClick={updateHandler}>Process Status </button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transactionProductCard">
    <img src={photo} alt={name} />
    <Link to={`/admin/product/${_id}`}>{name}</Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
