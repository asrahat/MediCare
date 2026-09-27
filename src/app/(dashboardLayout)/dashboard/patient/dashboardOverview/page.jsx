"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  CreditCard,
  MessageSquareText,
  RefreshCw,
  Stethoscope,
  CheckCircle2,
  XCircle,
  CalendarClock,
  Loader2,
  UserRound,
} from "lucide-react";

import { serverFetch } from "@/lib/core/server";
import { getAppointments } from "@/lib/actions/appointment";
import { getReviews } from "@/lib/api/reviews";


const getArrayFromResponse = (response, keys = []) => {
  if (Array.isArray(response)) return response;

  if (!response || typeof response !== "object") {
    return [];
  }

  for (const key of keys) {
    if (Array.isArray(response[key])) {
      return response[key];
    }
  }

  return [];
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatShortDate = (date) => {
  if (!date) {
    return {
      day: "--",
      month: "---",
    };
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return {
      day: "--",
      month: "---",
    };
  }

  return {
    day: parsedDate.getDate(),
    month: parsedDate.toLocaleDateString("en-US", {
      month: "short",
    }),
  };
};

const formatCurrency = (amount) => {
  const value = Number(amount || 0);

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
};

const getAppointmentStatus = (appointment) => {
  const status = String(
    appointment?.appointmentStatus ||
      appointment?.status ||
      ""
  ).toLowerCase();

  if (status === "cancelled" || status === "canceled") {
    return "cancelled";
  }

  if (status === "completed") {
    return "completed";
  }

  if (status === "rescheduled") {
    return "rescheduled";
  }

  return "confirmed";
};

// Prevent "Dr. Dr. Ava White"
const getDoctorName = (name) => {
  if (!name) return "Doctor";

  const doctorName = String(name).trim();

  if (/^dr\.?\s/i.test(doctorName)) {
    return doctorName;
  }

  return `Dr. ${doctorName}`;
};


export default function DashboardOverview({ userId }) {
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");


  const loadDashboard = useCallback(
    async (isRefresh = false) => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setError("");

        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const [
          appointmentsResponse,
          paymentsResponse,
          reviewsResponse,
        ] = await Promise.all([
          getAppointments(userId),
          serverFetch(`/payments/${userId}`),
          getReviews(),
        ]);

        const appointmentData = getArrayFromResponse(
          appointmentsResponse,
          ["data", "appointments", "result"]
        );

        const paymentData = getArrayFromResponse(
          paymentsResponse,
          ["data", "payments", "result"]
        );

        const reviewData = getArrayFromResponse(
          reviewsResponse,
          ["data", "reviews", "result"]
        );

        setAppointments(appointmentData);
        setPayments(paymentData);
        setReviews(reviewData);
      } catch (err) {
        console.error("Dashboard loading error:", err);

        setError(
          err?.message ||
            "Failed to load dashboard information."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const {
    upcomingAppointments,
    historyAppointments,
  } = useMemo(() => {
    const now = new Date();

    const upcoming = [];
    const history = [];

    appointments.forEach((appointment) => {
      const status = getAppointmentStatus(appointment);

      const appointmentDate = new Date(
        appointment?.date ||
          appointment?.appointmentDate
      );

      const isValidDate = !Number.isNaN(
        appointmentDate.getTime()
      );

      if (
        status === "cancelled" ||
        status === "completed" ||
        (isValidDate && appointmentDate < now)
      ) {
        history.push(appointment);
      } else {
        upcoming.push(appointment);
      }
    });

    upcoming.sort((a, b) => {
      const dateA = new Date(
        a?.date || a?.appointmentDate
      );

      const dateB = new Date(
        b?.date || b?.appointmentDate
      );

      return dateA - dateB;
    });

    history.sort((a, b) => {
      const dateA = new Date(
        a?.date || a?.appointmentDate
      );

      const dateB = new Date(
        b?.date || b?.appointmentDate
      );

      return dateB - dateA;
    });

    return {
      upcomingAppointments: upcoming,
      historyAppointments: history,
    };
  }, [appointments]);

  
  const totalPayments = useMemo(() => {
    return payments.reduce((total, payment) => {
      const amount =
        payment?.consultationFee ||
        payment?.amount ||
        payment?.amountPaid ||
        0;

      return total + Number(amount);
    }, 0);
  }, [payments]);


  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#080D19]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123B3A]">
            <Loader2 className="h-7 w-7 animate-spin text-[#00A99D]" />
          </div>

          <p className="text-sm text-[#94A3B8]">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-2xl border border-[#4C2730] bg-[#24151B] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3A1D26]">
            <XCircle className="h-5 w-5 text-[#FB7185]" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white">
              Unable to load dashboard
            </h3>

            <p className="mt-1 text-sm text-[#FDA4AF]">
              {error}
            </p>

            <button
              onClick={() => loadDashboard(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#00A99D] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#008F85]"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-full w-full bg-[#080D19] text-white">
      <div className="mx-auto w-full max-w-[1100px] space-y-7 px-1 py-1 sm:px-0">

   
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00A99D]" />

              <span className="text-[13px] font-semibold text-[#00C2B5]">
                Patient Dashboard
              </span>
            </div>

            <h1 className="text-[28px] font-bold leading-tight tracking-[-0.5px] text-white">
              Welcome back!
            </h1>

            <p className="mt-1.5 text-[13px] text-[#94A3B8]">
              Here&apos;s an overview of your healthcare
              activity.
            </p>
          </div>

          <button
            onClick={() => loadDashboard(true)}
            disabled={refreshing}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#29404F] bg-[#111827] px-4 text-[13px] font-medium text-[#CBD5E1] shadow-sm transition hover:border-[#00A99D] hover:bg-[#162033] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 text-[#00A99D] ${
                refreshing ? "animate-spin" : ""
              }`}
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

 
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Appointments"
            value={appointments.length}
            description={
              <>
                All your
                <br />
                appointments
              </>
            }
            icon={CalendarDays}
          />

          <StatCard
            title="Upcoming"
            value={upcomingAppointments.length}
            description={
              <>
                Appointments
                <br />
                coming up
              </>
            }
            icon={CalendarClock}
          />

          <StatCard
            title="Total Payments"
            value={formatCurrency(totalPayments)}
            description={
              <>
                Total consultation
                <br />
                payments
              </>
            }
            icon={CreditCard}
          />

          <StatCard
            title="Doctor Reviews"
            value={reviews.length}
            description={
              <>
                Reviews
                <br />
                submitted
              </>
            }
            icon={MessageSquareText}
          />

        </div>

    
        <section>
          <SectionHeader
            icon={CalendarClock}
            title="Upcoming Appointments"
            description="Your next scheduled consultations"
            count={upcomingAppointments.length}
          />

          {upcomingAppointments.length > 0 ? (
            <div className="grid gap-3.5 lg:grid-cols-2">
              {upcomingAppointments
                .slice(0, 6)
                .map((appointment, index) => (
                  <UpcomingAppointment
                    key={
                      appointment?._id ||
                      appointment?.id ||
                      `upcoming-${index}`
                    }
                    appointment={appointment}
                  />
                ))}
            </div>
          ) : (
            <EmptyState
              icon={CalendarDays}
              title="No upcoming appointments"
              description="You don't have any upcoming appointments at the moment."
            />
          )}
        </section>

   
        <section>
          <SectionHeader
            icon={Clock3}
            title="Appointment History"
            description="Your previous consultations"
            count={historyAppointments.length}
          />

          {historyAppointments.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">
              <div className="divide-y divide-[#243247]">
                {historyAppointments
                  .slice(0, 5)
                  .map((appointment, index) => (
                    <HistoryAppointment
                      key={
                        appointment?._id ||
                        appointment?.id ||
                        `history-${index}`
                      }
                      appointment={appointment}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Clock3}
              title="No appointment history"
              description="Your completed or past appointments will appear here."
            />
          )}
        </section>


        <div className="grid gap-5 xl:grid-cols-2">

          {/* Payments */}

          <section>
            <SectionHeader
              icon={CreditCard}
              title="Recent Payments"
              description="Your latest consultation payments"
              count={payments.length}
            />

            <div className="overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">
              {payments.length > 0 ? (
                <div className="divide-y divide-[#243247]">
                  {payments
                    .slice(0, 5)
                    .map((payment, index) => (
                      <PaymentItem
                        key={
                          payment?._id ||
                          payment?.id ||
                          `payment-${index}`
                        }
                        payment={payment}
                      />
                    ))}
                </div>
              ) : (
                <EmptyState
                  icon={CreditCard}
                  title="No payments yet"
                  description="Your payment history will appear here."
                />
              )}
            </div>
          </section>

          {/* Reviews */}

          <section>
            <SectionHeader
              icon={MessageSquareText}
              title="Doctor Reviews"
              description="Your latest doctor reviews"
              count={reviews.length}
            />

            <div className="overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">
              {reviews.length > 0 ? (
                <div className="divide-y divide-[#243247]">
                  {reviews
                    .slice(0, 5)
                    .map((review, index) => (
                      <ReviewItem
                        key={
                          review?._id ||
                          review?.id ||
                          `review-${index}`
                        }
                        review={review}
                      />
                    ))}
                </div>
              ) : (
                <EmptyState
                  icon={MessageSquareText}
                  title="No reviews yet"
                  description="Your doctor reviews will appear here."
                />
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="group min-h-[145px] rounded-2xl border border-[#243247] bg-[#111827] p-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-[#00A99D] hover:bg-[#162033] hover:shadow-[0_8px_25px_rgba(0,169,157,0.08)]">

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <p className="text-[13px] leading-5 text-[#94A3B8]">
            {title}
          </p>

          <h2 className="mt-1.5 text-[23px] font-bold leading-7 tracking-tight text-white">
            {value}
          </h2>

          <p className="mt-1.5 text-[11px] leading-4 text-[#64748B]">
            {description}
          </p>

        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123B3A]">
          <Icon className="h-[18px] w-[18px] text-[#00C2B5]" />
        </div>

      </div>
    </div>
  );
}


function SectionHeader({
  icon: Icon,
  title,
  description,
  count,
}) {
  return (
    <div className="mb-3.5 flex items-center justify-between gap-4">

      <div className="flex min-w-0 items-center gap-2.5">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#123B3A]">
          <Icon className="h-[17px] w-[17px] text-[#00C2B5]" />
        </div>

        <div className="min-w-0">

          <h2 className="text-[15px] font-semibold leading-5 text-white">
            {title}
          </h2>

          <p className="mt-0.5 text-[11px] text-[#64748B]">
            {description}
          </p>

        </div>
      </div>

      <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-[#123B3A] px-2 text-[11px] font-semibold text-[#00C2B5]">
        {count}
      </span>

    </div>
  );
}


function UpcomingAppointment({ appointment }) {
  const date = formatShortDate(
    appointment?.date ||
      appointment?.appointmentDate
  );

  const status = getAppointmentStatus(appointment);

  return (
    <div className="group rounded-2xl border border-[#243247] bg-[#111827] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition duration-200 hover:border-[#00A99D] hover:bg-[#162033] hover:shadow-[0_8px_25px_rgba(0,169,157,0.07)]">

      <div className="flex gap-3.5">

        {/* Date */}

        <div className="flex h-[68px] w-[60px] shrink-0 flex-col items-center justify-center rounded-xl bg-[#123B3A] text-[#00C2B5]">

          <span className="text-[22px] font-bold leading-6">
            {date.day}
          </span>

          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide">
            {date.month}
          </span>

        </div>

     
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-start justify-between gap-2">

            <div className="min-w-0">

              <h3 className="truncate text-[14px] font-semibold text-white">
                {getDoctorName(appointment?.doctorName)}
              </h3>

              <p className="mt-0.5 truncate text-[12px] font-medium text-[#00C2B5]">
                {appointment?.specialization ||
                  "Medical Specialist"}
              </p>

            </div>

            <StatusBadge status={status} />

          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-[#94A3B8]">

            <div className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-[#00A99D]" />

              <span>
                {appointment?.availableSlot ||
                  appointment?.time ||
                  "Time not specified"}
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-1.5">

              <Stethoscope className="h-3.5 w-3.5 shrink-0 text-[#00A99D]" />

              <span className="truncate">
                {appointment?.hospitalName ||
                  "Hospital not specified"}
              </span>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}


function HistoryAppointment({ appointment }) {
  const status = getAppointmentStatus(appointment);

  return (
    <div className="flex flex-col gap-3.5 p-4 transition hover:bg-[#162033] sm:flex-row sm:items-center">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123B3A]">
        <Stethoscope className="h-[18px] w-[18px] text-[#00C2B5]" />
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="truncate text-[14px] font-medium text-white">
          {getDoctorName(appointment?.doctorName)}
        </h3>

        <p className="mt-0.5 text-[12px] text-[#94A3B8]">
          {appointment?.specialization ||
            "Medical Specialist"}
        </p>

      </div>

      <div className="flex flex-wrap items-center gap-3.5 text-[12px]">

        <div className="flex items-center gap-1.5 text-[#94A3B8]">

          <CalendarDays className="h-3.5 w-3.5 text-[#00A99D]" />

          <span>
            {formatDate(
              appointment?.date ||
                appointment?.appointmentDate
            )}
          </span>

        </div>

        <StatusBadge status={status} />

      </div>
    </div>
  );
}


function PaymentItem({ payment }) {
  const amount =
    payment?.consultationFee ||
    payment?.amount ||
    payment?.amountPaid ||
    0;

  return (
    <div className="flex items-center gap-3.5 p-4 transition hover:bg-[#162033]">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123B3A]">
        <CreditCard className="h-[18px] w-[18px] text-[#00C2B5]" />
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="truncate text-[14px] font-medium text-white">
          {getDoctorName(payment?.doctorName)}
        </h3>

        <p className="mt-0.5 text-[11px] text-[#64748B]">
          {formatDate(
            payment?.date ||
              payment?.createdAt ||
              payment?.paymentDate
          )}
        </p>

      </div>

      <div className="text-right">

        <p className="text-[13px] font-semibold text-white">
          {formatCurrency(amount)}
        </p>

        <span className="text-[10px] font-semibold text-[#34D399]">
          {payment?.paymentStatus || "Paid"}
        </span>

      </div>
    </div>
  );
}


function ReviewItem({ review }) {
  const rating = Math.min(
    5,
    Math.max(0, Number(review?.rating || 0))
  );

  return (
    <div className="p-4 transition hover:bg-[#162033]">

      <div className="flex items-start gap-3.5">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123B3A]">
          <UserRound className="h-[18px] w-[18px] text-[#00C2B5]" />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <h3 className="text-[14px] font-medium text-white">
              {getDoctorName(review?.doctorName)}
            </h3>

            <div className="flex items-center gap-0.5">

              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-[13px] ${
                    star <= rating
                      ? "text-[#FBBF24]"
                      : "text-[#334155]"
                  }`}
                >
                  ★
                </span>
              ))}

            </div>

          </div>

          <p className="mt-1.5 line-clamp-2 text-[12px] leading-5 text-[#94A3B8]">
            {review?.comment ||
              "No comment provided."}
          </p>

          <p className="mt-1.5 text-[10px] text-[#64748B]">
            {formatDate(
              review?.createdAt ||
                review?.updatedAt
            )}
          </p>

        </div>
      </div>
    </div>
  );
}


function StatusBadge({ status }) {
  const config = {
    confirmed: {
      label: "Confirmed",
      className:
        "border-[#14532D] bg-[#10281B] text-[#4ADE80]",
      icon: CheckCircle2,
    },

    completed: {
      label: "Completed",
      className:
        "border-[#155E59] bg-[#123B3A] text-[#2DD4BF]",
      icon: CheckCircle2,
    },

    cancelled: {
      label: "Cancelled",
      className:
        "border-[#4C2730] bg-[#24151B] text-[#FB7185]",
      icon: XCircle,
    },

    rescheduled: {
      label: "Rescheduled",
      className:
        "border-[#59451D] bg-[#2A2110] text-[#FBBF24]",
      icon: CalendarClock,
    },
  };

  const current =
    config[status] || config.confirmed;

  const Icon = current.icon;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${current.className}`}
    >
      <Icon className="h-3 w-3" />

      {current.label}
    </span>
  );
}


function EmptyState({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#243247] bg-[#111827] px-5 py-10 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B3A]">
        <Icon className="h-5 w-5 text-[#00C2B5]" />
      </div>

      <h3 className="mt-3.5 text-[14px] font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-[11px] leading-5 text-[#64748B]">
        {description}
      </p>

    </div>
  );
}