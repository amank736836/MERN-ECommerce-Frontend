import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { useEffect } from "react";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch data");
    }
  }, [isError]);

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
        {isLoading ? (
          <SkeletonLoader
            flexDir="row"
            height="25rem"
            width="18.75rem"
            length={6}
          />
        ) : (
          data?.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              photo={product.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
