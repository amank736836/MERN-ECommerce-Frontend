import {
  Bar,
  CartItem,
  Coupon,
  Line,
  Order,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUsersResponse = MessageResponse & {
  users: User[];
};

export type UserResponse = MessageResponse & {
  user: User;
};

export type SingleProductResponse = MessageResponse & {
  product: Product;
};

export type CategoryResponse = MessageResponse & {
  categories: string[];
};

export type AllOrdersResponse = MessageResponse & {
  orders: Order[];
};

export type OrderDetailsResponse = MessageResponse & {
  order: Order;
};

export type NewOrderResponse = MessageResponse & {
  orderId: string;
};

export type StatsResponse = MessageResponse & {
  stats: Stats;
};

export type BarResponse = MessageResponse & {
  charts: Bar;
};

export type PieResponse = MessageResponse & {
  charts: Pie;
};

export type LineResponse = MessageResponse & {
  charts: Line;
};

export type ProductResponse = MessageResponse & {
  products: Product[];
};

export type searchProductsResponse = ProductResponse & {
  totalPage: number;
  categories: string[];
  minAmount: number;
  maxAmount: number;
};

export type CreateRazorpayResponse = MessageResponse & {
  id: string;
  currency: string;
  amount: number;
};

export type VerificationResponse = MessageResponse & {
  signatureIsValid: boolean;
};

export type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type AllCouponsResponse = MessageResponse & {
  count: number;
  coupons: Coupon[];
};

export type GetCouponResponse = MessageResponse & {
  coupon: Coupon;
};

export type DeleteUserRequest = {
  userId: string;
  id: string;
};

export type SearchProductsRequest = {
  search?: string;
  price?: number;
  category?: string;
  sort?: string;
  page?: number;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductRequest = NewProductRequest & {
  productId: string;
};

export type DeleteProductRequest = {
  id: string;
  productId: string;
};

export type NewOrderRequest = {
  orderItems: CartItem[];
  subtotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
  user: string;
};

export type UpdateOrderRequest = {
  id: string;
  orderId: string;
};

export type CreatePaymentRequest = RazorpayResponse & {
  order: String;
  user: String;
  paymentStatus: "Pending" | "Failed" | "Success";
};

export type UpdateCouponRequest = {
  id: string;
  couponId: string;
  code: string;
  size: number;
  amount: number;
  prefix: string;
  postfix: string;
  includeNumbers: boolean;
  includeCharacters: boolean;
  includeSymbols: boolean;
};

export type DeleteCouponRequest = {
  couponId: string;
  id: string;
};

export type GetCouponRequest = {
  id: string;
  couponId: string;
};
