import { lazy, Suspense } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/admin/Loader";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));

const Shipping = lazy(() => import("./pages/Shipping"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/ProductManagement")
);
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const TransactionManagement = lazy(
  () => import("./pages/admin/management/TransactionManagement")
);

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Product = lazy(() => import("./pages/admin/Product"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));
const Customer = lazy(() => import("./pages/admin/Customer"));

const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));

const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Toss = lazy(() => import("./pages/admin/apps/Toss"));

const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not Logged In Route */}
          <Route path="/login" element={<Login />} />
          {/* Login Routes  */}
          <Route>
            <Route path="/shipping" element={<Shipping />} />
          </Route>

          {/* Admin Routes  */}
          <Route
          // element={
          //   <ProtectedRoute
          //     isAuthenticated={true}
          //     adminRoute={true}
          //     isAdmin={true}
          //   />
          // }
          >
            <Route
              path="/admin"
              element={
                <Link
                  to="/admin/dashboard"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "1rem",
                    fontSize: "1.5rem",
                  }}
                >
                  Visit Dashboard
                </Link>
              }
            />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/customer" element={<Customer />} />

            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />

            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route path="/admin/product/add" element={<NewProduct />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
