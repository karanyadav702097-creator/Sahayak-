import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../locales/i18nContext';
import { INITIAL_VERIFIED_SCHEMES } from '../../lib/supabase';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { SchemeCategoryIcon, getCategoryTheme } from '../../components/common/SchemeCategoryIcon';
import { 
  Landmark, 
  FileText, 
  PhoneCall, 
  Siren, 
  Bot, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink, 
  CircleHelp, 
  Sparkles, 
  ClipboardList, 
  Phone
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/schemes');
    }
  };

  const faqs = [
    {
      q: 'Is SAHAYAK AI an official government portal?',
      a: 'SAHAYAK AI is an independent, citizen-first civic assistance platform. We do not claim official government affiliation or decision-making power. We help you discover genuine welfare schemes, understand eligibility criteria, draft formal complaint letters, and navigate directly to authorized .gov.in departmental portals.',
    },
    {
      q: 'Does submitting a complaint to Sahayak submit it directly to municipal authorities?',
      a: 'Submitting a complaint in Sahayak persists it in our system with a unique Reference ID (e.g., SHK-2025-XXXXX) and generates an AI-structured formal representation letter. While administrative reviewers monitor issues on the platform, we also provide direct links to CPGRAMS and state municipal grievance portals so you can submit your structured petition directly.',
    },
    {
      q: 'Do you store sensitive personal information like Aadhaar numbers?',
      a: 'No. Sahayak AI strictly does NOT collect or store Aadhaar numbers, biometric data, or banking PINs. We prioritize privacy and only request non-sensitive location and contact details needed for civic assistance.',
    },
    {
      q: 'Which Indian languages are supported by Sahayak AI?',
      a: 'We support 8 major Indian languages: English, Hindi (हिन्दी), Marathi (मराठी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Gujarati (ગુજરાતી), and Punjabi (ਪੰਜਾਬੀ). Both the UI and the AI civic assistant respond in your chosen language.',
    },
    {
      q: 'How does the Emergency Assistance feature work?',
      a: 'The Emergency section provides direct, single-tap access to verified national numbers (112 ERSS, 108 Ambulance, 1930 Cyber Fraud) using your phone carrier dialer, alongside browser geolocation status to help you pinpoint your current coordinates during urgent situations.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
      {/* Hero Section with Tasteful Indian Civic Identity */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-[#0B0F17] text-white pt-16 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-800">
        {/* Subtle decorative civic pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Indian Civic Identity Badge with National Flag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs font-semibold backdrop-blur-sm shadow-md">
              <IndiaFlag width={20} height={13} className="rounded-2xs shrink-0" />
              <span>Built for Citizens of India</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-bold">{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Unified Search Bar with Lucide Search icon */}
            <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto pt-2">
              <div className="relative flex items-center shadow-2xl rounded-2xl bg-slate-900/90 p-1.5 border border-slate-700 focus-within:border-emerald-500 transition">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-hidden bg-transparent"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shrink-0 cursor-pointer shadow-md flex items-center gap-1.5 ring-1 ring-emerald-400/30"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Primary Actions with Lucide icons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition cursor-pointer ring-1 ring-emerald-400/40"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/schemes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition"
              >
                <Landmark className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.ctaSecondary}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Trust disclaimer */}
            <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.hero.trustNote}</span>
            </div>

          </div>
        </div>
      </section>

      {/* Emergency Immediate Action Bar with Siren & PhoneCall icons */}
      <section className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white py-3.5 border-b border-rose-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Siren className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
            <span className="font-bold tracking-wide uppercase text-rose-300">In Immediate Distress?</span>
            <span className="text-slate-300 hidden md:inline">Dial verified national emergency lines instantly:</span>
          </div>
          <div className="flex items-center gap-4 font-mono font-bold">
            <a href="tel:112" className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition shadow-sm flex items-center gap-1.5 ring-1 ring-rose-400/40">
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>112 (National ERSS)</span>
            </a>
            <a href="tel:108" className="hover:text-emerald-300 text-slate-200 transition flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>108 (Ambulance)</span>
            </a>
            <a href="tel:1930" className="hover:text-amber-300 text-slate-200 transition flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>1930 (Cyber Fraud)</span>
            </a>
            <Link to="/emergency" className="underline text-rose-300 hover:text-white flex items-center gap-1">
              <span>All Helplines</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Four Core Civic Pillars with Colorful Distinct Cards */}
      <section className="py-16 bg-[#0B0F17] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
              <IndiaFlag width={14} height={9} />
              <span>Core Civic Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              A Unified Digital Citizen Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Schemes Card - Emerald */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-xl transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-white mb-2">{t.features.schemesTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{t.features.schemesDesc}</p>
              </div>
              <Link to="/schemes" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300">
                <span>Explore Schemes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Complaints Card - Blue */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-900 to-slate-950 border border-blue-500/30 hover:border-blue-400/60 hover:shadow-xl transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-white mb-2">{t.features.complaintsTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{t.features.complaintsDesc}</p>
              </div>
              <Link to="/complaints/new" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300">
                <span>Lodge Grievance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Emergency Card - Rose */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/50 via-slate-900 to-slate-950 border border-rose-500/40 hover:border-rose-400/70 hover:shadow-xl transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Siren className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-bold text-base text-white mb-2">{t.features.helplinesTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{t.features.helplinesDesc}</p>
              </div>
              <Link to="/emergency" className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 hover:text-white">
                <span>View Helplines & SOS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Assistant Card - Amber */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 border border-amber-500/30 hover:border-amber-400/60 hover:shadow-xl transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-white mb-2">{t.features.assistantTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{t.features.assistantDesc}</p>
              </div>
              <Link to="/assistant" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300">
                <span>Ask Civic AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Government Schemes Section with Category-Specific Icons */}
      <section className="py-16 bg-[#0D111A] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <IndiaFlag width={16} height={11} className="rounded-2xs" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Verified Citizen Database</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Popular Welfare Initiatives
              </h2>
            </div>
            <Link
              to="/schemes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>View All 7 Verified Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_VERIFIED_SCHEMES.slice(0, 3).map((scheme) => {
              const theme = getCategoryTheme(scheme.category);
              return (
                <div
                  key={scheme.id}
                  className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} p-6 shadow-xl hover:shadow-2xl transition flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <SchemeCategoryIcon category={scheme.category} size="sm" />
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                          {scheme.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {scheme.state_or_national}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white mb-2 leading-snug">
                      {scheme.name}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                      {scheme.description}
                    </p>

                    <div className={`p-3 rounded-xl border ${theme.benefitBg} ${theme.benefitBorder} ${theme.benefitText} text-xs space-y-1 mb-4`}>
                      <p className="font-semibold text-white text-[11px]">Primary Benefit:</p>
                      <p className="text-[11px] leading-snug opacity-90">{scheme.benefit_details}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
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
                      className="text-[11px] text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grievance Redressal Workflow (How It Works) */}
      <section className="py-16 bg-[#0B0F17] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              How Citizen Grievance Assistance Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Transform unstructured neighborhood complaints into formal civic representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 with FileText icon */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold text-sm flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2">1. Record the Civic Issue</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Describe the problem (pothole, water leak, garbage, streetlight), choose the category, and optionally tag your GPS coordinates or upload photos.
              </p>
            </div>

            {/* Step 2 with Bot icon */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2">2. AI Formal Letter Drafting</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                SahayakBot automatically drafts a structured, polite petition letter addressed to the relevant Municipal Executive Officer or department.
              </p>
            </div>

            {/* Step 3 with ClipboardList icon */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-sm flex items-center justify-center mb-4">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2">3. Track & Submit to Department</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive an immutable Sahayak Reference ID (SHK-2025-XXXXX) to track local audit status, and copy the petition directly to CPGRAMS or your local municipal desk.
              </p>
            </div>

          </div>

          <div className="text-center mt-10">
            <Link
              to="/complaints/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition ring-1 ring-emerald-400/30"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>Lodge a Civic Issue Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions with CircleHelp icon */}
      <section className="py-16 bg-[#0D111A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider">
              <CircleHelp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparency & Help</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-white hover:bg-slate-850 cursor-pointer transition"
                  >
                    <span className="flex items-center gap-2">
                      <CircleHelp className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3 pl-11">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner with Indian Flag motif */}
      <section className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
            <IndiaFlag width={20} height={13} className="rounded-2xs" />
            <span className="text-xs font-bold text-slate-200">National Citizen Empowerment</span>
          </div>
          <h2 className="text-2xl font-extrabold">Ready to access citizen services?</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Create your account in seconds to save schemes, track complaints, and configure your emergency contacts.
          </p>
          <div className="pt-2">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition ring-1 ring-emerald-400/30"
            >
              <span>Create Citizen Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
