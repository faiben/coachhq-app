import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Client-Facing Interface Skeleton
 * This is what clients see when browsing coaches/courses
 * SOP Section 6.3: Client Purchase Flow
 */

const MOCK_COACHES = [
  {
    id: '1',
    name: 'Fatima Benhaida',
    specialization: 'business',
    bio: 'Business coach helping entrepreneurs scale their ventures in Morocco',
    rating: 4.8,
    students: 156,
    courses: 3,
    avatar: null,
  },
  {
    id: '2',
    name: 'Ahmed El Fassi',
    specialization: 'career',
    bio: 'Career development specialist with 10+ years experience',
    rating: 4.9,
    students: 203,
    courses: 5,
    avatar: null,
  },
];

const SPECIALIZATION_LABELS = {
  life: { ar: 'تدريب الحياة', fr: 'Life Coaching', en: 'Life Coaching' },
  business: { ar: 'تدريب الأعمال', fr: 'Business Coaching', en: 'Business Coaching' },
  career: { ar: 'تدريب المسار المهني', fr: 'Career Coaching', en: 'Career Coaching' },
  health: { ar: 'الصحة والعافية', fr: 'Sante et Bien-etre', en: 'Health & Wellness' },
};

const SPECIALIZATION_ICONS = {
  life: '\u{1F331}',
  business: '\u{1F4BC}',
  career: '\u{1F3AF}',
  health: '\u{1F4AA}',
};

export default function ClientBrowsePage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [coaches, setCoaches] = useState(MOCK_COACHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const specializations = ['all', 'life', 'business', 'career', 'health'];

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpecialization === 'all' || coach.specialization === selectedSpecialization;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CoachHQ</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">{t('nav.login')}</Link>
              <Link to="/auth/register" className="btn-primary text-sm">{t('nav.register')}</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'اكتشف أفضل المدربين في المغرب' : language === 'fr' ? 'Trouvez le meilleur coach au Maroc' : 'Find the Best Coaches in Morocco'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' ? 'مدربون معتمدون جاهزون لمساعدتك في تحقيق أهدافك' : language === 'fr' ? 'Des coaches certifies prets a vous aider a atteindre vos objectifs' : 'Certified coaches ready to help you achieve your goals'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث عن مدرب...' : language === 'fr' ? 'Rechercher un coach...' : 'Search for a coach...'}
                className="input-field pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSpecialization === spec
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                }`}
              >
                {spec === 'all' ? (language === 'ar' ? 'الكل' : language === 'fr' ? 'Tous' : 'All') : SPECIALIZATION_LABELS[spec][language]}
              </button>
            ))}
          </div>
        </div>

        {/* Coach Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoaches.map((coach) => (
            <div key={coach.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-700 font-bold text-xl">{coach.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{coach.name}</h3>
                  <p className="text-sm text-primary-600 font-medium">
                    {SPECIALIZATION_LABELS[coach.specialization][language]}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{coach.bio}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {coach.rating}
                </span>
                <span>{coach.students} students</span>
                <span>{coach.courses} courses</span>
              </div>

              <Link
                to={`/coaches/${coach.id}`}
                className="btn-primary w-full text-center text-sm"
              >
                {language === 'ar' ? 'عرض الملف الشخصي' : language === 'fr' ? 'Voir le profil' : 'View Profile'}
              </Link>
            </div>
          ))}
        </div>

        {filteredCoaches.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'ar' ? 'لم يتم العثور على نتائج' : language === 'fr' ? 'Aucun resultat' : 'No results found'}
            </h3>
            <p className="text-gray-500">
              {language === 'ar' ? 'جرب البحث بكلمات مختلفة' : language === 'fr' ? 'Essayez avec d\'autres termes' : 'Try different search terms'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}