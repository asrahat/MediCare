"use server";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;


export async function getAllAppointments({
  searchValue = "",
  appointmentStatus = "",
  paymentStatus = "",
  limit = 100,
  offset = 0,
} = {}) {
  try {
    const params =
      new URLSearchParams();

    // Search
    if (searchValue?.trim()) {
      params.append(
        "search",
        searchValue.trim()
      );
    }

    // Appointment status
    if (appointmentStatus) {
      params.append(
        "appointmentStatus",
        appointmentStatus
      );
    }

    // Payment status
    if (paymentStatus) {
      params.append(
        "paymentStatus",
        paymentStatus
      );
    }

    params.append(
      "limit",
      String(limit)
    );

    params.append(
      "offset",
      String(offset)
    );

    const response = await fetch(
      `${SERVER_URL}/api/admin/appointments?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: [],
        total: 0,
        message:
          result?.message ||
          "Failed to load appointments",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get all appointments error:",
      error
    );

    return {
      success: false,
      data: [],
      total: 0,
      message:
        error?.message ||
        "Failed to load appointments",
    };
  }
}