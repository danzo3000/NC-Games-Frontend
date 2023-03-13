import { useState } from "react";

const ReviewCard = ({ review }) => {
  const [currentVotes, setCurrentVotes] = useState(review.votes);
  return (
    <section className="ReviewCard">
      <img
        className="reviewImg"
        src={review.review_img_url}
        alt={review.title}
      />
      <h2>{review.title}</h2>
      <h3>{review.category} game</h3>
      <p>Review: {review.review_body}</p>
      <p>Votes: {currentVotes}</p>
    </section>
  );
};

export default ReviewCard;
