import DoctorListingContainer from "@/components/doctors/DoctorListingContainer";
import { getDoctors } from "@/lib/api/doctors";

export const metadata = {
  title: "Doctors",
  description:
    "Discover healthcare professionals and find the right doctor for your needs.",
};

const DoctorsPage = async ({ searchParams }) => {
const filters = (await searchParams) || {};

const cleanFilters = {
search: filters.search || "",
specialization: filters.specialization || "",
experience: filters.experience || "",
minFee: filters.minFee || "",
maxFee: filters.maxFee || "",
verificationStatus: "verified",
};

const queryString = new URLSearchParams(
cleanFilters
).toString();

const { doctors } = await getDoctors(queryString);

return ( <div className="min-h-screen w-full bg-zinc-950 px-5 py-10 text-white sm:px-8 md:py-12 lg:px-12 xl:px-16 2xl:px-20"> <div className="mb-10 mx-auto w-11/12"> <h1 className="text-4xl font-bold tracking-tight">
Find Doctors </h1>

```
    <p className="mt-2 text-zinc-400">
      Search by specialization, experience, hospital
    </p>
  </div>

  <div className="w-full">
    <DoctorListingContainer
      filters={cleanFilters}
      doctors={doctors || []}
    />
  </div>
</div>


);
};

export default DoctorsPage;
