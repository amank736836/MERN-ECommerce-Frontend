import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import CustomerTable, {
  CustomerDataType,
} from "../../components/admin/Tables/CustomerTable";
import { FaTrash } from "react-icons/fa";

const arr: CustomerDataType[] = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={"https://randomuser.me/api/portraits/women/54.jpg"}
        alt="Avatar"
      />
    ),
    name: "Emily Palmer",
    email: "emilt.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={"https://randomuser.me/api/portraits/men/54.jpg"}
        alt="Avatar"
      />
    ),
    name: "Mason Porter",
    email: "mason.porter@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        Del
        <FaTrash />
      </button>
    ),
  },
];

const Customer = () => {
  const [products] = useState<CustomerDataType[]>(arr);

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>
        <CustomerTable data={products} />
      </main>
    </div>
  );
};

export default Customer;
