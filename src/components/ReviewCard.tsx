import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AllReviewsResponse } from "../types/api-types";
import { Review } from "../types/types";
import { transformImage } from "../utils/features";
import Ratings from "./Ratings";

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
      {userReview && (
        <article key={userReview._id} className="review">
          <img
            src={transformImage(userReview.user.photo, 100)}
            alt={userReview.user.name}
          />
          <div>
            <h3>
              {userReview.user.name}
              {user?._id === userReview.user._id && (
                <button className="reviewDeleteBtn" style={{}}>
                  <FaTrash />
                </button>
              )}
            </h3>
            <Ratings value={userReview.rating} />
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
          </div>
        </article>
      )}
      {reviewsData?.reviews
        .filter((review) => review._id !== userReview?._id)
        .map((review) => (
          <article key={review._id} className="review">
            <img
              src={transformImage(review.user.photo, 100)}
              alt={review.user.name}
            />
            <div>
              <h3>{review.user.name}</h3>
              <Ratings value={review.rating} />
              <p>{review.comment}</p>
            </div>
          </article>
        ))}
    </>
  );
};

export default ReviewCard;
