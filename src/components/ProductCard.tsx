import { FaPlus } from "react-icons/fa";

type ProductCardProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (productId: string) => void;
};

const server = "https://m.media-amazon.com/images/I";

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductCardProps) => {
  return (
    <div className="productCard">
      <img src={`${server}/${photo}`} alt="" className="src" />
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button onClick={() => handler(productId)}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
