import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";

const Home = () => {
  const { data, isLoading, isError, error } = useLatestProductsQuery("");

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch products");
    }
  }, [isError, error]);

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
          data &&
          data.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              photos={product.photos}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
