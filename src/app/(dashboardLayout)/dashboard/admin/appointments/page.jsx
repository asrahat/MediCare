"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaSearch,
  FaRedo,
  FaUser,
  FaUserMd,
  FaHospital,
  FaMoneyBillWave,
  FaCreditCard,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  getAllAppointments,
} from "@/lib/actions/adminAppointment";


const ManageAppointments = () => {
  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    appointmentStatus,
    setAppointmentStatus,
  ] = useState("");

  const [
    paymentStatus,
    setPaymentStatus,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");


  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAllAppointments({
          searchValue: search,
          appointmentStatus,
          paymentStatus,
          limit: 100,
          offset: 0,
        });

      if (!result?.success) {
        setError(
          result?.message ||
            "Failed to load appointments"
        );

        setAppointments([]);

        return;
      }

      setAppointments(
        Array.isArray(result?.data)
          ? result.data
          : []
      );
    } catch (error) {
      console.error(
        "Load appointments error:",
        error
      );

      setError(
        "Failed to load appointments"
      );

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadAppointments();
  }, [
    appointmentStatus,
    paymentStatus,
  ]);


 
  const handleSearch = async (
    e
  ) => {
    e.preventDefault();

    await loadAppointments();
  };


  
  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    try {
      return new Date(
        date
      ).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
    } catch {
      return String(date);
    }
  };

  const formatCreatedAt = (
    date
  ) => {
    if (!date) {
      return "N/A";
    }

    try {
      return new Date(
        date
      ).toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      );
    } catch {
      return "N/A";
    }
  };


  const getAppointmentStatus =
    (status) => {
      switch (status) {
        case "confirmed":
          return {
            label: "Confirmed",
            icon: FaCheckCircle,
            className:
              "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
          };

        case "completed":
          return {
            label: "Completed",
            icon: FaCheckCircle,
            className:
              "border-teal-500/20 bg-teal-500/10 text-teal-400",
          };

        case "rejected":
          return {
            label: "Rejected",
            icon: FaTimesCircle,
            className:
              "border-red-500/20 bg-red-500/10 text-red-400",
          };

        case "cancelled":
        case "canceled":
          return {
            label: "Cancelled",
            icon: FaTimesCircle,
            className:
              "border-orange-500/20 bg-orange-500/10 text-orange-400",
          };

        case "rescheduled":
          return {
            label: "Rescheduled",
            icon: FaClock,
            className:
              "border-blue-500/20 bg-blue-500/10 text-blue-400",
          };

        case "pending":
        default:
          return {
            label: "Pending",
            icon: FaHourglassHalf,
            className:
              "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
          };
      }
    };



  const getPaymentStatus =
    (status) => {
      const value =
        String(status || "")
          .toLowerCase();

      if (
        value === "paid" ||
        value === "succeeded" ||
        value === "success"
      ) {
        return {
          label: "Paid",
          className:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        };
      }

      if (
        value === "failed" ||
        value === "cancelled" ||
        value === "canceled"
      ) {
        return {
          label:
            value === "failed"
              ? "Failed"
              : "Cancelled",
          className:
            "border-red-500/20 bg-red-500/10 text-red-400",
        };
      }

      return {
        label:
          status || "Unpaid",
        className:
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
      };
    };


  const statistics =
    useMemo(() => {
      return {
        total:
          appointments.length,

        pending:
          appointments.filter(
            (item) =>
              item.appointmentStatus ===
              "pending"
          ).length,

        confirmed:
          appointments.filter(
            (item) =>
              item.appointmentStatus ===
              "confirmed"
          ).length,

        completed:
          appointments.filter(
            (item) =>
              item.appointmentStatus ===
              "completed"
          ).length,

        rejected:
          appointments.filter(
            (item) =>
              item.appointmentStatus ===
              "rejected"
          ).length,
      };
    }, [appointments]);


  return (
    <main className="min-h-screen bg-[#080D19] px-4 py-6 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00A99D]/20 bg-[#00A99D]/10">
                <FaCalendarCheck className="text-xl text-[#00C2B5]" />
              </div>

              <div>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Manage Appointments
                </h1>

                <p className="mt-1 text-sm text-[#64748B]">
                  Monitor all patient appointments and their current status.
                </p>

              </div>

            </div>
          </div>


          <button
            type="button"
            onClick={loadAppointments}
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

            <span>
              {message}
            </span>

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

            <span>
              {error}
            </span>

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


  
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">

          {/* Total */}

          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-4">

            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Total
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {statistics.total}
            </p>

          </div>


          {/* Pending */}

          <div className="rounded-2xl border border-yellow-500/10 bg-[#111827] p-4">

            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-400">
              {statistics.pending}
            </p>

          </div>


          {/* Confirmed */}

          <div className="rounded-2xl border border-emerald-500/10 bg-[#111827] p-4">

            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Confirmed
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {statistics.confirmed}
            </p>

          </div>


          {/* Completed */}

          <div className="rounded-2xl border border-teal-500/10 bg-[#111827] p-4">

            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Completed
            </p>

            <p className="mt-2 text-2xl font-bold text-teal-400">
              {statistics.completed}
            </p>

          </div>


          {/* Rejected */}

          <div className="rounded-2xl border border-red-500/10 bg-[#111827] p-4">

            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Rejected
            </p>

            <p className="mt-2 text-2xl font-bold text-red-400">
              {statistics.rejected}
            </p>

          </div>

        </div>


        <div className="mb-6 rounded-2xl border border-[#243247] bg-[#111827] p-4">

          <form
            onSubmit={handleSearch}
            className="grid gap-3 lg:grid-cols-[1fr_200px_180px_auto]"
          >

            {/* Search */}

            <div className="relative">

              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search doctor, specialization, hospital..."
                className="w-full rounded-xl border border-[#243247] bg-[#0B1220] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#64748B] focus:border-[#00A99D]"
              />

            </div>


            {/* Appointment Status */}

            <select
              value={
                appointmentStatus
              }
              onChange={(e) =>
                setAppointmentStatus(
                  e.target.value
                )
              }
              className="rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 text-sm text-[#E2E8F0] outline-none focus:border-[#00A99D]"
            >

              <option value="">
                All Appointment Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="rejected">
                Rejected
              </option>

              <option value="cancelled">
                Cancelled
              </option>

              <option value="rescheduled">
                Rescheduled
              </option>

            </select>


            {/* Payment Status */}

            <select
              value={
                paymentStatus
              }
              onChange={(e) =>
                setPaymentStatus(
                  e.target.value
                )
              }
              className="rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3 text-sm text-[#E2E8F0] outline-none focus:border-[#00A99D]"
            >

              <option value="">
                All Payment Status
              </option>

              <option value="paid">
                Paid
              </option>

              <option value="unpaid">
                Unpaid
              </option>

              <option value="failed">
                Failed
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

          {/* Header */}

          <div className="border-b border-[#243247] px-5 py-4">

            <h2 className="font-semibold text-white">
              All Appointments
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Monitor appointment schedules, payment status and appointment progress.
            </p>

          </div>


          {/* Loading */}

          {loading ? (

            <div className="space-y-3 p-5">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="h-36 animate-pulse rounded-xl bg-[#0B1220]"
                  />
                )
              )}

            </div>

          ) : appointments.length ===
            0 ? (

            /* Empty */

            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#243247] bg-[#0B1220]">

                <FaCalendarCheck className="text-2xl text-[#64748B]" />

              </div>

              <h3 className="font-semibold text-white">
                No appointments found
              </h3>

              <p className="mt-2 max-w-md text-sm text-[#64748B]">
                There are no appointments matching your current search or filters.
              </p>

            </div>

          ) : (

            /* Appointment list */

            <div className="divide-y divide-[#243247]">

              {appointments.map(
                (appointment) => {

                  const appointmentId =
                    appointment?._id ||
                    appointment?.id;

                  const statusInfo =
                    getAppointmentStatus(
                      appointment?.appointmentStatus
                    );

                  const StatusIcon =
                    statusInfo.icon;

                  const paymentInfo =
                    getPaymentStatus(
                      appointment?.paymentStatus
                    );

                  return (

                    <div
                      key={String(
                        appointmentId
                      )}
                      className="p-5 transition hover:bg-[#0B1220]/60"
                    >

                      <div className="flex flex-col gap-5">

                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">

                          {/* Doctor */}

                          <div>

                            <div className="flex flex-wrap items-center gap-2">

                              <h3 className="text-base font-semibold text-white">
                                Dr.{" "}
                                {
                                  appointment?.doctorName ||
                                  "Unknown Doctor"
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
                                appointment?.specialization ||
                                "Specialization not available"
                              }
                            </p>

                          </div>


                          {/* Payment */}

                          <span
                            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${paymentInfo.className}`}
                          >

                            <FaCreditCard />

                            {
                              paymentInfo.label
                            }

                          </span>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                          {/* Patient */}

                          <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-3">

                            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#64748B]">

                              <FaUser />

                              Patient

                            </div>

                            <p className="truncate text-sm font-medium text-[#E2E8F0]">

                              User ID

                            </p>

                            <p className="mt-1 truncate text-xs text-[#64748B]">

                              {
                                appointment?.userId ||
                                "N/A"
                              }

                            </p>

                          </div>


                          {/* Doctor */}

                          <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-3">

                            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#64748B]">

                              <FaUserMd />

                              Doctor

                            </div>

                            <p className="truncate text-sm font-medium text-[#E2E8F0]">

                              Dr.{" "}
                              {
                                appointment?.doctorName ||
                                "N/A"
                              }

                            </p>

                            <p className="mt-1 truncate text-xs text-[#64748B]">

                              ID:{" "}
                              {
                                appointment?.doctorId ||
                                "N/A"
                              }

                            </p>

                          </div>


                          {/* Date & Time */}

                          <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-3">

                            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#64748B]">

                              <FaClock />

                              Schedule

                            </div>

                            <p className="text-sm font-medium text-[#E2E8F0]">

                              {
                                formatDate(
                                  appointment?.date
                                )
                              }

                            </p>

                            <p className="mt-1 text-xs text-[#64748B]">

                              {
                                appointment?.availableSlot ||
                                "Time not available"
                              }

                            </p>

                          </div>


                          {/* Fee */}

                          <div className="rounded-xl border border-[#243247] bg-[#0B1220] p-3">

                            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#64748B]">

                              <FaMoneyBillWave />

                              Consultation Fee

                            </div>

                            <p className="text-sm font-semibold text-[#00C2B5]">

                              ৳{" "}

                              {
                                Number(
                                  appointment?.consultationFee ||
                                  0
                                ).toLocaleString()
                              }

                            </p>

                            <p className="mt-1 text-xs text-[#64748B]">

                              {
                                appointment?.paymentStatus ||
                                "unpaid"
                              }

                            </p>

                          </div>

                        </div>


                        <div className="grid gap-3 md:grid-cols-2">

                          {/* Hospital */}

                          <div className="rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3">

                            <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">

                              <FaHospital />

                              Hospital / Clinic

                            </div>

                            <p className="mt-1 text-sm text-[#E2E8F0]">

                              {
                                appointment?.hospitalName ||
                                "Not provided"
                              }

                            </p>

                          </div>


                          <div className="rounded-xl border border-[#243247] bg-[#0B1220] px-4 py-3">

                            <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">

                              <FaExclamationTriangle />

                              Patient Symptoms

                            </div>

                            <p className="mt-1 line-clamp-2 text-sm text-[#E2E8F0]">

                              {
                                appointment?.symptoms ||
                                "No symptoms provided"
                              }

                            </p>

                          </div>

                        </div>


                       
                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#243247] pt-3 text-xs text-[#64748B]">

                          <span>
                            Appointment ID:{" "}
                            <span className="text-[#94A3B8]">
                              {
                                String(
                                  appointmentId ||
                                    ""
                                )
                              }
                            </span>
                          </span>

                          <span>
                            Created:{" "}
                            {
                              formatCreatedAt(
                                appointment?.createdAt
                              )
                            }
                          </span>

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


export default ManageAppointments;