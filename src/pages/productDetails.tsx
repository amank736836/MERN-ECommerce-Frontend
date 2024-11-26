import { CarouselButtonType, MyntraCarousel, Slider } from "6pp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ProductLoader from "../components/Loaders/ProductLoader";
import ReviewLoader from "../components/Loaders/ReviewLoader";
import Ratings from "../components/Ratings";
import ReviewCard from "../components/ReviewCard";
import {
  useAllReviewsOfProductQuery,
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CustomError } from "../types/api-types";
import { Product } from "../types/types";

const productDetails = () => {
  const params = useParams();

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useProductDetailsQuery(params.id!);
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
  } = useAllReviewsOfProductQuery(params.id!);

  useEffect(() => {
    if (isProductError || productError) {
      const err = productError as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch product details");
    }
    if (isReviewsError || reviewsError) {
      const err = reviewsError as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch product details");
    }
  }, [isProductError, productError, isReviewsError, reviewsError, reviewsData]);

  if (isProductError || productError || isReviewsError || reviewsError) {
    return <Navigate to="/" />;
  }

  const [carouselOpen, setCarouselOpen] = useState(false);

  return (
    <div className="productDetails">
      {isProductLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main>
            <section>
              <Slider
                objectFit="scale-down"
                onClick={() => setCarouselOpen(true)}
                images={
                  productData?.product.photos.map((photo) => photo.url) || []
                }
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
                  objectFit="scale-down"
                  NextButton={NextButton}
                  PrevButton={PrevButton}
                  setIsOpen={setCarouselOpen}
                  images={
                    productData?.product.photos.map((photo) => photo.url) || []
                  }
                />
              )}
            </section>
            {productData ? (
              <section>
                <div>
                  <code>{productData.product.category}</code>
                  <h1>{productData.product.name}</h1>
                  <em
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Ratings value={productData.product.averageRating} />
                    {productData.product.numOfReviews} Reviews
                  </em>
                  <h3>₹{productData.product.price}</h3>
                </div>
                <CustomizedButtons product={productData.product} />
                <p>{productData.product.description}</p>
              </section>
            ) : null}
          </main>
          <section>
            <h1>Reviews</h1>
            <div>
              {isReviewsLoading ? (
                <ReviewLoader />
              ) : (
                <ReviewCard reviewsData={reviewsData} />
              )}
            </div>
          </section>
        </>
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
