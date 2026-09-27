"use client";

import React from "react";

export default function DoctorFilters({
  searchQuery,
  setSearchQuery,
  selectedSpecialization,
  setSelectedSpecialization,
  minExperience,
  setMinExperience,
}) {
  return (
    <div className="mb-10 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {/* Search */}
        <input
          type="text"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          placeholder="Search doctor, hospital..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Specialization */}
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        >
          <option value="all">All Specializations</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
        </select>

        {/* Experience */}
        <input
          type="number"
          min="0"
          placeholder="Minimum Experience (years)"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
        />
      </div>
    </div>
  );
}