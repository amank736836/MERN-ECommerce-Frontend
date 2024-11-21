import { CarouselButtonType, MyntraCarousel, Slider } from "6pp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SkeletonLoader } from "../components/loader";
import Ratings from "../components/Ratings";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CustomError } from "../types/api-types";
import { Product } from "../types/types";

const productDetails = () => {
  const params = useParams();

  const { data, isLoading, isError, error } = useProductDetailsQuery(
    params.id!
  );

  useEffect(() => {
    if (isError || error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch product details");
    }
  }, [isError, error]);

  if (isError || error) {
    return <Navigate to="/" />;
  }

  const [carouselOpen, setCarouselOpen] = useState(false);

  return (
    <div className="productDetails">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <main>
          <section>
            <Slider
              objectFit="scale-down"
              onClick={() => setCarouselOpen(true)}
              images={data?.product.photos.map((photo) => photo.url) || []}
              showThumbnails
              // showNav={true}
              showDots
              NextIcon={
                <button className="carouselBtn">
                  <FaArrowRightLong />
                </button>
              }
              PrevIcon={
                <button className="carouselBtn">
                  <FaArrowRightLong />
                </button>
              }
            />
            {carouselOpen && (
              <MyntraCarousel
                darkMode={true}
                objectFit="cover"
                NextButton={NextButton}
                PrevButton={PrevButton}
                setIsOpen={setCarouselOpen}
                images={data?.product.photos.map((photo) => photo.url) || []}
              />
            )}
          </section>
          {data ? (
            <section>
              <h1>{data.product.name}</h1>
              <code>{data.product.category}</code>
              <Ratings value={data.product.ratings} />
              <h3>₹{data.product.price}</h3>
              <CustomizedButtons product={data.product} />
              <p>{data.product.description}</p>
            </section>
          ) : null}
        </main>
      )}
    </div>
  );
};

const CustomizedButtons = ({ product }: { product: Product }) => {
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

      <button onClick={AddToCart}>Add to Cart</button>
      <button
        onClick={() => {
          AddToCart();
          navigate("/cart");
        }}
      >
        Buy Now
      </button>
    </article>
  );
};

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        height: "80vh",
        border: "1px solid #f1f1f1",
      }}
    >
      <section
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SkeletonLoader
          width="100%"
          height="100%"
          containerHeight="100%"
          length={1}
          flexDir="column"
        />
      </section>
      <section
        style={{
          width: "100%",
          // border: "1px solid blue",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          padding: "2rem",
        }}
      >
        <SkeletonLoader width="100%" length={3} />
        <SkeletonLoader width="100%" length={2} flexDir="column" />
        <SkeletonLoader width="100%" length={3} />
        <SkeletonLoader width="100%" length={3} flexDir="column" />
        <SkeletonLoader width="100%" length={3} />
        <SkeletonLoader width="100%" length={2} flexDir="column" />
      </section>
    </div>
  );
};

const NextButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carouselBtn">
    <FaArrowRightLong />
  </button>
);
const PrevButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carouselBtn">
    <FaArrowLeftLong />
  </button>
);

export default productDetails;
