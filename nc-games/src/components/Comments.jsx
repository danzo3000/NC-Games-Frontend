import { useEffect, useState } from "react";
import { deleteComment, getCommentsByReviewId } from "../utils/api";
import CommentAdder from "./CommentAdder";

const Comments = ({
  showComments,
  setShowComments,
  review_id,
  isUserLoggedIn,
  setIsUserLoggedIn,
  user,
}) => {
  const [currentComments, setCurrentComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const handleDeleteComment = (comment_id) => {
    setCurrentComments((comments) => {
      return comments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    deleteComment(comment_id);
  };

  useEffect(() => {
    setIsLoadingComments(true);
    getCommentsByReviewId(review_id).then((comments) => {
      setIsLoadingComments(false);
      setCurrentComments(comments);
    });
  }, [review_id, setIsLoadingComments]);

  if (isLoadingComments) {
    return <h2>Loading....</h2>;
  } else {
    return (
      <div className={showComments ? "showComments" : "hideComments"}>
        <CommentAdder
          review_id={review_id}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          user={user}
          setShowComments={setShowComments}
          currentComments={currentComments}
          setCurrentComments={setCurrentComments}
        />
        <ul className="commentsList">
          {currentComments.map((comment) => {
            return (
              <li className="singleComment" key={comment.comment_id}>
                <h3 className="commentAuthor">{comment.author} </h3>
                <p className="commentBody">{comment.body}</p>
                {isUserLoggedIn && user.username === comment.author ? (
                  <button
                    className="deleteCommentButton"
                    onClick={() => handleDeleteComment(comment.comment_id)}
                  >
                    Delete
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Comments;
