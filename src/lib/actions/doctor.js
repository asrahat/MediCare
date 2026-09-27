"use server";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;



export async function getDoctorProfile(userId) {
  try {
    if (!userId) {
      return {
        success: false,
        data: null,
        message: "User ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/doctors/user/${encodeURIComponent(
        userId
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    // Profile doesn't exist yet
    if (response.status === 404) {
      return {
        success: false,
        data: null,
        profileExists: false,
        message: "Doctor profile not found",
      };
    }

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to get doctor profile"
      );
    }

    return {
      success: true,
      data: result.data,
      profileExists: true,
      message:
        result.message ||
        "Doctor profile loaded successfully",
    };
  } catch (error) {
    console.error(
      "getDoctorProfile error:",
      error
    );

    return {
      success: false,
      data: null,
      profileExists: false,
      message:
        error.message ||
        "Failed to get doctor profile",
    };
  }
}


export async function createDoctorProfile(
  userId,
  data
) {
  try {
    if (!userId) {
      return {
        success: false,
        data: null,
        message: "User ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/doctors/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,

          doctorName:
            data.doctorName || "",

          specialization:
            data.specialization || "",

          qualifications:
            Array.isArray(data.qualifications)
              ? data.qualifications
              : [],

          experience:
            Number(data.experience) || 0,

          consultationFee:
            Number(data.consultationFee) || 0,

          hospitalName:
            data.hospitalName || "",

          profileImage:
            data.profileImage || "",

          availableDays:
            Array.isArray(data.availableDays)
              ? data.availableDays
              : [],

          availableSlots:
            Array.isArray(data.availableSlots)
              ? data.availableSlots
              : [],

          verificationStatus:
            data.verificationStatus ||
            "pending",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to create doctor profile"
      );
    }

    return {
      success: true,
      data: result.data,
      message:
        result.message ||
        "Doctor profile created successfully",
    };
  } catch (error) {
    console.error(
      "createDoctorProfile error:",
      error
    );

    return {
      success: false,
      data: null,
      message:
        error.message ||
        "Failed to create doctor profile",
    };
  }
}


export async function updateDoctorProfile(
  doctorId,
  data
) {
  try {
    if (!doctorId) {
      return {
        success: false,
        data: null,
        message: "Doctor ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/doctors/${encodeURIComponent(
        doctorId
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          specialization:
            data.specialization,

          qualifications:
            Array.isArray(data.qualifications)
              ? data.qualifications
              : [],

          experience:
            Number(data.experience) || 0,

          consultationFee:
            Number(data.consultationFee) || 0,

          availableSlots:
            Array.isArray(data.availableSlots)
              ? data.availableSlots
              : [],
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to update doctor profile"
      );
    }

    return {
      success: true,
      data: result.data,
      message:
        result.message ||
        "Doctor profile updated successfully",
    };
  } catch (error) {
    console.error(
      "updateDoctorProfile error:",
      error
    );

    return {
      success: false,
      data: null,
      message:
        error.message ||
        "Failed to update doctor profile",
    };
  }
}