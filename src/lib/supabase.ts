import { createClient } from '@supabase/supabase-js';
import { Scheme, Helpline, Complaint, EmergencyContact, NotificationItem, AdminAuditLog } from '../types';

// Retrieve credentials from environment
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Detect if real Supabase credentials are configured
export const isSupabaseConfigured: boolean = Boolean(
  rawUrl &&
  rawAnonKey &&
  !rawUrl.includes('your-project-id') &&
  rawUrl.startsWith('https://') &&
  rawAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(rawUrl, rawAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Initial verified fallback data (matching seed SQL) to guarantee zero-break preview
export const INITIAL_VERIFIED_SCHEMES: Scheme[] = [
  {
    id: 'pmay-u-001',
    name: 'Pradhan Mantri Awas Yojana - Urban (PMAY-U 2.0)',
    slug: 'pmay-urban',
    category: 'Housing & Urban Development',
    description: 'Provides central assistance to urban poor, EWS, and LIG families to construct or acquire pucca houses with basic civic amenities.',
    eligible_audience: 'Economically Weaker Section (EWS) and Low-Income Group (LIG) families without a pucca house.',
    state_or_national: 'National',
    eligibility_requirements: [
      { criterion: 'Annual Household Income', detail: 'Up to ₹3,00,000 for EWS, ₹3,00,001 to ₹6,00,000 for LIG' },
      { criterion: 'Existing Property', detail: 'Applicant or family must not own a pucca house anywhere in India' },
      { criterion: 'Female Ownership', detail: 'House must be registered in the name of the female head or joint ownership' }
    ],
    benefit_details: 'Financial interest subsidy of up to ₹2.5 Lakhs or direct financial assistance for pucca house construction.',
    required_documents: ['Aadhaar Card', 'Income Certificate', 'Bank Account Passbook', 'Proof of Land/Property Ownership', 'Affidavit of no pucca house'],
    application_procedure: 'Apply through the official PMAY portal or through local Common Service Centre (CSC) / Municipal Corporation office.',
    official_source_url: 'https://pmaymis.gov.in',
    last_verified_date: '2025-01-15',
    publication_status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: 'pmjay-002',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    slug: 'ayushman-bharat-pmjay',
    category: 'Healthcare',
    description: 'The world’s largest government-funded healthcare assurance scheme offering secondary and tertiary care hospitalisation coverage.',
    eligible_audience: 'Bottom 40% vulnerable and economically deprived population identified under SECC and expanded senior citizen criteria (70+).',
    state_or_national: 'National',
    eligibility_requirements: [
      { criterion: 'SECC Identification', detail: 'Listed in Socio-Economic Caste Census (SECC 2011) database' },
      { criterion: 'Senior Citizens (70+)', detail: 'All senior citizens aged 70 years and above irrespective of income receive separate ₹5 Lakh cover' }
    ],
    benefit_details: 'Cashless healthcare cover of up to ₹5,00,000 per family per year across empaneled public and private hospitals across India.',
    required_documents: ['Aadhaar Card', 'Ration Card / PM-JAY Letter', 'Active Mobile Number', 'Age proof for 70+ seniors'],
    application_procedure: 'Verify eligibility on mera.pmjay.gov.in or visit any empaneled hospital (AB-PMJAY Kiosk) / nearest CSC with Aadhaar.',
    official_source_url: 'https://pmjay.gov.in',
    last_verified_date: '2025-01-20',
    publication_status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: 'pmkisan-003',
    name: 'PM Kisan Samman Nidhi (PM-KISAN)',
    slug: 'pm-kisan-samman-nidhi',
    category: 'Agriculture & Farmers',
    description: 'Direct income support scheme for landholding farmer families across India to supplement agricultural and domestic inputs.',
    eligible_audience: 'All landholding farmer families who own cultivable land.',
    state_or_national: 'National',
    eligibility_requirements: [
      { criterion: 'Land Ownership', detail: 'Must possess cultivable land record registered in their name' },
      { criterion: 'e-KYC', detail: 'Mandatory Aadhaar-based e-KYC on the PM-Kisan portal' },
      { criterion: 'Exclusions', detail: 'Serving/retired government employees and income tax payees are excluded' }
    ],
    benefit_details: '₹6,000 per annum paid directly into Aadhaar-seeded bank accounts in three equal instalments of ₹2,000.',
    required_documents: ['Aadhaar Card', 'Land Ownership Records (Khata/Khasra/ROR)', 'Aadhaar-seeded Bank Account Passbook'],
    application_procedure: 'Self-registration through pmkisan.gov.in Farmers Corner or via nearest Common Service Centre (CSC).',
    official_source_url: 'https://pmkisan.gov.in',
    last_verified_date: '2025-02-01',
    publication_status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: 'pmsurya-004',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    slug: 'pm-surya-ghar-muft-bijli',
    category: 'Energy & Renewable Power',
    description: 'National rooftop solar initiative providing capital subsidy to residential households to generate up to 300 units of free electricity per month.',
    eligible_audience: 'Indian households with shadow-free roof suitable for solar installation and active residential power connection.',
    state_or_national: 'National',
    eligibility_requirements: [
      { criterion: 'Electricity Connection', detail: 'Must hold an active residential electricity consumer number' },
      { criterion: 'Roof Space', detail: 'Adequate shadow-free rooftop area' },
      { criterion: 'Discom Empanelment', detail: 'Installation through empaneled vendors using domestically manufactured solar cells' }
    ],
    benefit_details: 'Direct capital subsidy: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and up to ₹78,000 for 3 kW and higher systems.',
    required_documents: ['Latest Electricity Bill', 'Aadhaar Card', 'Rooftop Photo & Space Declaration', 'Bank Account Passbook/Cancelled Cheque'],
    application_procedure: 'Register on pmsuryaghar.gov.in, select local DISCOM, choose vendor, and apply for net meter.',
    official_source_url: 'https://pmsuryaghar.gov.in',
    last_verified_date: '2025-02-10',
    publication_status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: 'pmsvanidhi-005',
    name: 'PM Street Vendors AtmaNirbhar Nidhi (PM SVANidhi)',
    slug: 'pm-svanidhi',
    category: 'Financial Inclusion & Livelihood',
    description: 'Special micro-credit facility providing affordable collateral-free working capital loans to urban street vendors.',
    eligible_audience: 'Urban street vendors, hawkers, thelewala, and rehriwalas in urban and peri-urban areas.',
    state_or_national: 'National',
    eligibility_requirements: [
      { criterion: 'Occupation', detail: 'Engaged in vending in urban areas' },
      { criterion: 'Vending Certificate', detail: 'Certificate of Vending / ID card issued by Urban Local Body (ULB) or Letter of Recommendation' }
    ],
    benefit_details: 'First loan ₹10,000; second loan ₹20,000; third loan up to ₹50,000 on timely repayments with 7% interest subsidy.',
    required_documents: ['Aadhaar Card', 'Vending ID Card or Letter of Recommendation (LoR)', 'Bank Account Passbook'],
    application_procedure: 'Apply via pmsvanidhi.mohua.gov.in or directly at bank branches and Common Service Centres.',
    official_source_url: 'https://pmsvanidhi.mohua.gov.in',
    last_verified_date: '2025-01-25',
    publication_status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: 'apy-006',
    name: 'Atal Pension Yojana (APY)',
    slug: 'atal-pension-yojana',
    category: 'Social Security & Pensions',
    description: 'Guaranteed pension scheme primarily targeted at unorganised sector workers, administered by PFRDA.',
    eligible_audience: 'All Indian citizens between 18 and 40 years of age with a savings bank or post office account.',
    state_or_national: 'National',
    eligibility_requirements: [
      { criterion: 'Age', detail: 'Between 18 and 40 years at entry' },
      { criterion: 'Bank Account', detail: 'Must possess an active savings account with auto-debit facility' },
      { criterion: 'Tax Status', detail: 'Income tax payers are excluded' }
    ],
    benefit_details: 'Guaranteed monthly pension of ₹1,000 to ₹5,000 from age 60 onwards for lifetime.',
    required_documents: ['Aadhaar Card', 'Savings Bank Account Number', 'Mobile Number'],
    application_procedure: 'Apply at any bank branch or post office where you hold a savings account or through net banking portal.',
    official_source_url: 'https://www.npscra.nsdl.co.in',
    last_verified_date: '2025-01-18',
    publication_status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: 'nsp-007',
    name: 'National Scholarship Portal (Central Sector)',
    slug: 'national-scholarship-portal',
    category: 'Education & Youth',
    description: 'Unified electronic portal offering merit-cum-means scholarships to school and university students across India.',
    eligible_audience: 'Students from SC, ST, OBC, minority communities, and economically weaker meritorious backgrounds.',
    state_or_national: 'National',
    eligibility_requirements: [
      { criterion: 'Enrollment', detail: 'Enrolled in recognized schools, colleges, or universities in India' },
      { criterion: 'Academic Merit', detail: 'Minimum 50% or prescribed marks in previous qualifying exam' },
      { criterion: 'Family Income', detail: 'Annual family income under ₹2.5 Lakhs' }
    ],
    benefit_details: 'Direct DBT payment covering tuition fees, maintenance allowance, and book grants directly into bank accounts.',
    required_documents: ['Aadhaar Card', 'Student ID & Enrollment Certificate', 'Previous Marksheets', 'Family Income Certificate', 'Bank Passbook'],
    application_procedure: 'Register and apply online via scholarships.gov.in using Aadhaar e-KYC.',
    official_source_url: 'https://scholarships.gov.in',
    last_verified_date: '2025-02-05',
    publication_status: 'published',
    created_at: new Date().toISOString(),
  }
];

export const INITIAL_VERIFIED_HELPLINES: Helpline[] = [
  {
    id: 'help-112',
    name: 'National Emergency Support System (ERSS)',
    number: '112',
    category: 'Emergency',
    state_or_national: 'National',
    official_source_url: 'https://112.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'Unified single emergency number for police, fire, medical ambulance, and disaster rescue throughout India.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-100',
    name: 'Police Control Room Helpline',
    number: '100',
    category: 'Police & Law Enforcement',
    state_or_national: 'National',
    official_source_url: 'https://mha.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'Immediate police assistance and crime reporting control room.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-101',
    name: 'Fire & Rescue Service',
    number: '101',
    category: 'Fire & Disaster',
    state_or_national: 'National',
    official_source_url: 'https://ndma.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'Emergency fire-fighting, hazardous spills, and building collapse rescue service.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-108',
    name: 'National Medical Ambulance Service',
    number: '108',
    category: 'Medical & Healthcare',
    state_or_national: 'National',
    official_source_url: 'https://nhm.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'Emergency medical care and rapid hospital transport across states.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-1930',
    name: 'National Cyber Crime Reporting Helpline',
    number: '1930',
    category: 'Cyber Crime & Financial Fraud',
    state_or_national: 'National',
    official_source_url: 'https://cybercrime.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'Immediate reporting of online financial fraud, UPI scams, and unauthorized card debits to freeze illicit money trails.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-1098',
    name: 'Childline (Child Welfare & Protection)',
    number: '1098',
    category: 'Child Welfare',
    state_or_national: 'National',
    official_source_url: 'https://wcd.nic.in',
    is_toll_free: true,
    is_24x7: true,
    description: '24x7 toll-free emergency phone service for children in need of protection and rescue.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-14567',
    name: 'Elderline (National Helpline for Senior Citizens)',
    number: '14567',
    category: 'Senior Citizens',
    state_or_national: 'National',
    official_source_url: 'https://socialjustice.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'Free assistance for senior citizens regarding legal issues, loneliness support, and elder abuse rescue.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-1077',
    name: 'Disaster Management Control Room (NDMA)',
    number: '1077',
    category: 'Disaster Management',
    state_or_national: 'National',
    official_source_url: 'https://ndma.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'State and district disaster control for cyclones, earthquakes, and flash floods.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-1906',
    name: 'LPG Gas Leak Emergency Helpline',
    number: '1906',
    category: 'Public Utility & Safety',
    state_or_national: 'National',
    official_source_url: 'https://petroleum.nic.in',
    is_toll_free: true,
    is_24x7: true,
    description: '24x7 emergency response for dangerous cooking gas pipeline and cylinder leaks.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-1915',
    name: 'National Consumer Helpline (NCH)',
    number: '1915',
    category: 'Consumer Grievance',
    state_or_national: 'National',
    official_source_url: 'https://consumerhelpline.gov.in',
    is_toll_free: true,
    is_24x7: false,
    description: 'Consumer dispute guidance and grievance filing against unfair trade practices.',
    verified_at: '2025-01-01',
  },
  {
    id: 'help-139',
    name: 'RailMadad (Railway Assistance & Grievance)',
    number: '139',
    category: 'Public Transport',
    state_or_national: 'National',
    official_source_url: 'https://railmadad.indianrailways.gov.in',
    is_toll_free: true,
    is_24x7: true,
    description: 'Integrated Indian Railways passenger support for medical aid, train cleanliness, and safety.',
    verified_at: '2025-01-01',
  }
];

// In-memory / localStorage cache for when running before Supabase keys are configured
const STORAGE_KEY_COMPLAINTS = 'sahayak_citizen_complaints';
const STORAGE_KEY_CONTACTS = 'sahayak_emergency_contacts';
const STORAGE_KEY_SAVED_SCHEMES = 'sahayak_saved_schemes';
const STORAGE_KEY_NOTIFICATIONS = 'sahayak_notifications';

// Helper to get local complaints
export const getLocalComplaints = (): Complaint[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading local complaints', e);
  }
  return [
    {
      id: 'demo-cmp-1',
      reference_id: 'SHK-2025-84920',
      user_id: 'current-user',
      title: 'Deep Potholes and Waterlogging near Main Market Road',
      category: 'Roads & Potholes',
      department: 'Municipal Corporation (Road Works Dept)',
      description: 'Multiple dangerous potholes measuring over 1.5 feet wide across the main road leading to the vegetable market, causing traffic jams and two-wheeler accidents after rainfall.',
      state: 'Maharashtra',
      district: 'Pune',
      locality: 'Kothrud, Paud Road',
      status: 'under_review',
      submitted_to_gov_status: false,
      official_portal_ref: 'PMC-GRV-2025-11029',
      admin_notes: 'Inspected by junior engineer; listed in priority ward road repair schedule.',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      history: [
        {
          id: 'hist-1',
          complaint_id: 'demo-cmp-1',
          previous_status: null,
          new_status: 'submitted',
          change_notes: 'Grievance submitted by citizen to Sahayak',
          created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
        },
        {
          id: 'hist-2',
          complaint_id: 'demo-cmp-1',
          previous_status: 'submitted',
          new_status: 'under_review',
          change_notes: 'Assigned to Ward Road Maintenance Engineer for physical spot verification',
          created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
        }
      ]
    },
    {
      id: 'demo-cmp-2',
      reference_id: 'SHK-2025-91044',
      user_id: 'current-user',
      title: 'Faulty Streetlights Resulting in Dark Sector Stretches',
      category: 'Electricity & Streetlights',
      department: 'Electricity Board / Municipal Electrical Dept',
      description: 'Seven streetlights along Sector 4 internal lane have been non-functional for over 10 days, posing severe safety risks to pedestrians at night.',
      state: 'Delhi',
      district: 'South West Delhi',
      locality: 'Dwarka Sector 4',
      status: 'in_progress',
      submitted_to_gov_status: false,
      admin_notes: 'Work order issued to field contractor for replacement of LED driver units.',
      created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      history: [
        {
          id: 'hist-3',
          complaint_id: 'demo-cmp-2',
          previous_status: null,
          new_status: 'submitted',
          change_notes: 'Grievance submitted by citizen to Sahayak',
          created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
        },
        {
          id: 'hist-4',
          complaint_id: 'demo-cmp-2',
          previous_status: 'submitted',
          new_status: 'in_progress',
          change_notes: 'Contractor dispatched with replacement LED modules',
          created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
        }
      ]
    }
  ];
};

export const saveLocalComplaint = (complaint: Complaint): void => {
  const current = getLocalComplaints();
  const existingIndex = current.findIndex(c => c.id === complaint.id);
  if (existingIndex >= 0) {
    current[existingIndex] = complaint;
  } else {
    current.unshift(complaint);
  }
  localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(current));
};

