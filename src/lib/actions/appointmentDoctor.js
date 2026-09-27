"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export async function getDoctorAppointments(userId) {
  try {
    if (!userId) {
      return {
        success: false,
        data: [],
        message: "User ID is required",
      };
    }

  
    const doctorResponse = await fetch(
      `${SERVER_URL}/api/doctors/user/${encodeURIComponent(
        userId
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const doctorResult = await doctorResponse.json();

    console.log(
      "DOCTOR PROFILE FOR APPOINTMENTS:",
      doctorResult
    );

    if (!doctorResponse.ok) {
      return {
        success: false,
        data: [],
        message:
          doctorResult?.message ||
          "Doctor profile not found",
      };
    }

    const doctor = doctorResult?.data;

    if (!doctor?._id) {
      return {
        success: false,
        data: [],
        message: "Doctor ID not found",
      };
    }

    const doctorId = String(doctor._id);

    const response = await fetch(
      `${SERVER_URL}/appointments/doctor/${encodeURIComponent(
        doctorId
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    console.log(
      "DOCTOR APPOINTMENTS:",
      result
    );

    if (!response.ok) {
      return {
        success: false,
        data: [],
        message:
          result?.message ||
          "Failed to get doctor appointments",
      };
    }

    return {
      success: true,
      data: result?.data || [],
      doctor,
      message:
        result?.message ||
        "Doctor appointments loaded successfully",
    };
  } catch (error) {
    console.error(
      "getDoctorAppointments error:",
      error
    );

    return {
      success: false,
      data: [],
      message:
        error?.message ||
        "Failed to get doctor appointments",
    };
  }
}