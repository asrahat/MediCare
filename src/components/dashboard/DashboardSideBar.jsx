// import Logo from "@/components/Logo";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaBuilding, FaCalendarAlt, FaHistory, FaHome, FaPlus, FaSignOutAlt, FaTicketAlt, FaUserCircle, FaUsers, FaUserShield, FaChartPie,
  FaCalendarCheck,
  FaClock,
  FaFilePrescription,
  FaUserMd,
  FaCreditCard,
  FaStar,
  FaHospital,
  FaMoneyBillWave,
  FaChartLine} from "react-icons/fa";




const DashboardSideBar = () => {
  const { data: session } = useSession();
  const handleLogout = () => {

  }


  const doctorMenu = [
  {
    key: "overview",
    label: "Overview",
    icon: FaChartPie,
    href: "/dashboard/doctor",
  },
  {
    key: "schedule",
    label: "Manage Schedule",
    icon: FaClock,
    href: "/dashboard/doctor/schedule",
  },
  {
    key: "appointments",
    label: "Appointment Requests",
    icon: FaCalendarCheck,
    href: "/dashboard/doctor/appointments",
  },
  {
    key: "prescriptions",
    label: "Prescription Management",
    icon: FaFilePrescription,
    href: "/dashboard/doctor/prescriptions",
  },
  {
    key: "profile",
    label: "Profile Management",
    icon: FaUserMd,
    href: "/dashboard/doctor/profile",
  },
];

const patientMenu = [
  {
    key: "overview",
    label: "Overview",
    icon: FaChartPie,
    href: "/dashboard/patient",
  },
  {
    key: "appointments",
    label: "My Appointments",
    icon: FaCalendarCheck,
    href: "/dashboard/patient/appointments",
  },
  {
    key: "payments",
    label: "Payment History",
    icon: FaCreditCard,
    href: "/dashboard/patient/payments",
  },
  {
    key: "reviews",
    label: "My Reviews",
    icon: FaStar,
    href: "/dashboard/patient/reviews",
  },
  {
    key: "profile",
    label: "Profile",
    icon: FaUserCircle,
    href: "/dashboard/patient/profile",
  },
];

const adminMenu = [
  {
    key: "users",
    label: "Manage Users",
    icon: FaUsers,
    href: "/dashboard/admin/users",
  },
  {
    key: "doctors",
    label: "Manage Doctors",
    icon: FaUserMd,
    href: "/dashboard/admin/doctors",
  },
  {
    key: "appointments",
    label: "Manage Appointments",
    icon: FaCalendarCheck,
    href: "/dashboard/admin/appointments",
  },
  {
    key: "payments",
    label: "Payment Management",
    icon: FaMoneyBillWave,
    href: "/dashboard/admin/payments",
  },
  {
    key: "hospitals",
    label: "Hospitals & Clinics",
    icon: FaHospital,
    href: "/dashboard/admin/hospitals",
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: FaChartLine,
    href: "/dashboard/admin/analytics",
  },
  {
    key: "admins",
    label: "Admin Management",
    icon: FaUserShield,
    href: "/dashboard/admin/roles",
  },
];

  const role = session?.user?.role;

  const manuItems = role === "doctor" ? doctorMenu : role === "patient" ? patientMenu : role === "admin" ? adminMenu : null;

  return (
    <aside className="w-64 h-screen border-r border-white/5">
      <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
        {/* Brand / Logo */}
        <div className="px-6 py-5 border-b border-white/5">
          {/* <Logo /> */}
          Medicare
        </div>

        {/* User Profile */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
              <Image
                width={40}
                height={40}
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent("Jane Doe")}&background=7c3aed&color=fff&bold=true`}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate leading-tight">
                {session?.user?.name}
              </p>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "organizer" ? "text-indigo-400" : "text-pink-400"}`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">Navigation</p>
          {
            manuItems?.map(({ key, label, icon: Icon, href }) => {

              return (
                <Link
                  key={key}
                  href={href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer text-slate-400 hover:text-white hover:bg-white/5"
                            `}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-white/5 text-slate-400`}>
                    <Icon size={20} />
                  </span>
                  <span>{label}</span>


                  {/* {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />} */}
                </Link>
              )
            })
          }

        </nav>

        {/* Bottom Links */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaHome size={13} />
            </span>
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaSignOutAlt size={13} />
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;