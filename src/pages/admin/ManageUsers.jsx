import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DEMO_USERS = [
  { id: 'u1', name: 'Karim Mansouri', email: 'karim@example.com', type: 'client', coach: 'Ahmed Benali', plan: 'Premium', joined: '2025-02-14', lastActive: '2025-03-10' },
  { id: 'u2', name: 'Leila Tazi', email: 'leila@example.com', type: 'client', coach: 'Sara Idrissi', plan: 'Basic', joined: '2025-01-20', lastActive: '2025-03-09' },
  { id: 'u3', name: 'Hassan Idrissi', email: 'hassan@example.com', type: 'client', coach: 'Omar Alaoui', plan: 'VIP', joined: '2024-12-05', lastActive: '2025-03-10' },
  { id: 'u4', name: 'Meryem Chaoui', email: 'meryem@example.com', type: 'client', coach: 'Ahmed Benali', plan: 'Basic', joined: '2025-03-01', lastActive: '2025-03-08' },
  { id: 'u5', name: 'Rachid Benjelloun', email: 'rachid@example.com', type: 'client', coach: 'Sara Idrissi', plan: 'Premium', joined: '2025-02-28', lastActive: '2025-03-07' },
];

const PLAN_COLORS = {
  Basic: 'bg-gray-100 text-gray-700',
  Premium: 'bg-blue-100 text-blue-700',
  VIP: 'bg-purple-100 text-purple-700',
};

export default function ManageUsers() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = DEMO_USERS.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.manageUsers')}</h1>
          <p className="text-gray-600 mt-1">{t('admin.manageUsersSubtitle')}</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search') + '...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 w-64"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">{t('admin.stats.totalUsers')}</p>
          <p className="text-3xl font-bold text-gray-900">2,340</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">{t('admin.stats.activeUsers')}</p>
          <p className="text-3xl font-bold text-green-600">1,892</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">{t('admin.stats.newThisWeek')}</p>
          <p className="text-3xl font-bold text-blue-600">184</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.user')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.type')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.coach')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.plan')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.joined')}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t('admin.table.lastActive')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{user.type}</td>
                  <td className="px-6 py-4 text-gray-600">{user.coach}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${PLAN_COLORS[user.plan]}`}>{user.plan}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{user.joined}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
