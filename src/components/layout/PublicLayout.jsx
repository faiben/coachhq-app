import { Outlet, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PublicLayout() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { language, setLanguage, isRTL } = useLanguage();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const languages = [
    { code: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' },
    { code: 'fr', label: 'Fran\u00E7ais' },
    { code: 'en', label: 'English' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CoachHQ</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.features')}
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.pricing')}
            </Link>
            <Link to="/browse" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.demo')}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm font-medium text-gray-600 bg-gray-100 border-0 rounded-lg px-3 py-1.5 cursor-pointer focus:ring-2 focus:ring-primary-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>

            <Link to="/auth/login" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              {t('nav.login')}
            </Link>
            <Link to="/auth/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              {t('home.cta').split('(')[0].trim()}
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-lg font-bold">CoachHQ</span>
              </Link>
              <p className="text-gray-400 text-sm mb-4">{t('app.description')}</p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm text-gray-400 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">{t('nav.features').split(' ')[0]}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">{t('nav.features')}</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="text-green-400">{'\u{1F6E1}\uFE0F'}</span>
                PCI-DSS Compliant
              </span>
              <span className="flex items-center gap-2">
                <span className="text-blue-400">{'\u{1F4BE}'}</span>
                Data Never Stored
              </span>
            </div>
            <p className="text-sm text-gray-500">&copy; 2025 CoachHQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
