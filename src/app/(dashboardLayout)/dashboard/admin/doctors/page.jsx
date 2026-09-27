"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaTimesCircle,
  FaUserMd,
  FaBan,
  FaHospital,
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";

import {
  getAllDoctors,
  verifyDoctor,
  rejectDoctor,
  cancelDoctorVerification,
} from "@/lib/actions/adminDoctor";
import Image from "next/image";


const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAllDoctors({
          searchValue: search,
          verificationStatus:
            statusFilter,
          limit: 100,
          offset: 0,
        });

      if (!result?.success) {
        setError(
          result?.message ||
            "Failed to load doctors"
        );

        setDoctors([]);
        return;
      }

      setDoctors(
        Array.isArray(result?.data)
          ? result.data
          : []
      );
    } catch (error) {
      console.error(
        "Load doctors error:",
        error
      );

      setError(
        "Failed to load doctors"
      );

      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadDoctors();
  }, [statusFilter]);


  const handleSearch = async (
    e
  ) => {
    e.preventDefault();

    await loadDoctors();
  };


  const getDoctorId = (doctor) => {
    if (!doctor) return null;

    if (doctor._id) {
      return String(doctor._id);
    }

    if (doctor.id) {
      return String(doctor.id);
    }

    return null;
  };


 
  const getInitials = (doctor) => {
    const name =
      doctor?.doctorName?.trim();

    if (!name) {
      return "DR";
    }

    const words =
      name.split(/\s+/);

    if (words.length >= 2) {
      return (
        words[0].charAt(0) +
        words[
          words.length - 1
        ].charAt(0)
      ).toUpperCase();
    }

    return name
      .substring(0, 2)
      .toUpperCase();
  };



  const getStatusInfo = (
    status
  ) => {
    switch (status) {
      case "verified":
        return {
          label: "Verified",
          icon: FaCheckCircle,
          className:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        };

      case "rejected":
        return {
          label: "Rejected",
          icon: FaTimesCircle,
          className:
            "border-red-500/20 bg-red-500/10 text-red-400",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          icon: FaBan,
          className:
            "border-orange-500/20 bg-orange-500/10 text-orange-400",
        };

      case "pending":
      default:
        return {
          label: "Pending",
          icon: FaClock,
          className:
            "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
        };
    }
  };


  const handleVerify = async (
    doctor
  ) => {
    const doctorId =
      getDoctorId(doctor);

    if (!doctorId) {
      setError(
        "Doctor ID is missing"
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to verify Dr. ${doctor.doctorName}?`
      );

    if (!confirmed) return;

    try {
      setActionLoading(
        `${doctorId}-verify`
      );

      setError("");
      setMessage("");

      const result =
        await verifyDoctor(
          doctorId
        );

      if (!result?.success) {
        setError(
          result?.message ||
            "Failed to verify doctor"
        );
        return;
      }

      setMessage(
        "Doctor verified successfully."
      );

      await loadDoctors();
    } catch (error) {
      console.error(
        "Verify doctor error:",
        error
      );

      setError(
        "Failed to verify doctor"
      );
    } finally {
      setActionLoading(null);
    }
  };


 
  const handleReject = async (
    doctor
  ) => {
    const doctorId =
      getDoctorId(doctor);

    if (!doctorId) {
      setError(
        "Doctor ID is missing"
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to reject Dr. ${doctor.doctorName}'s verification?`
      );

    if (!confirmed) return;

    try {
      setActionLoading(
        `${doctorId}-reject`
      );

      setError("");
      setMessage("");

      const result =
        await rejectDoctor(
          doctorId
        );

      if (!result?.success) {
        setError(
          result?.message ||
            "Failed to reject doctor"
        );
        return;
      }

      setMessage(
        "Doctor verification rejected."
      );

      await loadDoctors();
    } catch (error) {
      console.error(
        "Reject doctor error:",
        error
      );

      setError(
        "Failed to reject doctor"
      );
    } finally {
      setActionLoading(null);
    }
  };


  const handleCancelVerification =
    async (doctor) => {
      const doctorId =
        getDoctorId(doctor);

      if (!doctorId) {
        setError(
          "Doctor ID is missing"
        );
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to cancel Dr. ${doctor.doctorName}'s verification?`
        );

      if (!confirmed) return;

      try {
        setActionLoading(
          `${doctorId}-cancel`
        );

        setError("");
        setMessage("");

        const result =
          await cancelDoctorVerification(
            doctorId
          );

        if (!result?.success) {
          setError(
            result?.message ||
              "Failed to cancel verification"
          );
          return;
        }

        setMessage(
          "Doctor verification cancelled."
        );

        await loadDoctors();
      } catch (error) {
        console.error(
          "Cancel verification error:",
          error
        );

        setError(
          "Failed to cancel verification"
        );
      } finally {
        setActionLoading(null);
      }
    };


  const statistics =
    useMemo(() => {
      return {
        total: doctors.length,

        pending:
          doctors.filter(
            (doctor) =>
              doctor.verificationStatus ===
              "pending"
          ).length,

        verified:
          doctors.filter(
            (doctor) =>
              doctor.verificationStatus ===
              "verified"
          ).length,

        rejected:
          doctors.filter(
            (doctor) =>
              doctor.verificationStatus ===
              "rejected"
          ).length,

        cancelled:
          doctors.filter(
            (doctor) =>
              doctor.verificationStatus ===
              "cancelled"
          ).length,
      };
    }, [doctors]);


  return (
    <main className="min-h-screen bg-[#080D19] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00A99D]/20 bg-[#00A99D]/10">
                <FaUserMd className="text-xl text-[#00C2B5]" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Manage Doctors
                </h1>

                <p className="mt-1 text-sm text-[#64748B]">
                  Review and manage doctor verification requests.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={loadDoctors}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#243247] bg-[#111827] px-4 py-2.5 text-sm font-semibold text-[#E2E8F0] transition hover:border-[#00A99D]/50 hover:bg-[#0B1220] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaRedo
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>


        {message && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <FaCheckCircle />

            <span>{message}</span>

            <button
              type="button"
              onClick={() =>
                setMessage("")
              }
              className="ml-auto text-lg opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <FaExclamationTriangle />

            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="ml-auto text-lg opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        )}


    
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">

          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Total Doctors
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {statistics.total}
            </p>
          </div>


          <div className="rounded-2xl border border-yellow-500/10 bg-[#111827] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-400">
              {statistics.pending}
            </p>
          </div>


          <div className="rounded-2xl border border-emerald-500/10 bg-[#111827] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Verified
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {statistics.verified}
            </p>
          </div>


          <div className="rounded-2xl border border-red-500/10 bg-[#111827] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Rejected
            </p>

            <p className="mt-2 text-2xl font-bold text-red-400">
              {statistics.rejected}
            </p>
          </div>


          <div className="rounded-2xl border border-orange-500/10 bg-[#111827] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Cancelled
            </p>

            <p className="mt-2 text-2xl font-bold text-orange-400">
              {statistics.cancelled}
            </p>
          </div>

        </div>


        <div className="mb-6 rounded-2xl border border-[#243247] bg-[#111827] p-4">

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 lg:flex-row"
          >

            <div className="relative flex-1">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search by doctor name, specialization or hospital..."
                className="w-full rounded-xl border border-[#243247] bg-[#0B1220] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#64748B] focus:border-[#00A99D]"
              />
            </div>


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 text-sm text-[#E2E8F0] outline-none focus:border-[#00A99D]"
            >
              <option value="">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="verified">
                Verified
              </option>

              <option value="rejected">
                Rejected
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>


            <button
              type="submit"
              className="rounded-xl bg-[#00A99D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00B8AA]"
            >
              Search
            </button>

          </form>

        </div>


        <div className="overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">

          <div className="border-b border-[#243247] px-5 py-4">
            <h2 className="font-semibold text-white">
              Doctor Verification Requests
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Only administrators can change doctor verification status.
            </p>
          </div>


          {loading ? (
            <div className="space-y-3 p-5">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="h-24 animate-pulse rounded-xl bg-[#0B1220]"
                  />
                )
              )}

            </div>
          ) : doctors.length === 0 ? (

            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#243247] bg-[#0B1220]">
                <FaUserMd className="text-2xl text-[#64748B]" />
              </div>

              <h3 className="font-semibold text-white">
                No doctors found
              </h3>

              <p className="mt-2 max-w-md text-sm text-[#64748B]">
                No doctor profiles match your current search or filter.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-[#243247]">

              {doctors.map(
                (doctor) => {
                  const doctorId =
                    getDoctorId(
                      doctor
                    );

                  const statusInfo =
                    getStatusInfo(
                      doctor.verificationStatus
                    );

                  const StatusIcon =
                    statusInfo.icon;

                  const profileImage =
                    doctor?.profileImage;

                  return (
                    <div
                      key={doctorId}
                      className="p-5 transition hover:bg-[#0B1220]/60"
                    >

                      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                     
                        <div className="flex min-w-0 flex-1 gap-4">

                          {/* Avatar */}

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#29404F] bg-[#0B1220]">

                            {profileImage ? (
                              <Image
                                width={18}
                                height={18}
                                src={profileImage}
                                alt={
                                  doctor.doctorName ||
                                  "Doctor"
                                }
                                className="h-full w-full object-cover"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <span className="text-sm font-bold text-[#00C2B5]">
                                {getInitials(
                                  doctor
                                )}
                              </span>
                            )}

                          </div>


                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h3 className="truncate text-base font-semibold text-white">
                                Dr.{" "}
                                {
                                  doctor.doctorName
                                }
                              </h3>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
                              >
                                <StatusIcon />

                                {
                                  statusInfo.label
                                }
                              </span>

                            </div>


                            <p className="mt-1 text-sm text-[#94A3B8]">
                              {
                                doctor.specialization ||
                                "Specialization not provided"
                              }
                            </p>


                            {/* Details */}

                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#64748B]">

                              {doctor.hospitalName && (
                                <span className="inline-flex items-center gap-1.5">
                                  <FaHospital />

                                  {
                                    doctor.hospitalName
                                  }
                                </span>
                              )}


                              {doctor.experience !==
                                undefined && (
                                <span className="inline-flex items-center gap-1.5">
                                  <FaBriefcase />

                                  {
                                    doctor.experience
                                  }{" "}
                                  years
                                </span>
                              )}


                              {doctor.consultationFee !==
                                undefined && (
                                <span className="inline-flex items-center gap-1.5">
                                  <FaMoneyBillWave />

                                  ৳
                                  {
                                    doctor.consultationFee
                                  }
                                </span>
                              )}

                            </div>


                            {/* Qualifications */}

                            {Array.isArray(
                              doctor.qualifications
                            ) &&
                              doctor
                                .qualifications
                                .length >
                                0 && (
                                <div className="mt-3 flex items-start gap-2 text-xs text-[#64748B]">

                                  <FaGraduationCap className="mt-0.5 shrink-0" />

                                  <span>
                                    {doctor.qualifications.join(
                                      " • "
                                    )}
                                  </span>

                                </div>
                              )}

                          </div>

                        </div>


                        <div className="flex shrink-0 flex-wrap gap-2">

                          {doctor.verificationStatus ===
                            "pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleVerify(
                                    doctor
                                  )
                                }
                                disabled={
                                  actionLoading !==
                                  null
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <FaCheckCircle />

                                {actionLoading ===
                                `${doctorId}-verify`
                                  ? "Verifying..."
                                  : "Verify"}
                              </button>


                              <button
                                type="button"
                                onClick={() =>
                                  handleReject(
                                    doctor
                                  )
                                }
                                disabled={
                                  actionLoading !==
                                  null
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 ring-1 ring-red-500/20 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <FaTimesCircle />

                                {actionLoading ===
                                `${doctorId}-reject`
                                  ? "Rejecting..."
                                  : "Reject"}
                              </button>
                            </>
                          )}


                          {doctor.verificationStatus ===
                            "verified" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleCancelVerification(
                                  doctor
                                )
                              }
                              disabled={
                                actionLoading !==
                                null
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500/10 px-4 py-2.5 text-xs font-semibold text-orange-400 ring-1 ring-orange-500/20 transition hover:bg-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FaBan />

                              {actionLoading ===
                              `${doctorId}-cancel`
                                ? "Cancelling..."
                                : "Cancel Verification"}
                            </button>
                          )}


                          {doctor.verificationStatus ===
                            "rejected" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleVerify(
                                  doctor
                                )
                              }
                              disabled={
                                actionLoading !==
                                null
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FaCheckCircle />

                              {actionLoading ===
                              `${doctorId}-verify`
                                ? "Verifying..."
                                : "Verify Again"}
                            </button>
                          )}


                          {doctor.verificationStatus ===
                            "cancelled" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleVerify(
                                  doctor
                                )
                              }
                              disabled={
                                actionLoading !==
                                null
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FaCheckCircle />

                              {actionLoading ===
                              `${doctorId}-verify`
                                ? "Verifying..."
                                : "Verify Again"}
                            </button>
                          )}

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>

      </div>
    </main>
  );
};

export default ManageDoctors;