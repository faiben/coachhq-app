import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const STEPS = ['account', 'profile', 'verification', 'payment'];

export default function CoachRegistration() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    fullName: '', phone: '', language: 'fr', specialization: 'life', bio: '',
    idType: 'cin', idFile: null, selfieFile: null,
    bankName: '', accountNumber: '', rib: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [idPreview, setIdPreview] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (name === 'idFile' && file) setIdPreview(URL.createObjectURL(file));
      if (name === 'selfieFile' && file) setSelfiePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.email) newErrors.email = t('validation.required');
      if (!formData.password) newErrors.password = t('validation.required');
      else if (formData.password.length < 8) newErrors.password = t('validation.passwordMin');
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('validation.passwordMatch');
    }
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = t('validation.required');
      if (!formData.phone) newErrors.phone = t('validation.required');
    }
    if (step === 2) {
      if (!formData.idFile) newErrors.idFile = t('validation.required');
      if (!formData.selfieFile) newErrors.selfieFile = t('validation.required');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep((p) => Math.min(p + 1, STEPS.length - 1)); };
  const prevStep = () => setStep((p) => Math.max(p - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    try {
      await register(formData.email, formData.password, {
        fullName: formData.fullName,
        phone: formData.phone,
        language: formData.language,
        specialization: formData.specialization,
        bio: formData.bio,
      });
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    { value: 'life', label: 'Life Coaching', icon: '\u{1F331}' },
    { value: 'business', label: 'Business Coaching', icon: '\u{1F4BC}' },
    { value: 'career', label: 'Career Coaching', icon: '\u{1F3AF}' },
    { value: 'health', label: 'Health & Wellness', icon: '\u{1F4AA}' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${i < step ? 'bg-primary-600 text-white' : i === step ? 'bg-primary-100 text-primary-700 border-2 border-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                  {i < step ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (i + 1)}
                </div>
                {i < STEPS.length - 1 && <div className={`w-16 sm:w-24 h-1 mx-2 transition-colors ${i < step ? 'bg-primary-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{t('auth.signUp')}</span>
            <span>{t('coach.dashboard')}</span>
            <span>ID Check</span>
            <span>{t('payments.title')}</span>
          </div>
        </div>

        <div className="card p-8">
          {errors.submit && <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{errors.submit}</div>}
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div><h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.registerTitle')}</h2><p className="text-gray-600">{t('auth.registerSubtitle')}</p></div>
                <div><label className="label">{t('auth.email')}</label><input type="email" name="email" className={`input-field ${errors.email ? 'border-red-500' : ''}`} value={formData.email} onChange={handleChange} />{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}</div>
                <div><label className="label">{t('auth.password')}</label><input type="password" name="password" className={`input-field ${errors.password ? 'border-red-500' : ''}`} value={formData.password} onChange={handleChange} />{errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}</div>
                <div><label className="label">{t('auth.confirmPassword')}</label><input type="password" name="confirmPassword" className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`} value={formData.confirmPassword} onChange={handleChange} />{errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}</div>
                <div><label className="label">{t('auth.languagePreference')}</label><select name="language" className="input-field" value={formData.language} onChange={handleChange}><option value="fr">Francais</option><option value="ar">&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;</option><option value="en">English</option></select></div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div><h2 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h2><p className="text-gray-600">Tell us about yourself and your coaching specialty</p></div>
                <div><label className="label">{t('auth.fullName')}</label><input type="text" name="fullName" className={`input-field ${errors.fullName ? 'border-red-500' : ''}`} value={formData.fullName} onChange={handleChange} />{errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}</div>
                <div><label className="label">{t('auth.phone')}</label><input type="tel" name="phone" className={`input-field ${errors.phone ? 'border-red-500' : ''}`} placeholder="+212 6XX-XXXXXX" value={formData.phone} onChange={handleChange} />{errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}</div>
                <div><label className="label">Coaching Specialization</label><div className="grid grid-cols-2 gap-3">{specializations.map((spec) => (<button key={spec.value} type="button" onClick={() => setFormData((prev) => ({ ...prev, specialization: spec.value }))} className={`p-4 rounded-lg border-2 text-left transition-all ${formData.specialization === spec.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}><span className="text-2xl block mb-1">{spec.icon}</span><span className="text-sm font-medium">{spec.label}</span></button>))}</div></div>
                <div><label className="label">Bio (optional)</label><textarea name="bio" rows={3} className="input-field resize-none" placeholder="Brief description of your coaching experience..." value={formData.bio} onChange={handleChange} /></div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div><h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2><p className="text-gray-600">Upload a government ID and a selfie for verification. This ensures trust on our platform.</p></div>
                <div>
                  <label className="label">ID Type</label>
                  <div className="flex gap-3 mb-4">
                    {[{ value: 'cin', label: 'CIN (Moroccan ID)' }, { value: 'passport', label: 'Passport' }].map((type) => (
                      <button key={type.value} type="button" onClick={() => setFormData((prev) => ({ ...prev, idType: type.value }))} className={`flex-1 p-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.idType === type.value ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{type.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">Upload Government ID</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${errors.idFile ? 'border-red-400 bg-red-50' : idPreview ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    {idPreview ? (<div><img src={idPreview} alt="ID Preview" className="max-h-40 mx-auto rounded-lg mb-3" /><p className="text-sm text-primary-600 font-medium">ID uploaded successfully</p></div>) : (
                      <label className="cursor-pointer block"><svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><p className="text-sm text-gray-600">Click to upload or drag and drop</p><p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (max 5MB)</p></label>
                    )}
                    <input type="file" name="idFile" accept="image/*,.pdf" className="hidden" onChange={handleChange} />
                  </div>
                  {errors.idFile && <p className="text-red-500 text-xs mt-1">{errors.idFile}</p>}
                </div>
                <div>
                  <label className="label">Upload Selfie</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${errors.selfieFile ? 'border-red-400 bg-red-50' : selfiePreview ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    {selfiePreview ? (<div><img src={selfiePreview} alt="Selfie Preview" className="max-h-40 mx-auto rounded-lg mb-3" /><p className="text-sm text-primary-600 font-medium">Selfie uploaded successfully</p></div>) : (
                      <label className="cursor-pointer block"><svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg><p className="text-sm text-gray-600">Click to upload a selfie for verification</p><p className="text-xs text-gray-400 mt-1">Face clearly visible, neutral expression</p></label>
                    )}
                    <input type="file" name="selfieFile" accept="image/*" className="hidden" onChange={handleChange} />
                  </div>
                  {errors.selfieFile && <p className="text-red-500 text-xs mt-1">{errors.selfieFile}</p>}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4"><p className="text-sm text-amber-800"><strong>Note:</strong> Your identity will be verified manually within 24-48 hours. You can start using the platform immediately but payments will be held until verification is complete.</p></div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div><h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Setup</h2><p className="text-gray-600">Connect your bank account to receive payouts. You can skip this and set it up later.</p></div>
                <div><label className="label">Bank Name</label><select name="bankName" className="input-field" value={formData.bankName} onChange={handleChange}><option value="">Select your bank</option>{['Attijariwafa Bank', 'BMCE Bank of Africa', 'Banque Populaire', 'CIH Bank', 'Credit du Maroc', 'Societe Generale', 'Al Barid Bank', 'Other'].map((bank) => (<option key={bank} value={bank}>{bank}</option>))}</select></div>
                <div><label className="label">Account Number (RIB)</label><input type="text" name="rib" className="input-field" placeholder="007 780 0001 234567890123 45" value={formData.rib} onChange={handleChange} /><p className="text-xs text-gray-500 mt-1">24-digit RIB number found on your bank statements</p></div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4"><p className="text-sm text-blue-800"><strong>Secure:</strong> We use PayMob for payment processing. Your bank details are encrypted and never stored on our servers.</p></div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 0 ? (<button type="button" onClick={prevStep} className="btn-secondary">{t('common.back')}</button>) : <div />}
              {step < STEPS.length - 1 ? (
                <button type="button" onClick={nextStep} className="btn-primary">{t('common.next')}</button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary">{loading ? t('common.loading') : 'Complete Registration'}</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
