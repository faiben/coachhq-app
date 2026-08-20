import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DEMO_PAYMENTS = [
  { id: 'p1', coach: 'Ahmed Benali', client: 'Client_XY7AB2', amount: 2500, vat: 500, total: 3000, method: 'CMI', status: 'completed', course: 'Business Leadership', date: '2025-03-10' },
  { id: 'p2', coach: 'Omar Alaoui', client: 'Client_MN3CD8', amount: 5000, vat: 1000, total: 6000, method: 'PayMob', status: 'completed', course: 'Career Growth', date: '2025-03-09' },
  { id: 'p3', coach: 'Sara Idrissi', client: 'Client_PQ9EF4', amount: 1200, vat: 240, total: 1440, method: 'CMI', status: 'pending', course: 'Health & Wellness', date: '2025-03-08' },
  { id: 'p4', coach: 'Ahmed Benali', client: 'Client_RV5GH6', amount: 3500, vat: 700, total: 4200, method: 'CMI', status: 'completed', course: 'Business Leadership', date: '2025-03-07' },
  { id: 'p5', coach: 'Omar Alaoui', client: 'Client_ST1IJ2', amount: 800, vat: 160, total: 960, method: 'PayMob', status: 'failed', course: 'Career Workshop', date: '2025-03-06' },
  { id: 'p6', coach: 'Sara Idrissi', client: 'Client_UV3KL4', amount: 2000, vat: 400, total: 2400, method: 'CMI', status: 'completed', course: 'Mindfulness', date: '2025-03-05' },
];

const STATUS_COLORS = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
};

export default function ManagePayments() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? DEMO_PAYMENTS : DEMO_PAYMENTS.filter((p) => p.status === filter);
  const totalRevenue = DEMO_PAYMENTS.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.total, 0);
  const pendingAmount = DEMO_PAYMENTS.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.total, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.managePayments')}</h1>
        <p className="text-gray-600 mt-1">{t('admin.managePaymentsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">{t('admin.stats.totalRevenue')}</p>
          <p className="text-3xl font-bold text-gray-900">{totalRevenue.toLocaleString()} MAD</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">{t('admin.stats.pendingPayouts')}</p>
          <p className="text-3xl font-bold text-amber-600">{pendingAmount.toLocaleString()} MAD</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">{t('admin.stats.totalTransactions')}</p>
          <p className="text-3xl font-bold text-blue-600">{DEMO_PAYMENTS.length}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'completed', 'pending', 'failed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? t('admin.filter.all') : t(`admin.filter.${f}`)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.coach')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.course')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.client')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.amount')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.vat')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.total')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.method')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.status')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.date')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{payment.coach}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.course}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono text-sm">{payment.client}</td>
                  <td className="px-6 py-4 text-gray-900">{payment.amount.toLocaleString()} MAD</td>
                  <td className="px-6 py-4 text-gray-500">{payment.vat.toLocaleString()} MAD</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{payment.total.toLocaleString()} MAD</td>
                  <td className="px-6 py-4 text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[payment.status]}`}>{payment.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
