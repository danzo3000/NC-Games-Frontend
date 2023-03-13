import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../utils/api";
import { useState } from "react";

const SingleReview = ({ isLoading, setIsLoading }) => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((review) => {
      setIsLoading(false);
      setSingleReview(review);
    });
  }, []);

  if (isLoading) {
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
        <p>{singleReview.comment_count} comments</p>
        {singleReview.votes === 1 ? (
          <p>{singleReview.votes} vote</p>
        ) : (
          <p>{singleReview.votes} votes</p>
        )}
      </section>
    );
  }
};

export default SingleReview;
