import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const whyChoose = [
    {
      icon: '\u{1F4B0}',
      titleKey: 'home.whyEarn.title',
      descKey: 'home.whyEarn.desc',
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: '\u{1F916}',
      titleKey: 'home.whyAi.title',
      descKey: 'home.whyAi.desc',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: '\u{1F512}',
      titleKey: 'home.whyCompliant.title',
      descKey: 'home.whyCompliant.desc',
      color: 'text-red-600 bg-red-100',
    },
  ];

  const extraServices = [
    { icon: '\u{2699}\uFE0F', titleKey: 'home.svcSetup.title', descKey: 'home.svcSetup.desc', color: 'text-blue-600' },
    { icon: '\u{1F3AC}', titleKey: 'home.svcVideo.title', descKey: 'home.svcVideo.desc', color: 'text-purple-600' },
    { icon: '\u{1F3A8}', titleKey: 'home.svcBranding.title', descKey: 'home.svcBranding.desc', color: 'text-pink-600' },
    { icon: '\u{1F399}\uFE0F', titleKey: 'home.svcVoiceover.title', descKey: 'home.svcVoiceover.desc', color: 'text-orange-600' },
    { icon: '\u{25B6}\uFE0F', titleKey: 'home.svcAnimated.title', descKey: 'home.svcAnimated.desc', color: 'text-green-600' },
    { icon: '\u{1F465}', titleKey: 'home.svcAffiliate.title', descKey: 'home.svcAffiliate.desc', color: 'text-indigo-600' },
  ];

  const scaleFeatures = [
    { icon: '\u{25B6}\uFE0F', titleKey: 'home.scaleVideo.title', descKey: 'home.scaleVideo.desc' },
    { icon: '\u{1F4C5}', titleKey: 'home.scaleHybrid.title', descKey: 'home.scaleHybrid.desc' },
    { icon: '\u{1F4AC}', titleKey: 'home.scaleAi.title', descKey: 'home.scaleAi.desc' },
  ];

  const payments = [
    { flag: '\u{1F1F2}\u{1F1E6}', country: 'Morocco', methods: 'CMI, PayMob, HPS' },
    { flag: '\u{1F1EA}\u{1F1EC}', country: 'Egypt', methods: 'Fawry, Vodafone Cash' },
    { flag: '\u{1F1F0}\u{1F1EA}', country: 'Kenya', methods: 'M-Pesa, Airtel Money' },
    { flag: '\u{1F1F8}\u{1F1E6}', country: 'GCC', methods: 'Mada (KSA), Tamara (UAE)' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('home.heroTitle')}{' '}
                <span className="text-primary-600">{t('home.heroHighlight')}</span>
              </h1>
              <p className="text-xl text-gray-700 font-medium mb-4">
                {t('home.heroSubtitle1')}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {t('home.heroSubtitle2')}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <Link
                  to="/auth/register"
                  className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
                >
                  {t('home.cta')}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/browse"
                  className="btn-secondary text-lg px-8 py-4 flex items-center gap-2 border-primary-300 text-primary-700"
                >
                  <span>{'\u{25B6}\uFE0F'}</span>
                  {t('home.watchDemo')}
                </Link>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white" />
                </div>
                <span>{t('home.socialProof')}</span>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{'\u{1F393}'}</span>
                  </div>
                  <div>
                    <p className="font-semibold">Coach Dashboard</p>
                    <p className="text-sm text-white/70">Last 30 days</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/70">{t('home.heroStatRevenue')}</p>
                    <p className="text-2xl font-bold">127,500 MAD</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/70">{t('home.heroStatClients')}</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/70">{t('home.heroStatSessions')}</p>
                    <p className="text-2xl font-bold">124</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/70">{t('home.heroStatCourses')}</p>
                    <p className="text-2xl font-bold">89</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{'\u{1F916}'}</span>
                    <span className="text-sm font-medium">AI Assistant</span>
                  </div>
                  <p className="text-xs text-white/70">{t('home.heroAiDemo')}</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <span className="text-xl">{'\u{1F4B3}'}</span>
                <span className="text-sm font-medium text-gray-700">{t('home.heroBadgePay')}</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <span className="text-xl">{'\u{1F30D}'}</span>
                <span className="text-sm font-medium text-gray-700">{t('home.heroBadgeLang')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Coaches Choose */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home.whyTitle')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('home.whySubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t(item.titleKey)}</h3>
                <p className="text-gray-600">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Services */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home.extraTitle')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('home.extraSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extraServices.map((svc, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className={`text-3xl ${svc.color}`}>{svc.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">{t(svc.titleKey)}</h3>
                <p className="text-gray-600 text-sm">{t(svc.descKey)}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/features" className="btn-primary inline-flex items-center gap-2">
              {t('home.extraCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Scale Your Coaching */}
      <section className="bg-green-50/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home.scaleTitle')}</h2>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {scaleFeatures.map((feat, i) => (
              <div key={i} className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{feat.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{t(feat.titleKey)}</h3>
                  <p className="text-gray-600">{t(feat.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations & Compliance */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('home.integratedWith')}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['PayMob', 'M-Pesa', 'Flutterwave', 'CMI'].map((p) => (
                  <span key={p} className="px-5 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('home.compliantWith')}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['BAM (Morocco)', 'SAMA (GCC)', 'PCI-DSS'].map((c) => (
                  <span key={c} className="px-5 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Paid Locally */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home.paymentsTitle')}</h2>
            <p className="text-xl text-gray-600">{t('home.paymentsSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {payments.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="text-5xl mb-4">{p.flag}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.country}</h3>
                <p className="text-gray-600 text-sm">{p.methods}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md text-sm font-medium text-gray-700">
              <span className="text-green-500">{'\u{1F512}'}</span>
              {t('home.paymentsSecure')}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{t('home.ctaTitle')}</h2>
          <p className="text-xl text-white/90 mb-10">{t('home.ctaSubtitle')}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              to="/auth/register"
              className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              {t('home.ctaButton')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/browse"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>{'\u{25B6}\uFE0F'}</span>
              {t('home.watchDemo')}
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              {t('home.trustNoSetup')}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              {t('home.trustFreeTrial')}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              {t('home.trustCancel')}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
