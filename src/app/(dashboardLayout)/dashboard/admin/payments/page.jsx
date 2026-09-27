"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  DollarSign,
  Search,
  RefreshCw,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarDays,
  User,
  Stethoscope,
  Building2,
  Hash,
  WalletCards,
} from "lucide-react";

import { getAllPayments } from "@/lib/actions/adminPayment";

const formatDate = (value) => {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString(
      "en-BD",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  } catch {
    return "—";
  }
};

const formatAmount = (value) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const getStatusConfig = (status) => {
  const normalized = String(
    status || ""
  ).toLowerCase();

  if (
    normalized === "paid" ||
    normalized === "success" ||
    normalized === "successful"
  ) {
    return {
      label: "Paid",
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      icon: CheckCircle2,
    };
  }

  if (
    normalized === "pending" ||
    normalized === "processing"
  ) {
    return {
      label: "Pending",
      className:
        "border-amber-500/20 bg-amber-500/10 text-amber-400",
      icon: Clock3,
    };
  }

  if (
    normalized === "failed" ||
    normalized === "cancelled" ||
    normalized === "canceled"
  ) {
    return {
      label:
        normalized === "cancelled" ||
        normalized === "canceled"
          ? "Cancelled"
          : "Failed",
      className:
        "border-red-500/20 bg-red-500/10 text-red-400",
      icon: XCircle,
    };
  }

  return {
    label:
      status
        ? String(status)
            .charAt(0)
            .toUpperCase() +
          String(status).slice(1)
        : "Unknown",
    className:
      "border-slate-500/20 bg-slate-500/10 text-slate-400",
    icon: CreditCard,
  };
};

