import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SiteSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    platformName: 'CoachHQ',
    supportEmail: 'support@coachhq.com',
    defaultCurrency: 'MAD',
    vatRate: '20',
    minPayoutAmount: '500',
    autoVerifyCoaches: false,
    maintenanceMode: false,
    ramadanMode: true,
    maxVideoSizeGB: '5',
    maxCoursePrice: '50000',
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-red-600' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`} />
    </button>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.siteSettings')}</h1>
          <p className="text-gray-600 mt-1">{t('admin.siteSettingsSubtitle')}</p>
        </div>
        <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors">
          {t('common.save')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">{t('admin.settings.general')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.settings.platformName')}</label>
              <input type="text" value={settings.platformName} onChange={(e) => handleChange('platformName', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.settings.supportEmail')}</label>
              <input type="email" value={settings.supportEmail} onChange={(e) => handleChange('supportEmail', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.settings.defaultCurrency')}</label>
              <select value={settings.defaultCurrency} onChange={(e) => handleChange('defaultCurrency', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option value="MAD">MAD - Moroccan Dirham</option>
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="XAF">XAF - CFA Franc</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">{t('admin.settings.financial')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.settings.vatRate')} (%)</label>
              <input type="number" value={settings.vatRate} onChange={(e) => handleChange('vatRate', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.settings.minPayout')} (MAD)</label>
              <input type="number" value={settings.minPayoutAmount} onChange={(e) => handleChange('minPayoutAmount', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.settings.maxCoursePrice')} (MAD)</label>
              <input type="number" value={settings.maxCoursePrice} onChange={(e) => handleChange('maxCoursePrice', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">{t('admin.settings.platform')}</h2>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('admin.settings.maintenanceMode')}</p>
                <p className="text-sm text-gray-500">{t('admin.settings.maintenanceModeHint')}</p>
              </div>
              <Toggle checked={settings.maintenanceMode} onChange={() => handleChange('maintenanceMode', !settings.maintenanceMode)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('admin.settings.autoVerify')}</p>
                <p className="text-sm text-gray-500">{t('admin.settings.autoVerifyHint')}</p>
              </div>
              <Toggle checked={settings.autoVerifyCoaches} onChange={() => handleChange('autoVerifyCoaches', !settings.autoVerifyCoaches)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('admin.settings.ramadanMode')}</p>
                <p className="text-sm text-gray-500">{t('admin.settings.ramadanModeHint')}</p>
              </div>
              <Toggle checked={settings.ramadanMode} onChange={() => handleChange('ramadanMode', !settings.ramadanMode)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.settings.maxVideoSize')} (GB)</label>
              <input type="number" value={settings.maxVideoSizeGB} onChange={(e) => handleChange('maxVideoSizeGB', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
          <h2 className="text-lg font-bold text-red-600 mb-6">{t('admin.settings.dangerZone')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{t('admin.settings.clearCache')}</p>
                <p className="text-sm text-gray-500">{t('admin.settings.clearCacheHint')}</p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">{t('admin.settings.clearCache')}</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{t('admin.settings.exportData')}</p>
                <p className="text-sm text-gray-500">{t('admin.settings.exportDataHint')}</p>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700">{t('admin.settings.exportData')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
