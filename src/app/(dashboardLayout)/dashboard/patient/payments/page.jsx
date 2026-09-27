import { getPayments  } from "@/lib/actions/payment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const Payments = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#060914] p-6 text-white">
        <div className="rounded-xl border border-white/10 bg-[#0b1020] p-8 text-center">
          <h2 className="text-lg font-semibold">Please login first</h2>
        </div>
      </div>
    );
  }

  const paymentResponse = await getPayments (userId);
  const payments = paymentResponse?.data || [];

  return (
    <div className=" min-h-screen bg-[#060914] px-4 py-6 text-white sm:px-6 lg:px-8">
  
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Stripe Payment Transactions
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          View your consultation payment history
        </p>
      </div>


      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-xl">
    
        <div className="hidden grid-cols-5 border-b border-white/10 bg-[#0e1425] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid">
          <div>Paid Practitioner</div>
          <div>Stripe Session / TXID</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Status</div>
        </div>


        {payments.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-xl">
              $
            </div>

            <h3 className="text-base font-semibold text-white">
              No payment history
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Your payment transactions will appear here.
            </p>
          </div>
        )}


        {payments.map((payment) => {
        
          const paymentStatus =
            payment.paymentStatus || payment.status || "unknown";


          const normalizedStatus = paymentStatus.toLowerCase();

          const isPaid =
            normalizedStatus === "paid" ||
            normalizedStatus === "success" ||
            normalizedStatus === "succeeded" ||
            normalizedStatus === "complete" ||
            normalizedStatus === "completed";

          const isFailed =
            normalizedStatus === "failed" ||
            normalizedStatus === "failure" ||
            normalizedStatus === "cancelled" ||
            normalizedStatus === "canceled";

          const isPending =
            normalizedStatus === "pending" ||
            normalizedStatus === "unpaid" ||
            normalizedStatus === "processing";

          let statusClasses =
            "border-yellow-400/20 bg-yellow-400/10 text-yellow-400";

          let dotClasses = "bg-yellow-400";

          if (isPaid) {
            statusClasses =
              "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";

            dotClasses = "bg-emerald-400";
          } else if (isFailed) {
            statusClasses =
              "border-red-400/20 bg-red-400/10 text-red-400";

            dotClasses = "bg-red-400";
          } else if (isPending) {
            statusClasses =
              "border-yellow-400/20 bg-yellow-400/10 text-yellow-400";

            dotClasses = "bg-yellow-400";
          }

          return (
            <div
              key={payment._id}
              className="border-b border-white/10 px-5 py-5 last:border-b-0 transition-colors hover:bg-white/[0.02]"
            >
  
              <div className="hidden grid-cols-5 items-center gap-4 md:grid">
      
                <div>
                  <p className="font-semibold text-slate-100">
                    {payment.doctorName || "Unknown Doctor"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Consultation
                  </p>
                </div>

          
                <div>
                  <p
                    className="max-w-[190px] truncate font-mono text-sm text-slate-400"
                    title={payment.session_id}
                  >
                    {payment.session_id || "N/A"}
                  </p>
                </div>

        
                <div>
                  <p className="font-bold text-emerald-400">
                    ${Number(payment.consultationFee || 0).toFixed(2)}
                  </p>
                </div>

         
                <div>
                  <p className="text-sm text-slate-300">
                    {formatDate(payment.date || payment.createdAt)}
                  </p>
                </div>

    
                <div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${dotClasses}`}
                    />

                    {formatStatus(paymentStatus)}
                  </span>
                </div>
              </div>

        
              <div className="space-y-4 md:hidden">
     
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-100">
                      {payment.doctorName || "Unknown Doctor"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Consultation
                    </p>
                  </div>

         
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase ${statusClasses}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${dotClasses}`}
                    />

                    {formatStatus(paymentStatus)}
                  </span>
                </div>


                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Amount
                    </p>

                    <p className="font-bold text-emerald-400">
                      ${Number(payment.consultationFee || 0).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </p>

                    <p className="text-sm text-slate-300">
                      {formatDate(payment.date || payment.createdAt)}
                    </p>
                  </div>
                </div>

     
                <div className="border-t border-white/10 pt-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Stripe Session ID
                  </p>

                  <p
                    className="truncate font-mono text-xs text-slate-400"
                    title={payment.session_id}
                  >
                    {payment.session_id || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date);
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};


const formatStatus = (status) => {
  if (!status) return "Unknown";

  return String(status)
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default Payments;