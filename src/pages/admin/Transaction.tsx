import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import TransactionTable, {
  TransactionDataType,
} from "../../components/admin/Tables/TransactionTable";
import { Link } from "react-router-dom";

const arr: TransactionDataType[] = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transaction/sdkdjbsdjk">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 999,
    discount: 450,
    quantity: 6,
    status: <span className="green">Shipped</span>,
    action: <Link to="/admin/transaction/sdkdjbsdjk">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    quantity: 5,
    status: <span className="purple">Delivered</span>,
    action: <Link to="/admin/transaction/sdkdjbsdjk">Manage</Link>,
  },
];

const Transaction = () => {
  const [transactions] = useState<TransactionDataType[]>(arr);

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>
        <TransactionTable data={transactions} />
      </main>
    </div>
  );
};

export default Transaction;
