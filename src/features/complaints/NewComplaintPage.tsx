import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ComplaintCategory, Complaint } from '../../types';
import { saveLocalComplaint, supabase, isSupabaseConfigured } from '../../lib/supabase';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { 
  FileText, 
  MapPin, 
  Sparkles, 
  Paperclip, 
  ShieldCheck, 
  ArrowLeft, 
  AlertCircle,
  Compass,
  Building2,
  Tag,
  CircleCheck
} from 'lucide-react';

const CATEGORIES: { label: ComplaintCategory; department: string }[] = [
  { label: 'Roads & Potholes', department: 'Municipal Corporation (Road Infrastructure & PWD)' },
  { label: 'Water Supply & Quality', department: 'Jal Board / Municipal Water Supply Dept' },
  { label: 'Electricity & Streetlights', department: 'State Electricity Distribution Company (DISCOM)' },
  { label: 'Sanitation & Solid Waste', department: 'Municipal Public Health & Solid Waste Management' },
  { label: 'Drainage & Sewage', department: 'Stormwater & Underground Drainage Works Dept' },
  { label: 'Public Transport & Bus Stops', department: 'State / Urban Road Transport Corporation' },
  { label: 'Parks & Public Infrastructure', department: 'Horticulture & Civil Maintenance Dept' },
  { label: 'Encroachment & Noise', department: 'Town Planning & Municipal Enforcement Desk' },
  { label: 'Other Civic Issues', department: 'General Public Grievance Cell' },
];

