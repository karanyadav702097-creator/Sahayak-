import React from 'react';
import { ComplaintStatus } from '../../types';
import { 
  Clock, 
  RefreshCw, 
  CircleCheck, 
  ClipboardList, 
  AlertTriangle, 
  Archive, 
  FileText 
} from 'lucide-react';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  switch (status) {
    case 'submitted':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-2xs ${sizeClasses}`}>
          <Clock className={`${iconSize} text-blue-400`} />
          <span>Pending (Submitted)</span>
        </span>
      );
    case 'under_review':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-2xs ${sizeClasses}`}>
          <ClipboardList className={`${iconSize} text-amber-400`} />
          <span>Under Review</span>
        </span>
      );
    case 'in_progress':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-2xs ${sizeClasses}`}>
          <RefreshCw className={`${iconSize} text-indigo-400 animate-spin`} />
          <span>In Progress</span>
        </span>
      );
    case 'resolved':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-2xs ${sizeClasses}`}>
          <CircleCheck className={`${iconSize} text-emerald-400`} />
          <span>Resolved</span>
        </span>
      );
    case 'rejected':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-2xs ${sizeClasses}`}>
          <AlertTriangle className={`${iconSize} text-rose-400`} />
          <span>Rejected</span>
        </span>
      );
    case 'closed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 shadow-2xs ${sizeClasses}`}>
          <Archive className={`${iconSize} text-slate-400`} />
          <span>Closed</span>
        </span>
      );
    case 'draft':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/80 shadow-2xs ${sizeClasses}`}>
          <Clock className={`${iconSize} text-slate-400`} />
          <span>Draft / Pending</span>
        </span>
      );
  }
};
