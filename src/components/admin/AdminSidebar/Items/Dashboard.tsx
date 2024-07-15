import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { RiDatabaseFill, RiShoppingBag3Fill } from "react-icons/ri";

export const DashboardItems = [
  {
    name: "Dashboard",
    icon: RiDatabaseFill,
    url: "/admin/dashboard",
  },
  {
    name: "Product",
    icon: RiShoppingBag3Fill,
    url: "/admin/product",
  },
  {
    name: "Customer",
    icon: IoIosPeople,
    url: "/admin/customer",
  },
  {
    name: "Transaction",
    icon: AiFillFileText,
    url: "/admin/transaction",
  },
];
