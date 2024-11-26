import { CarouselButtonType, MyntraCarousel, Slider } from "6pp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Navigate, useParams } from "react-router-dom";
import ProductLoader from "../components/Loaders/ProductLoader";
import ReviewLoader from "../components/Loaders/ReviewLoader";
import Ratings from "../components/Review/Ratings";
import ReviewCard from "../components/Review/ReviewCard";
import { ReviewCustomizedButtons } from "../components/Review/ReviewCustomizedButtons";
import {
  useProductAllReviewQuery,
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";

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
  } = useProductAllReviewQuery(params.id!);

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

  const [carouselOpen, setCarouselOpen] = useState<boolean>(false);

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
                PrevIcon={
                  <button className="carouselBtn">
                    <FaArrowLeftLong />
                  </button>
                }
                NextIcon={
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
                <h1>{productData.product.name}</h1>

                <ReviewCustomizedButtons product={productData.product} />
                <p>{productData.product.description}</p>
              </section>
            ) : null}
          </main>
        </>
      )}

      <section>
        <div>
          {isReviewsLoading ? (
            <ReviewLoader />
          ) : (
            <ReviewCard reviewsData={reviewsData} />
          )}
        </div>
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
