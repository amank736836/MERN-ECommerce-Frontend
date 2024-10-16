import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import { calculatePrice, updateCoupon } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, shippingCharges, discount, total, coupon } =
    useSelector((state: RootState) => state.cartReducer);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>(coupon);
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    if (cartItems.length <= 0 || user?.role !== "user" || couponCode === "") {
      return;
    }
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const id = setTimeout(() => {
      axios
        .post(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(calculatePrice(res.data.discount));
          dispatch(updateCoupon(couponCode));
          setIsValidCouponCode(res.data.success);
          toast.success(res.data.message);
        })
        .catch((err) => {
          dispatch(calculatePrice(0));
          setIsValidCouponCode(false);
          if (
            err.response &&
            err.response.data &&
            err.response.data.message === "Please enter a coupon code"
          ) {
            toast.error("No Discount Applied");
          } else {
            err.response
              ? toast.error(err.response.data.message)
              : toast.error("Invalid Coupon Code");
          }
        });
    }, 1000);

    return () => {
      clearTimeout(id);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice(discount));
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItemCard key={index} cartItem={item} />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        {cartItems.length > 0 && user?.role === "user" && (
          <input
            type="text"
            value={couponCode}
            placeholder="Coupon Code"
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          />
        )}

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && user?.role === "user" && (
          <Link to="/shipping">Checkout</Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
