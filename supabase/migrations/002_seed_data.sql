-- SAHAYAK AI Migration: 002_seed_data.sql
-- Seed verified Indian Government Schemes and Official Public Helplines

-- 1. VERIFIED GOVERNMENT SCHEMES
insert into public.schemes (
  name, slug, category, description, eligible_audience, state_or_national,
  eligibility_requirements, benefit_details, required_documents,
  application_procedure, official_source_url, last_verified_date, publication_status
) values
(
  'Pradhan Mantri Awas Yojana - Urban (PMAY-U 2.0)',
  'pmay-urban',
  'Housing & Urban Development',
  'Provides central assistance to urban poor, EWS, and LIG families to construct or acquire pucca houses with basic civic amenities.',
  'Economically Weaker Section (EWS) and Low-Income Group (LIG) families without a pucca house.',
  'National',
  '[
    {"criterion": "Annual Household Income", "detail": "Up to ₹3,00,000 for EWS, ₹3,00,001 to ₹6,00,000 for LIG"},
    {"criterion": "Existing Property", "detail": "Applicant or family must not own a pucca house anywhere in India"},
    {"criterion": "Female Ownership", "detail": "House must be registered in the name of the female head or joint ownership"}
  ]'::jsonb,
  'Financial interest subsidy of up to ₹2.5 Lakhs or direct financial assistance for pucca house construction.',
  array['Aadhaar Card', 'Income Certificate', 'Bank Account Passbook', 'Proof of Land/Property Ownership (for BLC component)', 'Affidavit of no pucca house'],
  'Apply through the official PMAY portal or through local Common Service Centre (CSC) / Municipal Corporation office.',
  'https://pmaymis.gov.in',
  '2025-01-15',
  'published'
),
(
  'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
  'ayushman-bharat-pmjay',
  'Healthcare',
  'The worlds largest government-funded healthcare assurance scheme offering secondary and tertiary care hospitalisation coverage.',
  'Bottom 40% vulnerable and economically deprived population identified under SECC and expanded senior citizen criteria (70+).',
  'National',
  '[
    {"criterion": "SECC Identification", "detail": "Listed in Socio-Economic Caste Census (SECC 2011) database"},
    {"criterion": "Senior Citizens (70+)", "detail": "All senior citizens aged 70 years and above irrespective of income are eligible for separate ₹5 Lakh cover"}
  ]'::jsonb,
  'Cashless healthcare cover of up to ₹5,00,000 per family per year across empaneled public and private hospitals across India.',
  array['Aadhaar Card', 'Ration Card / PM-JAY Letter', 'Active Mobile Number', 'Age proof for 70+ seniors'],
  'Verify eligibility on mera.pmjay.gov.in or visit any empaneled hospital (AB-PMJAY Kiosk) / nearest CSC with Aadhaar.',
  'https://pmjay.gov.in',
  '2025-01-20',
  'published'
),
(
  'PM Kisan Samman Nidhi (PM-KISAN)',
  'pm-kisan-samman-nidhi',
  'Agriculture & Farmers',
  'Direct income support scheme for landholding farmer families across India to supplement their agricultural and domestic financial requirements.',
  'All landholding farmer families who own cultivable land (excluding institutional landholders and constitutional post holders).',
  'National',
  '[
    {"criterion": "Land Ownership", "detail": "Must possess cultivable land record registered in their name"},
    {"criterion": "e-KYC", "detail": "Mandatory Aadhaar-based e-KYC on the PM-Kisan portal"},
    {"criterion": "Exclusions", "detail": "Serving/retired government employees and income tax payees are excluded"}
  ]'::jsonb,
  '₹6,000 per annum paid directly into the farmers Aadhaar-seeded bank account in three equal instalments of ₹2,000 every 4 months.',
  array['Aadhaar Card', 'Land Ownership Records (Khata/Khasra/ROR)', 'Aadhaar-seeded Bank Account Passbook'],
  'Self-registration through pmkisan.gov.in Farmers Corner or via nearest Common Service Centre (CSC).',
  'https://pmkisan.gov.in',
  '2025-02-01',
  'published'
),
(
  'PM Surya Ghar: Muft Bijli Yojana',
  'pm-surya-ghar-muft-bijli',
  'Energy & Renewable Power',
  'National rooftop solar initiative providing capital subsidy to residential households to generate up to 300 units of free electricity per month.',
  'Indian households having a roof suitable for solar panel installation and an active residential electricity connection.',
  '[
    {"criterion": "Electricity Connection", "detail": "Must hold an active residential electricity consumer number"},
    {"criterion": "Roof Space", "detail": "Adequate shadow-free rooftop area"},
    {"criterion": "Discom Empanelment", "detail": "Installation through empaneled vendors using domestically manufactured solar cells"}
  ]'::jsonb,
  'Central financial assistance up to ₹30,000 for 1 kW, ₹60,000 for 2 kW, and up to ₹78,000 for systems of 3 kW or higher capacity.',
  array['Electricity Bill (latest)', 'Aadhaar Card', 'Rooftop Photo & Space Declaration', 'Bank Account Details'],
  'Register on the national portal pmsuryaghar.gov.in, select your local DISCOM, choose an empaneled vendor, and apply for net meter.',
  'https://pmsuryaghar.gov.in',
  '2025-02-10',
  'published'
),
(
  'PM Street Vendors AtmaNirbhar Nidhi (PM SVANidhi)',
  'pm-svanidhi',
  'Financial Inclusion & Livelihood',
  'Special micro-credit facility providing collateral-free working capital loans to urban street vendors impacted by disruptions.',
  'Urban street vendors, hawkers, thelewala, and rehriwalas in urban and peri-urban areas.',
  'National',
  '[
    {"criterion": "Occupation", "detail": "Must be engaged in vending in urban areas on or before the qualifying date"},
    {"criterion": "Vending Certificate", "detail": "Possess Certificate of Vending / ID card issued by Urban Local Body (ULB) or Letter of Recommendation"}
  ]'::jsonb,
  'Initial working capital loan up to ₹10,000; second tranche of ₹20,000; third tranche up to ₹50,000 on timely repayments with 7% interest subsidy.',
  array['Aadhaar Card', 'Vending ID Card or Letter of Recommendation (LoR)', 'Bank Account Passbook'],
  'Apply through pmsvanidhi.mohua.gov.in or directly at bank branches and Common Service Centres.',
  'https://pmsvanidhi.mohua.gov.in',
  '2025-01-25',
  'published'
),
(
  'Atal Pension Yojana (APY)',
  'atal-pension-yojana',
  'Social Security & Pensions',
  'Guaranteed pension scheme primarily targeted at unorganised sector workers, administered by PFRDA.',
  'All Indian citizens between 18 and 40 years of age with a savings bank or post office account.',
  '[
    {"criterion": "Age", "detail": "Between 18 and 40 years at entry"},
    {"criterion": "Bank Account", "detail": "Must possess an active savings account with auto-debit facility"},
    {"criterion": "Tax Status", "detail": "Income tax payers are not eligible to join"}
  ]'::jsonb,
  'Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 from the age of 60 years until lifetime.',
  array['Aadhaar Card', 'Savings Bank Account Number', 'Mobile Number'],
  'Apply at any bank branch or post office where you hold a savings account or through net banking portal.',
  'https://www.npscra.nsdl.co.in',
  '2025-01-18',
  'published'
),
(
  'National Scholarship Portal (NSP Central Sector Schemes)',
  'national-scholarship-portal',
  'Education & Youth',
  'Unified platform offering pre-matric, post-matric, and higher education scholarships from various central and state ministries.',
  'Students from SC, ST, OBC, minority communities, and economically weaker meritorious students.',
  'National',
  '[
    {"criterion": "Enrollment", "detail": "Enrolled in recognized schools, colleges, or universities in India"},
    {"criterion": "Academic Merit", "detail": "Minimum prescribed marks in previous qualifying examination"},
    {"criterion": "Family Income", "detail": "Within the category income ceiling (typically ₹1.5L - ₹2.5L per annum)"}
  ]'::jsonb,
  'Direct financial assistance covering tuition fees, maintenance allowance, and book grants directly deposited via DBT.',
  array['Aadhaar Card', 'Student ID & Enrollment Certificate', 'Previous Marksheets', 'Family Income Certificate', 'Category/Caste Certificate (if applicable)', 'Bank Passbook'],
  'Register and apply online via scholarships.gov.in using Aadhaar verification.',
  'https://scholarships.gov.in',
  '2025-02-05',
  'published'
)
on conflict (slug) do nothing;


