import { serverFetch } from "../core/server";

export const getDoctors = async (queryString = "") => {
  const url = queryString
    ? `/api/doctors?${queryString}`
    : `/api/doctors`;

  return serverFetch(url);
};

export const getDoctorById = async (doctorId) => {
  console.log("getDoctorById received:", doctorId);

  if (!doctorId) {
    console.error("Doctor ID is missing!");
    return null;
  }

  return serverFetch(`/api/doctors/${doctorId}`);
};