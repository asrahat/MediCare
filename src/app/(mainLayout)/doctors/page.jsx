import DoctorListingContainer from "@/components/doctors/DoctorListingContainer";
import { getDoctors } from "@/lib/api/doctors";

const DoctorsPage = async ({ searchParams }) => {
  const filters = (await searchParams) || {};

  const cleanFilters = {
    search: filters.search || "",
    specialization: filters.specialization || "",
    experience: filters.experience || "",
    minFee: filters.minFee || "",
    maxFee: filters.maxFee || "",
    page: filters.page || "1",
  };

  const queryString = new URLSearchParams(cleanFilters).toString();

  const { doctors, total } = await getDoctors(queryString);

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-5 py-10 text-white sm:px-8 md:py-12 lg:px-12 xl:px-16 2xl:px-20">
      {/* Page Header */}
      <div className="mb-10 w-11/12 mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          Find Doctors
        </h1>

        <p className="mt-2 text-zinc-400">
          Search by specialization, experience, hospital
        </p>
      </div>

     
      <div className="w-full">
        <DoctorListingContainer
          filters={cleanFilters}
          doctors={doctors || []}
          total={total || 0}
        />
      </div>
    </div>
  );
};

export default DoctorsPage;