import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import CategorySort from "./CategorySort";
import ReviewCard from "./ReviewCard";

const Reviews = ({ currentVotes, setCurrentVotes }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  useEffect(() => {
    setIsLoadingReviews(true);
    getReviews().then((reviews) => {
      setIsLoadingReviews(false);
      setReviews(reviews);
    });
<<<<<<< HEAD
  }, [setIsLoading]);
=======
  }, [setIsLoadingReviews]);
>>>>>>> ca0a922eea27cee253ac4e03121e11fc6e9d761c

  if (isLoadingReviews) {
    return <h2>Loading....</h2>;
  } else {
    return (
      <section className="categorySortAndReviews">
        <CategorySort />
        <ul className="reviewsList">
          {reviews.map((review) => {
            return (
              <li key={review.review_id}>
                <ReviewCard
                  review={review}
                  currentVotes={currentVotes}
                  setCurrentVotes={setCurrentVotes}
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default Reviews;
