import React from 'react';
import { 
  House, 
  HeartPulse, 
  Sprout, 
  GraduationCap, 
  UsersRound, 
  BriefcaseBusiness, 
  Wallet, 
  HandHeart, 
  Accessibility, 
  Leaf,
  Landmark
} from 'lucide-react';

interface SchemeCategoryIconProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface CategoryTheme {
  icon: React.ElementType;
  iconBg: string;
  iconText: string;
  iconBorder: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  benefitBg: string;
  benefitBorder: string;
  benefitText: string;
  glowColor: string;
  label: string;
}

export function getCategoryTheme(category: string): CategoryTheme {
  const normalized = (category || '').toLowerCase();

  // Housing & Urban Development -> Emerald / Teal
  if (normalized.includes('housing') || normalized.includes('urban') || normalized.includes('pmay') || normalized.includes('awas')) {
    return {
      icon: House,
      iconBg: 'bg-emerald-500/15',
      iconText: 'text-emerald-400',
      iconBorder: 'border-emerald-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-emerald-950/25',
      cardBorder: 'border-emerald-500/30',
      cardHoverBorder: 'hover:border-emerald-400/60 hover:shadow-emerald-950/40',
      badgeBg: 'bg-emerald-500/15',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/30',
      benefitBg: 'bg-emerald-950/40',
      benefitBorder: 'border-emerald-500/25',
      benefitText: 'text-emerald-200',
      glowColor: 'rgba(16, 185, 129, 0.2)',
      label: 'Housing & Urban Development',
    };
  }

  // Healthcare -> Cyan / Teal
  if (normalized.includes('health') || normalized.includes('ayushman') || normalized.includes('medical') || normalized.includes('pm-jay')) {
    return {
      icon: HeartPulse,
      iconBg: 'bg-teal-500/15',
      iconText: 'text-teal-400',
      iconBorder: 'border-teal-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-teal-950/25',
      cardBorder: 'border-teal-500/30',
      cardHoverBorder: 'hover:border-teal-400/60 hover:shadow-teal-950/40',
      badgeBg: 'bg-teal-500/15',
      badgeText: 'text-teal-300',
      badgeBorder: 'border-teal-500/30',
      benefitBg: 'bg-teal-950/40',
      benefitBorder: 'border-teal-500/25',
      benefitText: 'text-teal-200',
      glowColor: 'rgba(20, 184, 166, 0.2)',
      label: 'Healthcare',
    };
  }

  // Agriculture -> Bright Leaf Green
  if (normalized.includes('agri') || normalized.includes('farmer') || normalized.includes('kisan')) {
    return {
      icon: Sprout,
      iconBg: 'bg-green-500/15',
      iconText: 'text-green-400',
      iconBorder: 'border-green-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-green-950/20',
      cardBorder: 'border-green-500/25',
      cardHoverBorder: 'hover:border-green-400/50 hover:shadow-green-950/30',
      badgeBg: 'bg-green-500/10',
      badgeText: 'text-green-300',
      badgeBorder: 'border-green-500/30',
      benefitBg: 'bg-green-950/30',
      benefitBorder: 'border-green-500/20',
      benefitText: 'text-green-200',
      glowColor: 'rgba(34, 197, 94, 0.15)',
      label: 'Agriculture & Farmers',
    };
  }

  // Education -> Violet / Purple
  if (normalized.includes('education') || normalized.includes('scholarship') || normalized.includes('youth') || normalized.includes('student')) {
    return {
      icon: GraduationCap,
      iconBg: 'bg-purple-500/15',
      iconText: 'text-purple-400',
      iconBorder: 'border-purple-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-purple-950/20',
      cardBorder: 'border-purple-500/25',
      cardHoverBorder: 'hover:border-purple-400/50 hover:shadow-purple-950/30',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-300',
      badgeBorder: 'border-purple-500/30',
      benefitBg: 'bg-purple-950/30',
      benefitBorder: 'border-purple-500/20',
      benefitText: 'text-purple-200',
      glowColor: 'rgba(168, 85, 247, 0.15)',
      label: 'Education & Youth',
    };
  }

  // Energy & Environment -> Teal or Forest Green
  if (normalized.includes('energy') || normalized.includes('solar') || normalized.includes('power') || normalized.includes('renewable') || normalized.includes('environment')) {
    return {
      icon: Leaf,
      iconBg: 'bg-teal-500/15',
      iconText: 'text-teal-400',
      iconBorder: 'border-teal-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-teal-950/20',
      cardBorder: 'border-teal-500/25',
      cardHoverBorder: 'hover:border-teal-400/50 hover:shadow-teal-950/30',
      badgeBg: 'bg-teal-500/10',
      badgeText: 'text-teal-300',
      badgeBorder: 'border-teal-500/30',
      benefitBg: 'bg-teal-950/30',
      benefitBorder: 'border-teal-500/20',
      benefitText: 'text-teal-200',
      glowColor: 'rgba(20, 184, 166, 0.15)',
      label: 'Energy & Renewable Power',
    };
  }

  // Financial Inclusion -> Amber
  if (normalized.includes('financial') || normalized.includes('livelihood') || normalized.includes('svanidhi') || normalized.includes('vendor')) {
    return {
      icon: Wallet,
      iconBg: 'bg-amber-500/15',
      iconText: 'text-amber-400',
      iconBorder: 'border-amber-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-amber-950/20',
      cardBorder: 'border-amber-500/25',
      cardHoverBorder: 'hover:border-amber-400/50 hover:shadow-amber-950/30',
      badgeBg: 'bg-amber-500/10',
      badgeText: 'text-amber-300',
      badgeBorder: 'border-amber-500/30',
      benefitBg: 'bg-amber-950/30',
      benefitBorder: 'border-amber-500/20',
      benefitText: 'text-amber-200',
      glowColor: 'rgba(245, 158, 11, 0.15)',
      label: 'Financial Inclusion & Livelihood',
    };
  }

  // Employment & Skills -> Orange
  if (normalized.includes('skill') || normalized.includes('employment') || normalized.includes('job')) {
    return {
      icon: BriefcaseBusiness,
      iconBg: 'bg-orange-500/15',
      iconText: 'text-orange-400',
      iconBorder: 'border-orange-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-orange-950/20',
      cardBorder: 'border-orange-500/25',
      cardHoverBorder: 'hover:border-orange-400/50 hover:shadow-orange-950/30',
      badgeBg: 'bg-orange-500/10',
      badgeText: 'text-orange-300',
      badgeBorder: 'border-orange-500/30',
      benefitBg: 'bg-orange-950/30',
      benefitBorder: 'border-orange-500/20',
      benefitText: 'text-orange-200',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      label: 'Employment & Skills',
    };
  }

  // Social Security & Pensions -> Indigo
  if (normalized.includes('pension') || normalized.includes('social security') || normalized.includes('atal')) {
    return {
      icon: HandHeart,
      iconBg: 'bg-indigo-500/15',
      iconText: 'text-indigo-400',
      iconBorder: 'border-indigo-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-indigo-950/20',
      cardBorder: 'border-indigo-500/25',
      cardHoverBorder: 'hover:border-indigo-400/50 hover:shadow-indigo-950/30',
      badgeBg: 'bg-indigo-500/10',
      badgeText: 'text-indigo-300',
      badgeBorder: 'border-indigo-500/30',
      benefitBg: 'bg-indigo-950/30',
      benefitBorder: 'border-indigo-500/20',
      benefitText: 'text-indigo-200',
      glowColor: 'rgba(99, 102, 241, 0.15)',
      label: 'Social Security & Pensions',
    };
  }

  // Disability Assistance -> Cyan
  if (normalized.includes('disability') || normalized.includes('divyang')) {
    return {
      icon: Accessibility,
      iconBg: 'bg-cyan-500/15',
      iconText: 'text-cyan-400',
      iconBorder: 'border-cyan-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-cyan-950/20',
      cardBorder: 'border-cyan-500/25',
      cardHoverBorder: 'hover:border-cyan-400/50 hover:shadow-cyan-950/30',
      badgeBg: 'bg-cyan-500/10',
      badgeText: 'text-cyan-300',
      badgeBorder: 'border-cyan-500/30',
      benefitBg: 'bg-cyan-950/30',
      benefitBorder: 'border-cyan-500/20',
      benefitText: 'text-cyan-200',
      glowColor: 'rgba(6, 182, 212, 0.15)',
      label: 'Disability Assistance',
    };
  }

  // Women & Child Welfare (Scheme category only) -> Rose / Coral
  if (normalized.includes('welfare') || normalized.includes('child') || normalized.includes('women')) {
    return {
      icon: UsersRound,
      iconBg: 'bg-rose-500/15',
      iconText: 'text-rose-400',
      iconBorder: 'border-rose-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-rose-950/20',
      cardBorder: 'border-rose-500/25',
      cardHoverBorder: 'hover:border-rose-400/50 hover:shadow-rose-950/30',
      badgeBg: 'bg-rose-500/10',
      badgeText: 'text-rose-300',
      badgeBorder: 'border-rose-500/30',
      benefitBg: 'bg-rose-950/30',
      benefitBorder: 'border-rose-500/20',
      benefitText: 'text-rose-200',
      glowColor: 'rgba(244, 63, 94, 0.15)',
      label: 'Public & Child Welfare',
    };
  }

  // Civic & Public Services -> Blue
  if (normalized.includes('civic') || normalized.includes('public service') || normalized.includes('infrastructure')) {
    return {
      icon: Landmark,
      iconBg: 'bg-blue-500/15',
      iconText: 'text-blue-400',
      iconBorder: 'border-blue-500/30',
      cardBg: 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-blue-950/25',
      cardBorder: 'border-blue-500/30',
      cardHoverBorder: 'hover:border-blue-400/60 hover:shadow-blue-950/40',
      badgeBg: 'bg-blue-500/15',
      badgeText: 'text-blue-300',
      badgeBorder: 'border-blue-500/30',
      benefitBg: 'bg-blue-950/40',
      benefitBorder: 'border-blue-500/25',
      benefitText: 'text-blue-200',
      glowColor: 'rgba(59, 130, 246, 0.2)',
      label: 'Civic & Public Services',
    };
  }

  return {
    icon: Landmark,
    iconBg: 'bg-slate-700/30',
    iconText: 'text-slate-300',
    iconBorder: 'border-slate-600/30',
    cardBg: 'bg-slate-900/90',
    cardBorder: 'border-slate-800',
    cardHoverBorder: 'hover:border-slate-700',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-slate-300',
    badgeBorder: 'border-slate-700',
    benefitBg: 'bg-slate-950/40',
    benefitBorder: 'border-slate-800',
    benefitText: 'text-slate-300',
    glowColor: 'rgba(148, 163, 184, 0.15)',
    label: category,
  };
}

export const SchemeCategoryIcon: React.FC<SchemeCategoryIconProps> = ({
  category,
  size = 'md',
  className = '',
}) => {
  const theme = getCategoryTheme(category);
  const Icon = theme.icon;

  const containerSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  return (
    <div
      className={`inline-flex items-center justify-center border shadow-sm transition-all group-hover:scale-105 shrink-0 backdrop-blur-xs ${theme.iconBg} ${theme.iconText} ${theme.iconBorder} ${containerSizes[size]} ${className}`}
    >
      <Icon className={iconSizes[size]} />
    </div>
  );
};
