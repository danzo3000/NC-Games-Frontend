import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import CategorySort from "./CategorySort";
import ReviewCard from "./ReviewCard";
import { BiLike } from "react-icons/bi";
import { patchVotesUp } from "../utils/api";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isUpVote, setIsUpVote] = useState(false);
  const [error, setError] = useState(null);
  const { category_slug } = useParams();

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

  useEffect(() => {
    setIsLoadingReviews(true);
    getReviews(category_slug).then((reviews) => {
      setIsLoadingReviews(false);
      setReviews(reviews);
    });
  }, [setIsLoadingReviews, category_slug]);

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
                <ReviewCard review={review} />
                <button
                  className={isUpVote ? "blueLikeButton" : "likeButton"}
                  onClick={() => {
                    handleUpVoteClick(review.review_id);
                  }}
                >
                  <BiLike />
                </button>
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
