"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  CalendarCheck,
  RefreshCw,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getAdminAnalytics } from "@/lib/actions/adminAnalytics";
import Image from "next/image";



const getInitials = (name) => {
  if (!name) return "DR";

  const words =
    name.trim().split(/\s+/);

  if (words.length >= 2) {
    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  }

  return name
    .substring(0, 2)
    .toUpperCase();
};


const getRatingText = (rating) => {
  return Number(rating || 0).toFixed(1);
};


const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClass,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5 transition hover:border-[#29404F]">
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm text-[#94A3B8]">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-xs text-[#64748B]">
              {description}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>

      </div>
    </div>
  );
};



const RatingTooltip = ({
  active,
  payload,
}) => {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  const item =
    payload[0]?.payload;

  return (
    <div className="rounded-xl border border-[#29404F] bg-[#111827] px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-white">
        {item?.doctorName}
      </p>

      <p className="mt-1 text-xs text-[#94A3B8]">
        {item?.specialization}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <Star
          size={15}
          className="fill-yellow-400 text-yellow-400"
        />

        <span className="font-semibold text-yellow-400">
          {getRatingText(
            item?.averageRating
          )}
          /5
        </span>
      </div>

      <p className="mt-1 text-xs text-[#64748B]">
        {item?.totalReviews} reviews
      </p>
    </div>
  );
};



