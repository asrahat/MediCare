"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAppointments = async (userId) => {
  try {
    const res = await fetch(
      `${SERVER_URL}/appointments/user/${userId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to fetch appointments"
      );
    }

    return result;
  } catch (error) {
    console.error("Get appointments error:", error);
    throw error;
  }
};

// ---------
export const getAppointment = async (id) => {
  try {
    const res = await fetch(
      `${SERVER_URL}/appointments/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to fetch appointment"
      );
    }

    return result;
  } catch (error) {
    console.error("Get appointment error:", error);
    throw error;
  }
};