import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../utils/api";
import { useState } from "react";
import Comments from "./Comments";

const SingleReview = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  user,
  userList,
  setUserList,
}) => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [reviewPathError, setReviewPathError] = useState(null);

  useEffect(() => {
    setIsLoadingReview(true);
    getReviewById(review_id)
      .then((review) => {
        setIsLoadingReview(false);
        setSingleReview(review);
      })
      .catch((err) => {
        let msg = "";
        if (err.message === "Request failed with status code 400") {
          msg +=
            "400: Bad Request! Please check the URL for a typing error, or click 'Home' to head back to our homepage!";
        }
        if (err.message === "Request failed with status code 404") {
          msg +=
            "404: Page not found! We're sorry but the page you're looking for doesn't seem to exist yet. Please check the URL or click 'Home' to head back to our homepage!";
        }
        setReviewPathError(msg);
        setIsLoadingReview(false);
      });
  }, [review_id, setIsLoadingReview]);
  if (reviewPathError) {
    return <p className="BadPathMessage">{reviewPathError}</p>;
  }
  if (isLoadingReview) {
    return <h2 className="loading">Loading...</h2>;
  } else {
    return (
      <div className="singleReviewContainer">
        <section className="singleReviewCard">
          <img
            className="reviewImg"
            src={singleReview.review_img_url}
            alt={singleReview.title}
          />
          <h2 className="reviewCardTitle">{singleReview.title}</h2>
          <h3 className="reviewCardCategory">{singleReview.category} game</h3>
          <h3 className="reviewCardDesigner">
            {" "}
            Designed by {singleReview.designer}
          </h3>
          <p className="reviewCardBody">{singleReview.review_body}</p>
          <p className="reviewCardOwner"> Owner: {singleReview.owner}</p>
          {singleReview.votes === 1 ? (
            <p className="reviewCardVotes">{singleReview.votes} vote</p>
          ) : (
            <p className="reviewCardVotes">{singleReview.votes} votes</p>
          )}
          <button
            className="commentsButton"
            onClick={() => {
              showComments ? setShowComments(false) : setShowComments(true);
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
            userList={userList}
            setUserList={setUserList}
            showComments={showComments}
            setShowComments={setShowComments}
            review_id={review_id}
            isUserLoggedIn={isUserLoggedIn}
            setIsUserLoggedIn={setIsUserLoggedIn}
            user={user}
          />
        </section>
      </div>
    );
  }
};

export default SingleReview;
