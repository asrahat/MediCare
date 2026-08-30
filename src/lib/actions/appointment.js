"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export const createAppointment = async (data) => {
  try {
    const res = await fetch(`${SERVER_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to create appointment"
      );
    }

    return result;
  } catch (error) {
    console.error("Create appointment action error:", error);
    throw error;
  }
};

export const getAppointments = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

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
    console.error("Get appointments action error:", error);
    throw error;
  }
};



export const getAppointment = async (id) => {
  try {
    if (!id) {
      throw new Error("Appointment ID is required");
    }

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
    console.error("Get appointment action error:", error);
    throw error;
  }
};


export const rescheduleAppointment = async (id, data) => {
  try {
    if (!id) {
      throw new Error("Appointment ID is required");
    }

    const res = await fetch(
      `${SERVER_URL}/appointments/${id}/reschedule`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to reschedule appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "Reschedule appointment action error:",
      error
    );

    throw error;
  }
};


export const cancelAppointment = async (id) => {
  try {
    if (!id) {
      throw new Error("Appointment ID is required");
    }

    const res = await fetch(
      `${SERVER_URL}/appointments/${id}/cancel`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to cancel appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "Cancel appointment action error:",
      error
    );

    throw error;
  }
};