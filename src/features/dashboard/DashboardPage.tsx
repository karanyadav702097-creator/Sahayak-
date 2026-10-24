import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../locales/i18nContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { SchemeCategoryIcon, getCategoryTheme } from '../../components/common/SchemeCategoryIcon';
import { 
  getLocalComplaints, 
  INITIAL_VERIFIED_SCHEMES, 
  getLocalNotifications 
} from '../../lib/supabase';
import { 
  Landmark, 
  FileText, 
  Siren, 
  Bot, 
  ArrowRight, 
  Search, 
  PlusCircle, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  MapPin,
  Sparkles,
  ChevronRight,
  Bell,
  HeartPulse,
  ShieldCheck,
  LogIn,
  UserPlus
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const complaints = getLocalComplaints();
  const notifications = getLocalNotifications();
  const schemes = INITIAL_VERIFIED_SCHEMES;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header with IndiaFlag */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200">
                <IndiaFlag width={15} height={10} className="rounded-2xs" />
                <span>Citizen Portal</span>
              </div>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile?.district || 'District'}, {profile?.state || 'India'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.dashboard.welcome} <span className="text-emerald-400">{profile?.display_name || 'Citizen'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Access public grievance tracking, explore welfare schemes, and receive intelligent civic assistance.
            </p>
          </div>

          {/* Quick Search with Search icon */}
          <form onSubmit={handleSearch} className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes or helplines..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-white bg-slate-950 placeholder-slate-500"
              />
            </div>
          </form>
        </div>

        {/* Guest Mode Banner when logged out */}
        {!profile && (
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-amber-950/30 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl backdrop-blur-xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Browsing in Guest Mode</p>
                <p className="text-xs text-slate-400">Sign in or create your Citizen profile to sync grievances, bookmark welfare schemes, and receive regional civic notifications.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <Link to="/login" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/30">
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
              <Link to="/signup" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition">
                <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                <span>Register</span>
              </Link>
            </div>
          </div>
        )}

        {/* Quick Action Grid with Colorful Individually Differentiated Cards */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.dashboard.quickActions}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* 1. Lodge Complaint - Blue */}
            <Link
              to="/complaints/new"
              className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/30 shadow-lg hover:border-blue-400/60 hover:shadow-xl transition group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-white group-hover:text-blue-300 transition-colors">
                  {t.dashboard.lodgeComplaint}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Report civic issues with AI letter</p>
              </div>
            </Link>

            {/* 2. Browse Schemes - Emerald */}
            <Link
              to="/schemes"
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-lg hover:border-emerald-400/60 hover:shadow-xl transition group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors">
                  {t.dashboard.browseSchemes}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Check welfare eligibility</p>
              </div>
            </Link>

            {/* 3. Ask Assistant - Amber */}
            <Link
              to="/assistant"
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 shadow-lg hover:border-amber-400/60 hover:shadow-xl transition group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors">
                  {t.dashboard.askAssistant}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Multilingual civic assistant</p>
              </div>
            </Link>

            {/* 4. Emergency SOS - Rose */}
            <Link
              to="/emergency"
              className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border border-rose-500/40 shadow-lg hover:border-rose-400/70 hover:shadow-xl transition group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Siren className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-white group-hover:text-rose-300 transition-colors">
                  Emergency & Helplines
                </p>
                <p className="text-[11px] text-rose-300 font-mono mt-0.5">Dial 112 / 108 / 1930</p>
              </div>
            </Link>

          </div>
        </div>

        {/* Two-Column Section: Active Complaints & Emergency Helplines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Complaints */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>{t.dashboard.activeComplaints}</span>
              </h2>
              <Link to="/complaints" className="text-xs font-bold text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors">
                <span>View All ({complaints.length})</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            {complaints.length === 0 ? (
              <div className="p-8 bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 text-center space-y-3">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">{t.complaints.emptyMessage}</p>
                <Link
                  to="/complaints/new"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Lodge Your First Complaint</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {complaints.slice(0, 3).map((cmp) => (
                  <div
                    key={cmp.id}
                    className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                          {cmp.reference_id}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {cmp.category}
                        </span>
                      </div>
                      <StatusBadge status={cmp.status} size="sm" />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white">
                        {cmp.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                        {cmp.description}
                      </p>
                    </div>

                    {cmp.admin_notes && (
                      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Officer update:</strong> {cmp.admin_notes}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{new Date(cmp.created_at).toLocaleDateString()}</span>
                      </span>
                      <Link
                        to={`/complaints/${cmp.id}`}
                        className="font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Track Status</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Rail: Verified Emergency Contacts & Alerts */}
          <div className="space-y-6">
            
            {/* Emergency Hotline Card with Siren */}
            <div className="bg-gradient-to-br from-rose-950/50 via-slate-900 to-slate-950 rounded-2xl border border-rose-500/40 p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>Emergency Quick Dial</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  24x7 Toll-Free
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Siren className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-white">Unified 112 (ERSS)</span>
                  </div>
                  <a
                    href="tel:112"
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs rounded-lg transition"
                  >
                    112
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Medical Ambulance</span>
                  </div>
                  <a
                    href="tel:108"
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded-lg transition"
                  >
                    108
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">Cyber Crime & Fraud</span>
                  </div>
                  <a
                    href="tel:1930"
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs rounded-lg transition"
                  >
                    1930
                  </a>
                </div>
              </div>

              <Link
                to="/emergency"
                className="w-full py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <span>Open Full Emergency Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* In-App Notifications Preview with Bell icon */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Recent Alerts</span>
                </h3>
                <Link to="/notifications" className="text-[11px] font-bold text-emerald-400 hover:underline">
                  All ({notifications.length})
                </Link>
              </div>

              <div className="space-y-2.5">
                {notifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-white text-[11px]">{notif.title}</p>
                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Recommended Welfare Schemes for Citizen with Category Icons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-400" />
                <span>{t.dashboard.recommendedSchemes}</span>
              </h2>
              <p className="text-xs text-slate-400">
                Verified initiatives available in {profile?.state || 'National'}
              </p>
            </div>
            <Link to="/schemes" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1">
              <span>View All Schemes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schemes.slice(0, 3).map((scheme) => {
              const theme = getCategoryTheme(scheme.category);
              return (
                <div
                  key={scheme.id}
                  className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} p-5 shadow-xl hover:shadow-2xl transition flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <div className="flex items-center gap-1.5">
                        <SchemeCategoryIcon category={scheme.category} size="sm" />
                        <span className={`font-bold px-2 py-0.5 rounded border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                          {scheme.category}
                        </span>
                      </div>
                      <span className="text-slate-500 font-mono text-[10px]">{scheme.state_or_national}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white mb-2 leading-snug">{scheme.name}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {scheme.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <Link
                      to={`/schemes/${scheme.slug}`}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                    >
                      <span>Check Eligibility</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={scheme.official_source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-slate-500 hover:text-slate-300 inline-flex items-center gap-1"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
