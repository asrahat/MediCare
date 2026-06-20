import { serverFetch } from "../core/server";

export const getDoctors = async (queryString = "") => {

  const url = queryString
    ? `/api/doctors?${queryString}`
    : `/api/doctors`;

  return serverFetch(url);
};


export const getDoctorById = async (doctorId) => {
  return serverFetch(`/api/doctors/${doctorId}`);
};