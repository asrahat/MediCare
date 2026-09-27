"use server";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;



export async function getAllDoctors({
  searchValue = "",
  verificationStatus = "",
  limit = 100,
  offset = 0,
} = {}) {
  try {
    const params = new URLSearchParams();

    if (searchValue?.trim()) {
      params.append(
        "search",
        searchValue.trim()
      );
    }

    if (verificationStatus) {
      params.append(
        "verificationStatus",
        verificationStatus
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
      `${SERVER_URL}/api/admin/doctors?${params.toString()}`,
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
          "Failed to load doctors",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get all doctors error:",
      error
    );

    return {
      success: false,
      data: [],
      total: 0,
      message:
        error?.message ||
        "Failed to load doctors",
    };
  }
}


export async function verifyDoctor(
  doctorId
) {
  try {
    if (!doctorId) {
      return {
        success: false,
        message:
          "Doctor ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/admin/doctors/${doctorId}/verify`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to verify doctor",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Verify doctor error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to verify doctor",
    };
  }
}



export async function rejectDoctor(
  doctorId
) {
  try {
    if (!doctorId) {
      return {
        success: false,
        message:
          "Doctor ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/admin/doctors/${doctorId}/reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to reject doctor",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Reject doctor error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to reject doctor",
    };
  }
}

export async function cancelDoctorVerification(
  doctorId
) {
  try {
    if (!doctorId) {
      return {
        success: false,
        message:
          "Doctor ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/admin/doctors/${doctorId}/cancel-verification`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to cancel verification",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Cancel verification error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to cancel verification",
    };
  }
}