'use server'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export async function getDoctors(queryString = "") {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/doctors?${queryString}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    console.log("GET DOCTORS RESPONSE:", result);

    if (!response.ok) {
      console.error(
        "Failed to get doctors:",
        result?.message
      );

      return {
        doctors: [],
        total: 0,
      };
    }

    return {
      doctors: result?.doctors || result?.data || [],
      total: result?.total || 0,
    };
  } catch (error) {
    console.error("getDoctors error:", error);

    return {
      doctors: [],
      total: 0,
    };
  }
}



export async function getDoctorById(id) {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/doctors/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    console.log("GET DOCTOR RESPONSE:", result);

    if (!response.ok) {
      console.error(
        "Failed to get doctor:",
        result?.message
      );

      return null;
    }

    return result?.data || null;
  } catch (error) {
    console.error("getDoctorById error:", error);

    return null;
  }
}