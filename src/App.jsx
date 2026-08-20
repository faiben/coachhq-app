import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/auth/ProtectedRoute';

import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoachRegistrationPage from './pages/CoachRegistrationPage';
import DashboardPage from './pages/DashboardPage';
import ContentLibraryPage from './pages/ContentLibraryPage';
import CreateCoursePage from './pages/CreateCoursePage';
import CourseDetailPage from './pages/CourseDetailPage';
import AIAssistantPage from './pages/AIAssistantPage';
import ClientBrowsePage from './pages/ClientBrowsePage';
import CoachProfilePage from './pages/CoachProfilePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import SessionsPage from './pages/SessionsPage';
import ClientsPage from './pages/ClientsPage';
import PaymentsPage from './pages/PaymentsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import VideoSessionPage from './pages/VideoSessionPage';
import { AdminRoute } from './components/auth/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCoaches from './pages/admin/ManageCoaches';
import ManageUsers from './pages/admin/ManageUsers';
import ManagePayments from './pages/admin/ManagePayments';
import SiteSettings from './pages/admin/SiteSettings';

function PlaceholderPage({ title }) {
  return (
    <div className="page-container">
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4">{'\u{1F6A7}'}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500">This page is under construction</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes with header/language switcher */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/browse" element={<ClientBrowsePage />} />
              <Route path="/coaches/:id" element={<CoachProfilePage />} />
              <Route path="/courses/:id" element={<CourseDetailPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/coach-register" element={<CoachRegistrationPage />} />
            </Route>

            {/* Dashboard Routes (Protected) */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/courses" element={<ContentLibraryPage />} />
              <Route path="/courses/new" element={<CreateCoursePage />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/sessions/new" element={<SessionsPage />} />
              <Route path="/sessions/:id/live" element={<VideoSessionPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/ai" element={<AIAssistantPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/coaches" element={<ManageCoaches />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/payments" element={<ManagePayments />} />
              <Route path="/admin/settings" element={<SiteSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}
