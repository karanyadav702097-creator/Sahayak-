import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../locales/i18nContext';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { BrandLogo } from '../../components/common/BrandLogo';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, UserRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { signIn, isConfigured } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoCitizen = () => {
    setEmail('aarav.sharma@example.in');
    setPassword('citizen123');
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin.desk@sahayak.gov.local');
    setPassword('adminpass123');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-3">
          <BrandLogo size="lg" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-2">
          <IndiaFlag width={15} height={10} className="rounded-2xs" />
          <span>Citizen Authentication</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to SAHAYAK AI
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Access your citizen dashboard, saved schemes & filed complaints
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <span>Authenticating...</span> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Pre-fill Helpers for Test & Preview */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider text-center">
              Quick Test Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoCitizen}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 text-center cursor-pointer"
              >
                Citizen Profile
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100 text-[11px] font-semibold text-amber-900 text-center cursor-pointer"
              >
                Admin Officer
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600">
            <span>Don't have an account yet? </span>
            <Link to="/signup" className="font-bold text-emerald-700 hover:underline">
              Register here
            </Link>
          </div>

        </div>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Encrypted credential verification with Supabase Authentication.
        </p>
      </div>
    </div>
  );
};
