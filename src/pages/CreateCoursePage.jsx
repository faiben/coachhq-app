import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
  uploadVideo,
  formatFileSize,
} from '../services/videoService';

const STEPS = ['details', 'video', 'pricing', 'publish'];
const CATEGORIES = [
  { value: 'life', icon: '\u{1F331}', ar: 'تدريب الحياة', fr: 'Life Coaching', en: 'Life Coaching' },
  { value: 'business', icon: '\u{1F4BC}', ar: 'تدريب الأعمال', fr: 'Business Coaching', en: 'Business Coaching' },
  { value: 'career', icon: '\u{1F3AF}', ar: 'المسار المهني', fr: 'Carrière', en: 'Career' },
  { value: 'health', icon: '\u{1F4AA}', ar: 'الصحة والعافية', fr: 'Santé', en: 'Health & Wellness' },
];

function calculateVAT(basePrice) {
  const vat = Math.round(basePrice * 0.20);
  return { basePrice, vat, totalWithVat: basePrice + vat };
}

export default function CreateCoursePage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    titleAr: '',
    titleFr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionFr: '',
    descriptionEn: '',
    category: 'business',
    thumbnail: null,
    thumbnailPreview: null,
    videoFile: null,
    videoName: '',
    uploadProgress: 0,
    uploadStatus: '',
    videoUrl: null,
    pricingType: 'one-time',
    basePriceMAD: 0,
    subscriptionPriceMAD: 0,
    subscriptionInterval: 'monthly',
    privacy: 'unlisted',
    language: 'fr',
  });

  const vat = calculateVAT(form.pricingType === 'one-time' ? form.basePriceMAD : form.subscriptionPriceMAD);

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm('thumbnail', file);
      updateForm('thumbnailPreview', URL.createObjectURL(file));
    }
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm('videoFile', file);
      updateForm('videoName', file.name);
      updateForm('uploadProgress', 0);
      updateForm('uploadStatus', '');
      updateForm('videoUrl', null);
    }
  };

  const handleVideoUpload = async () => {
    if (!form.videoFile || !currentUser) return;

    setSubmitting(true);
    updateForm('uploadStatus', 'Uploading...');
    updateForm('uploadProgress', 0);

    try {
      const result = await uploadVideo({
        coachId: currentUser.uid,
        file: form.videoFile,
        onProgress: (progress) => {
          updateForm('uploadProgress', progress);
          if (progress >= 100) {
            updateForm('uploadStatus', 'Upload complete');
          }
        },
      });

      updateForm('videoUrl', result.url);
      updateForm('uploadStatus', 'Upload complete');
    } catch (error) {
      console.error('Upload failed:', error);
      updateForm('uploadStatus', 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublish = async () => {
    setSubmitting(true);
    try {
      const courseData = {
        title: form.titleFr || form.titleEn || 'Untitled',
        titles: { ar: form.titleAr, fr: form.titleFr, en: form.titleEn },
        descriptions: { ar: form.descriptionAr, fr: form.descriptionFr, en: form.descriptionEn },
        category: form.category,
        videoUrl: form.videoUrl,
        pricing: {
          type: form.pricingType,
          basePriceMAD: form.basePriceMAD,
          vat: vat.vat,
          totalWithVat: vat.totalWithVat,
          subscriptionPriceMAD: form.subscriptionPriceMAD,
          subscriptionInterval: form.subscriptionInterval,
        },
        privacy: form.privacy,
        status: 'published',
      };

      console.log('Publishing course:', courseData);
      alert('Course published! (Connect Firebase to persist data)');
      navigate('/courses');
    } catch (error) {
      console.error('Publish failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = [
    { ar: 'التفاصيل', fr: 'Détails', en: 'Details' },
    { ar: 'الفيديو', fr: 'Vidéo', en: 'Video' },
    { ar: 'السعر', fr: 'Tarification', en: 'Pricing' },
    { ar: 'نشر', fr: 'Publier', en: 'Publish' },
  ];

  return (
    <div className="page-container max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {language === 'ar' ? 'إنشاء دورة جديدة' : language === 'fr' ? 'Créer un cours' : 'Create a Course'}
      </h1>
      <p className="text-gray-600 mb-8">
        {language === 'ar' ? 'املأ التفاصيل ниже لنشر دورتك' : language === 'fr' ? 'Remplissez les détails ci-dessous pour publier votre cours' : 'Fill in the details below to publish your course'}
      </p>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < step ? 'bg-primary-600 text-white' : i === step ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < step ? '\u2713' : i + 1}
              </div>
              <span className="text-xs mt-1 text-gray-500">{stepLabels[i][language]}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 mt-[-16px] ${i < step ? 'bg-primary-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="card p-8">
        {/* Step 1: Details */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'تفاصيل الدورة' : language === 'fr' ? 'Détails du cours' : 'Course Details'}
            </h2>

            <div>
              <label className="label">Title (Arabic)</label>
              <input className="input-field" dir="rtl" value={form.titleAr} onChange={(e) => updateForm('titleAr', e.target.value)} placeholder="عنوان الدورة" />
            </div>
            <div>
              <label className="label">Title (French)</label>
              <input className="input-field" value={form.titleFr} onChange={(e) => updateForm('titleFr', e.target.value)} placeholder="Titre du cours" />
            </div>
            <div>
              <label className="label">Title (English)</label>
              <input className="input-field" value={form.titleEn} onChange={(e) => updateForm('titleEn', e.target.value)} placeholder="Course title" />
            </div>

            <div>
              <label className="label">Description (French)</label>
              <textarea className="input-field" rows={3} value={form.descriptionFr} onChange={(e) => updateForm('descriptionFr', e.target.value)} placeholder="Décrivez votre cours..." />
            </div>

            <div>
              <label className="label">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => updateForm('category', cat.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      form.category === cat.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat[language]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Thumbnail</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                {form.thumbnailPreview ? (
                  <img src={form.thumbnailPreview} alt="Thumbnail" className="mx-auto h-32 rounded-lg object-cover" />
                ) : (
                  <>
                    <div className="text-4xl mb-2">{'\u{1F4F7}'}</div>
                    <p className="text-sm text-gray-500">Click to upload thumbnail</p>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" id="thumbnail-upload" />
                <label htmlFor="thumbnail-upload" className="cursor-pointer mt-2 inline-block text-sm text-primary-600 hover:text-primary-700">
                  {form.thumbnail ? 'Change' : 'Choose file'}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Video */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'رفع الفيديو' : language === 'fr' ? 'Téléverser la vidéo' : 'Upload Video'}
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">{'\u{1F3AC}'}</div>
              {form.videoFile ? (
                <div>
                  <p className="text-sm font-medium text-gray-900">{form.videoName}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatFileSize(form.videoFile.size)}</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    {language === 'ar' ? 'اسحب وأفلت الفيديو هنا' : language === 'fr' ? 'Glissez-déposez votre vidéo ici' : 'Drag and drop your video here'}
                  </p>
                  <p className="text-xs text-gray-400">MP4, MOV, AVI — up to 5GB</p>
                </div>
              )}
              <input type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" id="video-upload" />
              <label htmlFor="video-upload" className="cursor-pointer mt-4 inline-block btn-primary text-sm">
                {form.videoFile ? (language === 'ar' ? 'تغيير الملف' : language === 'fr' ? 'Changer le fichier' : 'Change file') : (language === 'ar' ? 'اختر ملف' : language === 'fr' ? 'Choisir un fichier' : 'Choose file')}
              </label>
            </div>

            {form.videoFile && (
              <div>
                <button onClick={handleVideoUpload} disabled={submitting || form.videoUrl} className="btn-primary w-full">
                  {form.videoUrl
                    ? (language === 'ar' ? 'تم الرفع ✓' : language === 'fr' ? 'Téléversé ✓' : 'Uploaded ✓')
                    : submitting
                    ? (language === 'ar' ? 'جاري الرفع...' : language === 'fr' ? 'Téléversement...' : 'Uploading...')
                    : (language === 'ar' ? 'رفع إلى Firebase Storage' : language === 'fr' ? 'Téléverser sur Firebase Storage' : 'Upload to Firebase Storage')}
                </button>
                {form.uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{form.uploadStatus}</span>
                      <span>{form.uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${form.uploadProgress >= 100 ? 'bg-green-500' : 'bg-primary-500'}`}
                        style={{ width: `${form.uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="label">
                {language === 'ar' ? 'خصوصية الفيديو' : language === 'fr' ? 'Confidentialité' : 'Video Privacy'}
              </label>
              <select className="input-field" value={form.privacy} onChange={(e) => updateForm('privacy', e.target.value)}>
                <option value="unlisted">
                  {language === 'ar' ? 'غير مدرج (رابط فقط)' : language === 'fr' ? 'Non répertorié (lien uniquement)' : 'Unlisted (link only)'}
                </option>
                <option value="private">
                  {language === 'ar' ? 'خاص' : language === 'fr' ? 'Privé' : 'Private'}
                </option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{'\u{1F4E1}'}</span>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {language === 'ar' ? ' Firebase Storage' : language === 'fr' ? 'Stockage Firebase' : 'Powered by Firebase Storage'}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {language === 'ar' ? 'فيديوهاتك مخزنة بأمان على Firebase. يمكن للمشتركين مشاهدتها مباشرة عبر الرابط.' : language === 'fr' ? 'Vos vidéos sont stockées de manière sécurisée sur Firebase. Les abonnés peuvent les visionner directement.' : 'Your videos are securely stored on Firebase. Subscribers can stream directly via the link.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'التسعير' : language === 'fr' ? 'Tarification' : 'Pricing'}
            </h2>

            <div>
              <label className="label">
                {language === 'ar' ? 'نوع الخطة' : language === 'fr' ? 'Type de forfait' : 'Plan Type'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'one-time', icon: '\u{1F4B3}', ar: 'شراء واحد', fr: 'Achat unique', en: 'One-time' },
                  { value: 'subscription', icon: '\u{1F501}', ar: 'اشتراك', fr: 'Abonnement', en: 'Subscription' },
                  { value: 'hybrid', icon: '\u{1F517}', ar: 'مختلط', fr: 'Hybride', en: 'Hybrid' },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => updateForm('pricingType', type.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      form.pricingType === type.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-sm font-medium">{type[language]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">
                {form.pricingType === 'one-time'
                  ? (language === 'ar' ? 'سعر الدورة (MAD)' : language === 'fr' ? 'Prix du cours (MAD)' : 'Course Price (MAD)')
                  : (language === 'ar' ? 'السعر الشهري (MAD)' : language === 'fr' ? 'Prix mensuel (MAD)' : 'Monthly Price (MAD)')}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">MAD</span>
                <input
                  type="number"
                  className="input-field pl-14"
                  min={0}
                  step={10}
                  value={form.basePriceMAD}
                  onChange={(e) => updateForm('basePriceMAD', Number(e.target.value))}
                />
              </div>
            </div>

            {vat.totalWithVat > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{language === 'ar' ? 'السعر الأساسي' : language === 'fr' ? 'Prix de base' : 'Base price'}</span>
                  <span>{vat.basePriceMAD.toLocaleString()} MAD</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{language === 'ar' ? 'ضريبة القيمة المضافة (20%)' : language === 'fr' ? 'TVA (20%)' : 'VAT (20%)'}</span>
                  <span>{vat.vat.toLocaleString()} MAD</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t">
                  <span>{language === 'ar' ? 'يدفع العميل' : language === 'fr' ? 'Le client paie' : 'Client pays'}</span>
                  <span>{vat.totalWithVat.toLocaleString()} MAD</span>
                </div>
              </div>
            )}

            {(form.pricingType === 'subscription' || form.pricingType === 'hybrid') && (
              <div>
                <label className="label">
                  {language === 'ar' ? 'فترة الاشتراك' : language === 'fr' ? 'Intervalle' : 'Subscription Interval'}
                </label>
                <select className="input-field" value={form.subscriptionInterval} onChange={(e) => updateForm('subscriptionInterval', e.target.value)}>
                  <option value="monthly">{language === 'ar' ? 'شهري' : language === 'fr' ? 'Mensuel' : 'Monthly'}</option>
                  <option value="quarterly">{language === 'ar' ? 'ربع سنوي' : language === 'fr' ? 'Trimestriel' : 'Quarterly'}</option>
                  <option value="yearly">{language === 'ar' ? 'سنوي' : language === 'fr' ? 'Annuel' : 'Yearly'}</option>
                </select>
              </div>
            )}

            {form.pricingType === 'hybrid' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  {language === 'ar' ? 'الخطة المختطة تشمل وصولًا للأبد + جلسات شهرية مع المدرب' : language === 'fr' ? "Le plan hybride inclut un accès à vie + des sessions mensuelles avec le coach" : 'Hybrid plan includes lifetime access + monthly coach sessions'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Publish */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'مراجعة ونشر' : language === 'fr' ? 'Vérifier et publier' : 'Review & Publish'}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {language === 'ar' ? 'عنوان الدورة' : language === 'fr' ? 'Titre' : 'Course Title'}
                </h3>
                <p className="text-gray-900">{form.titleFr || form.titleEn || 'Untitled'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الفئة' : language === 'fr' ? 'Catégorie' : 'Category'}
                  </h3>
                  <p className="text-gray-900">{CATEGORIES.find((c) => c.value === form.category)?.[language]}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الفيديو' : language === 'fr' ? 'Vidéo' : 'Video'}
                  </h3>
                  <p className="text-gray-900">{form.videoFile ? form.videoName : 'Not uploaded'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'نوع السعر' : language === 'fr' ? 'Type de prix' : 'Pricing Type'}
                  </h3>
                  <p className="text-gray-900 capitalize">{form.pricingType.replace('-', ' ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'سعر العميل' : language === 'fr' ? 'Prix client' : 'Client Price'}
                  </h3>
                  <p className="text-gray-900 font-semibold">{vat.totalWithVat.toLocaleString()} MAD (VAT incl.)</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-2xl">{'\u{1F512}'}</span>
              <span>Payment handled securely via PayMob (CMI certified)</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-2xl">{'\u{1F4E1}'}</span>
              <span>Video hosted on Firebase Storage</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-2xl">{'\u{1F30D}'}</span>
              <span>Available in {form.titleAr ? 'Arabic, ' : ''}{form.titleFr ? 'French, ' : ''}{form.titleEn ? 'English' : ''}</span>
            </div>

            <button onClick={handlePublish} disabled={submitting} className="btn-primary w-full text-lg py-4">
              {submitting ? 'Publishing...' : language === 'ar' ? 'نشر الدورة' : language === 'fr' ? 'Publier le cours' : 'Publish Course'}
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="btn-secondary">
              {language === 'ar' ? 'السابق' : language === 'fr' ? 'Précédent' : 'Previous'}
            </button>
          ) : <div />}
          {step < STEPS.length - 1 && (
            <button onClick={() => setStep(step + 1)} className="btn-primary">
              {language === 'ar' ? 'التالي' : language === 'fr' ? 'Suivant' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
