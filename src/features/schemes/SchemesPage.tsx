import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useI18n } from '../../locales/i18nContext';
import { 
  INITIAL_VERIFIED_SCHEMES, 
  getLocalSavedSchemeIds, 
  toggleLocalSavedScheme 
} from '../../lib/supabase';
import { Scheme } from '../../types';
import { EligibilityCheckerModal } from './EligibilityCheckerModal';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { SchemeCategoryIcon, getCategoryTheme } from '../../components/common/SchemeCategoryIcon';
import { 
  Search, 
  Bookmark, 
  Landmark, 
  ExternalLink, 
  Filter, 
  Sparkles, 
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const SchemesPage: React.FC = () => {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(getLocalSavedSchemeIds());
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [checkerOpen, setCheckerOpen] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(INITIAL_VERIFIED_SCHEMES.map(s => s.category));
    return ['all', ...Array.from(set)];
  }, []);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    toggleLocalSavedScheme(id);
    setSavedSchemeIds(getLocalSavedSchemeIds());
  };

  const filteredSchemes = useMemo(() => {
    return INITIAL_VERIFIED_SCHEMES.filter((scheme) => {
      // Tab check
      if (activeTab === 'saved' && !savedSchemeIds.includes(scheme.id)) {
        return false;
      }
      // Category check
      if (selectedCategory !== 'all' && scheme.category !== selectedCategory) {
        return false;
      }
      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = scheme.name.toLowerCase().includes(q);
        const matchesDesc = scheme.description.toLowerCase().includes(q);
        const matchesAudience = scheme.eligible_audience.toLowerCase().includes(q);
        const matchesCategory = scheme.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesAudience || matchesCategory;
      }
      return true;
    });
  }, [activeTab, savedSchemeIds, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Title with Action Button and IndiaFlag */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <IndiaFlag width={15} height={10} className="rounded-2xs" />
                <span>Verified National Repository</span>
              </div>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium">
                Official .gov.in sources
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2.5">
              <Landmark className="w-7 h-7 text-emerald-400" />
              <span>{t.schemes.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Discover central and state welfare initiatives, verified eligibility rules, and required documentation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCheckerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition cursor-pointer self-start md:self-auto ring-1 ring-emerald-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Check My Eligibility (Advisor Quiz)</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes by name, keyword, or benefits..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-white bg-slate-950/80 placeholder-slate-500"
              />
            </div>

            {/* Category Dropdown with Filter icon */}
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-white bg-slate-950/80"
              >
                <option value="all" className="bg-slate-900">All Categories ({INITIAL_VERIFIED_SCHEMES.length})</option>
                {categories.filter(c => c !== 'all').map((c) => (
                  <option key={c} value={c} className="bg-slate-900">{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs: All vs Saved */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-slate-800 text-white shadow-xs border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>All Schemes ({INITIAL_VERIFIED_SCHEMES.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('saved')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  activeTab === 'saved'
                    ? 'bg-emerald-950/80 text-emerald-300 shadow-xs border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Schemes ({savedSchemeIds.length})</span>
              </button>
            </div>

            <span className="text-slate-500 text-[11px] hidden sm:inline">
              Showing {filteredSchemes.length} of {INITIAL_VERIFIED_SCHEMES.length} schemes
            </span>
          </div>
        </div>

        {/* Schemes Grid with Individual Category Cards */}
        {filteredSchemes.length === 0 ? (
          <div className="p-12 bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 text-center space-y-3">
            <Landmark className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-300">No matching schemes found</p>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or category filter to find relevant welfare benefits.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setActiveTab('all'); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => {
              const isSaved = savedSchemeIds.includes(scheme.id);
              const theme = getCategoryTheme(scheme.category);
              return (
                <div
                  key={scheme.id}
                  className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} p-6 shadow-xl transition-all duration-200 flex flex-col justify-between group hover:shadow-2xl ${theme.cardHoverBorder} backdrop-blur-xs`}
                >
                  <div>
                    {/* Top row with Category Icon & Bookmark */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <SchemeCategoryIcon category={scheme.category} size="sm" />
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                          {scheme.category}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleToggleBookmark(scheme.id, e)}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          isSaved
                            ? `${theme.badgeBg} ${theme.badgeBorder} ${theme.iconText} ring-1 ring-emerald-500/40`
                            : 'border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 bg-slate-900/60'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save scheme'}
                        aria-label="Bookmark scheme"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <h3 className="font-bold text-base text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                      {scheme.name}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                      {scheme.description}
                    </p>

                    {/* Benefit Preview Box */}
                    <div className={`p-3 rounded-xl border ${theme.benefitBg} ${theme.benefitBorder} ${theme.benefitText} text-xs space-y-1 mb-4 shadow-inner`}>
                      <p className="font-semibold text-white text-[11px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>Primary Benefit:</span>
                      </p>
                      <p className="text-[11px] leading-snug opacity-90">{scheme.benefit_details}</p>
                    </div>

                    {/* Eligibility Snippet */}
                    <div className="space-y-1 mb-4">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Eligible Audience:
                      </p>
                      <p className="text-xs text-slate-200 font-medium">
                        {scheme.eligible_audience}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <Link
                      to={`/schemes/${scheme.slug}`}
                      className="font-bold text-white hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Full Criteria & Docs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </Link>
                    <a
                      href={scheme.official_source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Interactive Eligibility Advisor Quiz Modal */}
      <EligibilityCheckerModal
        isOpen={checkerOpen}
        onClose={() => setCheckerOpen(false)}
        schemes={INITIAL_VERIFIED_SCHEMES}
      />
    </div>
  );
};
