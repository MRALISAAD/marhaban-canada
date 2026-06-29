import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { isLocale, type Locale } from '@/i18n/locales';

// ─── Allowed field set ────────────────────────────────────────────────────────

const ALLOWED_KEYS = new Set([
  'locale',
  'first_name',
  'last_name',
  'email',
  'phone',
  'location_status',
  'general_status',
  'needs',
  'situation',
  'main_question',
  'urgency',
  'availability',
  'preferred_contact_method',
  'consent',
  'privacy_notice_accepted',
  'marketing_consent',
  'source',
  '_hp', // honeypot
]);

// ─── Sensitive key fragments — reject if found as field names ─────────────────

const SENSITIVE_KEY_FRAGMENTS = [
  'supabase_service_role_key',
  'service_role_key',
  'password',
  'token',
  'access_token',
  'refresh_token',
  'sin',
  'nas',
  'social_insurance',
  'passport',
  'passeport',
  'credit_card',
  'carte_bancaire',
  'bank_account',
  'upload',
  'webhook',
  'signing_key',
];

// ─── Allowed enum values ───────────────────────────────────────────────────────

const ALLOWED_LOCATION_STATUSES = new Set([
  'already_canada',
  'preparing_arrival',
  'just_arrived',
  'prefer_not_say',
]);

const ALLOWED_GENERAL_STATUSES = new Set([
  '',
  'studies',
  'work',
  'family',
  'settlement',
  'prefer_not_say',
  'other',
]);

const ALLOWED_NEEDS = new Set([
  'housing',
  'documents',
  'banking_money',
  'transport',
  'studies',
  'work',
  'health',
  'scam_or_doubt',
  'dont_know',
  'other',
]);

const ALLOWED_URGENCIES = new Set(['', 'no', 'this_week', 'today_tomorrow']);

const ALLOWED_CONTACT_METHODS = new Set([
  'whatsapp',
  'calendly',
  'phone',
  'no_preference',
  // kept for backward compat with existing rows
  'google_meet',
  'any',
]);

// ─── Types ────────────────────────────────────────────────────────────────────

