import DashboardSideBar from "@/components/dashboard/DashboardSideBar";
const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080c16]">
      {" "}
      <DashboardSideBar /> {" "}
      <main className="min-h-screen lg:ml-64">
        {" "}
        <div className="w-full px-4 py-20 sm:px-6 sm:py-20 lg:px-8 lg:py-10">
          {" "}
          {children}{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
};
export default DashboardLayout;
