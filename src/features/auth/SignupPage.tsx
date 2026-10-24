import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../locales/i18nContext';
import { LanguageCode } from '../../types';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { BrandLogo } from '../../components/common/BrandLogo';
import { 
  Mail, 
  Lock, 
  UserRound, 
  MapPin, 
  Languages, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck 
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

export const SignupPage: React.FC = () => {
  const { signUp } = useAuth();
  const { languages, setLanguage } = useI18n();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [preferredLang, setPreferredLang] = useState<LanguageCode>('en');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await signUp(email, password, name, state, district, preferredLang);
      if (signUpError) {
        setError(signUpError);
        setLoading(false);
      } else {
        setLanguage(preferredLang);
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 400);
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please check inputs.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#070D18] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="flex justify-center mb-3">
          <BrandLogo size="lg" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 mb-3 backdrop-blur-md shadow-sm">
          <IndiaFlag width={16} height={11} className="rounded-2xs" />
          <span>New Citizen Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Create Citizen Account
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Access civic assistance, lodge complaints & explore verified welfare schemes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/95 backdrop-blur-md py-8 px-6 sm:px-8 shadow-2xl border border-slate-800 rounded-3xl">
          
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Registration successful! Launching your citizen dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl border border-slate-700 bg-slate-950/80 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl border border-slate-700 bg-slate-950/80 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-slate-500">Min 4 characters</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 text-xs rounded-xl border border-slate-700 bg-slate-950/80 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>State</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950/80 text-white focus:outline-hidden focus:border-orange-500 transition"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  District / City
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Pune"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950/80 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-emerald-400" />
                <span>Preferred Language</span>
              </label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value as LanguageCode)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950/80 text-white focus:outline-hidden focus:border-orange-500 transition"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-orange-950/50 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ring-1 ring-orange-400/30 active:scale-98"
            >
              {loading ? (
                <span>Creating profile...</span>
              ) : (
                <>
                  <span>Create Citizen Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            <span>Already registered? </span>
            <Link to="/login" className="font-bold text-orange-400 hover:text-orange-300 hover:underline">
              Sign In here
            </Link>
          </div>

        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero-Aadhaar storage policy. Your privacy and credentials are secure.</span>
        </div>
      </div>
    </div>
  );
};