// Schema is v1-compatible: status='new', no v2-only columns.
// Apply docs/supabase-migration-v2-booking-forms.sql to unlock v2 fields
// (marketing_consent, privacy_notice_accepted, ip_hash, user_agent, retention_until, calendly_enabled).
type PreparationInsert = {
  locale: Locale;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location_status: string;
  general_status?: string;
  needs: string[];
  situation: string;
  main_question?: string;
  urgency?: string;
  availability: string;
  preferred_contact_method: string;
  consent: true;
  source: 'booking_form';
  status: 'new';
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function jsonError(status: number) {
  return NextResponse.json({ ok: false, error: 'Invalid request' }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function textField(input: Record<string, unknown>, key: string): string {
  const value = input[key];
  return typeof value === 'string' ? value.trim() : '';
}

function stringArrayField(input: Record<string, unknown>, key: string): string[] {
  const value = input[key];
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

function hasSensitiveOrUnexpectedKeys(input: Record<string, unknown>): boolean {
  return Object.keys(input).some((key) => {
    const normalized = key.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    return (
      SENSITIVE_KEY_FRAGMENTS.some((fragment) => normalized.includes(fragment)) ||
      !ALLOWED_KEYS.has(key)
    );
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400);
  }

  if (!isRecord(body)) {
    return jsonError(400);
  }

  // ── Honeypot check ──────────────────────────────────────────────────────────
  // Real users never see or fill the _hp field. If it is non-empty, silently drop.
  const honeypot = textField(body, '_hp');
  if (honeypot) {
    // Return fake success so bots cannot distinguish from real submissions
    return NextResponse.json({ ok: true });
  }

  // ── Field allow-list ────────────────────────────────────────────────────────
  if (hasSensitiveOrUnexpectedKeys(body)) {
    return jsonError(400);
  }

  // ── Extract fields ──────────────────────────────────────────────────────────
  const locale = textField(body, 'locale');
  const firstName = textField(body, 'first_name');
  const lastName = textField(body, 'last_name');
  const email = textField(body, 'email');
  const locationStatus = textField(body, 'location_status');
  const generalStatus = textField(body, 'general_status');
  const needs = stringArrayField(body, 'needs');
  const situation = textField(body, 'situation');
  const mainQuestion = textField(body, 'main_question');
  const urgency = textField(body, 'urgency');
  const availability = textField(body, 'availability');
  const preferredContactMethod = textField(body, 'preferred_contact_method');

  // ── Required field validation ───────────────────────────────────────────────
  if (!isLocale(locale)) {
    return jsonError(400);
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !locationStatus ||
    needs.length === 0 ||
    !situation ||
    !availability ||
    !preferredContactMethod
  ) {
    return jsonError(400);
  }

  // ── Length validation ───────────────────────────────────────────────────────
  if (firstName.length > 120) return jsonError(400);
  if (lastName.length > 120) return jsonError(400);
  if (email.length > 254) return jsonError(400);
  if (textField(body, 'phone').length > 30) return jsonError(400);
  if (situation.length > 2000) return jsonError(400);
  if (mainQuestion.length > 1000) return jsonError(400);
  if (availability.length > 1000) return jsonError(400);

  // ── Format validation ───────────────────────────────────────────────────────
  if (!isValidEmail(email)) {
    return jsonError(400);
  }

  // ── Allowed-value validation ────────────────────────────────────────────────
  if (!ALLOWED_LOCATION_STATUSES.has(locationStatus)) {
    return jsonError(400);
  }
  if (!ALLOWED_GENERAL_STATUSES.has(generalStatus)) {
    return jsonError(400);
  }
  if (needs.some((need) => !ALLOWED_NEEDS.has(need))) {
    return jsonError(400);
  }
  if (urgency && !ALLOWED_URGENCIES.has(urgency)) {
    return jsonError(400);
  }
  if (!ALLOWED_CONTACT_METHODS.has(preferredContactMethod)) {
    return jsonError(400);
  }

  // ── Consent ─────────────────────────────────────────────────────────────────
  if (body.consent !== true) {
    return jsonError(400);
  }
  if (body.privacy_notice_accepted !== true) {
    return jsonError(400);
  }

  // ── Storage availability ────────────────────────────────────────────────────
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json({ ok: false, error: 'Service temporarily unavailable' }, { status: 503 });
  }

  const insert: PreparationInsert = {
    locale,
    first_name: firstName,
    last_name: lastName,
    email,
    phone: textField(body, 'phone') || undefined,
    location_status: locationStatus,
    general_status: generalStatus || undefined,
    needs,
    situation,
    main_question: mainQuestion || undefined,
    urgency: urgency || undefined,
    availability,
    preferred_contact_method: preferredContactMethod,
    consent: true,
    source: 'booking_form',
    status: 'new',
  };

  try {
    const supabase = createServerClient();

    // ── Basic rate limit: max 3 submissions from same email in 15 min ──────────
    // TODO: replace with a proper rate limiting middleware (e.g. Upstash) in production
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: recentCount } = await supabase
      .from('booking_preparation_forms')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', since);

    if ((recentCount ?? 0) >= 3) {
      return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // ── Insert ──────────────────────────────────────────────────────────────────
    const { data, error } = await supabase
      .from('booking_preparation_forms')
      .insert(insert)
      .select('id')
      .single();

    if (error) {
      // Log safe technical detail server-side only, never expose to client
      console.error('[booking-preparation-forms] insert failed:', error.code, error.message);
      return NextResponse.json({ ok: false, error: 'Submission failed. Please try again.' }, { status: 500 });
    }

    const submissionId: string = data.id;

    return NextResponse.json({ ok: true, id: submissionId });
  } catch {
    console.error('[booking-preparation-forms] unexpected error');
    return NextResponse.json({ ok: false, error: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
