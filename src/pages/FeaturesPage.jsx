import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FeaturesPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('monetization');

  const tabs = [
    { key: 'monetization', label: t('features.monetizationTab'), icon: '\u{1F4B3}' },
    { key: 'ai', label: t('features.aiTab'), icon: '\u{1F916}' },
    { key: 'security', label: t('features.securityTab'), icon: '\u{1F512}' },
  ];

  const tabContent = {
    monetization: [
      { icon: '\u{1F3AC}', ...t('features.monetization.videoCourses', { returnObjects: true }) },
      { icon: '\u{1F4C5}', ...t('features.monetization.liveSessions', { returnObjects: true }) },
      { icon: '\u{1F465}', ...t('features.monetization.subscriptions', { returnObjects: true }) },
      { icon: '\u{1F4B3}', ...t('features.monetization.localPayments', { returnObjects: true }) },
    ],
    ai: [
      { icon: '\u{1F916}', ...t('features.aiAutomation.assistant', { returnObjects: true }) },
      { icon: '\u{1F4AC}', ...t('features.aiAutomation.communications', { returnObjects: true }) },
      { icon: '\u{1F4C5}', ...t('features.aiAutomation.scheduling', { returnObjects: true }) },
      { icon: '\u{26A1}', ...t('features.aiAutomation.taskBot', { returnObjects: true }) },
    ],
    security: [
      { icon: '\u{1F512}', ...t('features.securityCompliance.dataSecurity', { returnObjects: true }) },
      { icon: '\u{1F30D}', ...t('features.securityCompliance.regionalCompliance', { returnObjects: true }) },
      { icon: '\u{2B50}', ...t('features.securityCompliance.privacyFirst', { returnObjects: true }) },
    ],
  };

  const extraServices = [
    { icon: '\u{2699}\uFE0F', titleKey: 'home.svcSetup.title', descKey: 'home.svcSetup.desc', color: 'text-blue-600' },
    { icon: '\u{1F3AC}', titleKey: 'home.svcVideo.title', descKey: 'home.svcVideo.desc', color: 'text-purple-600' },
    { icon: '\u{1F3A8}', titleKey: 'home.svcBranding.title', descKey: 'home.svcBranding.desc', color: 'text-pink-600' },
    { icon: '\u{1F399}\uFE0F', titleKey: 'home.svcVoiceover.title', descKey: 'home.svcVoiceover.desc', color: 'text-orange-600' },
    { icon: '\u{25B6}\uFE0F', titleKey: 'home.svcAnimated.title', descKey: 'home.svcAnimated.desc', color: 'text-green-600' },
    { icon: '\u{1F465}', titleKey: 'home.svcAffiliate.title', descKey: 'home.svcAffiliate.desc', color: 'text-indigo-600' },
  ];

  const badgeColors = {
    'Revenu Passif': 'bg-green-100 text-green-700',
    'Revenu Direct': 'bg-blue-100 text-blue-700',
    'Revenu Prévisible': 'bg-purple-100 text-purple-700',
    'Zéro Friction': 'bg-amber-100 text-amber-700',
    'Avis Intelligents': 'bg-green-100 text-green-700',
    'Économisez 10+ Heures/Sem': 'bg-blue-100 text-blue-700',
    'Plus de Double Réservation': 'bg-purple-100 text-purple-700',
    'Commandes Vocales': 'bg-amber-100 text-amber-700',
    'Conforme PCI-DSS': 'bg-green-100 text-green-700',
    'Légalement Sécurisé': 'bg-blue-100 text-blue-700',
    'Conforme RGPD': 'bg-purple-100 text-purple-700',
    // Arabic
    'دخل سلبي': 'bg-green-100 text-green-700',
    'دخل مباشر': 'bg-blue-100 text-blue-700',
    'دخل متوقع': 'bg-purple-100 text-purple-700',
    'بدون احتكاك': 'bg-amber-100 text-amber-700',
    'رؤى ذكية': 'bg-green-100 text-green-700',
    'وفّر 10+ ساعات/أسبوع': 'bg-blue-100 text-blue-700',
    'لا تعارض أبداً': 'bg-purple-100 text-purple-700',
    'أوامر صوتية': 'bg-amber-100 text-amber-700',
    'متوافق مع PCI-DSS': 'bg-green-100 text-green-700',
    'آمن قانونياً': 'bg-blue-100 text-blue-700',
    'متوافق مع GDPR': 'bg-purple-100 text-purple-700',
    // English
    'Passive Income': 'bg-green-100 text-green-700',
    'Direct Revenue': 'bg-blue-100 text-blue-700',
    'Predictable Income': 'bg-purple-100 text-purple-700',
    'Zero Friction': 'bg-amber-100 text-amber-700',
    'Smart Insights': 'bg-green-100 text-green-700',
    'Save 10+ Hours/Week': 'bg-blue-100 text-blue-700',
    'Never Double-Book': 'bg-purple-100 text-purple-700',
    'Voice Commands': 'bg-amber-100 text-amber-700',
    'PCI-DSS Compliant': 'bg-green-100 text-green-700',
    'Legally Secure': 'bg-blue-100 text-blue-700',
    'GDPR Ready': 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('features.title')}{' '}
            <span className="text-primary-600">{t('features.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">{t('features.subtitle')}</p>
          <Link to="/auth/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
            {t('features.startTrial')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Headers */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {tabContent[activeTab]?.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    {feature.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[feature.badge] || 'bg-gray-100 text-gray-700'}`}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Services */}
      <section className="bg-gray-50 py-20">
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
        </div>
      </section>

      {/* AI Demo */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('features.seeAiAction')}</h2>
          </div>
          <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-gray-400 text-sm ml-2">CoachHQ AI Assistant</span>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-green-400 text-sm font-medium mb-1">You:</p>
                <p className="text-white">{t('home.scaleAi.desc')}</p>
              </div>
              <div>
                <p className="text-blue-400 text-sm font-medium mb-1">AI:</p>
                <p className="text-gray-300">{t('features.aiCaption')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('features.ctaTitle')}</h2>
          <p className="text-xl text-white/90 mb-10">{t('features.ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/register" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              {t('features.ctaStart')}
            </Link>
            <Link to="/browse" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
              {t('features.ctaWatch')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
