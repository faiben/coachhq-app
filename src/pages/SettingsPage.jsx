import { useState } from "react";
import { useTranslation } from "react-i18next";

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-indigo-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { t } = useTranslation();

  const [profile, setProfile] = useState({
    fullName: "Amina Bennani",
    email: "amina.bennani@coachhq.ma",
    phone: "+212 6 12 34 56 78",
    bio: "Certified life coach with 8+ years of experience helping professionals in Morocco and the MENA region unlock their potential.",
    specialization: "life",
    language: "fr",
  });

  const [preferences, setPreferences] = useState({
    sessionDuration: "60",
    timezone: "Africa/Casablanca",
    bufferTime: "15",
    autoScheduling: true,
    groupCoaching: false,
  });

  const [payment, setPayment] = useState({
    currency: "MAD",
    bankName: "Attijariwafa Bank",
    accountNumber: "",
    ribNumber: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    sessionReminders: true,
    paymentAlerts: true,
    marketing: false,
  });

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const selectClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{t("settings.title")}</h1>
          <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
            {t("settings.saveChanges")}
          </button>
        </div>

        {/* Profile Section */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">{t("settings.profile")}</h2>

          {/* Avatar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
              {initials}
            </div>
            <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              {t("settings.changePhoto")}
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className={labelClass}>{t("settings.fullName")}</label>
              <input
                type="text"
                className={inputClass}
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className={labelClass}>{t("settings.email")}</label>
              <input
                type="email"
                className={`${inputClass} bg-gray-50 cursor-not-allowed`}
                value={profile.email}
                disabled
                readOnly
              />
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>{t("settings.phone")}</label>
              <input
                type="tel"
                className={inputClass}
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            {/* Specialization */}
            <div>
              <label className={labelClass}>{t("settings.specialization")}</label>
              <select
                className={selectClass}
                value={profile.specialization}
                onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
              >
                <option value="life">{t("settings.specLife")}</option>
                <option value="business">{t("settings.specBusiness")}</option>
                <option value="career">{t("settings.specCareer")}</option>
                <option value="health">{t("settings.specHealth")}</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className={labelClass}>{t("settings.language")}</label>
              <select
                className={selectClass}
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              >
                <option value="ar">{t("settings.langArabic")}</option>
                <option value="fr">{t("settings.langFrench")}</option>
                <option value="en">{t("settings.langEnglish")}</option>
              </select>
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className={labelClass}>{t("settings.bio")}</label>
              <textarea
                rows={4}
                className={inputClass}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Coaching Preferences */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            {t("settings.coachingPreferences")}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Session Duration */}
            <div>
              <label className={labelClass}>{t("settings.defaultSessionDuration")}</label>
              <select
                className={selectClass}
                value={preferences.sessionDuration}
                onChange={(e) => setPreferences({ ...preferences, sessionDuration: e.target.value })}
              >
                <option value="30">30 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label className={labelClass}>{t("settings.timezone")}</label>
              <select
                className={selectClass}
                value={preferences.timezone}
                onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              >
                <option value="Africa/Casablanca">Africa/Casablanca (WET)</option>
                <option value="Africa/Cairo">Africa/Cairo (EET)</option>
                <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
              </select>
            </div>

            {/* Buffer Time */}
            <div>
              <label className={labelClass}>{t("settings.bufferTime")}</label>
              <select
                className={selectClass}
                value={preferences.bufferTime}
                onChange={(e) => setPreferences({ ...preferences, bufferTime: e.target.value })}
              >
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
              </select>
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{t("settings.autoScheduling")}</p>
                <p className="text-xs text-gray-500">{t("settings.autoSchedulingDesc")}</p>
              </div>
              <Toggle
                checked={preferences.autoScheduling}
                onChange={(v) => setPreferences({ ...preferences, autoScheduling: v })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{t("settings.groupCoaching")}</p>
                <p className="text-xs text-gray-500">{t("settings.groupCoachingDesc")}</p>
              </div>
              <Toggle
                checked={preferences.groupCoaching}
                onChange={(v) => setPreferences({ ...preferences, groupCoaching: v })}
              />
            </div>
          </div>
        </section>

        {/* Payment Settings */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">{t("settings.paymentSettings")}</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Currency */}
            <div>
              <label className={labelClass}>{t("settings.currency")}</label>
              <select
                className={selectClass}
                value={payment.currency}
                onChange={(e) => setPayment({ ...payment, currency: e.target.value })}
              >
                <option value="MAD">MAD - Moroccan Dirham</option>
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="XAF">XAF - CFA Franc</option>
              </select>
            </div>

            {/* Bank Name */}
            <div>
              <label className={labelClass}>{t("settings.bankName")}</label>
              <input
                type="text"
                className={inputClass}
                value={payment.bankName}
                onChange={(e) => setPayment({ ...payment, bankName: e.target.value })}
              />
            </div>

            {/* Account Number */}
            <div>
              <label className={labelClass}>{t("settings.accountNumber")}</label>
              <input
                type="text"
                className={inputClass}
                value={payment.accountNumber}
                onChange={(e) => setPayment({ ...payment, accountNumber: e.target.value })}
              />
            </div>

            {/* RIB */}
            <div>
              <label className={labelClass}>{t("settings.ribNumber")}</label>
              <input
                type="text"
                className={inputClass}
                maxLength={24}
                placeholder="001 0700 0012345678901234 56"
                value={payment.ribNumber}
                onChange={(e) => setPayment({ ...payment, ribNumber: e.target.value })}
              />
              <p className="mt-1 text-xs text-gray-400">24 digits - Moroccan bank format</p>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            {t("settings.notificationPreferences")}
          </h2>

          <div className="space-y-4">
            {[
              { key: "email", label: "settings.notifEmail", desc: "settings.notifEmailDesc" },
              { key: "sms", label: "settings.notifSms", desc: "settings.notifSmsDesc" },
              { key: "sessionReminders", label: "settings.notifSession", desc: "settings.notifSessionDesc" },
              { key: "paymentAlerts", label: "settings.notifPayment", desc: "settings.notifPaymentDesc" },
              { key: "marketing", label: "settings.notifMarketing", desc: "settings.notifMarketingDesc" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t(label)}</p>
                  <p className="text-xs text-gray-500">{t(desc)}</p>
                </div>
                <Toggle
                  checked={notifications[key]}
                  onChange={(v) => setNotifications({ ...notifications, [key]: v })}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="flex justify-end pb-8">
          <button className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
            {t("settings.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}
