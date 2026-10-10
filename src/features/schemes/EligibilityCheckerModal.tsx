import React, { useState } from 'react';
import { Scheme } from '../../types';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { SchemeCategoryIcon, getCategoryTheme } from '../../components/common/SchemeCategoryIcon';
import { 
  CircleCheck, 
  X, 
  AlertCircle, 
  CircleHelp, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemes: Scheme[];
  targetScheme?: Scheme | null;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  schemes,
  targetScheme,
}) => {
  const [incomeRange, setIncomeRange] = useState<'low' | 'mid' | 'high'>('low');
  const [ownsPuccaHouse, setOwnsPuccaHouse] = useState<boolean>(false);
  const [isFarmer, setIsFarmer] = useState<boolean>(false);
  const [isStreetVendor, setIsStreetVendor] = useState<boolean>(false);
  const [hasSeniorCitizen, setHasSeniorCitizen] = useState<boolean>(false);
  const [hasRooftop, setHasRooftop] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Compute matched schemes based on non-sensitive inputs
  const matchedSchemes = schemes.filter((s) => {
    if (s.slug === 'pmay-urban' && !ownsPuccaHouse && (incomeRange === 'low' || incomeRange === 'mid')) {
      return true;
    }
    if (s.slug === 'ayushman-bharat-pmjay' && (incomeRange === 'low' || hasSeniorCitizen)) {
      return true;
    }
    if (s.slug === 'pm-kisan-samman-nidhi' && isFarmer) {
      return true;
    }
    if (s.slug === 'pm-svanidhi' && isStreetVendor) {
      return true;
    }
    if (s.slug === 'pm-surya-ghar-muft-bijli' && hasRooftop) {
      return true;
    }
    if (s.slug === 'atal-pension-yojana') {
      return true;
    }
    return false;
  });

  const isTargetMatched = targetScheme 
    ? matchedSchemes.some(s => s.id === targetScheme.id || s.slug === targetScheme.slug)
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-100">
        
        {/* Header with IndiaFlag */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <IndiaFlag width={18} height={12} className="rounded-2xs" />
            <div className="flex items-center gap-1.5">
              <CircleHelp className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm tracking-tight text-white">Citizen Welfare Eligibility Advisor</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!submitted ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Answer a few general, non-sensitive questions to discover which government initiatives match your household profile across India.
              </p>

              {/* Income Question */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  1. Annual Household Income Range
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setIncomeRange('low')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      incomeRange === 'low'
                        ? 'border-emerald-500 bg-emerald-950/70 text-emerald-300 font-bold ring-1 ring-emerald-400/40'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Below ₹3 Lakhs (EWS)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncomeRange('mid')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      incomeRange === 'mid'
                        ? 'border-emerald-500 bg-emerald-950/70 text-emerald-300 font-bold ring-1 ring-emerald-400/40'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    ₹3L – ₹6L (LIG)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncomeRange('high')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      incomeRange === 'high'
                        ? 'border-emerald-500 bg-emerald-950/70 text-emerald-300 font-bold ring-1 ring-emerald-400/40'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Above ₹6 Lakhs
                  </button>
                </div>
              </div>

              {/* Multiple boolean indicators */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-200">
                  2. Household & Occupation Factors (Select all that apply)
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 cursor-pointer text-xs text-slate-300 transition">
                  <input
                    type="checkbox"
                    checked={!ownsPuccaHouse}
                    onChange={(e) => setOwnsPuccaHouse(!e.target.checked)}
                    className="rounded text-emerald-500 accent-emerald-500"
                  />
                  <span>Do not currently own a pucca/permanent house</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 cursor-pointer text-xs text-slate-300 transition">
                  <input
                    type="checkbox"
                    checked={isFarmer}
                    onChange={(e) => setIsFarmer(e.target.checked)}
                    className="rounded text-emerald-500 accent-emerald-500"
                  />
                  <span>Family owns cultivable agricultural land</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 cursor-pointer text-xs text-slate-300 transition">
                  <input
                    type="checkbox"
                    checked={isStreetVendor}
                    onChange={(e) => setIsStreetVendor(e.target.checked)}
                    className="rounded text-emerald-500 accent-emerald-500"
                  />
                  <span>Self-employed as urban street vendor / hawker</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 cursor-pointer text-xs text-slate-300 transition">
                  <input
                    type="checkbox"
                    checked={hasSeniorCitizen}
                    onChange={(e) => setHasSeniorCitizen(e.target.checked)}
                    className="rounded text-emerald-500 accent-emerald-500"
                  />
                  <span>Family has members aged 70 years or older</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 cursor-pointer text-xs text-slate-300 transition">
                  <input
                    type="checkbox"
                    checked={hasRooftop}
                    onChange={(e) => setHasRooftop(e.target.checked)}
                    className="rounded text-emerald-500 accent-emerald-500"
                  />
                  <span>Have accessible shadow-free residential rooftop</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition cursor-pointer flex items-center justify-center gap-2 ring-1 ring-emerald-400/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze Matched Welfare Schemes</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {targetScheme && (
                <div className={`p-3.5 rounded-xl border ${
                  isTargetMatched 
                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200' 
                    : 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                } text-xs space-y-1`}>
                  <div className="flex items-center gap-2 font-bold">
                    {isTargetMatched ? (
                      <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span>
                      {isTargetMatched 
                        ? `Preliminary Match: You appear eligible for ${targetScheme.name}` 
                        : `Review Required: Criteria for ${targetScheme.name} may require verification`}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-90 pl-6 leading-relaxed">
                    {isTargetMatched
                      ? `Your responses match the foundational guidelines for this welfare program. Review required documents before applying.`
                      : `Based on your selected income or household criteria, check the detailed eligibility limits in the official portal.`}
                  </p>
                </div>
              )}

              <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between">
                <span className="font-semibold flex items-center gap-1.5">
                  <CircleCheck className="w-4 h-4 text-emerald-400" />
                  <span>Found {matchedSchemes.length} potentially applicable schemes:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[11px] underline text-emerald-300 font-bold cursor-pointer flex items-center gap-1 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Change Answers</span>
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {matchedSchemes.map((scheme) => {
                  const theme = getCategoryTheme(scheme.category);
                  return (
                    <div
                      key={scheme.id}
                      className={`p-3.5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} transition text-xs space-y-2`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <SchemeCategoryIcon category={scheme.category} size="sm" />
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                            {scheme.category}
                          </span>
                        </div>
                        <Link
                          to={`/schemes/${scheme.slug}`}
                          onClick={onClose}
                          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="font-bold text-white">{scheme.name}</p>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{scheme.benefit_details}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Disclaimer:</strong> This check is indicative based on public criteria. Final official eligibility is determined solely by respective state/central departments upon application verification.
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
