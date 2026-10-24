import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { BrandLogo } from '../../components/common/BrandLogo';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  UserRound, 
  Sparkles 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { signIn, profile } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email.trim(), password || 'admin123');
      if (signInError) {
        setError(signInError);
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(demoEmail, demoPass);
      if (signInError) {
        setError(signInError);
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      }
    } catch (err: any) {
      setError(err.message || 'Quick login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] bg-[#070D18] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="flex justify-center mb-3">
          <BrandLogo size="lg" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 mb-3 backdrop-blur-md shadow-sm">
          <IndiaFlag width={16} height={11} className="rounded-2xs" />
          <span>National Citizen Access Portal</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sign In to SAHAYAK AI
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Access your personalized civic dashboard, saved welfare schemes, and grievance petitions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/95 backdrop-blur-md py-8 px-6 sm:px-8 shadow-2xl border border-slate-800 rounded-3xl">
          
          {profile && (
            <div className="mb-5 p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 flex items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                  <UserRound className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="truncate">
                  <p className="text-[10px] text-slate-400">Signed In Active Session:</p>
                  <p className="text-xs font-bold text-white truncate">{profile.display_name} <span className="text-[10px] text-emerald-400 uppercase font-semibold">({profile.role})</span></p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 transition flex items-center gap-1 shadow-md shadow-emerald-950/50"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Authentication successful! Redirecting to dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-orange-950/50 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ring-1 ring-orange-400/30 active:scale-98"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Pre-fill Helpers */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[11px] font-bold text-slate-400 mb-2.5 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant 1-Click Direct Sign In Profiles</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('aarav.sharma@example.in', 'citizen123')}
                className="px-2.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-[11px] font-medium text-slate-200 text-center cursor-pointer transition flex flex-col items-center justify-center hover:border-sky-500/50"
              >
                <span className="font-bold text-sky-400">Aarav Sharma</span>
                <span className="text-[10px] text-slate-400">Citizen</span>
                <span className="text-[9px] text-slate-500 mt-0.5 font-mono">Pass: citizen123</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('karanyadav702097@gmail.com', 'admin123')}
                className="px-2.5 py-2.5 rounded-xl border border-orange-500/40 bg-orange-950/30 hover:bg-orange-950/50 text-[11px] font-medium text-orange-200 text-center cursor-pointer transition flex flex-col items-center justify-center hover:border-orange-400"
              >
                <span className="font-bold text-orange-400">Karan Yadav</span>
                <span className="text-[10px] text-orange-300">Lead Admin</span>
                <span className="text-[9px] text-orange-400/80 mt-0.5 font-mono">Pass: admin123</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin.desk@sahayak.gov.local', 'officer123')}
                className="px-2.5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-950/30 hover:bg-amber-950/50 text-[11px] font-medium text-amber-200 text-center cursor-pointer transition flex flex-col items-center justify-center hover:border-amber-400"
              >
                <span className="font-bold text-amber-400">Admin Officer</span>
                <span className="text-[10px] text-amber-300">Supervisor</span>
                <span className="text-[9px] text-amber-400/80 mt-0.5 font-mono">Pass: officer123</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            <span>Don't have an account yet? </span>
            <Link to="/signup" className="font-bold text-orange-400 hover:text-orange-300 hover:underline">
              Register as New Citizen
            </Link>
          </div>

        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted credential verification with local session memory & Supabase.</span>
        </div>
      </div>
    </div>
  );
};
