import { IoIosPeople } from "react-icons/io";
import { RiDatabaseFill, RiShoppingBag3Fill } from "react-icons/ri";

export const DashboardItems = [
  {
    name: "Dashboard",
    icon: RiDatabaseFill,
    url: "/admin/dashboard",
  },
  {
    name: "Customers",
    icon: IoIosPeople,
    url: "/admin/customers",
  },
  {
    name: "Products",
    icon: RiShoppingBag3Fill,
    url: "/admin/products",
  },
];
