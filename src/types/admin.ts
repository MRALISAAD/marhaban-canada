import type { Locale } from '@/i18n/locales';

export type BookingStatus =
  | 'new'
  | 'to_contact'
  | 'slot_proposed'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'archived';

export type CaseStatus =
  | 'new'
  | 'active'
  | 'waiting_client'
  | 'next_step'
  | 'completed'
  | 'archived';

export type RiskLevel =
  | 'unreviewed'
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export type ResourceStatus =
  | 'draft'
  | 'review'
  | 'published'
  | 'archived';

export type Booking = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  cityProvince: string;
  service: 'discovery' | 'orientation' | 'anti_scam';
  serviceLabel: string;
  duration: string;
  price: string;
  status: BookingStatus;
  clientStatus: 'student' | 'worker' | 'newcomer' | 'other';
  preferredLanguage: Locale;
  message: string;
  nextAction?: string;
};

export type CaseFile = {
  id: string;
  clientName: string;
  email: string;
  cityProvince: string;
  status: CaseStatus;
  preferredLanguage: Locale;
  openedAt: string;
  lastContactAt?: string;
  nextStep: string;
  actionPlan: readonly string[];
  internalNotes: readonly string[];
  bookingId?: string;
};

export type ScamCheck = {
  id: string;
  createdAt: string;
  requesterName: string;
  email: string;
  situation: string;
  amountRequested?: string;
  urgency: 'low' | 'normal' | 'high';
  riskLevel: RiskLevel;
  status: 'new' | 'reviewing' | 'responded' | 'closed' | 'archived';
  notes: readonly string[];
};

export type ResourceGuide = {
  id: string;
  title: string;
  slug?: string;
  category: 'housing' | 'banking' | 'phone' | 'documents' | 'first_week' | 'students' | 'anti_scam';
  locale: Locale;
  status: ResourceStatus;
  content?: string;
  createdAt?: string;
  updatedAt: string;
  publishedAt?: string;
  summary: string;
  owner: string;
};

export type AdminNoteTargetType = 'booking' | 'case_file' | 'scam_check' | 'resource';

export type AdminNote = {
  id: string;
  createdAt: string;
  updatedAt: string;
  targetType: AdminNoteTargetType;
  targetId: string;
  body: string;
  status: 'active' | 'archived';
};
