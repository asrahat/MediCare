
import {
  MapPin,
  Stethoscope,
  Star,
  Calendar,
  CircleDollar,
} from "@gravity-ui/icons";
import { getDoctorById } from "@/lib/api/doctors";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

const Page = async ({ params }) => {
  const { id } = await params;

  const doctor = await getDoctorById(id);
  console.log(doctor);

  if (!doctor) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">
          Doctor not found or profile is unavailable.
        </p>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10 lg:p-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 space-y-8">

          {/* Doctor Header */}
          <div className="flex items-center gap-5">
            <Image
            width={200}
            height={200}
            src={doctor.profileImage}
            alt={doctor.doctorName}
            className="w-20 h-20 rounded-2xl object-cover border border-zinc-800"
             
            />

            <div>
              <h1 className="text-4xl font-bold text-white">
                {doctor.doctorName}
              </h1>

              <p className="text-zinc-400 flex items-center gap-2 mt-1">
                <Stethoscope className="w-4 h-4 text-purple-400" />
                {doctor.specialization}
              </p>
            </div>
          </div>

          {/* Qualifications */}
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Qualifications</h3>
            <p className="text-zinc-300">
              {doctor.qualifications?.join(", ")}
            </p>
          </section>

          {/* Hospital + Experience */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <p className="text-xs text-zinc-500">Hospital</p>
              <p className="text-zinc-200 font-medium">
                {doctor.hospitalName}
              </p>
            </div>

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <p className="text-xs text-zinc-500">Experience</p>
              <p className="text-zinc-200 font-medium">
                {doctor.experience} Years
              </p>
            </div>

          </section>

          {/* Availability */}
          <section className="space-y-3">
            <h3 className="text-xl font-semibold">Availability</h3>

            <div className="flex flex-wrap gap-2">
              {doctor.availableDays?.map((day, i) => (
                <span
                  key={i}
                  className="px-4 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots?.map((slot, i) => (
                <span
                  key={i}
                  className="px-4 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-full text-sm"
                >
                  {slot}
                </span>
              ))}
            </div>
          </section>

          {/* Fee */}
          <section className="text-lg font-semibold text-green-400">
            Consultation Fee: ${doctor.consultationFee}
          </section>
        </div>

        {/* ================= RIGHT SIDE (BOOKING CARD) ================= */}
        <aside className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6 lg:sticky lg:top-8 space-y-6 shadow-xl">

          <h3 className="text-xl font-semibold text-white">
            Schedule Appointment
          </h3>

          {/* Weekdays */}
          <div>
            <p className="text-xs text-zinc-500 mb-2">Clinic Workdays</p>
            <div className="flex flex-wrap gap-2">
              {doctor.availableDays?.map((day, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-zinc-800 rounded-full"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <p className="text-xs text-zinc-500 mb-2">Select Date</p>
            <input
              type="date"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white"
            />
          </div>

          {/* Slot */}
          <div>
            <p className="text-xs text-zinc-500 mb-2">Available Slots</p>
            <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white">
              {doctor.availableSlots?.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Symptoms */}
          <div>
            <p className="text-xs text-zinc-500 mb-2">
              Symptoms Description
            </p>
            <textarea
              rows={4}
              placeholder="e.g. headache, fever, etc..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white resize-none"
            />
          </div>

          
          <Link href={`/doctors/${id}/appointment`} >
           <Button className="w-full cursor-pointer bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl transition">
             Book Appointment (${doctor.consultationFee})
           </Button>
          </Link >

        </aside>

      </div>
    </main>
  );
};

export default Page;