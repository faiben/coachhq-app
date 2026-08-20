import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DEMO_COACHES = [
  { id: 'c1', name: 'Ahmed Benali', email: 'ahmed@example.com', status: 'verified', plan: 'Professional', specialization: 'business', revenue: 45200, clients: 23, courses: 5, joined: '2025-01-15' },
  { id: 'c2', name: 'Fatima Zahra', email: 'fatima@example.com', status: 'pending', plan: 'Starter', specialization: 'life', revenue: 0, clients: 0, courses: 0, joined: '2025-03-01' },
  { id: 'c3', name: 'Omar Alaoui', email: 'omar@example.com', status: 'verified', plan: 'Enterprise', specialization: 'career', revenue: 128500, clients: 89, courses: 12, joined: '2024-11-20' },
  { id: 'c4', name: 'Sara Idrissi', email: 'sara@example.com', status: 'verified', plan: 'Professional', specialization: 'health', revenue: 67800, clients: 41, courses: 8, joined: '2025-02-10' },
  { id: 'c5', name: 'Youssef Amrani', email: 'youssef@example.com', status: 'rejected', plan: 'Starter', specialization: 'life', revenue: 0, clients: 0, courses: 0, joined: '2025-03-05' },
  { id: 'c6', name: 'Nadia Berrada', email: 'nadia@example.com', status: 'pending', plan: 'Starter', specialization: 'business', revenue: 0, clients: 0, courses: 1, joined: '2025-03-08' },
];

const STATUS_COLORS = {
  verified: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function ManageCoaches() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? DEMO_COACHES : DEMO_COACHES.filter((c) => c.status === filter);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.manageCoaches')}</h1>
          <p className="text-gray-600 mt-1">{t('admin.manageCoachesSubtitle')}</p>
        </div>
        <div className="flex gap-2">
          {['all', 'verified', 'pending', 'rejected'].map((f) => (
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
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.coach')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.specialization')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.status')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.plan')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.clients')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.courses')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.revenue')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((coach) => (
                <tr key={coach.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{coach.name}</p>
                      <p className="text-sm text-gray-500">{coach.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{coach.specialization}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[coach.status]}`}>{coach.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{coach.plan}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{coach.clients}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{coach.courses}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{coach.revenue.toLocaleString()} MAD</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {coach.status === 'pending' && (
                        <>
                          <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 font-medium">{t('admin.actions.approve')}</button>
                          <button className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 font-medium">{t('admin.actions.reject')}</button>
                        </>
                      )}
                      {coach.status === 'verified' && (
                        <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 font-medium">{t('admin.actions.suspend')}</button>
                      )}
                      {coach.status === 'rejected' && (
                        <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 font-medium">{t('admin.actions.review')}</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
