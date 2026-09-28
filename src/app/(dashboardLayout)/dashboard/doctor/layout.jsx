import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Doctor Dashboard",
  description:
    "Manage your appointments, patients, availability, and medical profile in Medi-Care.",
};

export default async function DoctorLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "doctor") {
    redirect("/dashboard");
  }

  return children;
}