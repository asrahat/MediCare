import {
  serverFetch,
  serverMutation,
} from "../core/server";

export const getReviews = async () => {
  return serverFetch("/api/reviews");
};

export const createReview = async (data) => {
  return serverMutation(
    "/api/reviews",
    data,
    "POST"
  );
};

export const updateReview = async (id, data) => {
  return serverMutation(
    `/api/reviews/${id}`,
    data,
    "PATCH"
  );
};

export const deleteReview = async (id) => {
  return serverMutation(
    `/api/reviews/${id}`,
    {},
    "DELETE"
  );
};