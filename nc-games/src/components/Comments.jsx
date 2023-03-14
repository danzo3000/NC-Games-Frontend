import { useEffect, useState } from "react";
import { getCommentsByReviewId } from "../utils/api";

const Comments = ({ showComments, setShowComments, review_id }) => {
  const [currentComments, setCurrentComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

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
        <ul>
          {currentComments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <h3>{comment.author} wrote: </h3>
                <p classname="commentBody">{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Comments;
