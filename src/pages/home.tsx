import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {

  const addToCartHandler = () => {}

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findMore">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productId="asdhkadsf"
          photo="618d5bS2lUL._SX679_.jpg"
          name="Macbook Pro"
          price={100000}
          stock={100}
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
};

export default Home;
