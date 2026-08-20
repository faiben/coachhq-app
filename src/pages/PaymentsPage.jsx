import { useState } from "react";
import { useTranslation } from "react-i18next";

const demoTransactions = [
  { id: "TXN-83921", client: "Client_A4F2C9", course: "Leadership Mastery", amount: 4500, method: "CMI", status: "completed", date: "2026-08-18" },
  { id: "TXN-83922", client: "Client_B7D1E3", course: "Executive Coaching", amount: 6200, method: "PayMob", status: "completed", date: "2026-08-17" },
  { id: "TXN-83923", client: "Client_C2A8F5", course: "Career Transition", amount: 3800, method: "CMI", status: "pending", date: "2026-08-16" },
  { id: "TXN-83924", client: "Client_D9E4B1", course: "Leadership Mastery", amount: 4500, method: "PayMob", status: "completed", date: "2026-08-15" },
  { id: "TXN-83925", client: "Client_E5C3D7", course: "Team Building Workshop", amount: 8500, method: "CMI", status: "pending", date: "2026-08-14" },
  { id: "TXN-83926", client: "Client_F1A6G2", course: "Executive Coaching", amount: 6200, method: "PayMob", status: "failed", date: "2026-08-13" },
  { id: "TXN-83927", client: "Client_G8B5H4", course: "Career Transition", amount: 3800, method: "CMI", status: "completed", date: "2026-08-12" },
  { id: "TXN-83928", client: "Client_H3D9J6", course: "Leadership Mastery", amount: 4500, method: "PayMob", status: "completed", date: "2026-08-11" },
];

const VAT_RATE = 0.2;

const statusBadge = (status) => {
  const map = {
    completed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    failed: "bg-red-100 text-red-700",
  };
  return map[status] || "bg-gray-100 text-gray-700";
};

const formatMAD = (v) => v.toLocaleString("fr-MA") + " MAD";

export default function PaymentsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const tabs = ["all", "completed", "pending", "failed"];

  const filtered = filter === "all" ? demoTransactions : demoTransactions.filter((tx) => tx.status === filter);

  const totalRevenue = 245800;
  const pendingPayouts = 12400;
  const thisMonth = 38200;
  const avgPerClient = 5230;

  const summaryAmount = filtered.reduce((s, tx) => s + tx.amount, 0);
  const summaryVAT = filtered.reduce((s, tx) => s + tx.amount * VAT_RATE, 0);
  const summaryTotal = summaryAmount + summaryVAT;

  const exportCSV = () => {
    const header = "Transaction ID,Client,Course,Amount (MAD),VAT (20%),Total (MAD),Method,Status,Date";
    const rows = filtered.map((tx) => {
      const vat = (tx.amount * VAT_RATE).toFixed(2);
      const total = (tx.amount + tx.amount * VAT_RATE).toFixed(2);
      return [tx.id, tx.client, tx.course, tx.amount, vat, total, tx.method, tx.status, tx.date].join(",");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{t("payments.title", "Payments")}</h1>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {t("payments.exportCsv", "Export CSV")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t("payments.totalRevenue", "Total Revenue"), value: formatMAD(totalRevenue), trend: "+12.5%", color: "text-emerald-600" },
            { label: t("payments.pendingPayouts", "Pending Payouts"), value: formatMAD(pendingPayouts), trend: null, color: "text-amber-600" },
            { label: t("payments.thisMonth", "This Month"), value: formatMAD(thisMonth), trend: "+8.3%", color: "text-indigo-600" },
            { label: t("payments.avgPerClient", "Average per Client"), value: formatMAD(avgPerClient), trend: "+3.1%", color: "text-gray-900" },
          ].map((card) => (
            <div key={card.label} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.trend && (
                  <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${card.color}`}>
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                    </svg>
                    {card.trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                filter === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t(`payments.filter.${tab}`, tab.charAt(0).toUpperCase() + tab.slice(1))}
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">{t("payments.table.id", "Transaction ID")}</th>
                  <th className="px-6 py-4">{t("payments.table.client", "Client")}</th>
                  <th className="px-6 py-4">{t("payments.table.course", "Course")}</th>
                  <th className="px-6 py-4 text-right">{t("payments.table.amount", "Amount")}</th>
                  <th className="px-6 py-4 text-right">{t("payments.table.vat", "VAT (20%)")}</th>
                  <th className="px-6 py-4 text-right">{t("payments.table.total", "Total")}</th>
                  <th className="px-6 py-4">{t("payments.table.method", "Method")}</th>
                  <th className="px-6 py-4">{t("payments.table.status", "Status")}</th>
                  <th className="px-6 py-4">{t("payments.table.date", "Date")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((tx) => {
                  const vat = tx.amount * VAT_RATE;
                  const total = tx.amount + vat;
                  return (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition">
                      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-gray-700">{tx.id}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{tx.client}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-600">{tx.course}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-gray-900">{formatMAD(tx.amount)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-gray-500">{formatMAD(vat)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-gray-900">{formatMAD(total)}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          {tx.method}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">{tx.date}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="border-t border-gray-200 bg-gray-50/50">
                <tr className="text-sm font-semibold text-gray-900">
                  <td className="px-6 py-4" colSpan="3">
                    {t("payments.table.summary", "Summary")} ({filtered.length} {t("payments.table.transactions", "transactions")})
                  </td>
                  <td className="px-6 py-4 text-right">{formatMAD(summaryAmount)}</td>
                  <td className="px-6 py-4 text-right">{formatMAD(summaryVAT)}</td>
                  <td className="px-6 py-4 text-right">{formatMAD(summaryTotal)}</td>
                  <td className="px-6 py-4" colSpan="3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
