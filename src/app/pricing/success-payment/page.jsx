import { payment } from "@/lib/actions/payment";
import { createAppointment } from "@/lib/actions/appointment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function Success({
  searchParams,
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id (`cs_test_...`)"
    );
  }

  const session =
    await stripe.checkout.sessions.retrieve(
      session_id
    );

  if (session.status === "open") {
    redirect("/");
  }

  if (session.status !== "complete") {
    redirect("/");
  }

  const metadata = session.metadata;

  const paymentStatus =
    session.payment_status;

  let paymentResult;

  try {
    paymentResult = await payment({
      ...metadata,

      session_id,

      status: paymentStatus,
    });

    console.log(
      "Payment saved:",
      paymentResult
    );
  } catch (error) {

    console.error(
      "Payment save error:",
      error
    );
  }


  try {
    const appointmentResult =
      await createAppointment({
        userId: metadata.userId,

        doctorId: metadata.doctorId,

        doctorName: metadata.doctorName,

        specialization:
          metadata.specialization,

        hospitalName:
          metadata.hospitalName,

        date: metadata.date,

        availableSlot:
          metadata.availableSlot,

        symptoms:
          metadata.symptoms,

        consultationFee:
          Number(
            metadata.consultationFee
          ),

        paymentStatus:
          paymentStatus,

        appointmentStatus:
          "confirmed",

        session_id,
      });

    console.log(
      "Appointment created:",
      appointmentResult
    );
  } catch (error) {
    console.error(
      "Appointment creation error:",
      error
    );
  }


  redirect(
    "/dashboard/patient/appointments"
  );
}