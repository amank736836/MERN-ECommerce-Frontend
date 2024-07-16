import OrderTable from "../components/admin/Tables/OrderTable";
import { OrderItems } from "../components/admin/Tables/Items/OrderItems";
const Orders = () => {
  return (
    <div className="container">
      <h1>My Orders</h1>
      <OrderTable data={OrderItems} />
    </div>
  );
};

export default Orders;
