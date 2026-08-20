import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const MOCK_COURSES = [
  {
    id: '1',
    title: 'Startup Growth Masterclass',
    category: 'business',
    status: 'published',
    students: 89,
    pricing: { basePriceMAD: 299, vat: 59.8, totalWithVat: 358.8, type: 'one-time' },
    createdAt: '2024-01-15',
    videoStatus: 'available',
  },
  {
    id: '2',
    title: 'Leadership for Entrepreneurs',
    category: 'business',
    status: 'draft',
    students: 0,
    pricing: { basePriceMAD: 199, vat: 39.8, totalWithVat: 238.8, type: 'subscription', interval: 'monthly' },
    createdAt: '2024-02-10',
    videoStatus: 'transcoding',
  },
  {
    id: '3',
    title: 'Work-Life Balance',
    category: 'life',
    status: 'published',
    students: 34,
    pricing: { basePriceMAD: 149, vat: 29.8, totalWithVat: 178.8, type: 'one-time' },
    createdAt: '2024-03-05',
    videoStatus: 'available',
  },
];

const CATEGORIES = {
  life: { icon: '\u{1F331}', ar: 'حياة', fr: 'Life', en: 'Life' },
  business: { icon: '\u{1F4BC}', ar: 'أعمال', fr: 'Business', en: 'Business' },
  career: { icon: '\u{1F3AF}', ar: 'مهنة', fr: 'Carrière', en: 'Career' },
  health: { icon: '\u{1F4AA}', ar: 'صحة', fr: 'Santé', en: 'Health' },
};

const STATUS_STYLES = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  processing: 'bg-amber-100 text-amber-700',
};

const VIDEO_STATUS_STYLES = {
  available: 'bg-green-100 text-green-700',
  transcoding: 'bg-amber-100 text-amber-700',
  uploading: 'bg-blue-100 text-blue-700',
  failed: 'bg-red-100 text-red-700',
};

export default function ContentLibraryPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((c) => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: courses.length,
    published: courses.filter((c) => c.status === 'published').length,
    draft: courses.filter((c) => c.status === 'draft').length,
    totalStudents: courses.reduce((sum, c) => sum + c.students, 0),
    totalRevenue: courses.reduce((sum, c) => sum + c.students * c.pricing.basePriceMAD, 0),
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'مكتبة المحتوى' : language === 'fr' ? 'Bibliothèque de contenus' : 'Content Library'}
          </h1>
          <p className="text-gray-600 mt-1">
            {stats.published} published, {stats.draft} drafts
          </p>
        </div>
        <Link to="/courses/new" className="btn-primary flex items-center gap-2">
          <span>{'\u{2795}'}</span>
          {language === 'ar' ? 'إنشاء دورة' : language === 'fr' ? 'Nouveau cours' : 'New Course'}
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500">Total courses</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
          <p className="text-xs text-gray-500">Published</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{stats.totalStudents}</p>
          <p className="text-xs text-gray-500">Total students</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Revenue (MAD)</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          className="input-field md:w-64"
          placeholder={language === 'ar' ? 'بحث...' : language === 'fr' ? 'Rechercher...' : 'Search...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          {['all', 'published', 'draft'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
              }`}
            >
              {f === 'all' ? 'All' : f === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => {
          const cat = CATEGORIES[course.category] || CATEGORIES.business;
          return (
            <div key={course.id} className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-full md:w-20 h-16 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{cat.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{course.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${STATUS_STYLES[course.status]}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span>{cat[language]}</span>
                    <span>{course.students} students</span>
                    <span>{course.pricing.totalWithVat} MAD</span>
                    {course.pricing.type !== 'one-time' && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                        {course.pricing.type} {course.pricing.interval && `/ ${course.pricing.interval}`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 text-xs rounded-full ${VIDEO_STATUS_STYLES[course.videoStatus] || 'bg-gray-100 text-gray-500'}`}>
                    {course.videoStatus === 'available' ? '\u{1F3AC} Ready' : course.videoStatus === 'transcoding' ? '\u{23F3} Processing' : course.videoStatus}
                  </span>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">{'\u{1F4DA}'}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-4">
            {filter !== 'all' ? 'No courses match this filter' : 'Create your first course to get started'}
          </p>
          {filter === 'all' && (
            <Link to="/courses/new" className="btn-primary">Create Course</Link>
          )}
        </div>
      )}
    </div>
  );
}
