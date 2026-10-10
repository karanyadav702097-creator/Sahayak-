// SAHAYAK AI - Core Types

export type UserRole = 'citizen' | 'admin' | 'supervisor';

export type LanguageCode = 'en' | 'hi' | 'mr' | 'bn' | 'ta' | 'te' | 'gu' | 'pa';

export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  phone_number?: string | null;
  preferred_language: LanguageCode;
  state?: string | null;
  district?: string | null;
  locality?: string | null;
  role: UserRole;
  notification_preferences: {
    email: boolean;
    sms: boolean;
    in_app: boolean;
    scheme_updates: boolean;
  };
  created_at: string;
  updated_at: string;
}

export type SchemeCategory = 
  | 'Housing & Urban Development'
  | 'Healthcare'
  | 'Agriculture & Farmers'
  | 'Energy & Renewable Power'
  | 'Financial Inclusion & Livelihood'
  | 'Social Security & Pensions'
  | 'Education & Youth'
  | 'Civic & Infrastructure';

export interface SchemeEligibilityCriterion {
  criterion: string;
  detail: string;
}

export interface Scheme {
  id: string;
  name: string;
  slug: string;
  category: SchemeCategory | string;
  description: string;
  eligible_audience: string;
  state_or_national: string;
  eligibility_requirements: SchemeEligibilityCriterion[];
  benefit_details: string;
  required_documents: string[];
  application_procedure: string;
  official_source_url: string;
  last_verified_date: string;
  publication_status: 'published' | 'draft' | 'archived';
  created_at: string;
}

export type ComplaintStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'in_progress'
  | 'resolved'
  | 'rejected'
  | 'closed';

export type ComplaintCategory =
  | 'Roads & Potholes'
  | 'Water Supply & Quality'
  | 'Electricity & Streetlights'
  | 'Sanitation & Solid Waste'
  | 'Drainage & Sewage'
  | 'Public Transport & Bus Stops'
  | 'Parks & Public Infrastructure'
  | 'Encroachment & Noise'
  | 'Other Civic Issues';

export interface ComplaintAttachment {
  id: string;
  complaint_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

export interface ComplaintStatusHistory {
  id: string;
  complaint_id: string;
  previous_status: ComplaintStatus | null;
  new_status: ComplaintStatus;
  change_notes?: string | null;
  changed_by?: string | null;
  changed_by_name?: string;
  created_at: string;
}

export interface Complaint {
  id: string;
  reference_id: string; // e.g. SHK-2025-XXXXX
  user_id: string;
  title: string;
  category: ComplaintCategory | string;
  department: string;
  description: string;
  state: string;
  district: string;
  locality?: string | null;
  gps_latitude?: number | null;
  gps_longitude?: number | null;
  status: ComplaintStatus;
  submitted_to_gov_status: boolean;
  official_portal_ref?: string | null;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
  attachments?: ComplaintAttachment[];
  history?: ComplaintStatusHistory[];
}

export interface Helpline {
  id: string;
  name: string;
  number: string;
  category: string;
  state_or_national: string;
  official_source_url?: string;
  is_toll_free: boolean;
  is_24x7: boolean;
  description: string;
  verified_at: string;
}

export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  phone_number: string;
  is_primary: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id?: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  citations?: Array<{ title: string; url: string }>;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'complaint_update' | 'scheme_alert' | 'system';
  read: boolean;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  admin_name?: string;
  action: string;
  target_type: string;
  target_id: string;
  details?: Record<string, any>;
  created_at: string;
}
