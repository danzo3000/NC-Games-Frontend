import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, []);
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
};

export default Reviews;
