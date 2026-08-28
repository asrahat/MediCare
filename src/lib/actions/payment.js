"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const payment = async (data) => {
  try {
    const res = await fetch(`${SERVER_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Payment failed");
    }

    return result;
  } catch (error) {
    console.error("Payment action error:", error);
    throw error;
  }
};

export const getPayments = async (userId) => {
  try {
    const res = await fetch(`${SERVER_URL}/payments/${userId}`, {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch payments");
    }

    return result;
  } catch (error) {
    console.error("Get payments action error:", error);
    throw error;
  }
};