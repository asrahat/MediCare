"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  UserRound,
  Stethoscope,
  CheckCircle2,
  FileText,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import {
  getDoctorAppointments,
} from "@/lib/actions/appointmentDoctor";

import {
  getAppointment,
} from "@/lib/actions/appointment";

import {
  getPrescriptionByAppointment,
  createPrescription,
  updatePrescription,
} from "@/lib/actions/prescription";

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

export default function PrescriptionManagementClient({
  appointmentId,
}) {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  /*
   * ------------------------------------------------
   * State
   * ------------------------------------------------
   */

  const [appointments, setAppointments] = useState([]);

  const [appointment, setAppointment] = useState(null);

  const [prescription, setPrescription] = useState(null);

  const [loading, setLoading] = useState(true);

  const [formLoading, setFormLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [diagnosis, setDiagnosis] = useState("");

  const [medications, setMedications] = useState("");

  const [notes, setNotes] = useState("");

  /*
   * ------------------------------------------------
   * 1. If appointmentId exists
   *    load specific appointment
   * ------------------------------------------------
   */

  useEffect(() => {
    if (!appointmentId) return;

    const loadAppointment = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * Get appointment
         */
        const appointmentResult =
          await getAppointment(appointmentId);

        const appointmentData =
          appointmentResult?.data || null;

        if (!appointmentData) {
          setError("Appointment not found.");
          return;
        }

        setAppointment(appointmentData);

        /*
         * Get existing prescription
         */
        const prescriptionResult =
          await getPrescriptionByAppointment(
            appointmentId
          );

        const prescriptionData =
          prescriptionResult?.data || null;

        setPrescription(prescriptionData);

        /*
         * Put existing prescription
         * data into form
         */
        setDiagnosis(
          prescriptionData?.diagnosis || ""
        );

        setMedications(
          prescriptionData?.medications || ""
        );

        setNotes(
          prescriptionData?.notes || ""
        );
      } catch (error) {
        console.error(
          "Load prescription appointment error:",
          error
        );

        setError(
          error?.message ||
            "Failed to load appointment."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAppointment();
  }, [appointmentId]);

  /*
   * ------------------------------------------------
   * 2. No appointmentId
   *    Load doctor's appointments
   * ------------------------------------------------
   */

  useEffect(() => {
    if (appointmentId) return;

    const doctorUserId = session?.user?.id;

    if (!doctorUserId) return;

    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getDoctorAppointments(
            doctorUserId
          );

        const allAppointments =
          result?.data || [];

        /*
         * Only completed appointments
         */
        const completedAppointments =
          allAppointments.filter(
            (item) =>
              String(
                item?.appointmentStatus
              ).toLowerCase() === "completed"
          );

        setAppointments(
          completedAppointments
        );
      } catch (error) {
        console.error(
          "Load doctor appointments error:",
          error
        );

        setError(
          error?.message ||
            "Failed to load appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [appointmentId, session?.user?.id]);

  /*
   * ------------------------------------------------
   * Loading
   * ------------------------------------------------
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080D19] text-white">
        <div className="flex items-center gap-3 text-[#94A3B8]">
          <Loader2
            size={25}
            className="animate-spin text-[#00C2B5]"
          />

          Loading prescription management...
        </div>
      </div>
    );
  }

  /*
   * ------------------------------------------------
   * FORM SUBMIT
   * ------------------------------------------------
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!diagnosis.trim()) {
        setError("Diagnosis is required.");
        setFormLoading(false);
        return;
      }

      let result;

      /*
       * UPDATE
       */
      if (prescription?._id) {
        result = await updatePrescription(
          prescription._id,
          {
            diagnosis,
            medications,
            notes,
          }
        );
      }

      /*
       * CREATE
       */
      else {
        result = await createPrescription({
          appointmentId:
            appointment?._id,

          doctorId:
            appointment?.doctorId,

          patientId:
            appointment?.userId,

          patientName:
            getPatientName(appointment),

          diagnosis,

          medications,

          notes,
        });
      }

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Failed to save prescription."
        );
      }

      setSuccess(
        prescription?._id
          ? "Prescription updated successfully."
          : "Prescription created successfully."
      );

      /*
       * Update local state
       */
      if (result?.data) {
        setPrescription(result.data);

        setDiagnosis(
          result.data.diagnosis || ""
        );

        setMedications(
          result.data.medications || ""
        );

        setNotes(
          result.data.notes || ""
        );
      }

      /*
       * Return to appointment card
       */
      setTimeout(() => {
        setShowForm(false);
        setSuccess("");
      }, 1000);
    } catch (error) {
      console.error(
        "Prescription save error:",
        error
      );

      setError(
        error?.message ||
          "Failed to save prescription."
      );
    } finally {
      setFormLoading(false);
    }
  };

  /*
   * =================================================
   * CASE 1
   * NO appointmentId
   *
   * Show completed appointment cards
   * =================================================
   */

  if (!appointmentId) {
    return (
      <div className="min-h-screen bg-[#080D19] p-4 text-white md:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <FileText
                size={24}
                className="text-[#00C2B5]"
              />

              <span className="text-sm font-medium text-[#00C2B5]">
                Doctor Dashboard
              </span>
            </div>

            <h1 className="text-2xl font-bold md:text-3xl">
              Prescription Management
            </h1>

            <p className="mt-2 text-sm text-[#94A3B8]">
              Manage prescriptions for completed patient appointments.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* No completed appointments */}
          {appointments.length === 0 ? (
            <div className="rounded-2xl border border-[#243247] bg-[#111827] p-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00C2B5]/10">
                <FileText
                  size={30}
                  className="text-[#00C2B5]"
                />
              </div>

              <h2 className="text-xl font-semibold">
                No completed appointments
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#94A3B8]">
                Completed appointments will appear here,
                and you can create or modify prescriptions
                for your patients.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {appointments.map(
                (item) => (
                  <AppointmentCard
                    key={item._id}
                    appointment={item}
                    onManage={() =>
                      router.push(
                        `/dashboard/doctor/prescriptions?appointmentId=${encodeURIComponent(
                          String(item._id)
                        )}`
                      )
                    }
                  />
                )
              )}

            </div>
          )}
        </div>
      </div>
    );
  }

  /*
   * =================================================
   * CASE 2
   * appointmentId exists
   *
   * Show appointment first
   * =================================================
   */

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#080D19] p-6 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            Appointment not found.
          </div>
        </div>
      </div>
    );
  }

  /*
   * ------------------------------------------------
   * Show FORM only after Manage Prescription clicked
   * ------------------------------------------------
   */

  if (showForm) {
    return (
      <div className="min-h-screen bg-[#080D19] p-4 text-white md:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">

          <button
            type="button"
            onClick={() =>
              setShowForm(false)
            }
            className="mb-6 flex items-center gap-2 text-sm text-[#94A3B8] transition hover:text-[#00C2B5]"
          >
            <ArrowLeft size={17} />
            Back to Appointment
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00C2B5]/10">
                <FileText
                  size={24}
                  className="text-[#00C2B5]"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  {prescription
                    ? "Modify Prescription"
                    : "Create Prescription"}
                </h1>

                <p className="mt-1 text-sm text-[#94A3B8]">
                  {getPatientName(
                    appointment
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          {success && (
            <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#243247] bg-[#111827] p-5 md:p-6"
          >
            {/* Diagnosis */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-[#E2E8F0]">
                Diagnosis
              </label>

              <textarea
                value={diagnosis}
                onChange={(event) =>
                  setDiagnosis(
                    event.target.value
                  )
                }
                placeholder="Enter diagnosis..."
                rows={4}
                className="w-full rounded-xl border border-[#29404F] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none placeholder:text-[#64748B] focus:border-[#00C2B5]"
              />
            </div>

            {/* Medications */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-[#E2E8F0]">
                Medications
              </label>

              <textarea
                value={medications}
                onChange={(event) =>
                  setMedications(
                    event.target.value
                  )
                }
                placeholder="Enter medications, dosage and instructions..."
                rows={6}
                className="w-full rounded-xl border border-[#29404F] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none placeholder:text-[#64748B] focus:border-[#00C2B5]"
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#E2E8F0]">
                Additional Notes
              </label>

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(
                    event.target.value
                  )
                }
                placeholder="Add additional instructions or notes..."
                rows={5}
                className="w-full rounded-xl border border-[#29404F] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none placeholder:text-[#64748B] focus:border-[#00C2B5]"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#243247] pt-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                disabled={formLoading}
                className="rounded-xl border border-[#29404F] bg-[#0B1220] px-5 py-2.5 text-sm font-semibold text-[#CBD5E1] transition hover:bg-[#111827]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={formLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00C2B5] disabled:opacity-50"
              >
                {formLoading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />

                    {prescription
                      ? "Update Prescription"
                      : "Issue Digital Prescription"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /*
   * =================================================
   * CASE 3
   *
   * appointmentId exists
   * Show appointment card
   * =================================================
   */

  return (
    <div className="min-h-screen bg-[#080D19] p-4 text-white md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <FileText
              size={24}
              className="text-[#00C2B5]"
            />

            <span className="text-sm font-medium text-[#00C2B5]">
              Doctor Dashboard
            </span>
          </div>

          <h1 className="text-2xl font-bold md:text-3xl">
            Prescription Management
          </h1>

          <p className="mt-2 text-sm text-[#94A3B8]">
            Review appointment details before managing the prescription.
          </p>
        </div>

        {/* Appointment */}
        <AppointmentCard
          appointment={appointment}
          prescription={prescription}
          onManage={() =>
            setShowForm(true)
          }
        />
      </div>
    </div>
  );
}

/*
 * =====================================================
 * Appointment Card
 * =====================================================
 */

function AppointmentCard({
  appointment,
  prescription,
  onManage,
}) {
  return (
    <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5 md:p-6">

      {/* Top */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00C2B5]/10">
            <UserRound
              size={23}
              className="text-[#00C2B5]"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              {getPatientName(
                appointment
              )}
            </h2>

            <p className="mt-1 text-sm text-[#94A3B8]">
              Appointment Request
            </p>
          </div>
        </div>

        {/* Status */}
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00C2B5]/30 bg-[#00C2B5]/10 px-3 py-1.5 text-xs font-medium text-[#00C2B5]">
          <CheckCircle2 size={14} />

          {appointment?.appointmentStatus
            ? appointment.appointmentStatus
                .charAt(0)
                .toUpperCase() +
              appointment.appointmentStatus.slice(
                1
              )
            : "Completed"}
        </span>
      </div>

      {/* Information */}
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">

        {/* Date */}
        <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-[#7890B2]">
            <CalendarDays size={14} />
            Date
          </div>

          <p className="text-sm font-medium text-[#E2E8F0]">
            {formatDate(
              appointment?.date
            )}
          </p>
        </div>

        {/* Time */}
        <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-[#7890B2]">
            <Clock3 size={14} />
            Time
          </div>

          <p className="text-sm font-medium text-[#E2E8F0]">
            {appointment?.availableSlot ||
              "N/A"}
          </p>
        </div>

        {/* Specialization */}
        <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-[#7890B2]">
            <Stethoscope size={14} />
            Specialization
          </div>

          <p className="text-sm font-medium text-[#E2E8F0]">
            {appointment?.specialization ||
              "N/A"}
          </p>
        </div>

        {/* Fee */}
        <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-4">
          <div className="mb-3 text-xs text-[#7890B2]">
            Consultation Fee
          </div>

          <p className="text-sm font-semibold text-[#00C2B5]">
            ${appointment?.consultationFee || 0}
          </p>
        </div>

      </div>

      {/* Symptoms */}
      {appointment?.symptoms && (
        <div className="mt-4 rounded-xl border border-[#243247] bg-[#0B1220] p-4">

          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#7890B2]">
            Patient Symptoms
          </p>

          <p className="text-sm leading-6 text-[#CBD5E1]">
            {appointment.symptoms}
          </p>

        </div>
      )}

      {/* Button */}
      <div className="mt-5 flex justify-end border-t border-[#243247] pt-5">

        <button
          type="button"
          onClick={onManage}
          className="flex items-center gap-2 rounded-xl border border-[#29404F] bg-[#0B1220] px-5 py-2.5 text-sm font-semibold text-[#00C2B5] transition hover:bg-[#00C2B5]/10"
        >
          <FileText size={17} />

          {prescription
            ? "Modify Prescription"
            : "Manage Prescription"}
        </button>

      </div>
    </div>
  );
}