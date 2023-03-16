import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import CategorySort from "./CategorySort";
import ReviewCard from "./ReviewCard";

import { useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [error, setError] = useState(null);
  const { category_slug } = useParams();
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  const handleOrderChangeUp = () => {
    setOrder("asc");
  };

  const handleOrderChangeDown = () => {
    setOrder("desc");
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    setIsLoadingReviews(true);
    getReviews(category_slug, sortBy, order).then((reviews) => {
      setIsLoadingReviews(false);
      setReviews(reviews);
    });
  }, [category_slug, sortBy, order]);

  if (isLoadingReviews) {
    return <h2>Loading....</h2>;
  } else {
    return (
      <section className="categorySortAndReviews">
        <CategorySort />
        <div className="selectAndOrder">
          <select onChange={handleSortChange}>
            <option value="">Sort Reviews By</option>
            <option value="title">Title</option>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
          </select>

          <button onClick={handleOrderChangeUp}>↑</button>
          <button onClick={handleOrderChangeDown}>↓</button>
        </div>

        <ul className="reviewsList">
          {reviews.map((review) => {
            return (
              <li key={review.review_id}>
                <ReviewCard
                  review={review}
                  setError={setError}
                  reviews={reviews}
                  setReviews={setReviews}
                />

                {error ? <p>{error}</p> : null}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default Reviews;
