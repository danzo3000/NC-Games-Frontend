import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://backend-project-nc-games.onrender.com/api",
});

export const getReviews = () => {
  return ncGamesApi.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};

export const getReviewById = (review_id) => {
  return ncGamesApi.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const getCommentsByReviewId = (review_id) => {
  return ncGamesApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchVotesUp = (review_id, num) => {
  return ncGamesApi
    .patch(`/reviews/${review_id}`, { inc_votes: num })
    .then(({ data }) => {
      return data.review;
    });
};