export const getLocalSavedSchemeIds = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_SCHEMES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return ['pmay-u-001', 'pmjay-002'];
};

export const toggleLocalSavedScheme = (schemeId: string): boolean => {
  const current = getLocalSavedSchemeIds();
  const exists = current.includes(schemeId);
  const updated = exists ? current.filter(id => id !== schemeId) : [...current, schemeId];
  localStorage.setItem(STORAGE_KEY_SAVED_SCHEMES, JSON.stringify(updated));
  return !exists;
};

export const getLocalEmergencyContacts = (): EmergencyContact[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTACTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'ec-1',
      user_id: 'current-user',
      name: 'Family Member (Ramesh)',
      relationship: 'Brother',
      phone_number: '+91 98765 43210',
      is_primary: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'ec-2',
      user_id: 'current-user',
      name: 'Priya Sharma',
      relationship: 'Neighbor / Colleague',
      phone_number: '+91 98220 12345',
      is_primary: false,
      created_at: new Date().toISOString(),
    }
  ];
};

export const saveLocalEmergencyContact = (contact: Omit<EmergencyContact, 'id' | 'created_at'>): EmergencyContact => {
  const current = getLocalEmergencyContacts();
  const newContact: EmergencyContact = {
    ...contact,
    id: `ec-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  current.push(newContact);
  localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(current));
  return newContact;
};

export const deleteLocalEmergencyContact = (id: string): void => {
  const current = getLocalEmergencyContacts().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(current));
};

export const getLocalNotifications = (): NotificationItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'notif-1',
      user_id: 'current-user',
      title: 'Complaint Status: Under Review',
      message: 'Your complaint regarding Potholes near Main Market Road (SHK-2025-84920) has been assigned to Pune Municipal Corporation engineers.',
      type: 'complaint_update',
      read: false,
      metadata: { complaintId: 'demo-cmp-1' },
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      id: 'notif-2',
      user_id: 'current-user',
      title: 'New Welfare Scheme Available',
      message: 'PM Surya Ghar: Muft Bijli Yojana is now accepting subsidy applications in your district with up to ₹78,000 capital subsidy.',
      type: 'scheme_alert',
      read: true,
      metadata: { schemeSlug: 'pm-surya-ghar-muft-bijli' },
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'notif-3',
      user_id: 'current-user',
      title: 'Sahayak Civic Intelligence System Active',
      message: 'Welcome to Sahayak AI. Discover verified government schemes and lodge civil complaints with official department tracking.',
      type: 'system',
      read: true,
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    }
  ];
};
