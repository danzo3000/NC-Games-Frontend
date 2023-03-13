import { useEffect, useState } from "react";
import { getCommentsByReviewId } from "../utils/api";

const Comments = ({
  showComments,
  setShowComments,
  review_id,
  isLoading,
  setIsLoading,
}) => {
  const [currentComments, setCurrentComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByReviewId(review_id).then((comments) => {
      setIsLoading(false);
      setCurrentComments(comments);
    });
  }, [review_id, isLoading, setIsLoading]);
  return (
    <div className={showComments ? "showComments" : "hideComments"}>
      <ul>
        {currentComments.map((comment) => {
          return <li key={comment.comment_id}></li>;
        })}
      </ul>
    </div>
  );
};

export default Comments;
