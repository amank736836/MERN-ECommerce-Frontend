import { IoIosPeople } from "react-icons/io";
import { MdDiscount } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";

export const DashboardItems = [
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
  {
    name: "Coupons",
    icon: MdDiscount,
    url: "/admin/coupons",
  },
];
