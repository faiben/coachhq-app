import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PricingPage() {
  const { t } = useTranslation();

  const plans = [
    {
      key: 'starter',
      features: ['clients25', 'videos5', 'sessions2', 'templatesBasic', 'communitySupport', 'mobileApp'],
      notIncluded: ['customBranding', 'customDomain', 'designServices3'],
      ctaKey: 'pricing.startTrial',
    },
    {
      key: 'professional',
      features: ['clients100', 'videos25', 'sessions10', 'templatesPremium', 'customBranding', 'customDomain', 'prioritySupport', 'analytics', 'emailAutomation'],
      notIncluded: ['designServices3'],
      ctaKey: 'pricing.joinWaitlist',
    },
    {
      key: 'enterprise',
      features: ['clientsUnlimited', 'videosUnlimited', 'sessionsUnlimited', 'templatesAll', 'customBranding', 'customDomain', 'designServices3', 'dedicatedManager', 'whiteLabel', 'apiAccess', 'advancedAnalytics'],
      notIncluded: [],
      ctaKey: 'pricing.contactSales',
    },
  ];

  const addons = [
    { key: 'videoCreation' },
    { key: 'customDesign' },
    { key: 'extraSessions' },
  ];

  const faqs = ['changePlans', 'paymentMethods', 'freeTrial'];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('pricing.title')}</h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-6 py-2 text-sm text-white/80">
            {t('pricing.allPlansInclude')}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const planData = t(`pricing.plans.${plan.key}`, { returnObjects: true });
              return (
                <div
                  key={plan.key}
                  className={`bg-white rounded-2xl p-8 ${
                    planData.popular
                      ? 'border-2 border-primary-500 shadow-xl relative'
                      : 'border border-gray-200 shadow-sm'
                  }`}
                >
                  {planData.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{planData.name}</h3>
                  <p className="text-gray-600 mb-6">{planData.desc}</p>

                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">{planData.price}</span>
                    <span className="text-gray-500 ml-1">{planData.currency}{t('pricing.perMonth')}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">{'\u2713'}</span>
                        <span className="text-gray-700">{t(`pricing.features.${f}`)}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-gray-400 mt-0.5">{'\u2717'}</span>
                        <span className="text-gray-400">{t(`pricing.features.${f}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/auth/register"
                    className={`w-full text-center block py-3 rounded-lg font-semibold transition-colors ${
                      planData.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {t(plan.ctaKey)}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('pricing.addonsTitle')}</h2>
            <p className="text-xl text-gray-600">{t('pricing.addonsSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {addons.map((addon) => {
              const data = t(`pricing.addons.${addon.key}`, { returnObjects: true });
              return (
                <div key={addon.key} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-2">{data.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{data.desc}</p>
                  <p className="font-semibold text-primary-600 mb-4">{data.price}</p>
                  <button className="btn-secondary text-sm px-4 py-2">{t('pricing.addToPlan')}</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">{t('pricing.faqTitle')}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faqKey) => {
              const data = t(`pricing.faq.${faqKey}`, { returnObjects: true });
              return (
                <div key={faqKey} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{data.q}</h3>
                  <p className="text-gray-600">{data.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('pricing.ctaTitle')}</h2>
          <p className="text-xl text-white/90 mb-10">{t('pricing.ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/register" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              {t('pricing.ctaStart')}
            </Link>
            <Link to="/browse" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
              {t('pricing.ctaSchedule')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
