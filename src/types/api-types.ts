import {
  Bar,
  CartItem,
  Coupon,
  Line,
  Order,
  Pie,
  Product,
  Review,
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

export type ProductResponse = MessageResponse & {
  products: Product[];
};

export type CategoryResponse = MessageResponse & {
  categories: string[];
};

export type searchProductsResponse = ProductResponse & {
  totalPage: number;
  categories: string[];
  minAmount: number;
  maxAmount: number;
};

export type AllReviewsResponse = MessageResponse & {
  reviews: Review[];
  reviewButton: boolean;
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

export type AllCouponsResponse = MessageResponse & {
  count: number;
  coupons: Coupon[];
};

export type GetCouponResponse = MessageResponse & {
  coupon: Coupon;
};

export type CreateRazorpayResponse = MessageResponse & {
  id: string;
  currency: string;
  amount: number;
};

export type VerificationResponse = MessageResponse & {
  signatureIsValid: boolean;
};

export type RazorpayRequest = {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
  coupon: string;
  userId: string;
};

export type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
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

export type UpdateUserRequest = {
  userId: string;
  id: string;
  role: string;
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
  shippingInfo: ShippingInfo;
  coupon: string;
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

export type CouponRequest = {
  id: string;
  couponId: string;
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

export type NewReviewRequest = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
};

export type ReviewRequest = {
  id: string;
  productId: string;
};
