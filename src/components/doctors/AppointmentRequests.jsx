"use client";

import { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  ClipboardCheck,
  Loader2,
  FileText,
  WalletCards,
  Activity,
  Inbox,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from "@/lib/actions/appointment";

import {
  getDoctorAppointments,
} from "@/lib/actions/appointmentDoctor";

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getPatientName = (appointment) => {
  return (
    appointment?.patientName ||
    appointment?.userName ||
    appointment?.name ||
    "Patient"
  );
};

const getInitials = (name) => {
  if (!name) return "P";

  return String(name)
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AppointmentRequests() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const doctorUserId = session?.user?.id;

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionId, setActionId] = useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  /* =========================================================
     LOAD APPOINTMENTS
  ========================================================= */

  useEffect(() => {
    if (!doctorUserId) return;

    loadAppointments();
  }, [doctorUserId]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const result =
        await getDoctorAppointments(doctorUserId);

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Failed to load appointments"
        );
      }

      setAppointments(result?.data || []);
    } catch (error) {
      console.error(
        "Load appointments error:",
        error
      );

      setError(
        error?.message ||
          "Failed to load appointment requests"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     ACCEPT
  ========================================================= */

  const handleAccept = async (appointmentId) => {
    try {
      setActionId(appointmentId);
      setError("");
      setSuccess("");

      const result =
        await acceptAppointment(appointmentId);

      if (result?.success === false) {
        throw new Error(
          result?.message ||
            "Failed to accept appointment"
        );
      }

      setAppointments((prev) =>
        prev.map((appointment) =>
          String(appointment._id) ===
          String(appointmentId)
            ? {
                ...appointment,
                appointmentStatus: "confirmed",
              }
            : appointment
        )
      );

      setSuccess(
        "Appointment accepted successfully."
      );
    } catch (error) {
      console.error(
        "Accept appointment error:",
        error
      );

      setError(
        error?.message ||
          "Failed to accept appointment"
      );
    } finally {
      setActionId(null);
    }
  };

  /* =========================================================
     REJECT
  ========================================================= */

  const handleReject = async (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this appointment?"
    );

    if (!confirmed) return;

    try {
      setActionId(appointmentId);
      setError("");
      setSuccess("");

      const result =
        await rejectAppointment(appointmentId);

      if (result?.success === false) {
        throw new Error(
          result?.message ||
            "Failed to reject appointment"
        );
      }

      setAppointments((prev) =>
        prev.map((appointment) =>
          String(appointment._id) ===
          String(appointmentId)
            ? {
                ...appointment,
                appointmentStatus: "rejected",
              }
            : appointment
        )
      );

      setSuccess(
        "Appointment rejected successfully."
      );
    } catch (error) {
      console.error(
        "Reject appointment error:",
        error
      );

      setError(
        error?.message ||
          "Failed to reject appointment"
      );
    } finally {
      setActionId(null);
    }
  };

  /* =========================================================
     COMPLETE
  ========================================================= */

  const handleComplete = async (appointmentId) => {
    try {
      setActionId(appointmentId);
      setError("");
      setSuccess("");

      const result =
        await completeAppointment(appointmentId);

      if (result?.success === false) {
        throw new Error(
          result?.message ||
            "Failed to complete appointment"
        );
      }

      setAppointments((prev) =>
        prev.map((appointment) =>
          String(appointment._id) ===
          String(appointmentId)
            ? {
                ...appointment,
                appointmentStatus: "completed",
              }
            : appointment
        )
      );

      setSuccess(
        "Appointment completed successfully."
      );
    } catch (error) {
      console.error(
        "Complete appointment error:",
        error
      );

      setError(
        error?.message ||
          "Failed to complete appointment"
      );
    } finally {
      setActionId(null);
    }
  };

  /* =========================================================
     PRESCRIBE
  ========================================================= */

  const handlePrescribe = (appointment) => {
    if (!appointment?._id) {
      setError("Appointment ID is missing.");
      return;
    }

    router.push(
      `/dashboard/doctor/prescriptions?appointmentId=${encodeURIComponent(
        String(appointment._id)
      )}&create=true`
    );
  };

  /* =========================================================
     WAITING FOR SESSION
  ========================================================= */

  if (!doctorUserId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080D19]">
        <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
          <Loader2
            size={22}
            className="animate-spin text-[#00C2B5]"
          />

          Loading doctor dashboard...
        </div>
      </div>
    );
  }

  /* =========================================================
     COUNTS
  ========================================================= */

  const pendingCount = appointments.filter(
    (item) =>
      item?.appointmentStatus === "pending"
  ).length;

  const confirmedCount = appointments.filter(
    (item) =>
      item?.appointmentStatus === "confirmed"
  ).length;

  const completedCount = appointments.filter(
    (item) =>
      item?.appointmentStatus === "completed"
  ).length;

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#080D19] px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00C2B5]/20 bg-[#00C2B5]/10 px-3 py-1.5">
                <Inbox
                  size={14}
                  className="text-[#00C2B5]"
                />

                <span className="text-xs font-semibold text-[#00C2B5]">
                  Clinical Inbox
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Appointment Requests
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#94A3B8]">
                Review patient appointments and manage
                consultations from your clinical inbox.
              </p>
            </div>

            <button
              type="button"
              onClick={loadAppointments}
              disabled={loading}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#243247] bg-[#111827] px-4 py-2.5 text-sm font-medium text-[#CBD5E1] transition hover:border-[#00C2B5]/40 hover:bg-[#0B1220] hover:text-[#00C2B5] disabled:opacity-50"
            >
              <Activity size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        {!loading && appointments.length > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Pending */}
            <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                    Pending Requests
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {pendingCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                  <Clock3
                    size={21}
                    className="text-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Confirmed */}
            <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                    Confirmed
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {confirmedCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C2B5]/10">
                  <CheckCircle2
                    size={21}
                    className="text-[#00C2B5]"
                  />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                    Completed
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {completedCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10">
                  <ClipboardCheck
                    size={21}
                    className="text-sky-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <CheckCircle2 size={17} />
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <XCircle size={17} />
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-[#243247] bg-[#111827]">
            <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
              <Loader2
                size={24}
                className="animate-spin text-[#00C2B5]"
              />

              Loading appointments...
            </div>
          </div>
        ) : appointments.length === 0 ? (
          /* EMPTY */
          <div className="rounded-2xl border border-[#243247] bg-[#111827] px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00C2B5]/20 bg-[#00C2B5]/10">
              <CalendarDays
                size={29}
                className="text-[#00C2B5]"
              />
            </div>

            <h2 className="text-xl font-semibold">
              No appointments yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#94A3B8]">
              Patient appointment requests will appear
              here once they book a consultation with you.
            </p>
          </div>
        ) : (
          /* APPOINTMENTS */
          <div className="space-y-4">

            {appointments.map((appointment) => {
              const status = String(
                appointment?.appointmentStatus || ""
              ).toLowerCase();

              const isPending =
                status === "pending";

              const isConfirmed =
                status === "confirmed";

              const isCompleted =
                status === "completed";

              const isRejected =
                status === "rejected";

              /*
               * IMPORTANT
               *
               * Backend adds these after prescription:
               *
               * prescriptionId
               * prescriptionIssued
               */
              const hasPrescription =
                Boolean(
                  appointment?.prescriptionId ||
                  appointment?.prescriptionIssued
                );

              const isLoading =
                String(actionId) ===
                String(appointment?._id);

              const patientName =
                getPatientName(appointment);

              return (
                <div
                  key={appointment._id}
                  className="group overflow-hidden rounded-2xl border border-[#243247] bg-[#111827] transition duration-200 hover:border-[#34465D] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
                >

                  {/* TOP ACCENT */}
                  <div
                    className={`h-0.5 w-full ${
                      isPending
                        ? "bg-amber-400"
                        : isConfirmed
                        ? "bg-[#00C2B5]"
                        : isCompleted
                        ? "bg-sky-400"
                        : isRejected
                        ? "bg-red-400"
                        : "bg-[#243247]"
                    }`}
                  />

                  <div className="p-5 md:p-6">

                    {/* HEADER */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                      <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00C2B5]/20 bg-[#00C2B5]/10 text-sm font-bold text-[#00C2B5]">
                          {getInitials(
                            patientName
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">

                            <h2 className="text-lg font-semibold text-white">
                              {patientName}
                            </h2>

                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                              <WalletCards size={11} />
                              Paid Consultation
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-[#64748B]">
                            Patient Appointment Request
                          </p>
                        </div>
                      </div>

                      <StatusBadge
                        status={status}
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                      <InfoItem
                        icon={
                          <CalendarDays size={16} />
                        }
                        label="Appointment Date"
                        value={formatDate(
                          appointment?.date
                        )}
                      />

                      <InfoItem
                        icon={
                          <Clock3 size={16} />
                        }
                        label="Time Slot"
                        value={
                          appointment?.availableSlot ||
                          "N/A"
                        }
                      />

                      <InfoItem
                        icon={
                          <Activity size={16} />
                        }
                        label="Specialization"
                        value={
                          appointment?.specialization ||
                          "N/A"
                        }
                      />

                      <InfoItem
                        icon={
                          <WalletCards size={16} />
                        }
                        label="Consultation Fee"
                        value={`${
                          appointment?.consultationFee ||
                          0
                        }`}
                        valueClass="text-[#00C2B5]"
                      />
                    </div>

                    {/* SYMPTOMS */}
                    {appointment?.symptoms && (
                      <div className="mt-4 rounded-xl border border-[#243247] bg-[#0B1220] p-4">

                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00C2B5]" />

                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                            Symptom Presentation
                          </p>
                        </div>

                        <p className="text-sm leading-6 text-[#CBD5E1]">
                          {appointment.symptoms}
                        </p>
                      </div>
                    )}

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    {/*
                     * COMPLETED + PRESCRIPTION EXISTS
                     *
                     * NO BUTTONS
                     *
                     * Only the Completed status above remains.
                     */}
                    {isCompleted &&
                      hasPrescription ? null : (

                      (isPending ||
                        isConfirmed ||
                        isCompleted) && (

                        <div className="mt-5 flex flex-col gap-3 border-t border-[#243247] pt-5 sm:flex-row sm:items-center sm:justify-end">

                          {/* PENDING */}
                          {isPending && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleReject(
                                    appointment._id
                                  )
                                }
                                disabled={isLoading}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <XCircle size={16} />
                                Reject
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAccept(
                                    appointment._id
                                  )
                                }
                                disabled={isLoading}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#00A99D]/10 transition hover:bg-[#00C2B5] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isLoading ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <CheckCircle2
                                    size={16}
                                  />
                                )}

                                Accept Appointment
                              </button>
                            </>
                          )}

                          {/* CONFIRMED */}
                          {isConfirmed && (
                            <button
                              type="button"
                              onClick={() =>
                                handleComplete(
                                  appointment._id
                                )
                              }
                              disabled={isLoading}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#00A99D]/10 transition hover:bg-[#00C2B5] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isLoading ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <ClipboardCheck
                                  size={16}
                                />
                              )}

                              Mark Completed
                            </button>
                          )}

                          {/* COMPLETED + NO PRESCRIPTION */}
                          {isCompleted &&
                            !hasPrescription && (
                              <button
                                type="button"
                                onClick={() =>
                                  handlePrescribe(
                                    appointment
                                  )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#00A99D]/10 transition hover:bg-[#00C2B5]"
                              >
                                <FileText
                                  size={17}
                                />

                                Prescribe
                              </button>
                            )}

                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  if (status === "pending") {
    return (
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400">
        <Clock3 size={14} />
        Pending
      </span>
    );
  }

  if (status === "confirmed") {
    return (
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00C2B5]/20 bg-[#00C2B5]/10 px-3 py-1.5 text-xs font-semibold text-[#00C2B5]">
        <CheckCircle2 size={14} />
        Confirmed
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400">
        <CheckCircle2 size={14} />
        Completed
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
        <XCircle size={14} />
        Rejected
      </span>
    );
  }

  return null;
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
  valueClass = "text-[#E2E8F0]",
}) {
  return (
    <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-4 transition hover:border-[#34465D]">

      <div className="mb-2 flex items-center gap-2 text-xs text-[#64748B]">
        <span className="text-[#00A99D]">
          {icon}
        </span>

        {label}
      </div>

      <p
        className={`text-sm font-semibold ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
}