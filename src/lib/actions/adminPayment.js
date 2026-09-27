"use server";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllPayments({
  searchValue = "",
  paymentStatus = "",
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
      `${SERVER_URL}/api/admin/payments?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: [],
        total: 0,
        totalRevenue: 0,
        message:
          result?.message ||
          "Failed to load payment records",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get all payments error:",
      error
    );

    return {
      success: false,
      data: [],
      total: 0,
      totalRevenue: 0,
      message:
        error?.message ||
        "Failed to load payment records",
    };
  }
}