"use server";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;


export async function createAppointment(data) {
  try {
    const response = await fetch(
      `${SERVER_URL}/appointments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to create appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "createAppointment error:",
      error
    );

    return {
      success: false,
      data: null,
      message:
        error?.message ||
        "Failed to create appointment",
    };
  }
}

export async function getAppointments(userId) {
  try {
    if (!userId) {
      return {
        success: false,
        data: [],
        message: "User ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/appointments/user/${encodeURIComponent(
        userId
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to get appointments"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "getAppointments error:",
      error
    );

    return {
      success: false,
      data: [],
      message:
        error?.message ||
        "Failed to get appointments",
    };
  }
}


export async function getAppointment(id) {
  try {
    if (!id) {
      return {
        success: false,
        data: null,
        message: "Appointment ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/appointments/${encodeURIComponent(
        id
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to get appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "getAppointment error:",
      error
    );

    return {
      success: false,
      data: null,
      message:
        error?.message ||
        "Failed to get appointment",
    };
  }
}

export async function acceptAppointment(id) {
  try {
    const response = await fetch(
      `${SERVER_URL}/appointments/${encodeURIComponent(
        id
      )}/accept`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to accept appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "acceptAppointment error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to accept appointment",
    };
  }
}


export async function rejectAppointment(id) {
  try {
    const response = await fetch(
      `${SERVER_URL}/appointments/${encodeURIComponent(
        id
      )}/reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to reject appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "rejectAppointment error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to reject appointment",
    };
  }
}


export async function completeAppointment(id) {
  try {
    const response = await fetch(
      `${SERVER_URL}/appointments/${encodeURIComponent(
        id
      )}/complete`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to complete appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "completeAppointment error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to complete appointment",
    };
  }
}


export async function rescheduleAppointment(
  id,
  data
) {
  try {
    const response = await fetch(
      `${SERVER_URL}/appointments/${encodeURIComponent(
        id
      )}/reschedule`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to reschedule appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "rescheduleAppointment error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to reschedule appointment",
    };
  }
}


export async function cancelAppointment(id) {
  try {
    const response = await fetch(
      `${SERVER_URL}/appointments/${encodeURIComponent(
        id
      )}/cancel`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to cancel appointment"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "cancelAppointment error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to cancel appointment",
    };
  }
}