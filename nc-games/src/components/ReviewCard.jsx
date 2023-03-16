import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { useState } from "react";
import { patchVotesUp } from "../utils/api";

const ReviewCard = ({
  review,
  currentVotes,
  setCurrentVotes,
  setError,
  reviews,
  setReviews,
}) => {
  const [isUpVote, setIsUpVote] = useState(false);
  const handleUpVoteClick = (review_id) => {
    if (!isUpVote) {
      setReviews((currentReviews) => {
        return currentReviews.map((review) => {
          if (review.review_id === review_id) {
            return { ...review, votes: review.votes + 1 };
          }
          return review;
        });
      });
      patchVotesUp(review_id, 1)
        .then((data) => {
          setIsUpVote(true);
          console.log(data);
        })
        .catch(() => {
          setReviews((currentReviews) => {
            return currentReviews.map((review) => {
              if (review.review_id === review_id) {
                return { ...review, votes: review.votes - 1 };
              }
              return review;
            });
          });
          setError("Something went wrong, please try again!");
          setIsUpVote(false);
        });
    } else {
      setReviews((currentReviews) => {
        return currentReviews.map((review) => {
          if (review.review_id === review_id) {
            return { ...review, votes: review.votes - 1 };
          }
          return review;
        });
      });
      patchVotesUp(review_id, -1)
        .then((data) => {
          setIsUpVote(false);
          console.log(data);
        })
        .catch(() => {
          setReviews((currentReviews) => {
            return currentReviews.map((review) => {
              if (review.review_id === review_id) {
                return { ...review, votes: review.votes + 1 };
              }
              return review;
            });
          });
          setError("Something went wrong, please try again!");
          setIsUpVote(true);
        });
    }
  };
  return (
    <section className="ReviewCard">
      <Link to={`/reviews/${review.review_id}`}>
        {" "}
        <img
          className="reviewImg"
          src={review.review_img_url}
          alt={review.title}
        />
        <h2 className="reviewCardTitle">{review.title}</h2>
      </Link>
      <h3 className="reviewCardCategory">{review.category} game</h3>
      <p className="reviewCardBody">{review.review_body}</p>
      <p className="reviewCardVotes">
        {review.votes === 1 ? "1 vote" : `${review.votes} votes`}
      </p>
      <button
        className={isUpVote ? "blueLikeButton" : "likeButton"}
        onClick={() => {
          handleUpVoteClick(review.review_id);
        }}
      >
        <BiLike />
      </button>
    </section>
  );
};

export default ReviewCard;
