"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DoctorCard from "./DoctorCard";
import DoctorFilters from "./DoctorFilters";

export default function DoctorListingContainer({
  doctors,
  filters,
  total,
  page = 1,
  perPage = 8,
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    filters.specialization || "all"
  );
  const [minExperience, setMinExperience] = useState(
    filters.experience || ""
  );
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);

  const isFirstRender = useRef(true);

  const itemsPerPage = Number(perPage) || 8;
  const totalDoctors = Number(total) || 0;
  const totalPages = Math.ceil(totalDoctors / itemsPerPage);

  // Keep page state synchronized with URL
  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);

  // Update URL only after the initial render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const sp = new URLSearchParams();

    if (searchQuery) {
      sp.set("search", searchQuery);
    }

    if (selectedSpecialization !== "all") {
      sp.set("specialization", selectedSpecialization);
    }

    if (minExperience) {
      sp.set("experience", minExperience);
    }

    sp.set("verificationStatus", "verified");
    sp.set("page", String(currentPage));
    sp.set("perPage", String(itemsPerPage));

    router.push(`/doctors?${sp.toString()}`);
  }, [
    searchQuery,
    selectedSpecialization,
    minExperience,
    currentPage,
    itemsPerPage,
    router,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const startItem =
    totalDoctors > 0
      ? (currentPage - 1) * itemsPerPage + 1
      : 0;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalDoctors
  );

  return (
    <div className="mx-auto w-11/12">
      <DoctorFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        minExperience={minExperience}
        setMinExperience={setMinExperience}
      />

      <div className="mb-6 w-full text-sm text-zinc-500">
        {totalDoctors > 0 ? (
          <>
            Showing{" "}
            <span className="font-medium text-zinc-300">
              {startItem}-{endItem}
            </span>{" "}
            of{" "}
            <span className="font-medium text-zinc-300">
              {totalDoctors}
            </span>{" "}
            doctors
          </>
        ) : (
          "Showing 0 doctors"
        )}
      </div>

      {doctors?.length > 0 ? (
        <>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex w-full justify-center">
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-2 shadow-xl">
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className="flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ←
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                      handlePageChange(pageNumber)
                    }
                    className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                      currentPage === pageNumber
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-[280px] w-full items-center justify-center rounded-[32px] border border-dashed border-zinc-800">
          <p className="text-lg text-zinc-500">
            No doctors found.
          </p>
        </div>
      )}
    </div>
  );
}