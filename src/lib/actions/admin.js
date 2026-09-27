"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function makeUserAdmin(userId) {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const result = await auth.api.setRole({
      body: {
        userId,
        role: "admin",
      },
      headers: await headers(),
    });

    return {
      success: true,
      data: result,
      message: "User is now an admin",
    };
  } catch (error) {
    console.error("Make admin error:", error);

    return {
      success: false,
      message:
        error?.message || "Failed to make user admin",
    };
  }
}