"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getDoctorSchedules = async (doctorId) => {
  try {
    if (!doctorId) {
      throw new Error("Doctor ID is required");
    }

    const res = await fetch(
      `${SERVER_URL}/api/schedules/doctor/${doctorId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to fetch schedules"
      );
    }

    return result;
  } catch (error) {
    console.error("Get doctor schedules error:", error);
    throw error;
  }
};

export const createSchedule = async (data) => {
  try {
    const res = await fetch(`${SERVER_URL}/api/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to create schedule"
      );
    }

    return result;
  } catch (error) {
    console.error("Create schedule error:", error);
    throw error;
  }
};

export const updateSchedule = async (id, data) => {
  try {
    const res = await fetch(
      `${SERVER_URL}/api/schedules/${id}`,
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
        result?.message || "Failed to update schedule"
      );
    }

    return result;
  } catch (error) {
    console.error("Update schedule error:", error);
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  try {
    const res = await fetch(
      `${SERVER_URL}/api/schedules/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to delete schedule"
      );
    }

    return result;
  } catch (error) {
    console.error("Delete schedule error:", error);
    throw error;
  }
};