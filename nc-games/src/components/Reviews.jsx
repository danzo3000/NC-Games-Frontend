import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import CategorySort from "./CategorySort";
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
      <section className="categorySortAndReviews">
        <CategorySort />
        <ul className="reviewsList">
          {reviews.map((review) => {
            return (
              <li key={review.review_id}>
                <ReviewCard review={review} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default Reviews;
