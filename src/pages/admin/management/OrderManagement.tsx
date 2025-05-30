import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loaders/Loader";
import { SkeletonLoader } from "../../../components/Loaders/SkeletonLoader";
import {
  useCancelOrderMutation,
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { Order, orderItem } from "../../../types/types";
import { responseToast, transformImage } from "../../../utils/features";

const orderItems: orderItem[] = [
  {
    name: "",
    photos: [],
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

  const [loading, setLoading] = useState<boolean>(false);

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>(data?.order || defaultOrder);

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch order details");
    }
    if (data) {
      setOrder(data.order);
    }
  }, [data, isError, error]);

  if (isError || error) {
    return <Navigate to="/orders" />;
  }

  const updateHandler = async () => {
    setLoading(true);
    const toastId = toast.loading("Updating Order Status...");
    try {
      const res = await updateOrder({
        orderId: order._id,
        id: user?._id!,
      });

      responseToast(res, navigate, "/orders");
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const deleteHandler = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting Order...");
    try {
      const res = await deleteOrder({
        orderId: order._id,
        id: user?._id!,
      });

      responseToast(res, navigate, "/orders");
    } catch (error) {
      toast.error("Failed to delete order");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const cancelHandler = async () => {
    setLoading(true);
    const toastId = toast.loading("Cancelling Order...");
    try {
      const res = await cancelOrder({
        orderId: order._id,
        id: user?._id!,
      });

      responseToast(res, navigate, "/orders");
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  if (isError || error) {
    return <Navigate to="/orders" />;
  }

  if (loading) return <Loader />;

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
                <button
                  className="productDeleteBtn"
                  disabled={loading}
                  onClick={deleteHandler}
                >
                  <FaTrash />
                </button>
              )}
            <section
              style={{
                padding: "2rem",
              }}
            >
              <h2>Order Items</h2>
              {order &&
                order.orderItems.length !== 0 &&
                order.orderItems.map((item: orderItem) => (
                  <div
                    className="orderProductCard"
                    key={item.productId}
                    onClick={() => navigate(`/product/${item.productId}`)}
                  >
                    <img
                      src={transformImage(item.photos[0]?.url || "", 64)}
                      alt={item.name}
                    />
                    {user?.role === "admin" ? (
                      <Link to={`/admin/product/${item.productId}`}>
                        {item.name}
                      </Link>
                    ) : (
                      <h5>{item.name}</h5>
                    )}
                    <span>
                      ₹{item.price} X {item.quantity} = ₹
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
                  <button onClick={updateHandler} disabled={loading}>
                    Process Status{" "}
                  </button>
                )}
              {(((order.status === "Processing" ||
                order.status === "Shipped") &&
                user?.role === "user") ||
                (order.status === "Processing" && user?.role === "admin")) && (
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={cancelHandler}
                  disabled={loading}
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
