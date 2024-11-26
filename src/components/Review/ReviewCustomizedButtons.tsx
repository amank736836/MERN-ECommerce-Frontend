import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/reducer/cartReducer";
import { Product } from "../../types/types";

export const ReviewCustomizedButtons = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productQuantity, setProductQuantity] = useState<number>(1);

  const [incrementDisabled, setIncrementDisabled] = useState<boolean>(false);
  const [decrementDisabled, setDecrementDisabled] = useState<boolean>(false);

  const incrementHandler = () => {
    setDecrementDisabled(false);
    if (product.stock < 1) {
      setIncrementDisabled(true);
      setDecrementDisabled(true);
      toast.error("Out of Stock");
    } else if (productQuantity === product.stock) {
      setIncrementDisabled(true);
      toast.error("Maximum quantity reached");
    } else {
      setProductQuantity((prev) => prev + 1);
    }
  };

  const decrementHandler = () => {
    setIncrementDisabled(false);
    if (productQuantity === 1) {
      setDecrementDisabled(true);
      toast.error("Minimum quantity reached");
    } else {
      setProductQuantity((prev) => prev - 1);
    }
  };

  const AddToCart = () => {
    toast.success("Added to Cart");
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        photos: product.photos,
        price: product.price,
        quantity: productQuantity,
        stock: product.stock,
      })
    );
  };

  return (
    <article>
      <div>
        <button onClick={decrementHandler} disabled={decrementDisabled}>
          -
        </button>
        <span>{productQuantity}</span>
        <button disabled={incrementDisabled} onClick={incrementHandler}>
          +
        </button>
      </div>
      <div>
        <button onClick={AddToCart}>Add to Cart</button>
        <button
          onClick={() => {
            AddToCart();
            navigate("/cart");
          }}
        >
          Buy Now
        </button>
      </div>
    </article>
  );
};
