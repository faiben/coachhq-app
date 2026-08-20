import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const demoSessions = [
  {
    id: 1,
    client: 'Client_XY7AB2',
    type: '1-on-1',
    date: '2026-08-21',
    time: '10:00 AM',
    duration: 60,
    status: 'Scheduled',
  },
  {
    id: 2,
    client: 'Client_KM9D3F',
    type: 'Group',
    date: '2026-08-21',
    time: '02:00 PM',
    duration: 60,
    status: 'Scheduled',
  },
  {
    id: 3,
    client: 'Client_QW8RT1',
    type: '1-on-1',
    date: '2026-08-22',
    time: '09:30 AM',
    duration: 60,
    status: 'Scheduled',
  },
  {
    id: 4,
    client: 'Client_PL5VX4',
    type: 'Workshop',
    date: '2026-08-22',
    time: '04:00 PM',
    duration: 60,
    status: 'Cancelled',
  },
  {
    id: 5,
    client: 'Client_NB2HQ7',
    type: '1-on-1',
    date: '2026-08-23',
    time: '11:00 AM',
    duration: 60,
    status: 'Scheduled',
  },
  {
    id: 6,
    client: 'Client_JC4WZ6',
    type: 'Group',
    date: '2026-08-15',
    time: '01:00 PM',
    duration: 60,
    status: 'Completed',
  },
  {
    id: 7,
    client: 'Client_TD1MF8',
    type: '1-on-1',
    date: '2026-08-14',
    time: '10:30 AM',
    duration: 60,
    status: 'Completed',
  },
  {
    id: 8,
    client: 'Client_RK6YS3',
    type: 'Workshop',
    date: '2026-08-13',
    time: '03:00 PM',
    duration: 60,
    status: 'Completed',
  },
];

const statusStyles = {
  Scheduled: 'bg-green-100 text-green-700',
  Completed: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const typeBadge = {
  '1-on-1': 'bg-purple-100 text-purple-700',
  Group: 'bg-amber-100 text-amber-700',
  Workshop: 'bg-cyan-100 text-cyan-700',
};

export default function SessionsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('upcoming');
  const [ramadanMode, setRamadanMode] = useState(false);

  const today = new Date('2026-08-20');

  const weekDays = [];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    weekDays.push(d);
  }

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const upcoming = demoSessions.filter(
    (s) => s.date >= '2026-08-20' && s.status !== 'Completed'
  );
  const past = demoSessions.filter((s) => s.status === 'Completed');

  const visible = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('sessions.title')}
          </h1>
          <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
            {t('sessions.scheduleButton')}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Main column */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="mb-5 flex gap-1 rounded-lg bg-gray-200 p-1 w-fit">
              {['upcoming', 'past'].map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`rounded-md px-5 py-2 text-sm font-medium transition ${
                    tab === key
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t(`sessions.tabs.${key}`)}
                </button>
              ))}
            </div>

            {/* Mini calendar */}
            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {t('sessions.weekView')}
              </p>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((d, i) => {
                  const isToday =
                    d.toISOString().slice(0, 10) === today.toISOString().slice(0, 10);
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center rounded-lg py-2 text-center ${
                        isToday
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{dayLabels[i]}</span>
                      <span className="text-lg font-bold">{d.getDate()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Session cards */}
            <div className="space-y-3">
              {visible.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {session.client}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${typeBadge[session.type]}`}
                        >
                          {session.type}
                        </span>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[session.status]}`}
                        >
                          {session.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p className="font-medium text-gray-700">
                        {new Date(session.date).toLocaleDateString('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      <p>{session.time}</p>
                      <p>{session.duration} min</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 flex gap-2 border-t border-gray-100 pt-3">
                    {session.status === 'Scheduled' && (
                      <>
                        <button
                          onClick={() => navigate(`/sessions/${session.id}/live`)}
                          className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
                        >
                          {t('sessions.actions.join')}
                        </button>
                        <button className="rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                          {t('sessions.actions.reschedule')}
                        </button>
                        <button className="rounded-lg border border-red-200 bg-white px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">
                          {t('sessions.actions.cancel')}
                        </button>
                      </>
                    )}
                    {session.status === 'Cancelled' && (
                      <span className="text-xs text-gray-400">
                        {t('sessions.actions.cancelledNotice')}
                      </span>
                    )}
                    {session.status === 'Completed' && (
                      <button className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700">
                        {t('sessions.actions.viewNotes')}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {visible.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center text-sm text-gray-400">
                  {t('sessions.noSessions')}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden w-72 shrink-0 space-y-5 lg:block">
            {/* Info card */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {t('sessions.sidebar.overview')}
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-indigo-600">2h</p>
                  <p className="text-sm text-gray-500">{t('sessions.sidebar.nextIn')}</p>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-500">{t('sessions.sidebar.thisWeek')}</p>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-2xl font-bold text-green-600">94%</p>
                  <p className="text-sm text-gray-500">{t('sessions.sidebar.completionRate')}</p>
                </div>
              </div>
            </div>

            {/* Ramadan mode */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-amber-800">
                  {t('sessions.ramadanMode.label')}
                </span>
                <button
                  onClick={() => setRamadanMode(!ramadanMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    ramadanMode ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      ramadanMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-amber-700">
                {t('sessions.ramadanMode.hint')}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
