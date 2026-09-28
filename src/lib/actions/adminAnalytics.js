"use server";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAdminAnalytics() {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/admin/analytics`,
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
        data: {
          totalPatients: 0,
          totalDoctors: 0,
          totalAppointments: 0,
          overallRating: 0,
          doctorPerformance: [],
        },
        message:
          result?.message ||
          "Failed to load analytics",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get admin analytics error:",
      error
    );

    return {
      success: false,
      data: {
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        overallRating: 0,
        doctorPerformance: [],
      },
      message:
        error?.message ||
        "Failed to load analytics",
    };
  }
}