const PaymentManagementPage = () => {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [paymentStatus, setPaymentStatus] =
    useState("");

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const loadPayments = async ({
    isRefresh = false,
  } = {}) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const result =
        await getAllPayments({
          searchValue,
          paymentStatus,
          limit: 100,
          offset: 0,
        });

      if (result?.success) {
        setPayments(
          Array.isArray(result.data)
            ? result.data
            : []
        );

        setTotalRevenue(
          Number(
            result.totalRevenue || 0
          )
        );
      } else {
        setPayments([]);
        setTotalRevenue(0);

        console.error(
          result?.message ||
            "Failed to load payments"
        );
      }
    } catch (error) {
      console.error(
        "Load payments error:",
        error
      );

      setPayments([]);
      setTotalRevenue(0);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [paymentStatus]);

  const handleSearch = (e) => {
    e.preventDefault();

    loadPayments();
  };

  const handleRefresh = () => {
    loadPayments({
      isRefresh: true,
    });
  };

  const stats = useMemo(() => {
    const paid = payments.filter(
      (payment) => {
        const status = String(
          payment?.paymentStatus || ""
        ).toLowerCase();

        return (
          status === "paid" ||
          status === "success" ||
          status === "successful"
        );
      }
    ).length;

    const pending = payments.filter(
      (payment) => {
        const status = String(
          payment?.paymentStatus || ""
        ).toLowerCase();

        return (
          status === "pending" ||
          status === "processing"
        );
      }
    ).length;

    const failed = payments.filter(
      (payment) => {
        const status = String(
          payment?.paymentStatus || ""
        ).toLowerCase();

        return (
          status === "failed" ||
          status === "cancelled" ||
          status === "canceled"
        );
      }
    ).length;

    return {
      total: payments.length,
      paid,
      pending,
      failed,
    };
  }, [payments]);

  return (
    <main className="min-h-screen bg-[#080D19] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

    
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00A99D]/20 bg-[#00A99D]/10">
                <WalletCards
                  className="text-[#00C2B5]"
                  size={22}
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  Payment Management
                </h1>

                <p className="text-sm text-[#64748B]">
                  View and monitor all payment records
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleRefresh}
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

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total */}
          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">
                  Total Payments
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {stats.total}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00A99D]/10">
                <CreditCard
                  size={21}
                  className="text-[#00C2B5]"
                />
              </div>
            </div>
          </div>

          {/* Paid */}
          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">
                  Paid
                </p>

                <h2 className="mt-2 text-2xl font-bold text-emerald-400">
                  {stats.paid}
                </h2>
              </div>

              <CheckCircle2
                size={25}
                className="text-emerald-400"
              />
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">
                  Pending
                </p>

                <h2 className="mt-2 text-2xl font-bold text-amber-400">
                  {stats.pending}
                </h2>
              </div>

              <Clock3
                size={25}
                className="text-amber-400"
              />
            </div>
          </div>

          {/* Failed */}
          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">
                  Failed
                </p>

                <h2 className="mt-2 text-2xl font-bold text-red-400">
                  {stats.failed}
                </h2>
              </div>

              <XCircle
                size={25}
                className="text-red-400"
              />
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl border border-[#243247] bg-[#111827] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#94A3B8]">
                  Paid Revenue
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#00C2B5]">
                  {formatAmount(
                    totalRevenue
                  )}
                </h2>
              </div>

              <DollarSign
                size={25}
                className="text-[#00C2B5]"
              />
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-[#243247] bg-[#111827] p-4">

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 lg:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
              />

              <input
                type="text"
                value={searchValue}
                onChange={(e) =>
                  setSearchValue(
                    e.target.value
                  )
                }
                placeholder="Search doctor, hospital, user ID or session ID..."
                className="h-11 w-full rounded-xl border border-[#243247] bg-[#0B1220] pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#64748B] focus:border-[#00A99D]"
              />
            </div>

            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(
                  e.target.value
                )
              }
              className="h-11 rounded-xl border border-[#243247] bg-[#0B1220] px-4 text-sm text-[#E2E8F0] outline-none focus:border-[#00A99D]"
            >
              <option value="">
                All Payment Status
              </option>

              <option value="paid">
                Paid
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="failed">
                Failed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 text-sm font-semibold text-white transition hover:bg-[#00B8AA]"
            >
              <Search size={17} />
              Search
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#243247] bg-[#111827]">

          <div className="border-b border-[#243247] px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">
                  Payment Records
                </h2>

                <p className="mt-1 text-xs text-[#64748B]">
                  {payments.length} records displayed
                </p>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="space-y-3 p-5">
              {[1, 2, 3, 4, 5].map(
                (item) => (
                  <div
                    key={item}
                    className="h-24 animate-pulse rounded-xl bg-[#0B1220]"
                  />
                )
              )}
            </div>
          ) : payments.length === 0 ? (
            /* Empty */
            <div className="px-5 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00A99D]/10">
                <CreditCard
                  size={28}
                  className="text-[#00C2B5]"
                />
              </div>

              <h3 className="text-lg font-semibold text-white">
                No payment records found
              </h3>

              <p className="mt-2 text-sm text-[#64748B]">
                There are no payments matching
                your current search or filter.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#243247]">

              {payments.map(
                (payment, index) => {
                  const statusConfig =
                    getStatusConfig(
                      payment?.paymentStatus
                    );

                  const StatusIcon =
                    statusConfig.icon;

                  const paymentId =
                    payment?._id ||
                    `payment-${index}`;

                  return (
                    <div
                      key={paymentId}
                      className="p-5 transition hover:bg-[#0B1220]/70"
                    >
                      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">

                        {/* LEFT */}
                        <div className="min-w-0 flex-1">

                          <div className="flex flex-col gap-4 sm:flex-row">

                            {/* Icon */}
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00A99D]/20 bg-[#00A99D]/10">
                              <CreditCard
                                size={21}
                                className="text-[#00C2B5]"
                              />
                            </div>

                            {/* Main info */}
                            <div className="min-w-0 flex-1">

                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-white">
                                  {payment?.doctorName ||
                                    "Unknown Doctor"}
                                </h3>

                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusConfig.className}`}
                                >
                                  <StatusIcon
                                    size={13}
                                  />

                                  {
                                    statusConfig.label
                                  }
                                </span>
                              </div>

                              <p className="mt-1 text-sm text-[#94A3B8]">
                                {payment?.specialization ||
                                  "Specialization unavailable"}
                              </p>

                              {/* Details */}
                              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                                <div className="flex items-start gap-2">
                                  <User
                                    size={16}
                                    className="mt-0.5 shrink-0 text-[#64748B]"
                                  />

                                  <div className="min-w-0">
                                    <p className="text-xs text-[#64748B]">
                                      Patient User ID
                                    </p>

                                    <p className="mt-0.5 truncate text-sm text-[#E2E8F0]">
                                      {payment?.userId ||
                                        "—"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <Stethoscope
                                    size={16}
                                    className="mt-0.5 shrink-0 text-[#64748B]"
                                  />

                                  <div>
                                    <p className="text-xs text-[#64748B]">
                                      Doctor ID
                                    </p>

                                    <p className="mt-0.5 text-sm text-[#E2E8F0]">
                                      {payment?.doctorId ||
                                        "—"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <Building2
                                    size={16}
                                    className="mt-0.5 shrink-0 text-[#64748B]"
                                  />

                                  <div className="min-w-0">
                                    <p className="text-xs text-[#64748B]">
                                      Hospital / Clinic
                                    </p>

                                    <p className="mt-0.5 truncate text-sm text-[#E2E8F0]">
                                      {payment?.hospitalName ||
                                        "—"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <CalendarDays
                                    size={16}
                                    className="mt-0.5 shrink-0 text-[#64748B]"
                                  />

                                  <div>
                                    <p className="text-xs text-[#64748B]">
                                      Appointment
                                    </p>

                                    <p className="mt-0.5 text-sm text-[#E2E8F0]">
                                      {payment?.date ||
                                        "—"}
                                    </p>

                                    {payment?.availableSlot && (
                                      <p className="text-xs text-[#64748B]">
                                        {
                                          payment.availableSlot
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <Hash
                                    size={16}
                                    className="mt-0.5 shrink-0 text-[#64748B]"
                                  />

                                  <div className="min-w-0">
                                    <p className="text-xs text-[#64748B]">
                                      Stripe Session
                                    </p>

                                    <p className="mt-0.5 truncate text-sm text-[#E2E8F0]">
                                      {payment?.session_id ||
                                        "—"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <Clock3
                                    size={16}
                                    className="mt-0.5 shrink-0 text-[#64748B]"
                                  />

                                  <div>
                                    <p className="text-xs text-[#64748B]">
                                      Payment Date
                                    </p>

                                    <p className="mt-0.5 text-sm text-[#E2E8F0]">
                                      {formatDate(
                                        payment?.createdAt
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT - AMOUNT */}
                        <div className="shrink-0 rounded-xl border border-[#243247] bg-[#0B1220] px-5 py-4 xl:min-w-[150px]">
                          <p className="text-xs text-[#64748B]">
                            Amount
                          </p>

                          <p className="mt-1 text-xl font-bold text-[#00C2B5]">
                            {formatAmount(
                              payment?.consultationFee
                            )}
                          </p>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="mt-4 flex flex-col gap-2 border-t border-[#243247] pt-4 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between">

                        <span>
                          Payment ID:{" "}
                          <span className="text-[#94A3B8]">
                            {payment?._id ||
                              "—"}
                          </span>
                        </span>

                        <span>
                          Created:{" "}
                          <span className="text-[#94A3B8]">
                            {formatDate(
                              payment?.createdAt
                            )}
                          </span>
                        </span>
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

export default PaymentManagementPage;