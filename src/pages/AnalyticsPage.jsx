import { useState } from "react";
import { useTranslation } from "react-i18next";

const dateRanges = ["7d", "30d", "90d", "12m"];

const monthlyRevenue = [
  { month: "Oct", value: 180000 },
  { month: "Nov", value: 210000 },
  { month: "Dec", value: 195000 },
  { month: "Jan", value: 225000 },
  { month: "Feb", value: 235000 },
  { month: "Mar", value: 245800 },
];

const topCourses = [
  { name: "Leadership Mastery", students: 34, rating: 4.9 },
  { name: "Communication Skills", students: 28, rating: 4.8 },
  { name: "Team Building Pro", students: 22, rating: 4.7 },
];

const sessionTypes = [
  { label: "1-on-1", percentage: 68, color: "from-emerald-500 to-emerald-400" },
  { label: "Group", percentage: 24, color: "from-blue-500 to-blue-400" },
  { label: "Workshop", percentage: 8, color: "from-amber-500 to-amber-400" },
];

const rangeLabels = { "7d": "Last 7 days", "30d": "Last 30 days", "90d": "Last 90 days", "12m": "Last 12 months" };

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const [range, setRange] = useState("30d");

  const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.value));

  const stats = [
    {
      key: "revenue",
      value: "245,800 MAD",
      change: "+18%",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      changeColor: "text-emerald-600",
    },
    {
      key: "sessions",
      value: "124",
      subtitle: t("analytics.thisMonth"),
      change: "+12",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      changeColor: "text-blue-600",
    },
    {
      key: "clients",
      value: "47",
      subtitle: t("analytics.total"),
      change: "+3",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      changeColor: "text-violet-600",
    },
    {
      key: "completion",
      value: "94%",
      subtitle: t("analytics.completionRate"),
      change: "+2%",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      changeColor: "text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t("analytics.title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {t("analytics.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm ring-1 ring-slate-200">
            {dateRanges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  range === r
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {rangeLabels[r]}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="group relative bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200/60 hover:shadow-lg hover:ring-emerald-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                    {t(`analytics.${stat.key}`)}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  {stat.subtitle && (
                    <p className="mt-0.5 text-xs text-slate-400">{stat.subtitle}</p>
                  )}
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all duration-300">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5">
                <span className={`text-sm font-semibold ${stat.changeColor}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-slate-400">{t("analytics.fromLastMonth")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("analytics.revenue")}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">{t("analytics.revenueTrend")}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t("analytics.live")}
            </span>
          </div>

          <div className="flex items-end gap-4 h-64 px-2">
            {monthlyRevenue.map((d) => {
              const heightPct = (d.value / maxRevenue) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-3">
                  <span className="text-xs font-semibold text-slate-600">
                    {(d.value / 1000).toFixed(0)}k
                  </span>
                  <div className="w-full flex justify-center" style={{ height: "180px" }}>
                    <div
                      className="w-full max-w-[52px] rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-700 ease-out hover:from-emerald-700 hover:to-emerald-500 hover:shadow-lg hover:shadow-emerald-200 cursor-pointer relative group"
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {d.value.toLocaleString()} MAD
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Columns: Top Courses & Client Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200/60">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">
              {t("analytics.topCourses")}
            </h2>
            <div className="space-y-4">
              {topCourses.map((course, i) => (
                <div
                  key={course.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/80 hover:bg-emerald-50/50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {course.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {course.students} {t("analytics.students")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-slate-700">
                      {course.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Growth */}
          <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200/60">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">
              {t("analytics.clientGrowth")}
            </h2>
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 ring-1 ring-emerald-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      {t("analytics.newClients")}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-emerald-900">12</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <span className="text-xs font-semibold text-emerald-600">+34%</span>
                  <span className="text-xs text-emerald-500">{t("analytics.vsLastMonth")}</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 ring-1 ring-blue-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      {t("analytics.returningClients")}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-blue-900">35</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <span className="text-xs font-semibold text-blue-600">+8%</span>
                  <span className="text-xs text-blue-500">{t("analytics.vsLastMonth")}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">{t("analytics.retentionRate")}</span>
                  <span className="font-bold text-slate-900">74%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                    style={{ width: "74%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Types */}
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200/60">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            {t("analytics.sessionTypes")}
          </h2>
          <div className="space-y-5">
            {sessionTypes.map((st) => (
              <div key={st.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{st.label}</span>
                  <span className="text-sm font-bold text-slate-900">{st.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${st.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${st.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100">
            {sessionTypes.map((st) => (
              <div key={st.label} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full bg-gradient-to-r ${st.color}`} />
                <span className="text-xs text-slate-500 font-medium">
                  {st.label} — {st.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
