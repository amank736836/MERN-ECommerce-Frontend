import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

const CartItem = ({
  productId,
  photo,
  name,
  price,
  quantity,
  stock,
}: CartItemProps) => {
    console.log(photo);
  return (
    <div className="cartItem">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>
            ₹{price}
        </span>
      </article>
      <div>
        <button>-</button>
        <p>
            {quantity} 
        </p>
        <button>+</button>
      </div>
      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
