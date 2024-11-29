import { useRating } from "6pp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { MdOutlineRateReview, MdRateReview } from "react-icons/md";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useProductAllReviewQuery,
  useProductDeleteReviewMutation,
  useProductNewReviewMutation,
} from "../../redux/api/productAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { Review } from "../../types/types";
import { responseToast, transformImage } from "../../utils/features";
import Loader from "../Loaders/Loader";
import ReviewLoader from "../Loaders/ReviewLoader";
import Ratings from "./Ratings";

const ReviewCard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const { id: productId } = params;
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  const [userReview, setUserReview] = useState<Review>();
  const [reviewComment, setReviewComment] = useState<string>("");
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
  } = useProductAllReviewQuery({
    productId: params.id!,
    id: user?._id!,
  });

  const {
    Ratings: EditableRatings,
    rating,
    setRating,
  } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value: 3,
    selectable: true,
    styles: {
      fontSize: "1.75rem",
      color: "coral",
      justifyContent: "flex-start",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [newReview] = useProductNewReviewMutation();

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting Review...");
    try {
      const res = await newReview({
        id: user?._id!,
        productId: productId!,
        rating: rating,
        comment: reviewComment,
      });
      responseToast(res, navigate, `/product/${productId}`);
    } catch (error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to submit review");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }

    setReviewDialogOpen(false);
  };

  const [reviewDelete] = useProductDeleteReviewMutation();

  const deleteHandler = async (productId: string, id: string) => {
    setLoading(true);
    const toastId = toast.loading("Deleting Review...");
    try {
      const res = await reviewDelete({ id, productId });
      responseToast(res, navigate, `/product/${productId}`);
    } catch (error) {
      const err = error as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to delete review");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
      setRating(0);
      setReviewComment("");
    }
  };

  useEffect(() => {
    if (reviewsData?.reviews) {
      const matchedReview = reviewsData.reviews.find(
        (review: Review) => review.user._id === user?._id
      );
      setUserReview(matchedReview);
      if (matchedReview) {
        setReviewComment(matchedReview.comment);
        setRating(matchedReview.rating);
      }
    }
  }, [reviewsData]);

  useEffect(() => {
    if (isReviewsError || reviewsError) {
      const err = reviewsError as CustomError;
      err.data?.message
        ? toast.error(err.data.message)
        : toast.error("Failed to fetch product details");
    }
  }, [isReviewsError, reviewsError]);

  if (isReviewsError || reviewsError) {
    return <Navigate to="/" />;
  }

  if (loading) return <Loader />;

  return (
    <section>
      <div>
        {isReviewsLoading ? (
          <ReviewLoader />
        ) : (
          <>
            <div>
              <h1>Reviews</h1>

              {user && reviewsData?.reviewButton && (
                <button onClick={() => setReviewDialogOpen(!reviewDialogOpen)}>
                  {reviewDialogOpen ? (
                    <MdRateReview />
                  ) : (
                    <MdOutlineRateReview />
                  )}
                </button>
              )}
            </div>
            <div>
              {reviewDialogOpen && (
                <article>
                  <form onSubmit={submitReview}>
                    <div>
                      <h2>Write a review</h2>
                      <EditableRatings />
                      <button type="submit">Submit</button>
                    </div>
                    <textarea
                      placeholder="Enter your review"
                      title="Review Comment"
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    ></textarea>
                  </form>
                </article>
              )}
              {!reviewDialogOpen && userReview && (
                <article key={userReview._id} className="review">
                  <div>
                    <img
                      src={transformImage(userReview.user.photo, 100)}
                      alt={userReview.user.name}
                    />
                    <div>
                      <h1>{userReview.user.name}</h1>
                      <Ratings value={userReview.rating} />
                      <h5>
                        {new Date(userReview.updatedAt).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </h5>
                      {user?._id === userReview.user._id && (
                        <button
                          onClick={() =>
                            deleteHandler(
                              userReview.product,
                              userReview.user._id
                            )
                          }
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                  <p>{userReview.comment}</p>
                </article>
              )}
              {reviewsData?.reviews
                .filter((review) => review._id !== userReview?._id)
                .map((review) => (
                  <article key={review._id} className="review">
                    <div>
                      <img
                        src={transformImage(review.user.photo, 40)}
                        alt={review.user.name}
                      />
                      <div>
                        <h1>{review.user.name}</h1>
                        <Ratings value={review.rating} />
                        <h5>
                          {new Date(review.updatedAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </h5>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </article>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewCard;
