import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();

    const origin =
      headersList.get("origin") ||
      process.env.NEXT_PUBLIC_BASE_URL;

    const formData = await request.formData();

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    if (!user?.id) {
      return NextResponse.json(
        {
          error: "Please login first",
        },
        { status: 401 }
      );
    }

    const doctorId = formData.get("doctorId");
    const doctorName = formData.get("doctorName");
    const specialization = formData.get("specialization");
    const hospitalName = formData.get("hospitalName");

    const consultationFee = formData.get(
      "consultationFee"
    );

    const date = formData.get("date");

    const availableSlot = formData.get(
      "availableSlot"
    );

    const symptoms = formData.get("symptoms");

    if (!doctorId) {
      return NextResponse.json(
        { error: "Doctor ID is required" },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: "Appointment date is required" },
        { status: 400 }
      );
    }

    if (!availableSlot) {
      return NextResponse.json(
        { error: "Appointment slot is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: `Appointment with ${doctorName}`,
            },

            unit_amount:
              Number(consultationFee) * 100,
          },

          quantity: 1,
        },
      ],

      metadata: {
        userId: String(user.id),

        doctorId: String(doctorId),

        doctorName: String(doctorName),

        specialization: String(
          specialization || ""
        ),

        hospitalName: String(
          hospitalName || ""
        ),

        date: String(date),

        availableSlot: String(
          availableSlot
        ),

        symptoms: String(
          symptoms || ""
        ),

        consultationFee: String(
          consultationFee
        ),
      },

      mode: "payment",

      success_url:
        `${origin}/pricing/success-payment` +
        `?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${origin}/dashboard/patient/doctors`,
    });

    return NextResponse.redirect(
      session.url,
      303
    );
  } catch (err) {
    console.error(
      "Stripe checkout error:",
      err
    );

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}