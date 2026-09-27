"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import DoctorCard from "./DoctorCard";
import DoctorFilters from "./DoctorFilters";

export default function DoctorListingContainer({
  doctors,
  filters,
  total,
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    filters.specialization || "all"
  );
  const [minExperience, setMinExperience] = useState(
    filters.experience || ""
  );
  const [page, setPage] = useState(Number(filters.page) || 1);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) sp.set("search", searchQuery);

    if (selectedSpecialization !== "all") {
      sp.set("specialization", selectedSpecialization);
    }

    if (minExperience) {
      sp.set("experience", minExperience);
    }

    if (page) {
      sp.set("page", page);
    }

    router.push(`?${sp.toString()}`);
  }, [
    searchQuery,
    selectedSpecialization,
    minExperience,
    page,
    router,
  ]);

  const startItem = total > 0 ? (page - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(page * itemsPerPage, total);

  return (
    <div className="w-11/12 mx-auto">
      {/* Filters */}
      <DoctorFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        minExperience={minExperience}
        setMinExperience={setMinExperience}
      />

      {/* Results Info */}
      <div className="mb-6 w-full text-sm text-zinc-500">
        {total > 0 ? (
          <>
            Showing{" "}
            <span className="font-medium text-zinc-300">
              {startItem}-{endItem}
            </span>{" "}
            of{" "}
            <span className="font-medium text-zinc-300">
              {total}
            </span>{" "}
            doctors
          </>
        ) : (
          "Showing 0 doctors"
        )}
      </div>

      {/* Doctor Grid */}
      {doctors.length > 0 ? (
        <>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination
                page={page}
                total={totalPages}
                onChange={(p) => setPage(p)}
              />
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="flex min-h-[280px] w-full items-center justify-center rounded-[32px] border border-dashed border-zinc-800">
          <p className="text-lg text-zinc-500">
            No doctors found.
          </p>
        </div>
      )}
    </div>
  );
}