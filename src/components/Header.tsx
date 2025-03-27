import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { FaHome, FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { RiDatabaseFill, RiShoppingCart2Fill } from "react-icons/ri";
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
      <Link to="/" title="Home">
        <FaHome />
      </Link>
      <Link to="/search" title="Search">
        <FaSearch />
      </Link>
      <Link to="/about" title="About">
        About
      </Link>
      <Link to="/cart" title="Cart">
        <RiShoppingCart2Fill />
      </Link>
      <Link to="/orders" title="Orders">
        Orders
      </Link>
      {user?.role === "admin" && (
        <Link to="/admin/dashboard" title="Admin Dashboard">
          <RiDatabaseFill />
        </Link>
      )}
      {user ? (
        <button onClick={logoutHandler}>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to="/login" title="Login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
