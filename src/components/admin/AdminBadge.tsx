import { cn } from '@/lib/cn';
import type { BookingStatus, CaseStatus, ResourceStatus, RiskLevel } from '@/types/admin';

type AdminBadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'dark';

type AdminBadgeProps = {
  label: string;
  tone?: AdminBadgeTone;
  className?: string;
};

const toneClass: Record<AdminBadgeTone, string> = {
  neutral: 'border-marhaban-leaf/15 bg-marhaban-cream text-marhaban-ink',
  info: 'border-marhaban-leaf/20 bg-marhaban-mint/70 text-marhaban-forestDark',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-marhaban-clay/20 bg-[#fff4e8] text-marhaban-clay',
  danger: 'border-red-200 bg-red-50 text-red-700',
  dark: 'border-marhaban-forestDark/15 bg-marhaban-forestDark text-white',
};

const bookingLabels: Record<BookingStatus, string> = {
  new: 'Nouvelle',
  to_contact: 'À contacter',
  slot_proposed: 'Créneau proposé',
  confirmed: 'Confirmée',
  completed: 'Terminée',
  cancelled: 'Annulée',
};

const bookingTones: Record<BookingStatus, AdminBadgeTone> = {
  new: 'info',
  to_contact: 'warning',
  slot_proposed: 'warning',
  confirmed: 'success',
  completed: 'neutral',
  cancelled: 'danger',
};

const caseLabels: Record<CaseStatus, string> = {
  new: 'Nouveau',
  active: 'Actif',
  waiting_client: 'Attente client',
  next_step: 'Prochaine étape',
  completed: 'Terminé',
  archived: 'Archivé',
};

const caseTones: Record<CaseStatus, AdminBadgeTone> = {
  new: 'info',
  active: 'success',
  waiting_client: 'warning',
  next_step: 'dark',
  completed: 'neutral',
  archived: 'neutral',
};

const riskLabels: Record<RiskLevel, string> = {
  unreviewed: 'Non évalué',
  low: 'Faible',
  medium: 'Moyen',
  high: 'Élevé',
  urgent: 'Urgent',
};

const riskTones: Record<RiskLevel, AdminBadgeTone> = {
  unreviewed: 'neutral',
  low: 'success',
  medium: 'warning',
  high: 'danger',
  urgent: 'danger',
};

const resourceLabels: Record<ResourceStatus, string> = {
  draft: 'Brouillon',
  review: 'En revue',
  published: 'Publié',
  archived: 'Archivé',
};

const resourceTones: Record<ResourceStatus, AdminBadgeTone> = {
  draft: 'neutral',
  review: 'warning',
  published: 'success',
  archived: 'neutral',
};

export function AdminBadge({ label, tone = 'neutral', className }: AdminBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]',
        toneClass[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <AdminBadge label={bookingLabels[status]} tone={bookingTones[status]} />;
}

export function CaseStatusBadge({ status }: { status: CaseStatus }) {
  return <AdminBadge label={caseLabels[status]} tone={caseTones[status]} />;
}

export function RiskLevelBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  return <AdminBadge label={riskLabels[riskLevel]} tone={riskTones[riskLevel]} />;
}

export function ResourceStatusBadge({ status }: { status: ResourceStatus }) {
  return <AdminBadge label={resourceLabels[status]} tone={resourceTones[status]} />;
}
