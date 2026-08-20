import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DEMO_STATS = [
  { key: 'admin.stats.totalCoaches', value: '127', change: '+12 this week', icon: '\u{1F393}', color: 'bg-blue-500' },
  { key: 'admin.stats.totalUsers', value: '2,340', change: '+184 this week', icon: '\u{1F465}', color: 'bg-green-500' },
  { key: 'admin.stats.totalRevenue', value: '847,200 MAD', change: '+18.2% from last month', icon: '\u{1F4B0}', color: 'bg-amber-500' },
  { key: 'admin.stats.pendingVerifications', value: '8', change: '3 urgent', icon: '\u{23F3}', color: 'bg-red-500' },
];

const DEMO_COACHES = [
  { id: 1, name: 'Ahmed Benali', email: 'ahmed@example.com', status: 'verified', plan: 'Professional', revenue: '45,200 MAD', joined: '2025-01-15' },
  { id: 2, name: 'Fatima Zahra', email: 'fatima@example.com', status: 'pending', plan: 'Starter', revenue: '0 MAD', joined: '2025-03-01' },
  { id: 3, name: 'Omar Alaoui', email: 'omar@example.com', status: 'verified', plan: 'Enterprise', revenue: '128,500 MAD', joined: '2024-11-20' },
  { id: 4, name: 'Sara Idrissi', email: 'sara@example.com', status: 'verified', plan: 'Professional', revenue: '67,800 MAD', joined: '2025-02-10' },
  { id: 5, name: 'Youssef Amrani', email: 'youssef@example.com', status: 'rejected', plan: 'Starter', revenue: '0 MAD', joined: '2025-03-05' },
];

const DEMO_PAYMENTS = [
  { id: 1, coach: 'Ahmed Benali', amount: '2,500 MAD', client: 'Client_XY7AB2', method: 'CMI', status: 'completed', date: '2025-03-10' },
  { id: 2, coach: 'Omar Alaoui', amount: '5,000 MAD', client: 'Client_MN3CD8', method: 'PayMob', status: 'completed', date: '2025-03-09' },
  { id: 3, coach: 'Sara Idrissi', amount: '1,200 MAD', client: 'Client_PQ9EF4', method: 'CMI', status: 'pending', date: '2025-03-08' },
];

const STATUS_COLORS = {
  verified: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.title')}</h1>
        <p className="text-gray-600 mt-1">{t('admin.subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {DEMO_STATS.map((stat) => (
          <div key={stat.key} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div className={`w-2 h-2 rounded-full ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{t(stat.key)}</p>
            <p className="text-xs text-green-600 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Coaches */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{t('admin.recentCoaches')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.name')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.email')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.status')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.plan')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.revenue')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DEMO_COACHES.map((coach) => (
                <tr key={coach.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{coach.name}</td>
                  <td className="px-6 py-4 text-gray-600">{coach.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[coach.status]}`}>
                      {coach.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{coach.plan}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{coach.revenue}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {coach.status === 'pending' && (
                        <>
                          <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200">
                            {t('admin.actions.approve')}
                          </button>
                          <button className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200">
                            {t('admin.actions.reject')}
                          </button>
                        </>
                      )}
                      {coach.status === 'verified' && (
                        <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200">
                          {t('admin.actions.suspend')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{t('admin.recentPayments')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.coach')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.amount')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.client')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.method')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.status')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.date')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DEMO_PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{payment.coach}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono text-sm">{payment.client}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[payment.status]}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
