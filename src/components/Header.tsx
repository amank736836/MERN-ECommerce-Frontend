import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import {
  FaHome,
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { RootState } from "../redux/store";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Signed Out Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <nav className="header">
      <Link to="/">
        <FaHome />
      </Link>
      <Link to="/search">
        <FaSearch />
      </Link>
      <Link to="/cart">
        <FaShoppingBag />
      </Link>
      <Link to="/orders">Orders</Link>
      {user?.role === "admin" && <Link to="/admin/dashboard">Dashboard</Link>}
      {user ? (
        <button onClick={logoutHandler}>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to="/login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
