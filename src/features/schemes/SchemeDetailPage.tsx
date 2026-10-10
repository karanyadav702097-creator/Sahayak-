import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  INITIAL_VERIFIED_SCHEMES, 
  getLocalSavedSchemeIds, 
  toggleLocalSavedScheme 
} from '../../lib/supabase';
import { Scheme } from '../../types';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { SchemeCategoryIcon, getCategoryTheme } from '../../components/common/SchemeCategoryIcon';
import { EligibilityCheckerModal } from './EligibilityCheckerModal';
import { 
  Landmark, 
  ArrowLeft, 
  Bookmark, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  Bot, 
  Calendar, 
  CheckSquare, 
  Square,
  Sparkles,
  UsersRound,
  Wallet,
  ChevronDown,
  ChevronUp,
  ListOrdered,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Clock,
  Building2,
  Check,
  Share2,
  Copy
} from 'lucide-react';

type TabType = 'benefits' | 'eligibility' | 'apply' | 'documents';

interface ExpandableSchemeCardProps {
  scheme: Scheme;
  isInitiallyExpanded?: boolean;
  onCheckEligibility: (scheme: Scheme) => void;
  isSaved: boolean;
  onToggleBookmark: (schemeId: string) => void;
}

export const ExpandableSchemeCard: React.FC<ExpandableSchemeCardProps> = ({
  scheme,
  isInitiallyExpanded = true,
  onCheckEligibility,
  isSaved,
  onToggleBookmark,
}) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const [activeTab, setActiveTab] = useState<TabType>('benefits');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const theme = getCategoryTheme(scheme.category);

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [doc]: !prev[doc],
    }));
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/schemes/${scheme.slug}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Split procedures into clean ordered steps if formatted with numbers or periods
  const procedureSteps = React.useMemo(() => {
    if (!scheme.application_procedure) return [];
    // Split on numbered markers like "1. ", "Step 1:", "2. ", or semicolons/periods if long
    const raw = scheme.application_procedure;
    if (raw.includes('1.') || raw.includes('Step 1')) {
      return raw
        .split(/(?=\d+\.|\bStep\s+\d+:?)/gi)
        .map((s) => s.replace(/^\d+\.\s*|^Step\s+\d+:?\s*/gi, '').trim())
        .filter(Boolean);
    }
    // Fallback: split by sentences if multiple sentences exist
    const sentences = raw.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
    return sentences.length > 1 ? sentences : [raw];
  }, [scheme.application_procedure]);

  const completedDocsCount = scheme.required_documents.filter(
    (doc) => checkedDocs[doc]
  ).length;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 shadow-xl overflow-hidden backdrop-blur-xs ${theme.cardBorder} ${theme.cardBg} ${
        isExpanded ? 'ring-1 ring-white/10' : 'hover:border-slate-600'
      }`}
    >
      {/* 1. Header Card (Always Visible, Clickable to Toggle) */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <SchemeCategoryIcon category={scheme.category} size="sm" />
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wide ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
              >
                {scheme.category}
              </span>
            </div>

            {/* Verified-source indicator */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified Official Source</span>
            </div>

            {/* Indian National Flag & Jurisdiction */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-800 text-[11px] font-medium">
              <IndiaFlag width={13} height={9} className="rounded-2xs" />
              <span>{scheme.state_or_national}</span>
            </div>
          </div>

          {/* Right Header Controls: Share, Bookmark, Expand Toggle */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer text-xs flex items-center gap-1"
              title="Copy share link"
              aria-label="Share scheme"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-emerald-300 font-bold hidden sm:inline">Copied</span>
                </>
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(scheme.id)}
              className={`p-2 rounded-xl border transition cursor-pointer text-xs flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isSaved ? 'Remove bookmark' : 'Bookmark scheme'}
              aria-label="Bookmark scheme"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline text-xs font-semibold">
                {isSaved ? 'Saved' : 'Save'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1"
              aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
            >
              <span className="text-xs font-bold text-slate-300 hidden sm:inline">
                {isExpanded ? 'Hide Details' : 'View Full Details'}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Scheme Name & Short Description */}
        <div>
          <h2
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xl sm:text-2xl font-extrabold text-white tracking-tight cursor-pointer hover:text-emerald-300 transition-colors leading-tight"
          >
            {scheme.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {scheme.description}
          </p>
        </div>

        {/* Benefit Badges & Quick Meta Summary */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Benefit pill badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${theme.benefitBorder} ${theme.benefitBg} ${theme.benefitText} text-xs font-medium max-w-full`}
          >
            <Wallet className="w-3.5 h-3.5 shrink-0" />
            <span className="font-bold text-white text-[11px]">Primary Benefit:</span>
            <span className="truncate text-xs">{scheme.benefit_details}</span>
          </div>

          {/* Audience pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 text-xs font-medium">
            <UsersRound className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-bold text-slate-200 text-[11px]">Target:</span>
            <span className="truncate text-xs text-slate-300">{scheme.eligible_audience}</span>
          </div>

          {/* Verification date */}
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-mono ml-auto">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span>Audited: {scheme.last_verified_date}</span>
          </div>
        </div>
      </div>

      {/* 2. Expanded Functional Body with Four Tabs */}
      {isExpanded && (
        <div className="border-t border-slate-800/90 bg-slate-950/70 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Functional Tabs Navigation */}
          <div className="px-4 sm:px-6 pt-3 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2.5">
              
              {/* Tab 1: Benefits */}
              <button
                type="button"
                onClick={() => setActiveTab('benefits')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'benefits'
                    ? `${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shadow-sm`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Benefits</span>
              </button>

              {/* Tab 2: Eligibility */}
              <button
                type="button"
                onClick={() => setActiveTab('eligibility')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'eligibility'
                    ? `${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shadow-sm`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Eligibility ({scheme.eligibility_requirements?.length || 0})</span>
              </button>

              {/* Tab 3: Apply Steps */}
              <button
                type="button"
                onClick={() => setActiveTab('apply')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'apply'
                    ? `${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shadow-sm`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Apply Steps ({procedureSteps.length})</span>
              </button>

              {/* Tab 4: Documents */}
              <button
                type="button"
                onClick={() => setActiveTab('documents')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'documents'
                    ? `${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shadow-sm`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Documents</span>
                {completedDocsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {completedDocsCount}/{scheme.required_documents.length}
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-5 sm:p-6 space-y-4">
            
            {/* TAB 1: BENEFITS */}
            {activeTab === 'benefits' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Wallet className={`w-4 h-4 ${theme.iconText}`} />
                    <span>Official Sourced Scheme Benefits</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Direct Benefit Transfer / Government Grant
                  </span>
                </div>

                {/* Primary Benefit High-Contrast Callout */}
                <div
                  className={`p-4 rounded-xl border ${theme.benefitBorder} ${theme.benefitBg} ${theme.benefitText} shadow-md space-y-2`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">Financial & Welfare Entitlement</h4>
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mt-1">
                        {scheme.benefit_details}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sourced Beneficiary Impact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <UsersRound className="w-3.5 h-3.5 text-slate-400" />
                      <span>Target Group Scope</span>
                    </p>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">
                      {scheme.eligible_audience}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Administrative Jurisdiction</span>
                    </p>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">
                      {scheme.state_or_national === 'National'
                        ? 'Government of India (Central Sector / Centrally Sponsored Initiative)'
                        : `State Welfare Board (${scheme.state_or_national})`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ELIGIBILITY */}
            {activeTab === 'eligibility' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <ShieldCheck className={`w-4 h-4 ${theme.iconText}`} />
                    <span>Sourced Requirements & Limitations</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Mandatory Qualification Standards
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 shadow-lg">
                  <div className="divide-y divide-slate-800">
                    {scheme.eligibility_requirements?.map((req, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2 hover:bg-slate-850/60 transition"
                      >
                        <div className="sm:w-1/3 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-white">{req.criterion}</p>
                            <span className="text-[10px] text-slate-500 font-mono">Criterion #{idx + 1}</span>
                          </div>
                        </div>
                        <div className="sm:w-2/3">
                          <p className="text-xs text-slate-200 leading-relaxed font-normal bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                            {req.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Note:</strong> Eligibility rules are strictly audited from official gazette notifications. Unverified exceptions are never assumed.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: APPLY STEPS */}
            {activeTab === 'apply' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <ListOrdered className={`w-4 h-4 ${theme.iconText}`} />
                    <span>Numbered Application Procedure</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Step-by-Step Filing Workflow
                  </span>
                </div>

                <div className="space-y-3">
                  {procedureSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 shadow-md hover:border-slate-700 transition"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-xs font-bold text-slate-200">
                          Step {idx + 1}: Execution Phase
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed text-[11px]">
                    <strong>Authorized Delivery Channels:</strong> Apply directly online through the designated official portal ({scheme.official_source_url}) or submit in person via your nearest Gram Panchayat, Common Service Centre (CSC), or Municipal Ward Office.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: DOCUMENTS CHECKLIST */}
            {activeTab === 'documents' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <FileText className={`w-4 h-4 ${theme.iconText}`} />
                    <span>Mandatory Document Checklist</span>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Progress: {completedDocsCount} of {scheme.required_documents.length} Prepared
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Select each document once ready to verify complete dossier submission before accessing the government portal:
                </p>

                <div className="space-y-2">
                  {scheme.required_documents.map((doc, idx) => {
                    const isChecked = Boolean(checkedDocs[doc]);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDoc(doc)}
                        className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl border text-left text-xs transition cursor-pointer select-none ${
                          isChecked
                            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-100 shadow-md ring-1 ring-emerald-500/20'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                          <span className={`font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                            {doc}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            isChecked
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-950 text-slate-500 border border-slate-800'
                          }`}
                        >
                          {isChecked ? 'Ready' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {completedDocsCount === scheme.required_documents.length && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>All required documents checked! You are ready to submit your application.</span>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* 3. Bottom Action Bar: Apply Now, Check Eligibility, Ask AI */}
          <div className="px-5 py-4 border-t border-slate-800/90 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-medium text-slate-300 truncate max-w-[200px] sm:max-w-xs">
                Portal: {new URL(scheme.official_source_url).hostname}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {/* Action 1: Ask AI */}
              <Link
                to={`/assistant?q=${encodeURIComponent(
                  `Provide a detailed breakdown of eligibility, documents, and application steps for ${scheme.name}`
                )}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-950/40 hover:bg-amber-950/70 text-amber-300 font-bold text-xs transition"
              >
                <Bot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ask AI</span>
              </Link>

              {/* Action 2: Check Eligibility */}
              <button
                type="button"
                onClick={() => onCheckEligibility(scheme)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-blue-500/40 bg-blue-950/40 hover:bg-blue-950/70 text-blue-300 font-bold text-xs transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Check Eligibility</span>
              </button>

              {/* Action 3: Apply Now (Official Portal Link) */}
              <a
                href={scheme.official_source_url}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition ring-1 ring-emerald-400/30"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export const SchemeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const scheme = INITIAL_VERIFIED_SCHEMES.find((s) => s.slug === slug);
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(getLocalSavedSchemeIds());
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [targetSchemeForChecker, setTargetSchemeForChecker] = useState<Scheme | null>(null);

  const isSaved = scheme ? savedSchemeIds.includes(scheme.id) : false;

  const handleToggleBookmark = (id: string) => {
    toggleLocalSavedScheme(id);
    setSavedSchemeIds(getLocalSavedSchemeIds());
  };

  const handleOpenChecker = (target: Scheme) => {
    setTargetSchemeForChecker(target);
    setCheckerOpen(true);
  };

  if (!scheme) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#0B0F17] text-white">
        <Landmark className="w-12 h-12 text-slate-600 mb-3" />
        <h2 className="text-xl font-bold text-white">Scheme Not Found</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          The requested welfare scheme could not be found in the verified repository.
        </p>
        <Link
          to="/schemes"
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Schemes</span>
        </Link>
      </div>
    );
  }

  // Related schemes in the same or adjacent category
  const relatedSchemes = INITIAL_VERIFIED_SCHEMES.filter(
    (s) => s.id !== scheme.id && s.category === scheme.category
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Schemes Directory</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Repository ID: {scheme.id}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
              <IndiaFlag width={14} height={9} className="rounded-2xs" />
              <span>National Welfare Database</span>
            </div>
          </div>
        </div>

        {/* Primary Expandable Scheme Card */}
        <ExpandableSchemeCard
          scheme={scheme}
          isInitiallyExpanded={true}
          onCheckEligibility={handleOpenChecker}
          isSaved={isSaved}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* Related Welfare Programs in Same Category */}
        {relatedSchemes.length > 0 && (
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-400" />
                <span>Related Programs in {scheme.category}</span>
              </h3>
              <Link
                to="/schemes"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
              >
                Browse All
              </Link>
            </div>

            <div className="space-y-4">
              {relatedSchemes.map((rel) => (
                <ExpandableSchemeCard
                  key={rel.id}
                  scheme={rel}
                  isInitiallyExpanded={false}
                  onCheckEligibility={handleOpenChecker}
                  isSaved={savedSchemeIds.includes(rel.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer Audit Notice */}
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 text-xs text-slate-400 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-slate-200">
              Government Transparency & Data Sourcing Guarantee
            </p>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Every detail presented—including eligibility criteria limits, entitlement amounts, required documentation, and application procedures—is verified against official ministry publications. Sahayak AI connects you directly with official government portals without fees or intermediaries.
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Eligibility Advisor Modal */}
      <EligibilityCheckerModal
        isOpen={checkerOpen}
        onClose={() => setCheckerOpen(false)}
        schemes={INITIAL_VERIFIED_SCHEMES}
        targetScheme={targetSchemeForChecker}
      />
    </div>
  );
};
