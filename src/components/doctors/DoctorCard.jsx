import Link from "next/link";
import Image from "next/image";
import { Card } from "@heroui/react";
import { Star, Stethoscope } from "@gravity-ui/icons";

export default function DoctorCard({ doctor }) {
  if (!doctor) return null;

  const doctorId = doctor._id?.$oid || doctor._id;

  return (
    <Card className="p-6 w-full max-w-[440px] border-none bg-zinc-900 text-zinc-100 rounded-[32px] shadow-2xl">

      {/* DOCTOR IMAGE */}
      <div className="w-full h-[220px] relative rounded-2xl overflow-hidden mb-4">
        <Image
          src={doctor.profileImage || "https://via.placeholder.com/400x400"}
          alt={doctor.doctorName}
          fill
          className="object-cover"
        />
      </div>

      {/* HEADER */}
      <Card.Header className="flex flex-col items-start gap-4 p-0 pb-3">

        <div className="flex items-center gap-3">
          <Stethoscope className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-medium text-zinc-300">
            {doctor.specialization}
          </span>
        </div>

        <Card.Title className="text-3xl font-semibold text-white">
          {doctor.doctorName}
        </Card.Title>

        <Card.Description className="text-base text-zinc-400">
          {doctor.qualifications?.join(", ")}
        </Card.Description>

      </Card.Header>

      {/* CONTENT */}
      <Card.Content className="flex flex-col gap-4 p-0 py-4">

        <div className="flex flex-wrap gap-2">

          <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full">
            <Stethoscope className="w-4 h-4 text-purple-400" />
            <span className="text-sm">
              {doctor.hospitalName}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">
              {doctor.experience} yrs experience
            </span>
          </div>

        </div>

        <div className="text-green-400 font-semibold">
          Fee: ${doctor.consultationFee}
        </div>

      </Card.Content>

      {/* FOOTER */}
      <Card.Footer className="p-0 pt-4">

        <Link
          href={`/doctors/${doctorId}`}
          className="text-white hover:text-purple-400 transition"
        >
          View Profile →
        </Link>

      </Card.Footer>

    </Card>
  );
}