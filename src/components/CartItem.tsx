import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { CartItem as CartItemProps } from "../types/types";
import toast from "react-hot-toast";
import { addToCart, removeCartItem } from "../redux/reducer/cartReducer";

const CartItem = ({ cartItem }: { cartItem: CartItemProps }) => {
  const { productId, photo, name, price, quantity, stock } = cartItem;

  const dispatch = useDispatch();

  const incrementHandler = () => {
    if (stock < 1) {
      return toast.error("Out of Stock");
    } else if (quantity === stock) {
      return toast.error("Maximum quantity reached");
    }
    toast.success("Added to Cart");
    dispatch(
      addToCart({
        ...cartItem,
        quantity: quantity + 1,
      })
    );
  };

  const decrementHandler = () => {
    if (quantity === 1) {
      return toast.error("Minimum quantity reached");
    }
    return dispatch(addToCart({ ...cartItem, quantity: quantity - 1 }));
  };

  const removeHandler = () => {
    dispatch(removeCartItem(productId));
  };

  return (
    <div className="cartItem">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button
          onClick={() => decrementHandler()}
          onDoubleClick={() => removeHandler()}
        >
          -
        </button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler()}>+</button>
      </div>
      <button onClick={() => removeHandler()}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
