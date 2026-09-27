import {
  Users,
  CalendarDays,
  CheckCircle2,
  Star,
  MessageSquare,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { getDoctorAppointments } from "@/lib/actions/appointmentDoctor";

const DoctorOverview = async () => {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const doctorUserId = session?.user?.id;

  if (!doctorUserId) {
    return (
      <div className="min-h-screen bg-[#080D19] p-6 text-white">
        <div className="rounded-2xl border border-[#243247] bg-[#111827] p-8 text-center">
          <h2 className="text-lg font-semibold">
            Please login first
          </h2>
        </div>
      </div>
    );
  }

  
  const result =
    await getDoctorAppointments(doctorUserId);

  const appointments = result?.data || [];

  
  const uniquePatients = new Set(
    appointments
      .map((appointment) =>
        String(appointment?.userId || "")
      )
      .filter(Boolean)
  );

  const distinctPatients =
    uniquePatients.size;

  const pendingRequests =
    appointments.filter(
      (appointment) =>
        String(
          appointment?.appointmentStatus || ""
        ).toLowerCase() === "pending"
    ).length;

 
  const completedAppointments =
    appointments.filter(
      (appointment) =>
        String(
          appointment?.appointmentStatus || ""
        ).toLowerCase() === "completed"
    );

 
  const feedbackAppointments =
    appointments.filter(
      (appointment) =>
        appointment?.feedback ||
        appointment?.review ||
        appointment?.rating
    );

  const feedbackCount =
    feedbackAppointments.length;

  const ratings = feedbackAppointments
    .map((appointment) =>
      Number(appointment?.rating)
    )
    .filter(
      (rating) =>
        !Number.isNaN(rating) &&
        rating > 0
    );

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce(
            (total, rating) =>
              total + rating,
            0
          ) / ratings.length
        ).toFixed(1)
      : "—";


  const testimonials =
    feedbackAppointments
      .slice()
      .sort(
        (a, b) =>
          new Date(
            b?.createdAt || 0
          ) -
          new Date(
            a?.createdAt || 0
          )
      )
      .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#080D19] px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        
        <div className="mb-7">
          <p className="text-sm font-medium text-[#00C2B5]">
            Doctor Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Overview
          </h1>

          <p className="mt-2 text-sm text-[#94A3B8]">
            A quick overview of your clinical activity.
          </p>
        </div>

        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          
          <StatCard
            icon={<Users size={22} />}
            value={distinctPatients}
            label="Distinct Patients"
          />

       
          <StatCard
            icon={<CalendarDays size={22} />}
            value={pendingRequests}
            label="Pending Requests"
          />

     
          <StatCard
            icon={<CheckCircle2 size={22} />}
            value={completedAppointments.length}
            label="Completed Consultations"
          />

          <StatCard
            icon={<MessageSquare size={22} />}
            value={feedbackCount}
            label="Feedbacks"
          />
        </div>

    
        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">

      
          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-6">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C2B5]/10">
              <Star
                size={22}
                className="text-[#00C2B5]"
              />
            </div>

            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Clinician Score
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-bold text-white">
                {averageRating}
              </span>

              {ratings.length > 0 && (
                <span className="pb-1 text-sm text-[#64748B]">
                  / 5.0
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-[#94A3B8]">
              Based on {ratings.length}{" "}
              patient rating
              {ratings.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

    
          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-6">

            <div className="mb-5">
              <h2 className="text-lg font-semibold text-white">
                Recent Patient Testimonials
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                Feedback from your patients
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="rounded-xl border border-[#243247] bg-[#0B1220] px-5 py-10 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#00C2B5]/10">
                  <MessageSquare
                    size={22}
                    className="text-[#00C2B5]"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">
                  No patient feedback yet
                </h3>

                <p className="mt-1 text-xs text-[#64748B]">
                  Patient testimonials will appear
                  here after they submit feedback.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">

                {testimonials.map(
                  (testimonial) => {
                    const patientName =
                      testimonial?.patientName ||
                      testimonial?.userName ||
                      testimonial?.name ||
                      "Patient";

                    const feedback =
                      testimonial?.feedback ||
                      testimonial?.review ||
                      "";

                    const rating =
                      Number(
                        testimonial?.rating
                      ) || 0;

                    return (
                      <div
                        key={
                          testimonial?._id
                        }
                        className="rounded-xl border border-[#243247] bg-[#0B1220] p-4"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <h3 className="text-sm font-semibold text-white">
                            {patientName}
                          </h3>

                          {rating > 0 && (
                            <div className="flex items-center gap-0.5">
                              {Array.from(
                                {
                                  length: 5,
                                }
                              ).map(
                                (_, index) => (
                                  <Star
                                    key={
                                      index
                                    }
                                    size={13}
                                    className={
                                      index <
                                      rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-[#334155]"
                                    }
                                  />
                                )
                              )}
                            </div>
                          )}
                        </div>

                        <p className="mt-3 text-sm leading-6 italic text-[#94A3B8]">
                          {feedback}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


function StatCard({
  icon,
  value,
  label,
}) {
  return (
    <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5 transition hover:border-[#00C2B5]/30">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00C2B5]/10 text-[#00C2B5]">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-0.5 text-xs text-[#94A3B8]">
            {label}
          </p>

        </div>

      </div>
    </div>
  );
}

export default DoctorOverview;