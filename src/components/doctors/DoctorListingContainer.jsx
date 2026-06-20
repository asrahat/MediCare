"use client";

import React, { useState, useEffect } from "react";
// import DoctorCard from "@/components/doctors/DoctorCard";
// import DoctorFilters from "@/components/doctors/DoctorFilters";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import DoctorCard from "./DoctorCard";
import DoctorFilters from "./DoctorFilters";

export default function DoctorListingContainer({
  doctors,
  filters,
  total
}) {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedSpecialization, setSelectedSpecialization] = useState(filters.specialization || "all");
  const [minExperience, setMinExperience] = useState(filters.experience || "");
  const [page, setPage] = useState(filters.page || 1);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {

    const sp = new URLSearchParams();

    if (searchQuery) sp.set("search", searchQuery);
    if (selectedSpecialization !== "all") sp.set("specialization", selectedSpecialization);
    if (minExperience) sp.set("experience", minExperience);
    if (page) sp.set("page", page);

    router.push(`?${sp.toString()}`);

  }, [searchQuery, selectedSpecialization, minExperience, page]);

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  return (
    <>
      <DoctorFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        minExperience={minExperience}
        setMinExperience={setMinExperience}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {doctors.length} doctors
      </div>

      {doctors.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Pagination
              page={page}
              total={totalPages}
              onChange={(p) => setPage(p)}
            />
          </div>

        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">
            No doctors found.
          </p>
        </div>
      )}
    </>
  );
}