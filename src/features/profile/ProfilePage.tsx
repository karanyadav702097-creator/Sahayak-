import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../locales/i18nContext';
import { LanguageCode } from '../../types';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { 
  UserRound, 
  Mail, 
  MapPin, 
  Languages, 
  Bell, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  LogOut,
  Save,
  Phone
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, signOut, isAdmin, toggleAdminRolePreview } = useAuth();
  const { languages, setLanguage } = useI18n();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number || '');
  const [state, setState] = useState(profile?.state || 'Maharashtra');
  const [district, setDistrict] = useState(profile?.district || 'Pune');
  const [locality, setLocality] = useState(profile?.locality || '');
  const [language, setLanguagePref] = useState<LanguageCode>(profile?.preferred_language || 'en');

  const [emailNotif, setEmailNotif] = useState(profile?.notification_preferences?.email ?? true);
  const [inAppNotif, setInAppNotif] = useState(profile?.notification_preferences?.in_app ?? true);
  const [schemeAlerts, setSchemeAlerts] = useState(profile?.notification_preferences?.scheme_updates ?? true);

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const { error } = await updateProfile({
      display_name: displayName,
      phone_number: phoneNumber,
      state,
      district,
      locality,
      preferred_language: language,
      notification_preferences: {
        email: emailNotif,
        sms: false,
        in_app: inAppNotif,
        scheme_updates: schemeAlerts,
      },
    });

    setSaving(false);
    if (error) {
      setErrorMessage(error);
    } else {
      setLanguage(language);
      setSuccessMessage('Profile and preferences updated successfully.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header with IndiaFlag & UserRound */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              <UserRound className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white">{displayName || 'Citizen'}</h1>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300">
                  <IndiaFlag width={14} height={9} className="rounded-2xs" />
                  <span>Citizen of India</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  isAdmin ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  {profile?.role || 'Citizen'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile?.email}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleAdminRolePreview}
            className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 cursor-pointer flex items-center gap-1.5 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Switch Role ({profile?.role === 'admin' ? 'Citizen' : 'Admin'})</span>
          </button>
        </div>

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Details Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <UserRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>Personal Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Display Name</label>
                <div className="relative">
                  <UserRound className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Contact Phone (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">State</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">District / City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-200 mb-1">Locality / Ward Landmark</label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Kothrud, Ward 12"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Regional Language Preference with Languages icon */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>Regional Language Preference</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Select Portal & Assistant Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguagePref(e.target.value as LanguageCode)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900">
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notification Preferences with Bell icon */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Notification Settings</span>
            </h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-xs">
                <div>
                  <p className="font-bold text-white">Email Notifications</p>
                  <p className="text-[11px] text-slate-400">Receive complaint status changes via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-xs">
                <div>
                  <p className="font-bold text-white">In-App Alert Center</p>
                  <p className="text-[11px] text-slate-400">Display civic alerts in the top notifications bell</p>
                </div>
                <input
                  type="checkbox"
                  checked={inAppNotif}
                  onChange={(e) => setInAppNotif(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-xs">
                <div>
                  <p className="font-bold text-white">Welfare Scheme Updates</p>
                  <p className="text-[11px] text-slate-400">Alerts when new schemes launch in your state</p>
                </div>
                <input
                  type="checkbox"
                  checked={schemeAlerts}
                  onChange={(e) => setSchemeAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-500/40 text-rose-300 hover:bg-rose-950/40 text-xs font-bold cursor-pointer transition"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition cursor-pointer disabled:opacity-50 ring-1 ring-emerald-400/30"
            >
              <Save className="w-4 h-4 text-emerald-200" />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
