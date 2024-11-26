import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AllReviewsResponse } from "../types/api-types";
import { Review } from "../types/types";
import { transformImage } from "../utils/features";
import Ratings from "./Review/Ratings";

const ReviewCard = ({
  reviewsData,
}: {
  reviewsData: AllReviewsResponse | undefined;
}) => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [userReview, setUserReview] = useState<Review>();

  useEffect(() => {
    if (reviewsData?.reviews) {
      const matchedReview = reviewsData.reviews.find(
        (review) => review.user._id === user?._id
      );
      setUserReview(matchedReview);
    }
  }, [reviewsData]);

  const [input, setInput] = useState<boolean>(false);

  return (
    <>
      <div>
        {userReview && (
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
                  {new Date(userReview.updatedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h5>
                {user?._id === userReview.user._id && (
                  <button className="reviewDeleteBtn" style={{}}>
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
            {input ? (
              <textarea
                title="Review Comment"
                placeholder="Enter your review"
                value={userReview.comment}
                onChange={(e) =>
                  setUserReview({ ...userReview, comment: e.target.value })
                }
                onBlur={() => setInput(false)}
              />
            ) : (
              <p onClick={() => setInput(true)}>{userReview.comment}</p>
            )}
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
                    {new Date(review.updatedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </h5>
                </div>
              </div>
              <p onClick={() => setInput(true)}>{review.comment}</p>
            </article>
          ))}
      </div>
    </>
  );
};

export default ReviewCard;
