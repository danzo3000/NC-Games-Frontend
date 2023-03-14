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
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    setIsLoadingReview(true);
    getReviewById(review_id).then((review) => {
      setIsLoadingReview(false);
      setSingleReview(review);
      setCurrentVotes(review.votes);
    });
  }, [review_id, setIsLoadingReview, setCurrentVotes]);

  if (isLoadingReview) {
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
            {
              showComments ? setShowComments(false) : setShowComments(true);
            }
          }}
        >
          {!showComments && singleReview.comment_count === 1
            ? `Show ${singleReview.comment_count} comment`
            : !showComments && singleReview.comment_count > 1
            ? `Show ${singleReview.comment_count} comments`
            : "Hide comments"}
        </button>
        <Comments
          showComments={showComments}
          setShowComments={setShowComments}
          review_id={review_id}
        />
      </section>
    );
  }
};

export default SingleReview;
