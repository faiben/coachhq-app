import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getCourses, updateCourse, deleteCourse } from '../services/courseService';

const CATEGORIES = {
  life: { icon: '\u{1F331}', ar: 'حياة', fr: 'Life', en: 'Life' },
  business: { icon: '\u{1F4BC}', ar: 'أعمال', fr: 'Business', en: 'Business' },
  career: { icon: '\u{1F3AF}', ar: 'مهنة', fr: 'Carrière', en: 'Career' },
  health: { icon: '\u{1F4AA}', ar: 'صحة', fr: 'Santé', en: 'Health' },
};

const STATUS_STYLES = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
};

const VIDEO_STATUS_STYLES = {
  available: 'bg-green-100 text-green-700',
  transcoding: 'bg-amber-100 text-amber-700',
  none: 'bg-gray-100 text-gray-500',
};

const CATEGORY_OPTIONS = [
  { value: 'life', ar: 'حياة', fr: 'Life', en: 'Life' },
  { value: 'business', ar: 'أعمال', fr: 'Business', en: 'Business' },
  { value: 'career', ar: 'مهنة', fr: 'Carrière', en: 'Career' },
  { value: 'health', ar: 'صحة', fr: 'Santé', en: 'Health' },
];

export default function ContentLibraryPage() {
  const { language } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const refresh = () => setCourses(getCourses());

  const filteredCourses = courses.filter((c) => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: courses.length,
    published: courses.filter((c) => c.status === 'published').length,
    draft: courses.filter((c) => c.status === 'draft').length,
    totalStudents: courses.reduce((sum, c) => sum + (c.students || 0), 0),
    totalRevenue: courses.reduce((sum, c) => sum + (c.students || 0) * (c.pricing?.basePriceMAD || 0), 0),
  };

  const handleDelete = (id) => {
    deleteCourse(id);
    setDeleteConfirm(null);
    refresh();
  };

  const handleEditSave = (id, updates) => {
    updateCourse(id, updates);
    setEditingCourse(null);
    refresh();
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'مكتبة المحتوى' : language === 'fr' ? 'Bibliothèque de contenus' : 'Content Library'}
          </h1>
          <p className="text-gray-600 mt-1">
            {stats.published} {language === 'ar' ? 'منشورة' : language === 'fr' ? 'publiées' : 'published'}, {stats.draft} {language === 'ar' ? 'مسودة' : language === 'fr' ? 'brouillons' : 'drafts'}
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
          <p className="text-xs text-gray-500">{language === 'ar' ? 'إجمالي الدورات' : language === 'fr' ? 'Total cours' : 'Total courses'}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
          <p className="text-xs text-gray-500">{language === 'ar' ? 'منشورة' : language === 'fr' ? 'Publiées' : 'Published'}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{stats.totalStudents}</p>
          <p className="text-xs text-gray-500">{language === 'ar' ? 'إجمالي الطلاب' : language === 'fr' ? 'Total étudiants' : 'Total students'}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">{language === 'ar' ? 'الإيرادات (MAD)' : language === 'fr' ? 'Revenu (MAD)' : 'Revenue (MAD)'}</p>
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
              {f === 'all' ? (language === 'ar' ? 'الكل' : language === 'fr' ? 'Toutes' : 'All') : f === 'published' ? (language === 'ar' ? 'منشورة' : language === 'fr' ? 'Publiées' : 'Published') : (language === 'ar' ? 'مسودات' : language === 'fr' ? 'Brouillons' : 'Drafts')}
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
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${STATUS_STYLES[course.status] || STATUS_STYLES.draft}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span>{cat[language]}</span>
                    <span>{course.students || 0} {language === 'ar' ? 'طالب' : language === 'fr' ? 'étudiants' : 'students'}</span>
                    <span>{course.pricing?.totalWithVat || 0} MAD</span>
                    {course.pricing?.type && course.pricing.type !== 'one-time' && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                        {course.pricing.type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 text-xs rounded-full ${VIDEO_STATUS_STYLES[course.videoStatus] || VIDEO_STATUS_STYLES.none}`}>
                    {course.videoStatus === 'available' ? '\u{1F3AC} Ready' : course.videoStatus === 'transcoding' ? '\u{23F3} Processing' : course.videoStatus === 'none' ? '\u{2796} No video' : course.videoStatus}
                  </span>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'ar' ? 'تعديل' : language === 'fr' ? 'Modifier' : 'Edit'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(course)}
                    className="px-3 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    {language === 'ar' ? 'حذف' : language === 'fr' ? 'Supprimer' : 'Delete'}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'ar' ? 'لم يتم العثور على دورات' : language === 'fr' ? 'Aucun cours trouvé' : 'No courses found'}
          </h3>
          <p className="text-gray-500 mb-4">
            {filter !== 'all'
              ? (language === 'ar' ? 'لا توجد دورات تطابق هذا الفلتر' : language === 'fr' ? 'Aucun cours ne correspond à ce filtre' : 'No courses match this filter')
              : (language === 'ar' ? 'أنشئ دورتك الأولى للبدء' : language === 'fr' ? 'Créez votre premier cours pour commencer' : 'Create your first course to get started')}
          </p>
          {filter === 'all' && (
            <Link to="/courses/new" className="btn-primary">
              {language === 'ar' ? 'إنشاء دورة' : language === 'fr' ? 'Créer un cours' : 'Create Course'}
            </Link>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingCourse && (
        <EditModal
          course={editingCourse}
          language={language}
          onSave={(updates) => handleEditSave(editingCourse.id, updates)}
          onClose={() => setEditingCourse(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'حذف الدورة' : language === 'fr' ? 'Supprimer le cours' : 'Delete Course'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar'
                ? `هل أنت متأكد من حذف "${deleteConfirm.title}"؟`
                : language === 'fr'
                ? `Êtes-vous sûr de vouloir supprimer "${deleteConfirm.title}" ?`
                : `Are you sure you want to delete "${deleteConfirm.title}"?`}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {language === 'ar' ? 'إلغاء' : language === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {language === 'ar' ? 'حذف' : language === 'fr' ? 'Supprimer' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditModal({ course, language, onSave, onClose }) {
  const [title, setTitle] = useState(course.titles?.fr || course.title || '');
  const [category, setCategory] = useState(course.category || 'business');
  const [status, setStatus] = useState(course.status || 'published');
  const [price, setPrice] = useState(course.pricing?.basePriceMAD || 0);
  const [pricingType, setPricingType] = useState(course.pricing?.type || 'one-time');

  const vat = Math.round(Number(price) * 0.2);
  const total = Number(price) + vat;

  const handleSave = () => {
    onSave({
      title,
      titles: { ...course.titles, fr: title },
      category,
      status,
      pricing: {
        ...course.pricing,
        basePriceMAD: Number(price),
        type: pricingType,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          {language === 'ar' ? 'تعديل الدورة' : language === 'fr' ? 'Modifier le cours' : 'Edit Course'}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="label">{language === 'ar' ? 'العنوان' : language === 'fr' ? 'Titre' : 'Title'}</label>
            <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="label">{language === 'ar' ? 'الفئة' : language === 'fr' ? 'Catégorie' : 'Category'}</label>
            <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>{c[language]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">{language === 'ar' ? 'الحالة' : language === 'fr' ? 'Statut' : 'Status'}</label>
            <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="published">{language === 'ar' ? 'منشور' : language === 'fr' ? 'Publié' : 'Published'}</option>
              <option value="draft">{language === 'ar' ? 'مسودة' : language === 'fr' ? 'Brouillon' : 'Draft'}</option>
            </select>
          </div>

          <div>
            <label className="label">{language === 'ar' ? 'نوع السعر' : language === 'fr' ? 'Type de prix' : 'Pricing Type'}</label>
            <select className="input-field" value={pricingType} onChange={(e) => setPricingType(e.target.value)}>
              <option value="one-time">{language === 'ar' ? 'شراء واحد' : language === 'fr' ? 'Achat unique' : 'One-time'}</option>
              <option value="subscription">{language === 'ar' ? 'اشتراك' : language === 'fr' ? 'Abonnement' : 'Subscription'}</option>
              <option value="hybrid">{language === 'ar' ? 'مختلط' : language === 'fr' ? 'Hybride' : 'Hybrid'}</option>
            </select>
          </div>

          <div>
            <label className="label">{language === 'ar' ? 'السعر الأساسي (MAD)' : language === 'fr' ? 'Prix de base (MAD)' : 'Base Price (MAD)'}</label>
            <input type="number" className="input-field" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          {Number(price) > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              <div className="flex justify-between text-gray-600 mb-1">
                <span>TVA (20%)</span>
                <span>{vat} MAD</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 pt-1 border-t">
                <span>{language === 'ar' ? 'الإجمالي' : language === 'fr' ? 'Total' : 'Total'}</span>
                <span>{total} MAD</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
            {language === 'ar' ? 'إلغاء' : language === 'fr' ? 'Annuler' : 'Cancel'}
          </button>
          <button onClick={handleSave} className="btn-primary">
            {language === 'ar' ? 'حفظ' : language === 'fr' ? 'Enregistrer' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
