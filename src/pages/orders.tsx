import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import OrderTable, {
  OrderDataType,
} from "../components/admin/Tables/OrderTable";
import { SkeletonLoader } from "../components/loader";
import { useAllOrdersQuery, useMyOrdersQuery } from "../redux/api/orderAPI";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";

const Orders = () => {
  const [orders, setOrders] = useState<OrderDataType[]>([]);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } =
    user?.role === "admin"
      ? useAllOrdersQuery(user?._id!)
      : useMyOrdersQuery(user?._id!);

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch orders");
    }
    if (data) {
      setOrders(
        data.orders.map((order) => ({
          _id: order._id,
          quantity: order.orderItems.length,
          discount: order.discount,
          amount: order.total,
          status: (
            <span
              className={
                order.status === "Delivered"
                  ? "green"
                  : order.status === "Cancelled"
                  ? "red"
                  : order.status === "Shipped"
                  ? "purple"
                  : ""
              }
            >
              {order.status}
            </span>
          ),
          action: (
            <Link to={`/order/${order._id}`}>
              {user?.role === "admin" ? "Manage" : "View"}
            </Link>
          ),
        }))
      );
    }
  }, [data, isError, error]);

  if (isError || error) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <main>
        {isLoading ? (
          <SkeletonLoader
            height="4rem"
            width="100%"
            flexDir="column"
            padding="1rem"
            margin="4rem 0"
            length={12}
          />
        ) : orders.length === 0 ? (
          <center>
            <h2 className="noData">No Order Done Yet</h2>
          </center>
        ) : (
          <OrderTable data={orders} title="Orders" />
        )}
      </main>
    </div>
  );
};

export default Orders;
