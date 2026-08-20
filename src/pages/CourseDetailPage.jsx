import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Client-facing Course Detail & Purchase Page
 * SOP Section 6.3: Client Purchase Flow
 */

export default function CourseDetailPage({ course }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [showPayment, setShowPayment] = useState(false);

  const defaultCourse = course || {
    title: 'Startup Growth Masterclass',
    description: 'Learn the essential strategies to scale your Moroccan startup from 0 to 1M MAD revenue. This comprehensive course covers market validation, fundraising, team building, and scaling operations in the Moroccan market.',
    category: 'business',
    coach: { name: 'Fatima Benhaida', avatar: null },
    pricing: { type: 'one-time', basePriceMAD: 299, vat: 59.8, totalWithVat: 358.8 },
    duration: '4 hours',
    students: 89,
    rating: 4.9,
    videoUrl: null,
    chapters: [
      { title: 'Market Validation in Morocco', duration: '45 min' },
      { title: 'Fundraising & CMI Integration', duration: '30 min' },
      { title: 'Building Your Team', duration: '35 min' },
      { title: 'Scaling Operations', duration: '40 min' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Video Placeholder */}
        <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-8 relative overflow-hidden">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">{'\u{25B6}'}</div>
            <p className="text-lg">{defaultCourse.title}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{defaultCourse.title}</h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold">{defaultCourse.coach.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{defaultCourse.coach.name}</p>
                  <p className="text-xs text-gray-500">Coach</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">{defaultCourse.rating}</span>
              </div>
              <span className="text-sm text-gray-500">{defaultCourse.students} students</span>
              <span className="text-sm text-gray-500">{defaultCourse.duration}</span>
            </div>

            <p className="text-gray-600 leading-relaxed">{defaultCourse.description}</p>

            {/* Chapters */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'ar' ? 'الفصول' : language === 'fr' ? 'Chapitres' : 'Chapters'}
              </h2>
              <div className="space-y-2">
                {defaultCourse.chapters.map((chapter, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary-700">{i + 1}</span>
                    </div>
                    <span className="flex-1 text-sm text-gray-700">{chapter.title}</span>
                    <span className="text-xs text-gray-500">{chapter.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Pricing */}
          <div className="md:col-span-1">
            <div className="card p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {defaultCourse.pricing.totalWithVat} MAD
                </div>
                <p className="text-xs text-gray-500">{language === 'ar' ? 'شامل الضريبة' : language === 'fr' ? 'TVA 20% incluse' : '20% VAT included'}</p>
                {defaultCourse.pricing.type !== 'one-time' && (
                  <p className="text-sm text-primary-600 mt-1 capitalize">
                    / {defaultCourse.pricing.type} {defaultCourse.pricing.interval && `(${defaultCourse.pricing.interval})`}
                  </p>
                )}
              </div>

              <button
                onClick={() => setShowPayment(true)}
                className="btn-primary w-full mb-3"
              >
                {language === 'ar' ? 'اشترِ الآن' : language === 'fr' ? 'Acheter maintenant' : 'Buy Now'}
              </button>

              <div className="text-center text-xs text-gray-400 mb-6">
                {language === 'ar' ? 'دفع آمن عبر PayMob' : language === 'fr' ? 'Paiement sécurisé via PayMob' : 'Secure payment via PayMob'}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{'\u{1F4E5}'}</span>
                  <span className="text-gray-600">Instant access</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{'\u{23F1}'}</span>
                  <span className="text-gray-600">{defaultCourse.duration} of content</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{'\u{1F30D}'}</span>
                  <span className="text-gray-600">Available in FR/AR/EN</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{'\u{1F512}'}</span>
                  <span className="text-gray-600">Lifetime access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal (placeholder) */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment</h2>
            <p className="text-gray-600 mb-6">
              Payment will be processed securely via PayMob (CMI certified). This is a demo — no real charges.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Course</span>
                <span>{defaultCourse.title}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{defaultCourse.pricing.totalWithVat} MAD</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPayment(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Payment demo: Course purchased!');
                  setShowPayment(false);
                }}
                className="btn-primary flex-1"
              >
                Pay {defaultCourse.pricing.totalWithVat} MAD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
