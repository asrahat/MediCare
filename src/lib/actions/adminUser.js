"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;



async function checkAdmin() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
    throw new Error(
      "You are not logged in."
    );
  }

  if (
    session.user.role !== "admin"
  ) {
    throw new Error(
      "Unauthorized. Admin access required."
    );
  }

  return session;
}


export async function getAllUsers({
  searchValue = "",
  limit = 100,
  offset = 0,
} = {}) {
  try {
    await checkAdmin();

    const params =
      new URLSearchParams();

    if (searchValue?.trim()) {
      params.append(
        "search",
        searchValue.trim()
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

    const response =
      await fetch(
        `${SERVER_URL}/api/admin/users?${params.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

    const result =
      await response.json();

    console.log(
      "GET USERS RESULT:",
      result
    );

    if (!response.ok) {
      return {
        success: false,
        data: [],
        total: 0,
        message:
          result?.message ||
          "Failed to load users",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get all users error:",
      error
    );

    return {
      success: false,
      data: [],
      total: 0,
      message:
        error?.message ||
        "Failed to load users",
    };
  }
}


export async function suspendUser(
  userId
) {
  try {
    if (!userId) {
      return {
        success: false,
        message:
          "User ID is required",
      };
    }

    const session =
      await checkAdmin();

    // Prevent self suspension
    if (
      String(session.user.id) ===
      String(userId)
    ) {
      return {
        success: false,
        message:
          "You cannot suspend your own admin account.",
      };
    }

    console.log(
      "Calling suspend API:",
      userId
    );

    const response =
      await fetch(
        `${SERVER_URL}/api/admin/users/${encodeURIComponent(
          userId
        )}/suspend`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
        }
      );

    const result =
      await response.json();

    console.log(
      "SUSPEND API RESULT:",
      result
    );

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to suspend user",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Suspend user error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to suspend user",
    };
  }
}



export async function unsuspendUser(
  userId
) {
  try {
    if (!userId) {
      return {
        success: false,
        message:
          "User ID is required",
      };
    }

    await checkAdmin();

    const response =
      await fetch(
        `${SERVER_URL}/api/admin/users/${encodeURIComponent(
          userId
        )}/unsuspend`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
        }
      );

    const result =
      await response.json();

    console.log(
      "UNSUSPEND API RESULT:",
      result
    );

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to unsuspend user",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Unsuspend user error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to unsuspend user",
    };
  }
}

export async function deleteUser(
  userId
) {
  try {
    if (!userId) {
      return {
        success: false,
        message:
          "User ID is required",
      };
    }

    const session =
      await checkAdmin();

    // Prevent self deletion
    if (
      String(session.user.id) ===
      String(userId)
    ) {
      return {
        success: false,
        message:
          "You cannot delete your own admin account.",
      };
    }

    console.log(
      "Calling delete API:",
      userId
    );

    const response =
      await fetch(
        `${SERVER_URL}/api/admin/users/${encodeURIComponent(
          userId
        )}`,
        {
          method: "DELETE",
          cache: "no-store",
        }
      );

    const result =
      await response.json();

    console.log(
      "DELETE API RESULT:",
      result
    );

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to delete user",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Delete user error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Failed to delete user",
    };
  }
}J