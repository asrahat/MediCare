"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export async function getPrescriptionByAppointment(
  appointmentId
) {
  try {
    if (!appointmentId) {
      return {
        success: false,
        data: null,
        exists: false,
        message: "Appointment ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/prescriptions/appointment/${encodeURIComponent(
        appointmentId
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    // No prescription yet
    if (response.status === 404) {
      return {
        success: true,
        data: null,
        exists: false,
        message: "Prescription not found",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        data: null,
        exists: false,
        message:
          result?.message ||
          "Failed to get prescription",
      };
    }

    return {
      success: true,
      data: result?.data || null,
      exists: true,
      message:
        result?.message ||
        "Prescription loaded successfully",
    };
  } catch (error) {
    console.error(
      "getPrescriptionByAppointment error:",
      error
    );

    return {
      success: false,
      data: null,
      exists: false,
      message:
        error?.message ||
        "Failed to get prescription",
    };
  }
}


export async function createPrescription(data) {
  try {
    if (!data?.appointmentId) {
      return {
        success: false,
        data: null,
        message: "Appointment ID is required",
      };
    }

    if (!data?.doctorId) {
      return {
        success: false,
        data: null,
        message: "Doctor ID is required",
      };
    }

    if (!data?.patientId) {
      return {
        success: false,
        data: null,
        message: "Patient ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/prescriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message:
          result?.message ||
          "Failed to create prescription",
      };
    }

    return {
      success: true,
      data: result?.data || null,
      message:
        result?.message ||
        "Prescription created successfully",
    };
  } catch (error) {
    console.error(
      "createPrescription error:",
      error
    );

    return {
      success: false,
      data: null,
      message:
        error?.message ||
        "Failed to create prescription",
    };
  }
}

export async function updatePrescription(
  prescriptionId,
  data
) {
  try {
    if (!prescriptionId) {
      return {
        success: false,
        data: null,
        message: "Prescription ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/api/prescriptions/${encodeURIComponent(
        prescriptionId
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message:
          result?.message ||
          "Failed to update prescription",
      };
    }

    return {
      success: true,
      data: result?.data || null,
      message:
        result?.message ||
        "Prescription updated successfully",
    };
  } catch (error) {
    console.error(
      "updatePrescription error:",
      error
    );

    return {
      success: false,
      data: null,
      message:
        error?.message ||
        "Failed to update prescription",
    };
  }
}