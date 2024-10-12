import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { SkeletonLoader } from "../../../components/loader";
import {
  useCancelOrderMutation,
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderAPI";
import { RootState, server } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { Order, orderItem } from "../../../types/types";
import { responseToast } from "../../../utils/features";

const orderItems: orderItem[] = [
  {
    name: "",
    photo: "",
    price: 0,
    quantity: 0,
    productId: "",
  },
];

const defaultOrder: Order = {
  _id: "",
  user: {
    _id: "",
    name: "",
  },
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    state: "",
    pinCode: "",
  },
  status: "Processing",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: orderItems,
};

const OrderManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();

  const { data, isLoading, isError, error } = useOrderDetailsQuery(params.id!);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
    if (data) {
      setOrder(data.order);
    }
  }, [data, isError]);

  const [order, setOrder] = useState<Order>(data?.order || defaultOrder);

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const navigate = useNavigate();

  const updateHandler = async () => {
    const res = await updateOrder({
      orderId: order._id,
      id: user?._id!,
    });

    responseToast(res, navigate, "/orders");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      orderId: order._id,
      id: user?._id!,
    });

    responseToast(res, navigate, "/orders");
  };

  const cancelHandler = async () => {
    const res = await cancelOrder({
      orderId: order._id,
      id: user?._id!,
    });

    responseToast(res, navigate, "/orders");
  };

  if (!isLoading && isError) {
    return <Navigate to="/orders" />;
  }

  return (
    <div className="container">
      <main className="productManagement">
        {isLoading ? (
          <SkeletonLoader length={2} width="500px" height="85vh" />
        ) : (
          <>
            {user?.role === "admin" &&
              (order.status === "Delivered" ||
                order.status === "Cancelled") && (
                <button className="productDeleteBtn" onClick={deleteHandler}>
                  <FaTrash />
                </button>
              )}
            <section
              style={{
                padding: "2rem",
              }}
            >
              <h2>Order Items</h2>
              {order.orderItems.map((item: orderItem) => (
                <div className="orderProductCard" key={item.productId}>
                  <img src={`${server}/${item.photo}`} alt={item.name} />
                  {user?.role === "admin" ? (
                    <Link to={`/admin/product/${item.productId}`}>
                      {item.name}
                    </Link>
                  ) : (
                    <h5>{item.name}</h5>
                  )}
                  <span>
                    ${item.price} X {item.quantity} = $
                    {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </section>
            <article className="shippingInfoCard">
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name : {order.user.name}</p>
              <p>
                Address:{" "}
                {`
                ${order.shippingInfo.address},
            ${order.shippingInfo.city},
            ${order.shippingInfo.state},
            ${order.shippingInfo.country} -
            ${order.shippingInfo.pinCode}
            `}
              </p>
              <h5>Amount Info</h5>
              <p>Subtotal: {order.subtotal}</p>
              <p>ShippingCharges: {order.shippingCharges}</p>
              <p>Tax: {order.tax}</p>
              <p>Discount: {order.discount}</p>
              <p>Total: {order.total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    order.status === "Delivered"
                      ? "green"
                      : order.status === "Shipped"
                      ? "purple"
                      : "red"
                  }
                >
                  {order.status}
                </span>
              </p>

              {order.status !== "Delivered" &&
                order.status !== "Cancelled" &&
                user?.role === "admin" && (
                  <button onClick={updateHandler}>Process Status </button>
                )}
              {(((order.status === "Processing" ||
                order.status === "Shipped") &&
                user?.role === "user") ||
                (order.status === "Processing" && user?.role === "admin")) && (
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={cancelHandler}
                >
                  Cancel Order{" "}
                </button>
              )}
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default OrderManagement;
