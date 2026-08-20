import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Coach Public Profile Page
 * What clients see when they click on a coach
 * SOP Section 6.3: Client Purchase Flow
 */

const MOCK_COACH = {
  id: '1',
  name: 'Fatima Benhaida',
  specialization: 'business',
  bio: 'Business coach helping entrepreneurs scale their ventures in Morocco. Specialized in startup growth strategies, market entry for international expansion, and leadership development.',
  rating: 4.8,
  totalStudents: 156,
  totalCourses: 3,
  languages: ['fr', 'ar', 'en'],
  experience: '8 years',
  certifications: ['ICF PCC', 'MBA'],
  avatar: null,
};

const MOCK_COURSES = [
  {
    id: 'c1',
    title: 'Startup Growth Masterclass',
    description: 'Learn the essential strategies to scale your Moroccan startup from 0 to 1M MAD revenue',
    price: 299,
    duration: '4 hours',
    students: 89,
    rating: 4.9,
    category: 'business',
  },
  {
    id: 'c2',
    title: 'Leadership for Moroccan Entrepreneurs',
    description: 'Develop your leadership skills with culturally adapted frameworks',
    price: 199,
    duration: '3 hours',
    students: 67,
    rating: 4.7,
    category: 'business',
  },
];

export default function CoachProfilePage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [coach, setCoach] = useState(MOCK_COACH);
  const [courses, setCourses] = useState(MOCK_COURSES);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/browse" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === 'ar' ? 'العودة' : language === 'fr' ? 'Retour' : 'Back'}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Coach Header */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-700 font-bold text-3xl">{coach.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{coach.name}</h1>
              <p className="text-primary-600 font-medium mb-3">
                {coach.specialization === 'business' ? 'Business Coach' : 'Life Coach'}
              </p>
              <p className="text-gray-600 mb-4">{coach.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {coach.rating} rating
                </span>
                <span>{coach.totalStudents} students</span>
                <span>{coach.totalCourses} courses</span>
                <span>{coach.experience}</span>
              </div>
              <div className="flex gap-2 mt-4">
                {coach.certifications.map((cert) => (
                  <span key={cert} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">{cert}</span>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto">
              <button className="btn-primary w-full md:w-auto">
                {language === 'ar' ? 'احجز جلسة' : language === 'fr' ? 'Reserver une seance' : 'Book a Session'}
              </button>
            </div>
          </div>
        </div>

        {/* Courses */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {language === 'ar' ? 'الدورات' : language === 'fr' ? 'Formations' : 'Courses'}
        </h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-full md:w-32 h-20 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{SPECIALIZATION_ICONS[course.category]}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{course.duration}</span>
                    <span>{course.students} students</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-gray-900">{course.price} MAD</div>
                  <div className="text-xs text-gray-500">{language === 'ar' ? 'شامل الضريبة' : language === 'fr' ? 'TVA incluse' : 'VAT included'}</div>
                  <button className="btn-primary mt-2 text-sm">
                    {language === 'ar' ? 'اشترِ' : language === 'fr' ? 'Acheter' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const SPECIALIZATION_ICONS = {
  life: '\u{1F331}',
  business: '\u{1F4BC}',
  career: '\u{1F3AF}',
  health: '\u{1F4AA}',
};