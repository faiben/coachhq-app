import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToCoachContent, getCoachSessions, getCoachClients, getCoachPayments } from '../services/firestoreService';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { coachData, currentUser } = useAuth();
  const [stats, setStats] = useState({ revenue: 0, clients: 0, sessions: 0, courses: 0 });
  const [recentContent, setRecentContent] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const loadDashboardData = async () => {
      try {
        const [content, sessions, clients, payments] = await Promise.all([
          getCoachContent(currentUser.uid),
          getCoachSessions(currentUser.uid, 'scheduled'),
          getCoachClients(currentUser.uid),
          getCoachPayments(currentUser.uid),
        ]);

        const totalRevenue = payments.reduce((sum, p) => sum + (p.totalAmount || 0), 0);

        setStats({
          revenue: totalRevenue,
          clients: clients.length,
          sessions: sessions.length,
          courses: content.length,
        });
        setRecentContent(content.slice(0, 3));
        setUpcomingSessions(sessions.slice(0, 5));
      } catch (error) {
        console.error('Dashboard load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [currentUser]);

  const statCards = [
    { key: 'totalRevenue', value: `${stats.revenue.toLocaleString()} MAD`, icon: '\u{1F4B0}', color: 'bg-green-50 text-green-700', borderColor: 'border-green-200' },
    { key: 'activeClients', value: stats.clients.toString(), icon: '\u{1F465}', color: 'bg-blue-50 text-blue-700', borderColor: 'border-blue-200' },
    { key: 'upcomingSessions', value: stats.sessions.toString(), icon: '\u{1F4C5}', color: 'bg-purple-50 text-purple-700', borderColor: 'border-purple-200' },
    { key: 'totalCourses', value: stats.courses.toString(), icon: '\u{1F4DA}', color: 'bg-amber-50 text-amber-700', borderColor: 'border-amber-200' },
  ];

  const quickActions = [
    { key: 'uploadCourse', icon: '\u{1F4E4}', path: '/courses/new', color: 'hover:bg-primary-50 hover:border-primary-300' },
    { key: 'scheduleSession', icon: '\u{1F4C5}', path: '/sessions/new', color: 'hover:bg-purple-50 hover:border-purple-300' },
    { key: 'viewAnalytics', icon: '\u{1F4CA}', path: '/analytics', color: 'hover:bg-blue-50 hover:border-blue-300' },
  ];

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('fr-MA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('coach.welcome')}, {coachData?.displayName || 'Coach'}</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your coaching business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.key} className={`card p-6 border ${stat.borderColor} ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-75">{t(`coach.${stat.key}`)}</p>
                <p className="text-2xl font-bold mt-1">{loading ? '...' : stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('coach.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.key} to={action.path} className={`flex items-center gap-3 p-4 rounded-lg border border-gray-200 transition-colors ${action.color}`}>
              <span className="text-2xl">{action.icon}</span>
              <span className="font-medium text-gray-700">{t(`coach.${action.key}`)}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t('sessions.upcoming')}</h2>
            <Link to="/sessions" className="text-sm text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => (<div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />))}</div>
          ) : upcomingSessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500"><p>No upcoming sessions</p><p className="text-sm mt-1">Schedule your first session to get started</p></div>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"><span className="text-primary-700 font-semibold text-sm">{session.clientId?.slice(-2) || '?'}</span></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900">{session.clientId}</p><p className="text-xs text-gray-500">{formatDate(session.scheduledTime)} - {session.duration}min</p></div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{session.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t('courses.title')}</h2>
            <Link to="/courses" className="text-sm text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => (<div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />))}</div>
          ) : recentContent.length === 0 ? (
            <div className="text-center py-8 text-gray-500"><p>No courses yet</p><p className="text-sm mt-1">Upload your first course to start earning</p></div>
          ) : (
            <div className="space-y-3">
              {recentContent.map((course) => (
                <div key={course.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center"><span className="text-lg">{course.category === 'business' ? '\u{1F4BC}' : course.category === 'career' ? '\u{1F3AF}' : course.category === 'health' ? '\u{1F4AA}' : '\u{1F331}'}</span></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 truncate">{course.title}</p><p className="text-xs text-gray-500">{course.pricing?.totalWithVat || 0} MAD - {course.students || 0} students</p></div>
                  <span className={`px-2 py-1 text-xs rounded-full ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{course.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

async function getCoachContent(coachId) {
  const { getDocs, query, collection, where, orderBy } = await import('firebase/firestore');
  const { db } = await import('../config/firebase');
  const q = query(collection(db, 'content'), where('coachId', '==', coachId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
