import { serverFetch } from "../core/server";

export const getDoctors = async (queryString = "") => {
  const url = queryString
    ? `/api/doctors?${queryString}`
    : `/api/doctors`;

  return serverFetch(url);
};

export const getDoctorById = async (doctorId) => {
  const result = await serverFetch(`/api/doctors/${doctorId}`);

  return result?.data || null;
};