export const NewComplaintPage: React.FC = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory>('Roads & Potholes');
  const [department, setDepartment] = useState('Municipal Corporation (Road Infrastructure & PWD)');
  const [description, setDescription] = useState('');
  const [state, setState] = useState(profile?.state || 'Maharashtra');
  const [district, setDistrict] = useState(profile?.district || 'Pune');
  const [locality, setLocality] = useState(profile?.locality || '');
  
  // Geolocation states
  const [gpsLatitude, setGpsLatitude] = useState<number | null>(null);
  const [gpsLongitude, setGpsLongitude] = useState<number | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isCapturingGps, setIsCapturingGps] = useState(false);

  // AI Letter Drafting states
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftedLetter, setDraftedLetter] = useState<string | null>(null);

  // Evidence state
  const [fileName, setFileName] = useState<string | null>(null);

  // Confirmation
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCategoryChange = (cat: ComplaintCategory) => {
    setSelectedCategory(cat);
    const found = CATEGORIES.find(c => c.label === cat);
    if (found) setDepartment(found.department);
  };

  const handleCaptureGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setIsCapturingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLatitude(pos.coords.latitude);
        setGpsLongitude(pos.coords.longitude);
        setGpsAccuracy(Math.round(pos.coords.accuracy));
        setIsCapturingGps(false);
      },
      (err) => {
        setIsCapturingGps(false);
        if (err.code === 1) {
          setGpsError('Location permission denied. You can continue by entering locality manually.');
        } else {
          setGpsError('Location unavailable. Check GPS sensor or enter address manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleGenerateAIDraft = async () => {
    if (!description || description.trim().length < 5) {
      setErrorMessage('Please describe the problem briefly before drafting.');
      return;
    }
    setErrorMessage(null);
    setIsDrafting(true);

    try {
      const formalLetter = `To,\nThe Competent Authority / Executive Officer,\n${department},\n${district}, ${state}.\n\nSubject: Formal grievance representation regarding ${title || selectedCategory} in ${locality || district}\n\nRespected Sir/Madam,\n\nI am writing to bring to your urgent attention a serious civic grievance concerning ${selectedCategory} situated at ${locality || district}, ${state}.\n\nStatement of Issue & Inconvenience:\n${description}\n\nThis condition presents an ongoing inconvenience and safety hazard to area residents, pedestrians, and commuters. I request your esteemed office to conduct an on-site physical inspection and initiate prompt remedial measures.\n\nThanking you,\nYours faithfully,\n${profile?.display_name || 'Concerned Citizen'}\nReference: SAHAYAK Citizen Registry`;
      
      setDraftedLetter(formalLetter);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentConfirmed) {
      setErrorMessage('Please confirm citizen consent acknowledgment before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const refId = `SHK-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    const newComplaint: Complaint = {
      id: `cmp-${Date.now()}`,
      reference_id: refId,
      user_id: user?.id || profile?.id || 'citizen',
      title,
      category: selectedCategory,
      department,
      description: draftedLetter || description,
      state,
      district,
      locality,
      gps_latitude: gpsLatitude,
      gps_longitude: gpsLongitude,
      status: 'submitted',
      submitted_to_gov_status: false,
      admin_notes: 'Lodged in Sahayak registry; ready for departmental review.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      history: [
        {
          id: `hist-${Date.now()}`,
          complaint_id: `cmp-${Date.now()}`,
          previous_status: null,
          new_status: 'submitted',
          change_notes: 'Grievance submitted by citizen to Sahayak portal with AI structured representation.',
          created_at: new Date().toISOString(),
        }
      ]
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: dbError } = await supabase.from('complaints').insert({
          reference_id: newComplaint.reference_id,
          user_id: user?.id,
          title: newComplaint.title,
          category: newComplaint.category,
          department: newComplaint.department,
          description: newComplaint.description,
          state: newComplaint.state,
          district: newComplaint.district,
          locality: newComplaint.locality,
          gps_latitude: newComplaint.gps_latitude,
          gps_longitude: newComplaint.gps_longitude,
          status: 'submitted',
          submitted_to_gov_status: false,
        });
        if (dbError) throw dbError;
      }

      saveLocalComplaint(newComplaint);
      navigate(`/complaints/${newComplaint.id}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit grievance');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Back */}
        <div>
          <Link
            to="/complaints"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Grievances</span>
          </Link>
        </div>

        {/* Header with IndiaFlag */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-2 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/40 text-xs font-bold">
              <IndiaFlag width={15} height={10} className="rounded-2xs" />
              <span>Grievance Lodging Desk</span>
            </div>
            <span className="text-xs text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-medium">
              Civic Redressal Workflow
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            <span>Lodge a Civic Grievance</span>
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Report public infrastructure issues—potholes, contaminated water, broken streetlights, or sanitation hazards—with AI drafting assistance and official department routing.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Complaint Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Category & Department */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-400" />
              <span>1. Issue Classification</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Civic Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value as ComplaintCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.label} value={c.label} className="bg-slate-900">{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Responsible Department
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-slate-200 font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Grievance Title / Short Subject
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Hazardous deep pothole on MG Road near bus shelter"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* 2. Location & GPS */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. Location Information</span>
              </h2>
              <button
                type="button"
                onClick={handleCaptureGPS}
                disabled={isCapturingGps}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 cursor-pointer disabled:opacity-50 transition"
              >
                <Compass className={`w-3.5 h-3.5 text-emerald-400 ${isCapturingGps ? 'animate-spin' : ''}`} />
                <span>{isCapturingGps ? 'Querying GPS...' : 'Tag Current GPS Coordinates'}</span>
              </button>
            </div>

            {gpsLatitude && gpsLongitude && (
              <div className="p-3 bg-emerald-950/70 rounded-xl border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between">
                <span className="font-medium flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>GPS Fixed: {gpsLatitude.toFixed(5)}, {gpsLongitude.toFixed(5)} (±{gpsAccuracy}m)</span>
                </span>
                <button
                  type="button"
                  onClick={() => { setGpsLatitude(null); setGpsLongitude(null); }}
                  className="text-[11px] underline text-emerald-300 font-bold cursor-pointer"
                >
                  Clear GPS
                </button>
              </div>
            )}

            {gpsError && (
              <p className="text-[11px] text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{gpsError}</span>
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">District / City</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Locality / Landmark</label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Ward 4, Near Sector Gate"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Description & AI Drafting Assistance with Paperclip icon */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>3. Grievance Description & Representation</span>
              </h2>
              <button
                type="button"
                onClick={handleGenerateAIDraft}
                disabled={isDrafting || !description}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/40 hover:bg-amber-950/60 text-xs font-bold text-amber-300 cursor-pointer disabled:opacity-50 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isDrafting ? 'Drafting...' : 'AI Format Petition Letter'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Raw Civic Description (What happened, location landmark, days unresolved)
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue clearly. E.g. Sewer line overflow on road for past 4 days causing severe foul smell and health hazard..."
                className="w-full p-3 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 font-sans focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* AI Drafted Formal Letter Preview */}
            {draftedLetter && (
              <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>AI-Formatted Formal Representation Letter:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setDraftedLetter(null)}
                    className="text-[11px] underline text-slate-400 hover:text-white cursor-pointer"
                  >
                    Reset to raw notes
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={draftedLetter}
                  onChange={(e) => setDraftedLetter(e.target.value)}
                  className="w-full p-3 text-xs rounded-lg border border-slate-800 font-mono text-slate-200 bg-slate-900"
                />
                <p className="text-[11px] text-slate-400">
                  You can edit the formal letter before submitting. This letter will be preserved with your reference ID.
                </p>
              </div>
            )}

            {/* Supporting Evidence Upload with Paperclip Icon */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span>Supporting Photo / Document Evidence (Optional)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 hover:bg-slate-850 cursor-pointer text-xs text-slate-300 transition">
                <Paperclip className="w-4 h-4 text-slate-400" />
                <span>{fileName ? `Attached: ${fileName}` : 'Upload site photo, bill, or notice (JPG, PNG, PDF up to 10MB)'}</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 4. Citizen Consent and Submission Distinction */}
          <div className="bg-slate-900/90 border border-slate-800 text-slate-200 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-white">Important Civic Notice & Consent</p>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Submitting this complaint persists it securely in the SAHAYAK AI system, issues an immutable Reference ID (SHK-2025-XXXXX), and prepares your structured representation. It does NOT automatically file legal petitions with the government. We will provide direct official links to CPGRAMS (<code className="text-amber-400 font-mono">pgportal.gov.in</code>) and state municipal portals upon submission.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer text-xs text-white">
              <input
                type="checkbox"
                required
                checked={consentConfirmed}
                onChange={(e) => setConsentConfirmed(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
              />
              <span className="font-medium">
                I confirm the information provided is factual and acknowledge the submission guidelines.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !consentConfirmed}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ring-1 ring-emerald-400/30"
            >
              {isSubmitting ? (
                <span>Persisting Grievance to Sahayak...</span>
              ) : (
                <>
                  <CircleCheck className="w-4 h-4" />
                  <span>Submit Grievance to Sahayak Registry</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
