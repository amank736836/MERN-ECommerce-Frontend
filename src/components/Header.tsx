import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { FaHome, FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { RiDatabaseFill, RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { RootState } from "../redux/store";
import { FcAbout } from "react-icons/fc";

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
      <Link to="/" title="Home">
        <FaHome /> Home
      </Link>
      <Link to="/search" title="Search">
        <FaSearch /> Search
      </Link>
      <Link to="/about" title="About">
        <FcAbout /> About
      </Link>
      <Link to="/cart" title="Cart">
        <RiShoppingCart2Fill /> Cart
      </Link>
      <Link to="/orders" title="Orders">
        Orders
      </Link>
      {user?.role === "admin" && (
        <Link to="/admin/dashboard" title="Admin Dashboard">
          <RiDatabaseFill /> Admin
        </Link>
      )}
      {user ? (
        <button onClick={logoutHandler}>
          <FaSignOutAlt /> Logout
        </button>
      ) : (
        <Link to="/login" title="Login">
          <FaSignInAlt /> Login
        </Link>
      )}
    </nav>
  );
};

export default Header;
