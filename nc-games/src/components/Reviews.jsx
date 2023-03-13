import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import ReviewCard from "./ReviewCard";

const Reviews = ({ isLoading, setIsLoading }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviews) => {
      setIsLoading(false);
      setReviews(reviews);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading....</h2>;
  } else {
    return (
      <ul className="reviewsList">
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <ReviewCard review={review} />
            </li>
          );
        })}
      </ul>
    );
  }
};

export default Reviews;
