import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const demoClients = [
  { id: 'Client_A7K2M9', name: 'Fatima Zahra Benali', plan: 'VIP', sessions: 24, progress: 88, status: 'Active', lastActive: '2026-08-19' },
  { id: 'Client_B3L8P4', name: 'Youssef El Amrani', plan: 'Premium', sessions: 16, progress: 72, status: 'Active', lastActive: '2026-08-18' },
  { id: 'Client_C9R5T1', name: 'Khadija Alaoui', plan: 'Basic', sessions: 8, progress: 45, status: 'Active', lastActive: '2026-08-15' },
  { id: 'Client_D4W6X2', name: 'Omar Bennis', plan: 'Premium', sessions: 20, progress: 81, status: 'Active', lastActive: '2026-08-20' },
  { id: 'Client_E8N1Q7', name: 'Nadia Tazi', plan: 'Basic', sessions: 5, progress: 30, status: 'Inactive', lastActive: '2026-07-28' },
  { id: 'Client_F2J5V3', name: 'Hamza Idrissi', plan: 'VIP', sessions: 30, progress: 95, status: 'Active', lastActive: '2026-08-19' },
];

const planBadge = {
  Basic: 'bg-gray-100 text-gray-700',
  Premium: 'bg-blue-100 text-blue-700',
  VIP: 'bg-amber-100 text-amber-700',
};

export default function ClientsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = demoClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{t('clients.title')}</h1>
          <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            {t('clients.addClient')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: t('clients.stats.total'), value: 47 },
            { label: t('clients.stats.active'), value: 38 },
            { label: t('clients.stats.newThisMonth'), value: 8 },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <input
            type="text"
            placeholder={t('clients.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.id')}</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.name')}</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.plan')}</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.sessions')}</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.progress')}</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.status')}</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.lastActive')}</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">{t('clients.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{client.id}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{client.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${planBadge[client.plan]}`}>
                        {client.plan}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">{client.sessions}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${client.progress >= 80 ? 'bg-green-500' : client.progress >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{client.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{client.lastActive}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                          {t('clients.actions.viewProfile')}
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          {t('clients.actions.sendMessage')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-xs text-gray-400 text-center">{t('clients.privacyNote')}</p>
      </div>
    </div>
  );
}
