import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItem as CartItemProps } from "../types/types";
import { useState } from "react";

const CartItem = ({ cartItem }: { cartItem: CartItemProps }) => {
  const { productId, photos, name, price, quantity, stock } = cartItem;

  const [incrementDisabled, setIncrementDisabled] = useState(false);
  const [decrementDisabled, setDecrementDisabled] = useState(false);

  const dispatch = useDispatch();

  const incrementHandler = () => {
    setDecrementDisabled(false);
    if (stock < 1) {
      setIncrementDisabled(true);
      setDecrementDisabled(true);
      toast.error("Out of Stock");
    } else if (quantity === stock) {
      setIncrementDisabled(true);
      toast.error("Maximum quantity reached");
    } else {
      toast.success("Added to Cart");
      dispatch(
        addToCart({
          ...cartItem,
          quantity: quantity + 1,
        })
      );
    }
  };

  const decrementHandler = () => {
    setIncrementDisabled(false);
    if (quantity === 1) {
      setDecrementDisabled(true);
      toast.error("Minimum quantity reached");
    } else {
      dispatch(addToCart({ ...cartItem, quantity: quantity - 1 }));
    }
  };

  const removeHandler = () => {
    dispatch(removeCartItem(productId));
  };

  const navigate = useNavigate();

  return (
    <div className="cartItem">
      <img
        onClick={() => navigate(`/product/${productId}`)}
        src={`${photos[0].url}`}
        alt={name}
      />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button
          disabled={decrementDisabled}
          onClick={() => decrementHandler()}
          onDoubleClick={() => removeHandler()}
        >
          -
        </button>
        <p>{quantity}</p>
        <button disabled={incrementDisabled} onClick={() => incrementHandler()}>
          +
        </button>
      </div>
      <button onClick={() => removeHandler()}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
