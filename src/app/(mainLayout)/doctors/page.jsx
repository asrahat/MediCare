import DoctorListingContainer from "@/components/doctors/DoctorListingContainer";
import { getDoctors } from "@/lib/api/doctors";

const DoctorsPage = async ({searchParams}) => {
      // ✅ FIX 1: unwrap safely
  const filters = (await searchParams) || {};

  // ✅ Clean object (ONLY string values allowed in URLSearchParams)
  const cleanFilters = {
    search: filters.search || "",
    specialization: filters.specialization || "",
    experience: filters.experience || "",
    minFee: filters.minFee || "",
    maxFee: filters.maxFee || "",
    page: filters.page || "1",
  };

  // ✅ FIX 2: only pass safe string values
  const queryString = new URLSearchParams(cleanFilters).toString();

  const { doctors, total } = await getDoctors(queryString);

    return (
        <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">

      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Find Doctors
        </h1>
        <p className="text-zinc-400 mt-2">
          Search by specialization, experience, hospital
        </p>
      </div>

      <DoctorListingContainer
        filters={cleanFilters}
        doctors={doctors || []}
        total={total || 0}
      />

    </div>
    );
};

export default DoctorsPage;