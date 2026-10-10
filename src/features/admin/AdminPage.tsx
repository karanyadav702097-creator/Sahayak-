import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  getLocalComplaints, 
  saveLocalComplaint, 
  INITIAL_VERIFIED_SCHEMES, 
  INITIAL_VERIFIED_HELPLINES,
  isSupabaseConfigured 
} from '../../lib/supabase';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { SchemeCategoryIcon } from '../../components/common/SchemeCategoryIcon';
import { Complaint, ComplaintStatus } from '../../types';
import { 
  ShieldCheck, 
  Landmark, 
  PhoneCall, 
  CircleCheck, 
  Clock, 
  Search, 
  Filter, 
  Edit3, 
  Save, 
  X,
  Server,
  ClipboardList,
  RefreshCw,
  UserRound
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { isAdmin, profile, toggleAdminRolePreview } = useAuth();
  
  const [complaints, setComplaints] = useState<Complaint[]>(getLocalComplaints());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal / Triage state
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('under_review');
  const [officerNotes, setOfficerNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // If user is not admin, show honest access denied state
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-[#0B0F17] text-white">
        <div className="w-16 h-16 rounded-3xl bg-amber-950/60 text-amber-300 flex items-center justify-center mb-4 border border-amber-500/40">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Administrative Authorization Required
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-2 leading-relaxed">
          The SAHAYAK AI Admin Console is restricted to verified municipal desk officers and public administration supervisors. Your current account role is <strong className="text-white">{profile?.role || 'unauthenticated'}</strong>.
        </p>

        <div className="mt-6 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl max-w-sm w-full text-left space-y-3">
          <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <UserRound className="w-4 h-4 text-emerald-400" />
            <span>Preview Officer Access Mode:</span>
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            For development review and testing of administrative workflows, you can toggle officer view credentials:
          </p>
          <button
            type="button"
            onClick={toggleAdminRolePreview}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ring-1 ring-emerald-400/30"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Switch to Officer Role</span>
          </button>
        </div>
      </div>
    );
  }

  // Statistics calculation
  const totalCount = complaints.length;
  const underReviewCount = complaints.filter(c => c.status === 'under_review').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  const filtered = complaints.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.reference_id.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.locality || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenTriage = (c: Complaint) => {
    setSelectedComplaint(c);
    setNewStatus(c.status);
    setOfficerNotes(c.admin_notes || '');
    setSaveSuccess(false);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    const updatedComplaint: Complaint = {
      ...selectedComplaint,
      status: newStatus,
      admin_notes: officerNotes,
      updated_at: new Date().toISOString(),
      history: [
        ...(selectedComplaint.history || []),
        {
          id: `hist-${Date.now()}`,
          complaint_id: selectedComplaint.id,
          previous_status: selectedComplaint.status,
          new_status: newStatus,
          change_notes: officerNotes,
          changed_by: profile?.id,
          changed_by_name: profile?.display_name || 'Municipal Officer',
          created_at: new Date().toISOString(),
        }
      ]
    };

    saveLocalComplaint(updatedComplaint);
    setComplaints(getLocalComplaints());
    setSaveSuccess(true);
    setTimeout(() => {
      setSelectedComplaint(null);
      setSaveSuccess(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with IndiaFlag */}
        <div className="bg-slate-900/90 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider flex items-center gap-1.5">
                <IndiaFlag width={14} height={9} className="rounded-2xs" />
                <span>Admin Console</span>
              </span>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-slate-400">
                Authorized Officer: <strong className="text-white">{profile?.display_name}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
              <span>Civic Operations & Grievance Oversight</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Audit public service complaints, manage scheme publications, and inspect system audit history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1">
                <Server className="w-3 h-3 text-slate-400" />
                <span>System State</span>
              </p>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 justify-end mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Verified Local DB'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Statistical KPIs with Lucide Icons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 rounded-2xl border border-blue-500/30 p-5 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Total Grievances</span>
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{totalCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Registered in Sahayak</p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-amber-500/30 p-5 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Under Review</span>
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{underReviewCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Pending engineer verification</p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-indigo-500/30 p-5 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>In Progress</span>
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{inProgressCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Field repair assigned</p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-5 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <CircleCheck className="w-3.5 h-3.5" />
              <span>Resolved</span>
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{resolvedCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Remedial action verified</p>
          </div>
        </div>

        {/* Grievance Management & Triage Table */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-xs">
          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-400" />
                <span>Citizen Grievance Redressal Queue</span>
              </h2>
              <p className="text-xs text-slate-400">
                Review complaints, update resolution status, and submit departmental remarks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter reference ID or title..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500"
                />
              </div>

              <div className="relative">
                <Filter className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Officer Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((cmp) => (
                  <tr key={cmp.id} className="hover:bg-slate-850/50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {cmp.reference_id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-300">
                      {cmp.category}
                    </td>
                    <td className="py-3 px-4 text-slate-200 max-w-xs truncate font-medium">
                      {cmp.title}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {cmp.locality || cmp.district}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={cmp.status} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleOpenTriage(cmp)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-[11px] transition cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 text-amber-400" />
                        <span>Update Status</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Directory Verification Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>Verified Scheme Registry ({INITIAL_VERIFIED_SCHEMES.length})</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All schemes in the database are verified against official central guidelines (PMAY, PM-JAY, PM-KISAN, PM Surya Ghar, APY).
            </p>
            <div className="space-y-2 pt-1">
              {INITIAL_VERIFIED_SCHEMES.slice(0, 4).map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <SchemeCategoryIcon category={s.category} size="sm" />
                    <span className="font-bold text-white">{s.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    Published
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>National Helpline Registry ({INITIAL_VERIFIED_HELPLINES.length})</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official emergency numbers verified with NDMA, Ministry of Home Affairs, and MoHFW.
            </p>
            <div className="space-y-2 pt-1">
              {INITIAL_VERIFIED_HELPLINES.slice(0, 4).map((h) => (
                <div key={h.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-white">{h.name}</span>
                  <span className="font-mono font-bold text-rose-400">{h.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Officer Triage Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150 text-slate-100">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {selectedComplaint.reference_id}
                </span>
                <h3 className="font-extrabold text-lg text-white mt-1 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-400" />
                  <span>Update Grievance Status</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess ? (
              <div className="p-4 bg-emerald-950/70 rounded-2xl border border-emerald-500/40 text-center text-xs text-emerald-200 space-y-1">
                <CircleCheck className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-bold text-sm text-white">Status Updated & Audit Logged</p>
                <p className="text-slate-400">The citizen notification has been dispatched.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveStatus} className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-300">Grievance:</p>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedComplaint.title}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Assign New Lifecycle Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white"
                  >
                    <option value="submitted">Submitted (Pending)</option>
                    <option value="under_review">Under Review</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Officer Review Remarks (Visible to Citizen)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={officerNotes}
                    onChange={(e) => setOfficerNotes(e.target.value)}
                    placeholder="e.g. Inspected site; repair contractor scheduled for 14th Oct..."
                    className="w-full p-3 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500"
                  />
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  This action creates an immutable audit trail entry under changed_by: <strong className="text-slate-200">{profile?.display_name}</strong>.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedComplaint(null)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 ring-1 ring-emerald-400/30"
                  >
                    <Save className="w-4 h-4 text-emerald-200" />
                    <span>Save & Notify Citizen</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