-- 2. VERIFIED OFFICIAL PUBLIC HELPLINES (National & Critical Civic Numbers)
insert into public.helplines (
  name, number, category, state_or_national, official_source_url, is_toll_free, is_24x7, description, verified_at
) values
(
  'National Emergency Number (ERSS)',
  '112',
  'Emergency',
  'National',
  'https://112.gov.in',
  true,
  true,
  'Unified single emergency response support system for police, fire, medical, and disaster rescue across all Indian states.',
  '2025-01-01'
),
(
  'Police Emergency Helpline',
  '100',
  'Police & Law Enforcement',
  'National',
  'https://mha.gov.in',
  true,
  true,
  'Direct police control room emergency helpline for law and order, safety incidents, and immediate response.',
  '2025-01-01'
),
(
  'Fire & Rescue Service',
  '101',
  'Fire & Disaster',
  'National',
  'https://ndma.gov.in',
  true,
  true,
  'Emergency fire fighting, chemical hazards, and building collapse rescue response helpline.',
  '2025-01-01'
),
(
  'National Ambulance / Medical Emergency',
  '108',
  'Medical & Healthcare',
  'National',
  'https://nhm.gov.in',
  true,
  true,
  'Emergency ambulance service providing pre-hospital care and rapid hospital transport across most states.',
  '2025-01-01'
),
(
  'National Cyber Crime Reporting Helpline',
  '1930',
  'Cyber Crime & Financial Fraud',
  'National',
  'https://cybercrime.gov.in',
  true,
  true,
  'Dedicated national helpline to report cyber financial frauds, account hackings, phishing, and freeze defrauded funds immediately.',
  '2025-01-01'
),
(
  'Childline (Child in Distress)',
  '1098',
  'Child Welfare',
  'National',
  'https://wcd.nic.in',
  true,
  true,
  'National 24x7 toll-free emergency phone service for children in need of care and protection.',
  '2025-01-01'
),
(
  'Elderline (National Helpline for Senior Citizens)',
  '14567',
  'Senior Citizens',
  'National',
  'https://socialjustice.gov.in',
  true,
  true,
  'National helpline for senior citizens providing emotional support, legal guidance, and rescue assistance.',
  '2025-01-01'
),
(
  'Disaster Management Control Room (NDMA)',
  '1077',
  'Disaster & Flood/Cyclone',
  'National',
  'https://ndma.gov.in',
  true,
  true,
  'District and state emergency operations centre for natural disasters, cyclones, floods, and earthquakes.',
  '2025-01-01'
),
(
  'National Health Helpline (MoHFW)',
  '1075',
  'Public Health',
  'National',
  'https://mohfw.gov.in',
  true,
  true,
  'Toll-free national health inquiry and epidemic/disease surveillance guidance helpline.',
  '2025-01-01'
),
(
  'LPG Cylinder Emergency Leak Helpline',
  '1906',
  'Public Utility & Safety',
  'National',
  'https://petroleum.nic.in',
  true,
  true,
  'Nationwide 24x7 emergency helpline for reporting dangerous cooking gas (LPG) leaks and fire hazards.',
  '2025-01-01'
),
(
  'National Consumer Helpline (NCH)',
  '1915',
  'Consumer Affairs & Grievance',
  'National',
  'https://consumerhelpline.gov.in',
  true,
  false,
  'Department of Consumer Affairs guidance for consumer disputes, unfair trade practices, and grievance filing.',
  '2025-01-01'
),
(
  'Railway Passenger Helpline (RailMadad)',
  '139',
  'Public Transport',
  'National',
  'https://railmadad.indianrailways.gov.in',
  true,
  true,
  'Integrated Indian Railways helpline for medical assistance, security, and train service grievances.',
  '2025-01-01'
);
