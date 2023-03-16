import { useState } from "react";
import { postComment } from "../utils/api";

const CommentAdder = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  user,
  review_id,
  setShowComments,
  setCurrentComments,
}) => {
  const [commentObject, setCommentObject] = useState({
    username: user.username,
    body: "",
  });
  const handleChange = (event) => {
    setCommentObject({ ...commentObject, body: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowComments(true);
    postComment(commentObject, review_id).then((comment) => {
      console.log(comment);
      setCommentObject({ username: user.username, body: "" });
      setCurrentComments((current) => {
        return [comment, ...current];
      });
    });
  };
  return (
    <form className="commentAdder" onSubmit={handleSubmit}>
      <label className="commentLabel" htmlFor="commentArea">
        Add a comment{" "}
      </label>
      <textarea
        className="commentArea"
        onChange={handleChange}
        id="commentArea"
        placeholder={
          isUserLoggedIn
            ? `Leave a comment as ${user.username}`
            : "You must be logged in to leave a comment"
        }
        required
        value={commentObject.body}
      ></textarea>
      {isUserLoggedIn ? <button className="commentButton">Post</button> : null}
    </form>
  );
};

export default CommentAdder;
