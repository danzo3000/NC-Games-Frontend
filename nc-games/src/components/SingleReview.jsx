import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../utils/api";
import { useState } from "react";
import Comments from "./Comments";

const SingleReview = ({ isUserLoggedIn, setIsUserLoggedIn, user }) => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    setIsLoadingReview(true);
    getReviewById(review_id).then((review) => {
      setIsLoadingReview(false);
      setSingleReview(review);
    });
  }, [review_id, setIsLoadingReview]);

  if (isLoadingReview) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <section className="singleReview">
        <img src={singleReview.review_img_url} alt={singleReview.title} />
        <h2>{singleReview.title}</h2>
        <h3>{singleReview.category} game</h3>
        <h3> Designed by {singleReview.designer}</h3>
        <p>{singleReview.review_body}</p>
        <p> Owner: {singleReview.owner}</p>
        {singleReview.votes === 1 ? (
          <p>{singleReview.votes} vote</p>
        ) : (
          <p>{singleReview.votes} votes</p>
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
            : !showComments && singleReview.comment_count === 0
            ? "Be the first to add a comment"
            : "Hide comments"}
        </button>
        <Comments
          showComments={showComments}
          setShowComments={setShowComments}
          review_id={review_id}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          user={user}
        />
      </section>
    );
  }
};

export default SingleReview;
