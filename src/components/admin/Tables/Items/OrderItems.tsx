import { Link } from "react-router-dom";

export const OrderItems = [
  {
    _id: "1",
    quantity: 2,
    discount: 10,
    amount: 200,
    status: <span className="green">Delivered</span>,
    action: <Link to={`/order/1`}>View</Link>,
  },
  {
    _id: "2",
    quantity: 3,
    discount: 20, 
    amount: 300,
    status: <span className="red">Processing</span>,
    action: <Link to={`/order/2`}>View</Link>,
  },
  {
    _id: "3",
    quantity: 4,
    discount: 30,
    amount: 400,
    status: <span>Delivered</span>,
    action: <Link to={`/order/3`}>View</Link>,
  },
];
