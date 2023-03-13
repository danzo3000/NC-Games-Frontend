import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../utils/api";
import { useState } from "react";
import Comments from "./Comments";

const SingleReview = ({
  isLoading,
  setIsLoading,
  currentVotes,
  setCurrentVotes,
}) => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((review) => {
      setIsLoading(false);
      setSingleReview(review);
      setCurrentVotes(review.votes);
    });
  }, [review_id, setIsLoading, setCurrentVotes]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <section className="singleReview">
        {console.log(showComments)}
        <img src={singleReview.review_img_url} alt={singleReview.title} />
        <h2>{singleReview.title}</h2>
        <h3>{singleReview.category} game</h3>
        <h3> Designed by {singleReview.designer}</h3>
        <p>{singleReview.review_body}</p>
        <p> Owner: {singleReview.owner}</p>
        {currentVotes === 1 ? (
          <p>{currentVotes} vote</p>
        ) : (
          <p>{currentVotes} votes</p>
        )}
        <button
          onClick={() => {
            setShowComments(true);
          }}
        >
          {singleReview.comment_count} comments
        </button>
        <Comments
          showComments={showComments}
          setShowComments={setShowComments}
          review_id={review_id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </section>
    );
  }
};

export default SingleReview;
