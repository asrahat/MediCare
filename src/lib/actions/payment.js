"use server";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;


export async function payment(data) {
  try {
    const response = await fetch(
      `${SERVER_URL}/payment`,
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
      throw new Error(
        result?.message ||
          "Payment failed"
      );
    }

    return result;
  } catch (error) {
    console.error(
      "Payment error:",
      error
    );

    return {
      success: false,
      data: null,
      message:
        error?.message ||
        "Payment failed",
    };
  }
}


export async function getPayments(userId) {
  try {
    if (!userId) {
      return {
        success: false,
        data: [],
        message: "User ID is required",
      };
    }

    const response = await fetch(
      `${SERVER_URL}/payment/user/${encodeURIComponent(
        String(userId)
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    console.log(
      "PAYMENT HISTORY RESPONSE:",
      result
    );

    if (!response.ok) {
      return {
        success: false,
        data: [],
        message:
          result?.message ||
          "Failed to get payment history",
      };
    }

    return {
      success: true,
      data: result?.data || [],
      message:
        result?.message ||
        "Payment history loaded successfully",
    };
  } catch (error) {
    console.error(
      "getPayments error:",
      error
    );

    return {
      success: false,
      data: [],
      message:
        error?.message ||
        "Failed to get payment history",
    };
  }
}