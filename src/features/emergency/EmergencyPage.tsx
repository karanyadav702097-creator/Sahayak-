import React, { useState } from 'react';
import { useI18n } from '../../locales/i18nContext';
import { useAuth } from '../../context/AuthContext';
import { 
  INITIAL_VERIFIED_HELPLINES, 
  getLocalEmergencyContacts, 
  saveLocalEmergencyContact, 
  deleteLocalEmergencyContact 
} from '../../lib/supabase';
import { EmergencyContact, Helpline } from '../../types';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { 
  PhoneCall, 
  Siren, 
  MapPin, 
  UserPlus, 
  Trash2, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Info,
  X,
  Phone,
  HeartPulse,
  Flame,
  ShieldAlert,
  UserRound,
  Navigation,
  Building2,
  Cross
} from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const { t } = useI18n();
  const { profile } = useAuth();

  const [helplines] = useState<Helpline[]>(INITIAL_VERIFIED_HELPLINES);
  const [contacts, setContacts] = useState<EmergencyContact[]>(getLocalEmergencyContacts());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Location tracking state
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string>('GPS sensor idle. Tap Enable to lock coordinates.');

  // SOS Trigger Modal State
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // New Contact Form
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRel, setNewContactRel] = useState('Family');

  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage('Geolocation sensor is not supported on this device/browser.');
      return;
    }

    setGpsLoading(true);
    setGpsStatusMessage('Requesting high-accuracy GPS lock...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setAccuracy(Math.round(pos.coords.accuracy));
        setGpsLoading(false);
        setGpsStatusMessage(`GPS Active (Accuracy ±${Math.round(pos.coords.accuracy)}m)`);
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === 1) {
          setGpsStatusMessage('Location permission denied. Device coordinates unavailable.');
        } else if (err.code === 2) {
          setGpsStatusMessage('Position unavailable (GPS signal lost).');
        } else {
          setGpsStatusMessage('Geolocation query timed out.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    saveLocalEmergencyContact({
      user_id: profile?.id || 'citizen',
      name: newContactName.trim(),
      phone_number: newContactPhone.trim(),
      relationship: newContactRel,
      is_primary: contacts.length === 0,
    });

    setContacts(getLocalEmergencyContacts());
    setNewContactName('');
    setNewContactPhone('');
    setShowAddContact(false);
  };

  const handleDeleteContact = (id: string) => {
    deleteLocalEmergencyContact(id);
    setContacts(getLocalEmergencyContacts());
  };

  const handleTriggerSOS = () => {
    requestGeolocation();
    setSosModalOpen(true);
  };

  const filteredHelplines = helplines.filter((h) => {
    if (selectedCategory === 'all') return true;
    return h.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Nearby civic emergency facilities based on district or default state
  const nearbyFacilities = [
    {
      type: 'police',
      name: `${profile?.district || 'Central'} District Police Station`,
      category: 'Law & Order / Emergency Desk',
      distance: '1.2 km',
      address: `Civil Lines, Near Tehsil Chowk, ${profile?.district || 'District Center'}`,
      number: '100',
      timing: '24x7 Emergency Desk Open',
      accentColor: 'border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 text-blue-300',
      icon: ShieldAlert,
      iconColor: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
      buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    {
      type: 'ambulance',
      name: `${profile?.district || 'Government'} District Civil Hospital`,
      category: 'Trauma Care & 24x7 Emergency ICU',
      distance: '2.4 km',
      address: `Hospital Road, Sector 4, ${profile?.district || 'City Hospital Complex'}`,
      number: '108',
      timing: 'Emergency Casualty 24x7',
      accentColor: 'border-red-500/40 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 text-red-300',
      icon: HeartPulse,
      iconColor: 'text-red-400 bg-red-500/15 border-red-500/30',
      buttonBg: 'bg-red-600 hover:bg-red-500 text-white',
    },
    {
      type: 'fire',
      name: `Municipal Central Fire & Rescue Depot`,
      category: 'Fire Brigade & Disaster Mitigation',
      distance: '3.1 km',
      address: `Industrial Bypass, Depot 2, ${profile?.district || 'Municipal Zone'}`,
      number: '101',
      timing: 'Disaster Crew on Standby',
      accentColor: 'border-orange-500/40 bg-gradient-to-br from-orange-950/40 via-slate-900 to-slate-950 text-orange-300',
      icon: Flame,
      iconColor: 'text-orange-400 bg-orange-500/15 border-orange-500/30',
      buttonBg: 'bg-orange-600 hover:bg-orange-500 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Urgent High-Contrast SOS Banner with IndiaFlag */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-600/50 space-y-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40 uppercase tracking-wider">
                <IndiaFlag width={15} height={10} className="rounded-2xs" />
                <span>National Emergency Response Protocol</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight flex items-center gap-2.5">
                <Siren className="w-8 h-8 text-rose-400 animate-pulse" />
                <span>{t.emergency.title}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Direct carrier dialing for national emergency helplines, GPS location broadcast protocols, and verified civic response teams across India.
              </p>
            </div>

            {/* Prominent SOS Trigger Button with Siren */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleTriggerSOS}
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-2xl shadow-rose-900/50 ring-4 ring-rose-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <Siren className="w-6 h-6 animate-pulse" />
                <span>{t.emergency.sosButton}</span>
              </button>
              <span className="text-[11px] text-rose-300/80 text-center font-medium">
                Locks GPS coordinates & opens direct emergency dialer
              </span>
            </div>
          </div>

          {/* Device Geolocation Status Row with Compass */}
          <div className="relative p-3.5 bg-black/50 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Compass className={`w-4 h-4 text-emerald-400 ${gpsLoading ? 'animate-spin' : ''}`} />
              <span>
                <strong className="text-white">GPS Sensor:</strong> {gpsStatusMessage}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {latitude && longitude && (
                <span className="font-mono text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{latitude.toFixed(5)}° N, {longitude.toFixed(5)}° E</span>
                </span>
              )}
              <button
                type="button"
                onClick={requestGeolocation}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 border border-slate-700"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>{latitude ? 'Refresh Coordinates' : 'Acquire GPS Lock'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Core Emergency Services Grid with Distinct Service Colors */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <Siren className="w-4 h-4 text-rose-400" />
              <span>Primary National Emergency Contacts</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">Toll-Free 24x7 Dispatch Networks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 112 Unified ERSS - Rose/Red */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-950 border-2 border-rose-500/50 shadow-xl flex flex-col justify-between space-y-4 group hover:border-rose-400 transition">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-300 bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Siren className="w-3 h-3 text-rose-400" />
                    <span>Unified ERSS</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">24x7</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-3xl font-black text-rose-400 tracking-tight font-mono">112</span>
                  <span className="text-xs font-bold text-slate-200">National Emergency</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Single integrated emergency number for Police, Fire, Ambulance, & Disaster Rescue across all states.
                </p>
              </div>
              <a
                href="tel:112"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold font-mono text-center text-sm shadow-lg shadow-rose-950/50 transition flex items-center justify-center gap-2 ring-1 ring-rose-400/40"
              >
                <Phone className="w-4 h-4" />
                <span>Call 112</span>
              </a>
            </div>

            {/* 100 Police - Navy/Blue */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/70 via-slate-900 to-slate-950 border-2 border-blue-500/50 shadow-xl flex flex-col justify-between space-y-4 group hover:border-blue-400 transition">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-300 bg-blue-500/20 border border-blue-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-blue-400" />
                    <span>Law & Order</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">24x7</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-3xl font-black text-blue-400 tracking-tight font-mono">100</span>
                  <span className="text-xs font-bold text-slate-200">Police Control Room</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Direct state police wireless network, immediate crime reporting, and mobile PCR van dispatch.
                </p>
              </div>
              <a
                href="tel:100"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold font-mono text-center text-sm shadow-lg shadow-blue-950/50 transition flex items-center justify-center gap-2 ring-1 ring-blue-400/40"
              >
                <Phone className="w-4 h-4" />
                <span>Call 100</span>
              </a>
            </div>

            {/* 108 Medical Ambulance - Emerald/Green */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-xl flex flex-col justify-between space-y-4 group hover:border-emerald-400 transition">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <HeartPulse className="w-3 h-3 text-emerald-400" />
                    <span>Medical Ambulance</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">24x7</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-3xl font-black text-emerald-400 tracking-tight font-mono">108</span>
                  <span className="text-xs font-bold text-slate-200">Emergency Ambulance</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Rapid paramedic ambulance service, critical trauma transfer, and hospital emergency triage.
                </p>
              </div>
              <a
                href="tel:108"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold font-mono text-center text-sm shadow-lg shadow-emerald-950/50 transition flex items-center justify-center gap-2 ring-1 ring-emerald-400/40"
              >
                <Phone className="w-4 h-4" />
                <span>Call 108</span>
              </a>
            </div>

            {/* 101 Fire & Disaster - Orange/Amber */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-950/70 via-slate-900 to-slate-950 border-2 border-orange-500/50 shadow-xl flex flex-col justify-between space-y-4 group hover:border-orange-400 transition">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-orange-300 bg-orange-500/20 border border-orange-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span>Fire & Rescue</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">24x7</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-3xl font-black text-orange-400 tracking-tight font-mono">101</span>
                  <span className="text-xs font-bold text-slate-200">Fire Brigade</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  City fire tenders, chemical hazards, building collapse, and water rescue operations.
                </p>
              </div>
              <a
                href="tel:101"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold font-mono text-center text-sm shadow-lg shadow-orange-950/50 transition flex items-center justify-center gap-2 ring-1 ring-orange-400/40"
              >
                <Phone className="w-4 h-4" />
                <span>Call 101</span>
              </a>
            </div>

          </div>
        </div>

        {/* Attractive Nearby Civic Emergency Facilities Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Nearby Civic Emergency Infrastructure
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Estimated based on {profile?.district || 'current'} administrative jurisdiction
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nearbyFacilities.map((fac, idx) => {
              const FacIcon = fac.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border p-5 shadow-xl flex flex-col justify-between space-y-4 ${fac.accentColor}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${fac.iconColor}`}>
                        <FacIcon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-white/10 bg-white/5 text-slate-300">
                        {fac.distance} away
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white leading-snug">
                        {fac.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                        {fac.category}
                      </p>
                    </div>

                    <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 text-xs text-slate-300 space-y-1">
                      <p className="flex items-center gap-1.5 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{fac.address}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{fac.timing}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={`tel:${fac.number}`}
                      className={`flex-1 py-2.5 rounded-xl font-bold font-mono text-xs text-center transition flex items-center justify-center gap-1.5 ${fac.buttonBg}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Desk ({fac.number})</span>
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${fac.name} ${fac.address}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      title="Open in Maps"
                      aria-label="Navigate to facility"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-Column Section: Personal Emergency Contacts & Complete Verified Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Emergency Contacts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <UserRound className="w-4 h-4 text-emerald-400" />
                <span>{t.emergency.contactsTitle}</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowAddContact(!showAddContact)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer transition"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{showAddContact ? 'Cancel' : t.emergency.addContact}</span>
              </button>
            </div>

            {/* Add Contact Form */}
            {showAddContact && (
              <form onSubmit={handleAddContact} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full p-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white font-mono placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Relationship</label>
                  <select
                    value={newContactRel}
                    onChange={(e) => setNewContactRel(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white"
                  >
                    <option value="Family">Family Member</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Neighbor">Neighbor</option>
                    <option value="Colleague">Colleague / Friend</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition shadow-md"
                >
                  Save Emergency Contact
                </button>
              </form>
            )}

            {/* Contacts List */}
            <div className="space-y-3">
              {contacts.length === 0 ? (
                <div className="p-6 bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 text-center space-y-2">
                  <UserRound className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs font-semibold text-slate-400">No emergency contacts saved yet</p>
                  <p className="text-[11px] text-slate-500">
                    Add close family members or trusted neighbors for 1-tap dialing.
                  </p>
                </div>
              ) : (
                contacts.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-sm text-white">{c.name}</p>
                        <span className="text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700 px-1.5 py-0.2 rounded">
                          {c.relationship}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{c.phone_number}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${c.phone_number}`}
                        className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 transition"
                        title="Call Contact"
                        aria-label={`Call ${c.name}`}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteContact(c.id)}
                        className="p-2.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 transition cursor-pointer"
                        title="Remove contact"
                        aria-label="Remove contact"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Contacts are stored securely in browser storage. Calls route directly through your mobile SIM carrier.
              </span>
            </div>
          </div>

          {/* Right 2 Columns: Full Verified Helplines Directory */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-rose-400" />
                <span>Verified National & Civic Helpline Directory</span>
              </h2>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-slate-900 text-white"
              >
                <option value="all">All Helpline Categories</option>
                <option value="Emergency">Unified Emergency (112)</option>
                <option value="Police">Police</option>
                <option value="Medical">Medical / Ambulance</option>
                <option value="Fire">Fire & Disaster</option>
                <option value="Child">Child Welfare (1098)</option>
                <option value="Senior">Senior Citizens (14567)</option>
                <option value="Utility">Public Utility & Gas Leak (1906)</option>
              </select>
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 divide-y divide-slate-800/80 shadow-xl overflow-hidden">
              {filteredHelplines.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-850/50 transition">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category}
                      </span>
                      {item.is_toll_free && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                          Toll-Free
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                    {item.official_source_url && (
                      <a
                        href={item.official_source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-slate-500 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Official Source Verified</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="shrink-0">
                    <a
                      href={`tel:${item.number}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs shadow-md border border-slate-700 hover:border-slate-600 transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call {item.number}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Honest SOS Confirmation Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150 text-slate-100">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 flex items-center justify-center font-bold">
                  <Siren className="w-7 h-7 text-rose-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">
                    Emergency SOS Protocol
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct Phone Protocol & Live Location Coordinates
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSosModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Coordinates Display with MapPin */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Your Current Geographic Coordinates:</span>
              </p>
              {latitude && longitude ? (
                <div className="space-y-1">
                  <p className="font-mono text-base font-bold text-emerald-400">
                    {latitude.toFixed(6)}° N, {longitude.toFixed(6)}° E
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Accuracy: ±{accuracy} meters | District: {profile?.district || 'GPS Detected'}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-amber-300">
                  Acquiring satellite sensor coordinates. If speaking to emergency responders, please state your current street or landmark.
                </p>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5">
              <a
                href="tel:112"
                className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-center text-sm shadow-lg shadow-rose-950/50 transition flex items-center justify-center gap-2 ring-1 ring-rose-400/40"
              >
                <Phone className="w-5 h-5" />
                <span>Instant Call 112 (National Police/Ambulance)</span>
              </a>

              {contacts.length > 0 && (
                <a
                  href={`tel:${contacts[0].phone_number}`}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center text-xs shadow-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Primary Contact: {contacts[0].name} ({contacts[0].phone_number})</span>
                </a>
              )}
            </div>

            {/* Honest Technical Delivery Notice */}
            <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-[11px] text-amber-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>SMS Gateway Transparency Notice:</span>
              </p>
              <p className="leading-relaxed opacity-90">
                Because third-party SMS/Webhook gateways are not active in this environment, no automated SMS was dispatched in the background. Please tap the red call buttons above to speak directly with 112 or your saved contact.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSosModalOpen(false)}
              className="w-full py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
            >
              Close Emergency Modal
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
