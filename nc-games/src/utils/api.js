import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://backend-project-nc-games.onrender.com/api",
});

export const getReviews = () => {
  return ncGamesApi.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};
