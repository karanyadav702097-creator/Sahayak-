import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../locales/i18nContext';
import { IndiaFlag } from './IndiaFlag';
import { BrandLogo } from './BrandLogo';
import { 
  ShieldCheck, 
  PhoneCall, 
  ExternalLink, 
  Heart, 
  Landmark, 
  FileText, 
  Siren, 
  Bot, 
  LayoutDashboard,
  CircleHelp,
  Lock,
  Laptop
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Emergency Quick Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <Siren className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
            <span>National Emergency Direct Helplines:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-300 font-mono">
            <a href="tel:112" className="hover:text-white transition flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="text-rose-400 font-bold">112</span> (ERSS Unified)
            </a>
            <span className="text-slate-700">|</span>
            <a href="tel:108" className="hover:text-white transition flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 font-bold">108</span> (Medical Ambulance)
            </a>
            <span className="text-slate-700">|</span>
            <a href="tel:1930" className="hover:text-white transition flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-amber-400 font-bold">1930</span> (Cyber Crime / Fraud)
            </a>
            <span className="text-slate-700">|</span>
            <a href="tel:1098" className="hover:text-white transition flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-cyan-400 font-bold">1098</span> (Childline)
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Civic Mission with Indian National Flag */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <span className="font-extrabold text-lg text-white tracking-tight">
                SAHAYAK <span className="text-emerald-400">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An open, citizen-first civic empowerment utility providing verified government welfare scheme discovery, structured public grievance drafting, emergency assistance, and multilingual intelligence.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
              <IndiaFlag width={16} height={11} className="rounded-2xs shrink-0" />
              <span className="font-semibold text-[11px] text-slate-300">Serving citizens across all States & Union Territories of India</span>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Civic Notice:</strong> SAHAYAK AI is an independent digital citizen assistance platform. All official scheme applications and government petitions redirect to verified <code className="text-slate-300 font-mono">.gov.in</code> departmental portals.
              </span>
            </div>
          </div>

          {/* Quick Civic Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Platform Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/schemes" className="hover:text-white transition flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.schemes}</span>
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="hover:text-white transition flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.complaints}</span>
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-white transition text-rose-300 flex items-center gap-1.5">
                  <Siren className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t.nav.emergency}</span>
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-white transition flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.assistant}</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.dashboard}</span>
                </Link>
              </li>
              <li className="pt-1 border-t border-slate-800/80">
                <Link to="/itr-report" className="hover:text-emerald-400 transition text-emerald-300 font-medium flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ITR Report (A4 Printable)</span>
                </Link>
              </li>
              <li>
                <Link to="/project-ppt" className="hover:text-violet-400 transition text-violet-300 font-medium flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-violet-400" />
                  <span>Project Output PPT (Slides)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Indian Portals (External) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Portals</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition">
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pgportal.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition">
                  <span>CPGRAMS Grievance</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition">
                  <span>myScheme Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition">
                  <span>Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & System */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Security & Standards</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>End-to-End RLS Architecture</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Aadhaar/OTP Storage</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WCAG 2.1 AA Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Supabase + Vercel Deployment</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Strict Regional i18n Support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright with Indian Flag */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <IndiaFlag width={18} height={12} className="rounded-2xs" />
            <p>
              © {new Date().getFullYear()} SAHAYAK AI. Dedicated to public citizen welfare and transparent civic assistance across India.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Built for Citizens of India with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
