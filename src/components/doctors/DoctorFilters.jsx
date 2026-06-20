"use client";

import React from "react";

export default function DoctorFilters({
  searchQuery,
  setSearchQuery,
  selectedSpecialization,
  setSelectedSpecialization,
  minExperience,
  setMinExperience
}) {

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 max-w-7xl mx-auto mb-10">

      <div className="grid md:grid-cols-3 gap-4">

        <input
          className="p-2 bg-zinc-800 rounded"
          placeholder="Search doctor, hospital..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        >
          <option value="all">All Specialization</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
        </select>

        <input
          type="number"
          placeholder="Min Experience"
          className="p-2 bg-zinc-800 rounded"
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
        />

      </div>

    </div>
  );
}