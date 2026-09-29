
"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getDoctors(queryString = "") {
  try {
    const url = `${SERVER_URL}/api/doctors?${queryString}`;

    console.log("SERVER_URL:", SERVER_URL);
    console.log("DOCTORS API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    console.log("DOCTORS STATUS:", response.status);
    console.log("DOCTORS RESPONSE:", result);

    if (!response.ok) {
      console.error(
        "Failed to get doctors:",
        result?.message
      );

      return {
        doctors: [],
        total: 0,
        page: 1,
        perPage: 8,
      };
    }

    return {
      doctors: result?.doctors || [],
      total: result?.total || 0,
      page: result?.page || 1,
      perPage: result?.perPage || 8,
    };
  } catch (error) {
    console.error("getDoctors error:", error);

    return {
      doctors: [],
      total: 0,
      page: 1,
      perPage: 8,
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

    if (!response.ok) {
      return null;
    }

    return result?.data || result?.doctor || null;
  } catch (error) {
    console.error("getDoctorById error:", error);

    return null;
  }
}
