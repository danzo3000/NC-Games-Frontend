import { Link } from "react-router-dom";

const ReviewCard = ({ review, currentVotes, setCurrentVotes }) => {
  return (
    <section className="ReviewCard">
      <Link to={`/reviews/${review.review_id}`}>
        {" "}
        <img
          className="reviewImg"
          src={review.review_img_url}
          alt={review.title}
        />
        <h2>{review.title}</h2>
      </Link>
      <h3>{review.category} game</h3>
      <p>Review: {review.review_body}</p>
      <p>Votes: {currentVotes}</p>
    </section>
  );
};

export default ReviewCard;