const AnalyticsPage = () => {
  const [analytics, setAnalytics] =
    useState({
      totalPatients: 0,
      totalDoctors: 0,
      totalAppointments: 0,
      overallRating: 0,
      doctorPerformance: [],
    });

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);


 
  const loadAnalytics = async ({
    refresh = false,
  } = {}) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const result =
        await getAdminAnalytics();

      if (result?.success) {
        setAnalytics(
          result.data
        );
      } else {
        console.error(
          result?.message ||
            "Failed to load analytics"
        );
      }
    } catch (error) {
      console.error(
        "Analytics loading error:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  useEffect(() => {
    loadAnalytics();
  }, []);


  const chartData = useMemo(() => {
    return (
      analytics.doctorPerformance || []
    )
      .slice(0, 10)
      .map((doctor) => ({
        ...doctor,

        shortName:
          doctor.doctorName
            ?.length > 18
            ? `${doctor.doctorName.substring(
                0,
                18
              )}...`
            : doctor.doctorName,

        averageRating:
          Number(
            doctor.averageRating || 0
          ),
      }));
  }, [
    analytics.doctorPerformance,
  ]);


  
  if (loading) {
    return (
      <main className="min-h-screen bg-[#080D19] px-4 py-6 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8 h-12 w-72 animate-pulse rounded-xl bg-[#111827]" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-2xl bg-[#111827]"
                />
              )
            )}

          </div>

          <div className="mt-6 h-[430px] animate-pulse rounded-2xl bg-[#111827]" />

        </div>

      </main>
    );
  }


 
  return (
    <main className="min-h-screen bg-[#080D19] px-4 py-6 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00A99D]/20 bg-[#00A99D]/10">

                <Activity
                  size={22}
                  className="text-[#00C2B5]"
                />

              </div>

              <div>

                <h1 className="text-2xl font-bold text-white">
                  Analytics
                </h1>

                <p className="text-sm text-[#64748B]">
                  Monitor platform performance and doctor ratings
                </p>

              </div>

            </div>

          </div>


          <button
            onClick={() =>
              loadAnalytics({
                refresh: true,
              })
            }
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#243247] bg-[#111827] px-4 py-2.5 text-sm font-semibold text-[#E2E8F0] transition hover:border-[#00A99D]/40 hover:bg-[#0B1220] disabled:cursor-not-allowed disabled:opacity-50"
          >

            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}

          </button>

        </div>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Patients"
            value={
              analytics.totalPatients
            }
            icon={Users}
            iconClass="bg-blue-500/10 text-blue-400"
            description="Registered patient accounts"
          />

          <StatCard
            title="Total Doctors"
            value={
              analytics.totalDoctors
            }
            icon={Stethoscope}
            iconClass="bg-[#00A99D]/10 text-[#00C2B5]"
            description="Doctor profiles"
          />

          <StatCard
            title="Total Appointments"
            value={
              analytics.totalAppointments
            }
            icon={CalendarCheck}
            iconClass="bg-purple-500/10 text-purple-400"
            description="All appointment records"
          />

          <StatCard
            title="Average Rating"
            value={`${getRatingText(
              analytics.overallRating
            )}/5`}
            icon={Star}
            iconClass="bg-yellow-500/10 text-yellow-400"
            description="Average doctor rating"
          />

        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">

          <div className="border-b border-[#243247] px-5 py-5">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-lg font-semibold text-white">
                  Doctor Performance
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  Doctor performance based on patient ratings
                </p>

              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[#243247] bg-[#0B1220] px-3 py-2">

                <Star
                  size={15}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="text-xs text-[#94A3B8]">
                  Rating out of 5
                </span>

              </div>

            </div>

          </div>


          <div className="p-5">

            {chartData.length === 0 ? (
              <div className="flex h-[380px] items-center justify-center">

                <div className="text-center">

                  <Star
                    size={40}
                    className="mx-auto mb-4 text-[#334155]"
                  />

                  <h3 className="font-semibold text-white">
                    No doctor ratings yet
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B]">
                    Doctor performance will appear here once patients submit reviews.
                  </p>

                </div>

              </div>
            ) : (
              <div className="h-[420px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#243247"
                      horizontal={false}
                    />

                    <XAxis
                      type="number"
                      domain={[0, 5]}
                      ticks={[
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                      ]}
                      tick={{
                        fill: "#94A3B8",
                        fontSize: 12,
                      }}
                      axisLine={{
                        stroke: "#243247",
                      }}
                      tickLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="shortName"
                      width={130}
                      tick={{
                        fill: "#E2E8F0",
                        fontSize: 12,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      cursor={{
                        fill: "rgba(0, 169, 157, 0.06)",
                      }}
                      content={
                        <RatingTooltip />
                      }
                    />

                    <Bar
                      dataKey="averageRating"
                      name="Rating"
                      radius={[
                        0,
                        8,
                        8,
                        0,
                      ]}
                      barSize={28}
                    >

                      {chartData.map(
                        (doctor) => (
                          <Cell
                            key={
                              doctor.doctorId
                            }
                            fill="#00A99D"
                          />
                        )
                      )}

                    </Bar>

                  </BarChart>

                </ResponsiveContainer>

              </div>
            )}

          </div>

        </section>


        {/* ================================================= */}
        {/* DOCTOR PERFORMANCE TABLE */}
        {/* ================================================= */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">

          <div className="border-b border-[#243247] px-5 py-5">

            <h2 className="text-lg font-semibold text-white">
              Doctor Rating Details
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Rating and review statistics for each doctor
            </p>

          </div>


          {analytics.doctorPerformance
            ?.length === 0 ? (
            <div className="px-5 py-14 text-center text-sm text-[#64748B]">
              No doctors found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead>

                  <tr className="border-b border-[#243247] bg-[#0B1220] text-left">

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Doctor
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Specialization
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Reviews
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Rating
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-[#243247]">

                  {analytics.doctorPerformance.map(
                    (doctor) => (
                      <tr
                        key={
                          doctor.doctorId
                        }
                        className="transition hover:bg-[#0B1220]/70"
                      >

                        {/* Doctor */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#29404F] bg-[#0B1220]">

                              {doctor.profileImage ? (
                                <Image
                                  width={18}
                                  height={18}
                                  src={
                                    doctor.profileImage
                                  }
                                  alt={
                                    doctor.doctorName
                                  }
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <span className="text-sm font-bold text-[#00C2B5]">
                                  {getInitials(
                                    doctor.doctorName
                                  )}
                                </span>
                              )}

                            </div>

                            <div>

                              <p className="font-medium text-white">
                                {
                                  doctor.doctorName
                                }
                              </p>

                              <p className="text-xs text-[#64748B]">
                                {doctor.experience || 0}{" "}
                                years experience
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Specialization */}

                        <td className="px-5 py-4">

                          <span className="text-sm text-[#CBD5E1]">
                            {
                              doctor.specialization ||
                              "N/A"
                            }
                          </span>

                        </td>


                        {/* Status */}

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                              doctor.verificationStatus ===
                              "verified"
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                : doctor.verificationStatus ===
                                  "rejected"
                                ? "border-red-500/20 bg-red-500/10 text-red-400"
                                : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {doctor.verificationStatus
                              ? doctor.verificationStatus
                                  .charAt(0)
                                  .toUpperCase() +
                                doctor.verificationStatus.slice(
                                  1
                                )
                              : "Pending"}
                          </span>

                        </td>


                 

                        <td className="px-5 py-4">

                          <span className="text-sm text-[#E2E8F0]">
                            {
                              doctor.totalReviews
                            }
                          </span>

                        </td>


                     

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2">

                            <Star
                              size={17}
                              className="fill-yellow-400 text-yellow-400"
                            />

                            <span className="font-semibold text-white">
                              {getRatingText(
                                doctor.averageRating
                              )}
                            </span>

                            <span className="text-xs text-[#64748B]">
                              / 5
                            </span>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>

    </main>
  );
};

export default AnalyticsPage;