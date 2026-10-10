import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocalComplaints } from '../../lib/supabase';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { 
  FileText, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck,
  Compass,
  Building2,
  ClipboardList
} from 'lucide-react';

export const ComplaintDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const complaints = getLocalComplaints();
  const complaint = complaints.find((c) => c.id === id);

  const [copied, setCopied] = useState(false);

  if (!complaint) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#0B0F17] text-white">
        <FileText className="w-12 h-12 text-slate-600 mb-3" />
        <h2 className="text-xl font-bold text-white">Complaint Record Not Found</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          No grievance record matches this reference identifier.
        </p>
        <Link
          to="/complaints"
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Grievances</span>
        </Link>
      </div>
    );
  }

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(complaint.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Link */}
        <div>
          <Link
            to="/complaints"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Grievance Directory</span>
          </Link>
        </div>

        {/* Complaint Header Card */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4 backdrop-blur-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 inline-flex items-center gap-1.5">
                <IndiaFlag width={15} height={10} className="rounded-2xs" />
                <span>{complaint.reference_id}</span>
              </span>
              <span className="text-xs font-semibold text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-500/30">
                {complaint.category}
              </span>
            </div>
            <StatusBadge status={complaint.status} />
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
            {complaint.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span><strong>Department:</strong> {complaint.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Location:</strong> {complaint.locality ? `${complaint.locality}, ` : ''}{complaint.district}, {complaint.state}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span><strong>Lodged on:</strong> {new Date(complaint.created_at).toLocaleDateString()}</span>
            </div>
            {complaint.gps_latitude && complaint.gps_longitude && (
              <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GPS: {complaint.gps_latitude}, {complaint.gps_longitude}</span>
              </div>
            )}
          </div>
        </div>

        {/* Structured Representation Letter with Copy Action */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Formal Representation / Grievance Text</span>
            </h2>
            <button
              type="button"
              onClick={handleCopyLetter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 cursor-pointer transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Representation Text'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {complaint.description}
          </div>
        </div>

        {/* Audit Status History Timeline */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            <span>Audit Status History & Review Trail</span>
          </h2>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {complaint.history && complaint.history.length > 0 ? (
              complaint.history.map((hist, index) => (
                <div key={hist.id || index} className="relative group">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-slate-900"></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase">
                        Status: {hist.new_status.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{new Date(hist.created_at).toLocaleString()}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {hist.change_notes || 'Status updated by authorized reviewer.'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-slate-900"></div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white">
                    Status: {complaint.status.replace('_', ' ')}
                  </span>
                  <p className="text-xs text-slate-400">
                    Grievance received and registered in citizen database.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Official External Submission Portal Guide */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Submit Directly to Official Government Portals
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Sahayak AI structures and tracks your grievance locally. If you want official statutory redressal, submit your copied representation to the appropriate government portal below:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs transition"
            >
              <div>
                <p className="font-bold text-white">CPGRAMS Portal</p>
                <p className="text-[11px] text-slate-400">Central & State Ministry Grievance Cell</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="https://consumerhelpline.gov.in"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs transition"
            >
              <div>
                <p className="font-bold text-white">National Consumer Helpline</p>
                <p className="text-[11px] text-slate-400">Disputes with utilities or service vendors</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
