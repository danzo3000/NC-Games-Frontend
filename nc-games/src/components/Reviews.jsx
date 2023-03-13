import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
      console.log(reviews);
    });
  }, []);
  return (
    <ul>
      {reviews.map((review) => {
        return <ReviewCard />;
      })}
    </ul>
  );
};

export default Reviews;
