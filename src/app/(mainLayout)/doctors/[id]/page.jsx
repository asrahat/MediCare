import {
  MapPin,
  Stethoscope,
  Calendar,
  CircleDollar,
} from "@gravity-ui/icons";

import { getDoctorById } from "@/lib/api/doctors";
import Image from "next/image";
import { Button } from "@heroui/react";

const Page = async ({ params }) => {
  const { id } = await params;

  const doctor = await getDoctorById(id);

  if (!doctor) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Doctor Not Found</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Doctor not found or profile is unavailable.
          </p>
        </div>
      </div>
    );
  }

  const availableDays = Array.isArray(doctor.availableDays)
    ? doctor.availableDays
    : [];

  const availableSlots = Array.isArray(doctor.availableSlots)
    ? doctor.availableSlots
    : [];

  return (
    <main className="min-h-screen w-full bg-zinc-950 px-5 py-10 text-zinc-100 sm:px-8 md:py-12 lg:px-12 xl:px-16 2xl:px-20">
      <div className="grid w-11/12 mx-auto grid-cols-1 gap-10 lg:grid-cols-12 xl:gap-14">
        {/* =====================================================
            LEFT SIDE - DOCTOR INFORMATION
        ===================================================== */}

        <div className="space-y-8 lg:col-span-8">
          {/* Doctor Header */}
          <section className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              width={200}
              height={200}
              src={doctor.profileImage || "/doctor-placeholder.png"}
              alt={doctor.doctorName || "Doctor"}
              className="h-24 w-24 rounded-2xl border border-zinc-800 object-cover sm:h-28 sm:w-28"
            />

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {doctor.doctorName}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-zinc-400">
                <Stethoscope className="h-4 w-4 text-purple-400" />

                <span>
                  {doctor.specialization || "Medical Practitioner"}
                </span>
              </div>

              {doctor.hospitalName && (
                <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.hospitalName}</span>
                </div>
              )}
            </div>
          </section>

          {/* Qualifications */}
          <section className="space-y-3">
            <h3 className="text-xl font-semibold text-white">
              Qualifications
            </h3>

            {Array.isArray(doctor.qualifications) &&
            doctor.qualifications.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {doctor.qualifications.map((qualification, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                  >
                    {qualification}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                Qualification information is not available.
              </p>
            )}
          </section>

          {/* Hospital + Experience */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Hospital */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                <MapPin className="h-5 w-5 text-purple-400" />
              </div>

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Hospital
              </p>

              <p className="mt-1 font-medium text-zinc-200">
                {doctor.hospitalName || "N/A"}
              </p>
            </div>

            {/* Experience */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Experience
              </p>

              <p className="mt-1 font-medium text-zinc-200">
                {doctor.experience || 0} Years
              </p>
            </div>
          </section>

          {/* Availability */}
          <section className="space-y-6">
            {/* Available Days */}
            <div>
              <h3 className="text-xl font-semibold text-white">
                Available Days
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {availableDays.length > 0 ? (
                  availableDays.map((day, index) => (
                    <span
                      key={`${day}-${index}`}
                      className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                    >
                      {day}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">
                    No availability information.
                  </p>
                )}
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <h3 className="text-xl font-semibold text-white">
                Available Time Slots
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <span
                      key={`${slot}-${index}`}
                      className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
                    >
                      🕐 {slot}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">
                    No time slots available.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Consultation Fee */}
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <CircleDollar className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Consultation Fee
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-400">
                  ${Number(doctor.consultationFee || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </section>
        </div>

    
        <aside className="h-fit rounded-[28px] border border-zinc-800 bg-zinc-900 p-6 shadow-xl lg:sticky lg:top-8 lg:col-span-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Schedule Appointment
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Select your preferred date and time.
            </p>
          </div>

          {/* Booking Form */}
          <form
            id="appointment-form"
            action="/api/payment"
            method="POST"
            className="space-y-5"
          >
            {/* Doctor Information */}
            <input
              type="hidden"
              name="doctorId"
              value={String(doctor._id)}
            />

            <input
              type="hidden"
              name="doctorName"
              value={doctor.doctorName || ""}
            />

            <input
              type="hidden"
              name="specialization"
              value={doctor.specialization || ""}
            />

            <input
              type="hidden"
              name="hospitalName"
              value={doctor.hospitalName || ""}
            />

            <input
              type="hidden"
              name="consultationFee"
              value={doctor.consultationFee || 0}
            />

            {/* Clinic Workdays */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Clinic Workdays
              </p>

              <div className="flex flex-wrap gap-2">
                {availableDays.length > 0 ? (
                  availableDays.map((day, index) => (
                    <span
                      key={`${day}-${index}`}
                      className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300"
                    >
                      {day}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">
                    No available days
                  </span>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="appointment-date"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                Select Date
              </label>

              <input
                id="appointment-date"
                type="date"
                name="date"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            {/* Time Slot */}
            <div>
              <label
                htmlFor="appointment-slot"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                Available Slot
              </label>

              <select
                id="appointment-slot"
                name="availableSlot"
                required
                defaultValue=""
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none transition focus:border-purple-500"
              >
                <option value="" disabled>
                  Select a time slot
                </option>

                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <option
                      key={`${slot}-${index}`}
                      value={slot}
                    >
                      {slot}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No time slots available
                  </option>
                )}
              </select>
            </div>

            {/* Symptoms */}
            <div>
              <label
                htmlFor="symptoms"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                Symptoms Description
              </label>

              <textarea
                id="symptoms"
                name="symptoms"
                required
                rows={4}
                placeholder="e.g. headache, fever, stomach pain..."
                className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            {/* Payment Summary */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Consultation Fee
                </span>

                <span className="font-semibold text-white">
                  ${Number(doctor.consultationFee || 0).toFixed(2)}
                </span>
              </div>

              <div className="my-3 border-t border-zinc-800" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">
                  Total
                </span>

                <span className="text-lg font-bold text-emerald-400">
                  ${Number(doctor.consultationFee || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-500"
            >
              Pay & Book Appointment $
              {Number(doctor.consultationFee || 0).toFixed(2)}
            </Button>

            <p className="text-center text-xs leading-5 text-zinc-600">
              You will be redirected to Stripe Checkout to complete your
              payment.
            </p>
          </form>
        </aside>
      </div>
    </main>
  );
};

export default Page;