import {
  Bar,
  CartItem,
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

export type AllUsersResponse = {
  success: boolean;
  message: string;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type deleteUserRequest = {
  userId: string;
  id: string;
};

export type ProductResponse = {
  success: boolean;
  message: string;
  products: Product[];
};

export type SingleProductResponse = {
  success: boolean;
  message: string;
  product: Product;
};

export type CategoryResponse = {
  success: boolean;
  message: string;
  categories: string[];
};

export type searchProductsResponse = ProductResponse & {
  totalPage: number;
  categories: string[];
  minAmount: number;
  maxAmount: number;
};

export type searchProductsRequest = {
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

export type AllOrdersResponse = {
  success: boolean;
  message: string;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  message: string;
  order: Order;
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

export type StatsResponse = {
  success: boolean;
  message: string;
  stats: Stats;
};

export type BarResponse = {
  success: boolean;
  message: string;
  charts: Bar;
};

export type PieResponse = {
  success: boolean;
  message: string;
  charts: Pie;
};

export type LineResponse = {
  success: boolean;
  message: string;
  charts: Line;
};

export type CreateRazorpayResponse = {
  success: boolean;
  id: string;
  currency: string;
  amount: number;
};

export type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type VerificationResponse = {
  success: boolean;
  message: string;
  signatureIsValid: boolean;
};

export type CreatePaymentRequest = RazorpayResponse & {
  order: String;
  user: String;
  paymentStatus: "Pending" | "Failed" | "Success";
};

export type NewOrderResponse = MessageResponse & {
  orderId: string;
};
