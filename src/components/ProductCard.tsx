import toast from "react-hot-toast";
import { FaExpandArrowsAlt, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { transformImage } from "../utils/features";

type ProductCardProps = {
  productId: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
  stock: number;
};

const ProductCard = ({
  productId,
  photos,
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
        src={transformImage(photos[0].url, 300)}
        alt={name}
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
              photos: photos,
              name,
              price,
              quantity: 1,
              stock,
            })
          }
        >
          <FaPlus />
        </button>
        <Link to={`/product/${productId}`} className="productViewBtn">
          <FaExpandArrowsAlt />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
