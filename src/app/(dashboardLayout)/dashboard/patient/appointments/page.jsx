"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Stethoscope,
  CreditCard,
  Eye,
  Pencil,
  X,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";

import {
  getAppointments,
  getAppointment,
  rescheduleAppointment,
  cancelAppointment,
} from "@/lib/actions/appointment";

import { authClient } from "@/lib/auth-client";

const MyAppointments = () => {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = session?.user?.id;

const loadAppointments = async () => {
  if (!userId) return;

  try {
    setLoading(true);
    setError("");

    const result = await getAppointments(userId);

    console.log("Appointments API result:", result);

    setAppointments(result?.data || []);
  } catch (error) {
    console.error("Appointments error:", error);

    setError(
      error?.message || "Failed to load appointments"
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (sessionLoading || !userId) return;

  const fetchAppointments = async () => {
    await loadAppointments();
  };

  fetchAppointments();
}, [userId, sessionLoading]);

  const handleView = async (appointment) => {
    try {
      setActionLoading(true);
      setError("");

      const result = await getAppointment(appointment._id);

      setSelectedAppointment(result?.data || appointment);
      setViewModal(true);
    } catch (error) {
      console.error("View appointment error:", error);

      setError(
        error?.message || "Failed to load appointment"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenReschedule = (appointment) => {
    if (
      appointment.appointmentStatus?.toLowerCase() ===
      "cancelled"
    ) {
      return;
    }

    setSelectedAppointment(appointment);

    setNewDate(appointment.date || "");
    setNewSlot(appointment.availableSlot || "");

    setError("");
    setRescheduleModal(true);
  };


  const handleReschedule = async () => {
    if (!selectedAppointment) return;

    if (!newDate || !newSlot) {
      setError("Please select date and time.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const result = await rescheduleAppointment(
        selectedAppointment._id,
        {
          date: newDate,
          availableSlot: newSlot,
        }
      );

      setSuccess(
        result?.message ||
          "Appointment rescheduled successfully"
      );

      setRescheduleModal(false);
      setSelectedAppointment(null);

      // Reload latest data from backend
      await loadAppointments();
    } catch (error) {
      console.error("Reschedule error:", error);

      setError(
        error?.message ||
          "Failed to reschedule appointment"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenCancel = (appointment) => {
    if (
      appointment.appointmentStatus?.toLowerCase() ===
      "cancelled"
    ) {
      return;
    }

    setSelectedAppointment(appointment);
    setError("");
    setCancelModal(true);
  };

  const handleCancel = async () => {
    if (!selectedAppointment) return;

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const result = await cancelAppointment(
        selectedAppointment._id
      );

      setSuccess(
        result?.message ||
          "Appointment cancelled successfully"
      );

      setCancelModal(false);
      setSelectedAppointment(null);

      // Reload latest data from backend
      await loadAppointments();
    } catch (error) {
      console.error("Cancel appointment error:", error);

      setError(
        error?.message ||
          "Failed to cancel appointment"
      );
    } finally {
      setActionLoading(false);
    }
  };


  const getStatus = (status) => {
    const value = String(
      status || "unknown"
    ).toLowerCase();

    switch (value) {
      case "confirmed":
        return {
          label: "confirmed",
          className:
            "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
          dot: "bg-emerald-400",
          icon: CheckCircle2,
        };

      case "completed":
        return {
          label: "completed",
          className:
            "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
          dot: "bg-emerald-400",
          icon: CheckCircle2,
        };

      case "rescheduled":
        return {
          label: "rescheduled",
          className:
            "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
          dot: "bg-yellow-400",
          icon: AlertCircle,
        };

      case "pending":
        return {
          label: "pending",
          className:
            "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
          dot: "bg-yellow-400",
          icon: AlertCircle,
        };

      case "cancelled":
      case "canceled":
        return {
          label: "cancelled",
          className:
            "border-red-400/20 bg-red-400/10 text-red-400",
          dot: "bg-red-400",
          icon: XCircle,
        };

      default:
        return {
          label: value,
          className:
            "border-slate-400/20 bg-slate-400/10 text-slate-400",
          dot: "bg-slate-400",
          icon: AlertCircle,
        };
    }
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


  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060914] text-white">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading...
        </div>
      </div>
    );
  }


  if (!userId) {
    return (
      <div className="min-h-screen bg-[#060914] p-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-10 text-center">
          <h2 className="text-lg font-semibold">
            Please login first
          </h2>
        </div>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen bg-[#060914] px-4 py-6 text-white sm:px-6 lg:px-8">

      <div className="mb-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              My Appointments
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage your upcoming and previous appointments
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0b1020] px-4 py-2">
            <span className="text-sm text-slate-400">
              Total:{" "}
            </span>

            <span className="font-semibold text-white">
              {appointments.length}
            </span>
          </div>
        </div>
      </div>


      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />

          <span>{error}</span>

          <button
            onClick={() => setError("")}
            className="ml-auto text-lg"
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />

          <span>{success}</span>

          <button
            onClick={() => setSuccess("")}
            className="ml-auto text-lg"
          >
            ×
          </button>
        </div>
      )}

 
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-[#0b1020] px-6 py-16 text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-slate-400" />

          <p className="mt-3 text-sm text-slate-500">
            Loading appointments...
          </p>
        </div>
      ) : appointments.length === 0 ? (

    
        <div className="rounded-2xl border border-white/10 bg-[#0b1020] px-6 py-16 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <CalendarDays className="h-7 w-7 text-slate-500" />
          </div>

          <h3 className="text-lg font-semibold">
            No appointments found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Your appointments will appear here.
          </p>
        </div>

      ) : (

        <div className="space-y-4">

          {appointments.map((appointment) => {
            const status = getStatus(
              appointment.appointmentStatus
            );

            const isCancelled =
              String(
                appointment.appointmentStatus || ""
              ).toLowerCase() === "cancelled" ||
              String(
                appointment.appointmentStatus || ""
              ).toLowerCase() === "canceled";

            return (
              <div
                key={appointment._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] transition hover:border-white/15"
              >

                <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5">
                      <Stethoscope className="h-5 w-5 text-slate-300" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-100">
                        {appointment.doctorName ||
                          "Unknown Doctor"}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {appointment.specialization ||
                          "Medical Practitioner"}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${status.className}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                    />

                    {status.label}
                  </span>

                </div>

                <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-4">

                  <Info
                    icon={CalendarDays}
                    label="Date"
                    value={formatDate(
                      appointment.date
                    )}
                  />

                  <Info
                    icon={Clock3}
                    label="Time"
                    value={
                      appointment.availableSlot ||
                      "N/A"
                    }
                  />

                  <Info
                    icon={CreditCard}
                    label="Consultation Fee"
                    value={`$${Number(
                      appointment.consultationFee || 0
                    ).toFixed(2)}`}
                  />

                  <Info
                    icon={MapPin}
                    label="Hospital"
                    value={
                      appointment.hospitalName ||
                      "N/A"
                    }
                  />

                </div>

           
                <div className="flex flex-wrap gap-3 border-t border-white/10 bg-[#0e1425] px-5 py-4">

                  <button
                    onClick={() =>
                      handleView(appointment)
                    }
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>

                  {!isCancelled && (
                    <button
                      onClick={() =>
                        handleOpenReschedule(
                          appointment
                        )
                      }
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-400/15 disabled:opacity-50"
                    >
                      <Pencil className="h-4 w-4" />
                      Reschedule
                    </button>
                  )}

                  {!isCancelled && (
                    <button
                      onClick={() =>
                        handleOpenCancel(
                          appointment
                        )
                      }
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-400/15 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      )}


      {viewModal && selectedAppointment && (
        <Modal
          title="Appointment Details"
          onClose={() => setViewModal(false)}
        >

          <div className="space-y-5">

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Practitioner
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {selectedAppointment.doctorName}
              </p>

              <p className="text-sm text-slate-500">
                {selectedAppointment.specialization}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <Detail
                label="Date"
                value={formatDate(
                  selectedAppointment.date
                )}
              />

              <Detail
                label="Time"
                value={
                  selectedAppointment.availableSlot
                }
              />

              <Detail
                label="Hospital"
                value={
                  selectedAppointment.hospitalName ||
                  "N/A"
                }
              />

              <Detail
                label="Fee"
                value={`$${Number(
                  selectedAppointment.consultationFee ||
                    0
                ).toFixed(2)}`}
              />

              <Detail
                label="Payment"
                value={
                  selectedAppointment.paymentStatus ||
                  "N/A"
                }
              />

              <Detail
                label="Appointment Status"
                value={
                  selectedAppointment.appointmentStatus ||
                  "N/A"
                }
              />

            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Symptoms
              </p>

              <p className="mt-2 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                {selectedAppointment.symptoms ||
                  "No symptoms provided"}
              </p>
            </div>

          </div>

        </Modal>
      )}

      {rescheduleModal && selectedAppointment && (
        <Modal
          title="Reschedule Appointment"
          onClose={() =>
            !actionLoading &&
            setRescheduleModal(false)
          }
        >

          <div className="space-y-5">

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">
                {selectedAppointment.doctorName}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Current:{" "}
                {formatDate(
                  selectedAppointment.date
                )}{" "}
                •{" "}
                {selectedAppointment.availableSlot}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                New Date
              </label>

              <input
                type="date"
                value={newDate}
                onChange={(e) =>
                  setNewDate(e.target.value)
                }
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full rounded-xl border border-white/10 bg-[#060914] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                New Time
              </label>

              <input
                type="time"
                value={newSlot}
                onChange={(e) =>
                  setNewSlot(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#060914] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/50"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">

              <button
                onClick={() =>
                  setRescheduleModal(false)
                }
                disabled={actionLoading}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handleReschedule}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {actionLoading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                Save Changes
              </button>

            </div>

          </div>

        </Modal>
      )}

      {cancelModal && selectedAppointment && (
        <Modal
          title="Cancel Appointment"
          onClose={() =>
            !actionLoading &&
            setCancelModal(false)
          }
        >

          <div className="text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-400/10">
              <XCircle className="h-7 w-7 text-red-400" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Are you sure?
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              You are about to cancel your appointment
              with{" "}
              <span className="font-medium text-slate-200">
                {selectedAppointment.doctorName}
              </span>{" "}
              on{" "}
              <span className="text-slate-200">
                {formatDate(
                  selectedAppointment.date
                )}
              </span>
              .
            </p>

            <div className="mt-6 flex justify-center gap-3">

              <button
                onClick={() =>
                  setCancelModal(false)
                }
                disabled={actionLoading}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Keep Appointment
              </button>

              <button
                onClick={handleCancel}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {actionLoading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                Cancel Appointment
              </button>

            </div>

          </div>

        </Modal>
      )}

    </div>
  );
};


const Info = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
        <Icon className="h-4 w-4 text-slate-400" />
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-slate-200">
          {value}
        </p>

      </div>

    </div>
  );
};


const Detail = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">

      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium capitalize text-slate-200">
        {value || "N/A"}
      </p>

    </div>
  );
};


const Modal = ({
  title,
  children,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl">

        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

          <h2 className="font-semibold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        <div className="max-h-[80vh] overflow-y-auto p-5">
          {children}
        </div>

      </div>

    </div>
  );
};

export default MyAppointments;