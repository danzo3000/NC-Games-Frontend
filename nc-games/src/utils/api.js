import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://backend-project-nc-games.onrender.com/api",
});

export const getReviews = (category_slug) => {
  let path = `/reviews`;

  return ncGamesApi
    .get(path, { params: { category_slug: category_slug } })
    .then(({ data }) => {
      console.log(data);
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

export const getUsers = () => {
  return ncGamesApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const postComment = (commentObject, review_id) => {
  console.log(commentObject);
  return ncGamesApi
    .post(`/reviews/${review_id}/comments`, commentObject)
    .then(({ data }) => {
      return data.comment;
    });
};

export const getCategories = () => {
  return ncGamesApi.get("/categories").then(({ data }) => {
    return data.categories;
  });
};
