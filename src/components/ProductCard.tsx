import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";

type ProductCardProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
}: ProductCardProps) => {
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("Out of Stock");
    }
    toast.success("Added to Cart");
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="productCard">
      <img
        src={`${server}/${photo}`}
        alt=""
        className="src"
        style={{
          margin: `${stock < 1 ? "" : "2rem"}`,
        }}
      />
      <p>{name}</p>
      {stock < 1 ? <span style={{ color: "red" }}>Out of Stock</span> : ""}
      <span>₹{price}</span>
      <div>
        <button
          onClick={() =>
            addToCartHandler({
              productId,
              photo,
              name,
              price,
              quantity: 1,
              stock,
            })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
