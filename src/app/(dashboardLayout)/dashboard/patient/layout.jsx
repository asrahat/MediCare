import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Patient Dashboard",
  description:
    "Manage your appointments, payments, doctors, and healthcare information in Medi-Care.",
};

export default async function PatientLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "patient") {
    redirect("/dashboard");
  }

  return children;
}