import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../locales/i18nContext';
import { getLocalComplaints } from '../../lib/supabase';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { 
  FileText, 
  PlusCircle, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ClipboardList, 
  Building2,
  Clock
} from 'lucide-react';

export const ComplaintsPage: React.FC = () => {
  const { t } = useI18n();
  const [complaints] = useState(getLocalComplaints());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = complaints.filter((cmp) => {
    if (statusFilter !== 'all' && cmp.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = cmp.title.toLowerCase().includes(q);
      const matchesRef = cmp.reference_id.toLowerCase().includes(q);
      const matchesCategory = cmp.category.toLowerCase().includes(q);
      const matchesLocality = (cmp.locality || '').toLowerCase().includes(q);
      return matchesTitle || matchesRef || matchesCategory || matchesLocality;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/40 text-xs font-bold">
                <IndiaFlag width={15} height={10} className="rounded-2xs" />
                <span>Grievance Redressal</span>
              </div>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium">
                Citizen Tracking Registry
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2.5">
              <ClipboardList className="w-7 h-7 text-blue-400" />
              <span>{t.complaints.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track filed complaints, officer remarks, status updates, and municipal representations.
            </p>
          </div>

          <Link
            to="/complaints/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition ring-1 ring-emerald-400/30 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-emerald-200" />
            <span>{t.complaints.lodgeNew}</span>
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints by title, reference ID (SHK-...), or locality..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-white bg-slate-950 placeholder-slate-500"
              />
            </div>

            <div className="relative">
              <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-white bg-slate-950"
              >
                <option value="all" className="bg-slate-900">All Statuses ({complaints.length})</option>
                <option value="submitted" className="bg-slate-900">Submitted (Pending)</option>
                <option value="under_review" className="bg-slate-900">Under Review</option>
                <option value="in_progress" className="bg-slate-900">In Progress</option>
                <option value="resolved" className="bg-slate-900">Resolved</option>
                <option value="closed" className="bg-slate-900">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaint Cards */}
        {filtered.length === 0 ? (
          <div className="p-12 bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-300">No complaints matching your filter</p>
            <p className="text-xs text-slate-500">
              You can lodge a new complaint anytime for potholes, streetlights, or water supply issues.
            </p>
            <Link
              to="/complaints/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>Lodge New Grievance</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((cmp) => (
              <div
                key={cmp.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl hover:border-slate-700 transition space-y-4 backdrop-blur-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                      {cmp.reference_id}
                    </span>
                    <span className="text-xs font-medium text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-500/30">
                      {cmp.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{cmp.locality ? `${cmp.locality}, ` : ''}{cmp.district}, {cmp.state}</span>
                    </span>
                  </div>

                  <StatusBadge status={cmp.status} />
                </div>

                <div>
                  <h3 className="font-bold text-base text-white">
                    {cmp.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {cmp.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>Department:</span>
                    </p>
                    <p className="font-medium text-white">{cmp.department}</p>
                  </div>

                  {cmp.admin_notes && (
                    <div className="space-y-0.5 text-right">
                      <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        Latest Review Note:
                      </p>
                      <p className="font-medium text-emerald-300">{cmp.admin_notes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Filed on {new Date(cmp.created_at).toLocaleDateString()}</span>
                  </span>

                  <Link
                    to={`/complaints/${cmp.id}`}
                    className="font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{t.complaints.viewDetails}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
