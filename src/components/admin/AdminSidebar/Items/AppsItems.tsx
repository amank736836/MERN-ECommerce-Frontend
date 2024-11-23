import { BiSolidCoupon } from "react-icons/bi";
import { FaGamepad, FaProductHunt, FaStopwatch } from "react-icons/fa";

export const AppItems = [
  {
    name: "New Coupon",

    icon: BiSolidCoupon,
    url: "/admin/app/coupon",
  },
  {
    name: "New Product",
    icon: FaProductHunt,
    url: "/admin/app/product",
  },
  {
    name: "Stopwatch",
    icon: FaStopwatch,
    url: "/admin/app/stopwatch",
  },
  {
    name: "Toss",
    icon: FaGamepad,
    url: "/admin/app/toss",
  },
];
