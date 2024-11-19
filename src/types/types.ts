export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  gender: string;
  dob: string;
};

export type Product = {
  _id: string;
  name: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  price: number;
  stock: number;
  category: string;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  stock: number;
};

export type orderItem = Omit<CartItem, "stock">;

export type Order = {
  _id: string;
  orderItems: orderItem[];
  subtotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingInfo: ShippingInfo;
  user: {
    name: string;
    _id: string;
  };
};

type CountAndChangePercent = {
  revenue: number;
  products: number;
  users: number;
  orders: number;
};

export type latestOrders = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: {
    [key: string]: number;
  }[];
  ChangePercent: CountAndChangePercent;
  count: CountAndChangePercent;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestOrders: latestOrders[];
};

export type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};

type OrderFullfiillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UserAgeGroup = {
  teen: number;
  adult: number;
  senior: number;
};

export type Pie = {
  orderFullfiillment: OrderFullfiillment;
  productCategories: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  userAgeGroup: UserAgeGroup;
  adminCustomer: {
    admin: number;
    user: number;
  };
};

export type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
