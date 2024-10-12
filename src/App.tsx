import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Loader from "./components/admin/Loader";
import Header from "./components/Header";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));

const Login = lazy(() => import("./pages/Login"));

const Shipping = lazy(() => import("./pages/Shipping"));
const Orders = lazy(() => import("./pages/Orders"));

const ProductManagement = lazy(
  () => import("./pages/admin/management/ProductManagement")
);
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const OrderManagement = lazy(
  () => import("./pages/admin/management/OrderManagement")
);

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Product = lazy(() => import("./pages/admin/Products"));
const Customer = lazy(() => import("./pages/admin/Customers"));

const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));

const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Toss = lazy(() => import("./pages/admin/apps/Toss"));

const App = () => {
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { cartItems } = useSelector((state: RootState) => state.cartReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await getUser(user.uid);
          dispatch(userExist(data.user));
        } catch (error) {
          dispatch(userNotExist());
        }
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not Logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Login Routes  */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={user ? true : false}
                redirect={user ? "/" : "/login"}
              />
            }
          >
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={user && cartItems.length > 0 ? true : false}
                  redirect={user ? "/cart" : "/login"}
                  adminOnly={true}
                  admin={user?.role === "user" ? true : false}
                />
              }
            >
              <Route path="/shipping" element={<Shipping />} />
            </Route>
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderManagement />} />
          </Route>

          {/* Admin Routes  */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={user ? true : false}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
                redirect={user ? "/" : "/login"}
              />
            }
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
            <Route path="/admin/products" element={<Product />} />
            <Route path="/admin/customers" element={<Customer />} />

            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />

            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route path="/admin/product/add" element={<NewProduct />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
