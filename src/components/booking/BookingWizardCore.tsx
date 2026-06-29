"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { withLocale } from "@/lib/i18n-utils";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_FREE_CALL_URL ?? '';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  firstName: string;
  email: string;
  phone: string;
  locationStatus: string;
  needs: string[];
  situation: string;
  availability: string;
  preferredContactMethod: string;
  consent: boolean;
  privacyNoticeAccepted: boolean;
  marketingConsent: boolean;
  honeypot: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

type Props = {
  locale: Locale;
  onSuccess?: () => void;
  isAvailable?: boolean;
  unavailableMessage?: string;
};

// ─── Copy ─────────────────────────────────────────────────────────────────────

const COPY = {
  fr: {
    step: "Étape",
    of: "sur",
    totalSteps: "3",
    stepTitles: ["Tes informations", "Ta situation", "Ton appel"],
    next: "Continuer",
    back: "Retour",
    submit: "Envoyer ma demande",
    submitting: "Envoi…",
    success: "Merci, ta demande a été envoyée. On te contactera pour confirmer ton appel gratuit.",
    helperContact: "On utilise ces informations seulement pour te contacter au sujet de ton appel.",
    firstName: "Prénom",
    email: "Email",
    phone: "Téléphone / WhatsApp (optionnel)",
    locationStatus: "Tu es où dans ton parcours ?",
    locationOptions: [
      ["preparing_arrival", "Je prépare mon arrivée"],
      ["just_arrived", "Je viens d'arriver"],
      ["already_canada", "Je suis déjà au Canada"],
      ["prefer_not_say", "Je préfère ne pas préciser"],
    ] as [string, string][],
    needs: "Qu'est-ce que tu veux clarifier ?",
    needsMax: "3",
    needsCounter: (n: number) => `${n}/3 sélectionné${n === 1 ? "" : "s"}`,
    needsOptions: [
      ["housing", "Logement"],
      ["documents", "Documents"],
      ["banking_money", "Banque / argent"],
      ["transport", "Transport"],
      ["studies", "Études"],
      ["work", "Travail"],
      ["health", "Santé"],
      ["scam_or_doubt", "Arnaque / situation douteuse"],
      ["dont_know", "Je ne sais pas par où commencer"],
      ["other", "Autre"],
    ] as [string, string][],
    situation: "Explique ta situation en quelques phrases",
    situationHelper:
      "Reste général. Ne partage pas de NAS, numéro de passeport, numéro de permis, informations bancaires, mots de passe ou documents sensibles.",
    situationPlaceholder:
      "Exemple : Je viens d'arriver à Montréal et je ne sais pas quelles démarches faire en premier.",
    availability: "Tes disponibilités",
    availabilityPlaceholder: "Ex : lundi–vendredi après 18h, week-end matin.",
    preferredContact: "Comment veux-tu être contacté ?",
    contactOptions: [
      ["whatsapp", "WhatsApp"],
      ["calendly", "Calendly"],
      ["phone", "Téléphone"],
      ["no_preference", "Peu importe"],
    ] as [string, string][],
    whatsappWarning: "Pense à ajouter ton numéro WhatsApp à l'étape contact pour qu'on puisse te joindre.",
    calendlyTitle: "Choisis ton créneau",
    calendlyText: "Sélectionne un créneau qui te convient. On utilisera aussi les informations du formulaire pour préparer l'appel.",
    calendlyButton: "Choisir un créneau sur Calendly",
    calendlyNoLink: "Le lien Calendly sera disponible bientôt. Tu peux quand même envoyer ta demande et on te contactera.",
    consent:
      "Je comprends que Marhaban Canada offre un accompagnement général et informatif, et ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.",
    privacyNotice: "J'accepte que Marhaban Canada conserve ces données pour préparer mon appel gratuit.",
    marketingConsent:
      "J'accepte de recevoir des informations et ressources par email. Je peux me désinscrire à tout moment.",
    sensitiveWarning:
      "Ne partage pas de NAS, numéro de passeport, numéro de permis, informations bancaires, mots de passe ou documents sensibles.",
    errorTop: "Merci de corriger les erreurs ci-dessous.",
    errRequired: "Ce champ est obligatoire.",
    errEmail: "Adresse email invalide.",
    errNeeds: "Sélectionne au moins un sujet.",
    errConsent: "Tu dois accepter pour continuer.",
    errSubmit: "Une erreur est survenue. Merci de réessayer.",
    err400: "Certains champs sont invalides. Merci de vérifier le formulaire.",
    err429: "Trop de tentatives. Merci de réessayer dans quelques minutes.",
    unavailable: "Le formulaire est temporairement indisponible.",
  },
  en: {
    step: "Step",
    of: "of",
    totalSteps: "3",
    stepTitles: ["Your details", "Your situation", "Your call"],
    next: "Continue",
    back: "Back",
    submit: "Send my request",
    submitting: "Sending…",
    success: "Thank you, your request has been sent. We will contact you to confirm your free call.",
    helperContact: "We use this information only to contact you about your call.",
    firstName: "First name",
    email: "Email",
    phone: "Phone / WhatsApp (optional)",
    locationStatus: "Where are you in your journey?",
    locationOptions: [
      ["preparing_arrival", "I am preparing my arrival"],
      ["just_arrived", "I just arrived"],
      ["already_canada", "I am already in Canada"],
      ["prefer_not_say", "I prefer not to say"],
    ] as [string, string][],
    needs: "What do you want to clarify?",
    needsMax: "3",
    needsCounter: (n: number) => `${n}/3 selected`,
    needsOptions: [
      ["housing", "Housing"],
      ["documents", "Documents"],
      ["banking_money", "Banking / money"],
      ["transport", "Transport"],
      ["studies", "Studies"],
      ["work", "Work"],
      ["health", "Health"],
      ["scam_or_doubt", "Scam or doubtful situation"],
      ["dont_know", "I don't know where to start"],
      ["other", "Other"],
    ] as [string, string][],
    situation: "Explain your situation in a few sentences",
    situationHelper:
      "Keep it general. Do not share SIN, passport number, permit number, banking information, passwords, or sensitive documents.",
    situationPlaceholder: "Example: I just arrived in Montreal and I do not know which steps to do first.",
    availability: "Your availability",
    availabilityPlaceholder: "Example: Mon–Fri after 6pm, weekend mornings.",
    preferredContact: "How would you like to be contacted?",
    contactOptions: [
      ["whatsapp", "WhatsApp"],
      ["calendly", "Calendly"],
      ["phone", "Phone"],
      ["no_preference", "No preference"],
    ] as [string, string][],
    whatsappWarning: "Add your WhatsApp number in the contact step so we can reach you.",
    calendlyTitle: "Pick a time slot",
    calendlyText: "Choose a time that works for you. We will also use your form details to prepare the call.",
    calendlyButton: "Choose a slot on Calendly",
    calendlyNoLink: "The Calendly link will be available soon. You can still send your request and we will contact you.",
    consent:
      "I understand that Marhaban Canada provides general and informational guidance and does not replace a lawyer, a regulated immigration consultant, or a government agency.",
    privacyNotice: "I agree that Marhaban Canada stores this data to prepare my free call.",
    marketingConsent: "I agree to receive information and resources by email. I can unsubscribe at any time.",
    sensitiveWarning:
      "Do not share SIN, passport number, permit number, banking information, passwords, or sensitive documents.",
    errorTop: "Please fix the errors below.",
    errRequired: "This field is required.",
    errEmail: "Invalid email address.",
    errNeeds: "Select at least one topic.",
    errConsent: "You must agree to continue.",
    errSubmit: "An error occurred. Please try again.",
    err400: "Some fields are invalid. Please review the form.",
    err429: "Too many attempts. Please try again in a few minutes.",
    unavailable: "The form is temporarily unavailable.",
  },
  ar: {
    step: "الخطوة",
    of: "من",
    totalSteps: "3",
    stepTitles: ["بياناتك", "وضعك", "طلبك"],
    next: "متابعة",
    back: "رجوع",
    submit: "إرسال طلبي",
    submitting: "جارٍ الإرسال…",
    success: "شكراً، تم إرسال طلبك. سنتواصل معك لتأكيد مكالمتك المجانية.",
    helperContact: "نستخدم هذه المعلومات فقط للتواصل معك بخصوص المكالمة.",
    firstName: "الاسم الأول",
    email: "البريد الإلكتروني",
    phone: "الهاتف / واتساب (اختياري)",
    locationStatus: "أين أنت في رحلتك؟",
    locationOptions: [
      ["preparing_arrival", "أحضّر قدومي"],
      ["just_arrived", "وصلت للتو"],
      ["already_canada", "أنا بالفعل في كندا"],
      ["prefer_not_say", "أفضل عدم التحديد"],
    ] as [string, string][],
    needs: "ما الذي تريد توضيحه؟",
    needsMax: "3",
    needsCounter: (n: number) => `${n}/3 محدد${n === 1 ? "" : "ة"}`,
    needsOptions: [
      ["housing", "السكن"],
      ["documents", "الوثائق"],
      ["banking_money", "البنك / المال"],
      ["transport", "النقل"],
      ["studies", "الدراسة"],
      ["work", "العمل"],
      ["health", "الصحة"],
      ["scam_or_doubt", "احتيال أو وضع مشكوك فيه"],
      ["dont_know", "لا أعرف من أين أبدأ"],
      ["other", "أخرى"],
    ] as [string, string][],
    situation: "اشرح وضعك في بضع جمل",
    situationHelper:
      "ابق عاماً. لا تشارك رقم التأمين الاجتماعي أو رقم جواز السفر أو رقم التصريح أو المعلومات البنكية أو كلمات المرور.",
    situationPlaceholder: "مثال: وصلت للتو إلى مونتريال ولا أعرف ما الإجراءات الأولى.",
    availability: "أوقات توفرك",
    availabilityPlaceholder: "مثال: الاثنين–الجمعة بعد 18:00، صباح عطلة نهاية الأسبوع.",
    preferredContact: "كيف تفضل أن نتواصل معك؟",
    contactOptions: [
      ["whatsapp", "واتساب"],
      ["calendly", "Calendly"],
      ["phone", "هاتف"],
      ["no_preference", "لا فرق"],
    ] as [string, string][],
    whatsappWarning: "أضف رقم واتساب في خطوة التواصل حتى نتمكن من الوصول إليك.",
    calendlyTitle: "اختر موعدك",
    calendlyText: "اختر وقتاً يناسبك. سنستخدم أيضاً معلومات النموذج لتحضير المكالمة.",
    calendlyButton: "اختر موعداً على Calendly",
    calendlyNoLink: "رابط Calendly سيكون متاحاً قريباً. يمكنك إرسال طلبك وسنتواصل معك.",
    consent:
      "أفهم أن مرحبا كندا تقدم مرافقة عامة ومعلوماتية ولا تحل محل محامٍ أو مستشار هجرة معتمد أو جهة حكومية.",
    privacyNotice: "أوافق على أن تحتفظ مرحبا كندا بهذه البيانات لتحضير مكالمتي المجانية.",
    marketingConsent: "أوافق على تلقي معلومات وموارد عبر البريد الإلكتروني. يمكنني إلغاء الاشتراك في أي وقت.",
    sensitiveWarning:
      "لا تشارك رقم التأمين الاجتماعي أو رقم جواز السفر أو رقم التصريح أو المعلومات البنكية أو كلمات المرور.",
    errorTop: "يرجى تصحيح الأخطاء أدناه.",
    errRequired: "هذا الحقل مطلوب.",
    errEmail: "البريد الإلكتروني غير صالح.",
    errNeeds: "اختر موضوعاً واحداً على الأقل.",
    errConsent: "يجب الموافقة للمتابعة.",
    errSubmit: "حدث خطأ. يرجى المحاولة مجدداً.",
    err400: "بعض الحقول غير صالحة. يرجى مراجعة النموذج.",
    err429: "محاولات كثيرة جداً. يرجى إعادة المحاولة بعد بضع دقائق.",
    unavailable: "النموذج غير متاح مؤقتاً.",
  },
} as const;

// ─── Style constants ───────────────────────────────────────────────────────────

const INPUT =
  "w-full rounded-xl border border-marhaban-leaf/18 bg-white px-3.5 py-2.5 text-sm text-marhaban-ink placeholder:text-marhaban-muted/70 transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20";
const LABEL = "mb-1.5 block text-sm font-semibold text-marhaban-forestDark";
const ERR = "mt-1 text-xs font-semibold text-red-700";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MAX_NEEDS = 3;

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BookingWizardCore({ locale, onSuccess, isAvailable = true, unavailableMessage }: Props) {
  const router = useRouter();
  const t = COPY[locale];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    locationStatus: "",
    needs: [],
    situation: "",
    availability: "",
    preferredContactMethod: "",
    consent: false,
    privacyNoticeAccepted: false,
    marketingConsent: false,
    honeypot: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [topError, setTopError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    }
  }

  function toggleNeed(value: string) {
    setFormData((prev) => {
      if (prev.needs.includes(value)) {
        return { ...prev, needs: prev.needs.filter((n) => n !== value) };
      }
      if (prev.needs.length >= MAX_NEEDS) return prev; // cap at 3
      return { ...prev, needs: [...prev.needs, value] };
    });
    if (errors.needs) {
      setErrors((prev) => { const n = { ...prev }; delete n.needs; return n; });
    }
  }

  function validateCurrentStep() {
    const e: FieldErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) e.firstName = t.errRequired;
      if (!formData.email.trim()) e.email = t.errRequired;
      else if (!isValidEmail(formData.email.trim())) e.email = t.errEmail;
    }

    if (step === 2) {
      if (!formData.locationStatus) e.locationStatus = t.errRequired;
      if (formData.needs.length === 0) e.needs = t.errNeeds;
    }

    if (step === 3) {
      if (!formData.situation.trim()) e.situation = t.errRequired;
      if (!formData.availability.trim()) e.availability = t.errRequired;
      if (!formData.preferredContactMethod) e.preferredContactMethod = t.errRequired;
      if (!formData.consent) e.consent = t.errConsent;
      if (!formData.privacyNoticeAccepted) e.privacyNoticeAccepted = t.errConsent;
    }

    setErrors(e);
    setTopError(Object.keys(e).length ? t.errorTop : "");
    return Object.keys(e).length === 0;
  }

  function scrollToTop() {
    requestAnimationFrame(() =>
      document.getElementById("wizard-scroll-top")?.scrollIntoView({ block: "nearest", behavior: "smooth" }),
    );
  }

  function handleNext() {
    if (validateCurrentStep()) {
      setStep((s) => Math.min(s + 1, 3));
      scrollToTop();
    }
  }

  function handleBack() {
    setErrors({});
    setTopError("");
    setStep((s) => Math.max(s - 1, 1));
    scrollToTop();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 3 || !validateCurrentStep()) return;

    setSubmitting(true);
    setTopError("");

    try {
      const response = await fetch("/api/booking-preparation-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          first_name: formData.firstName.trim(),
          last_name: "Non précisé",
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          location_status: formData.locationStatus,
          needs: formData.needs,
          situation: formData.situation.trim(),
          availability: formData.availability.trim(),
          preferred_contact_method: formData.preferredContactMethod,
          consent: formData.consent,
          privacy_notice_accepted: formData.privacyNoticeAccepted,
          marketing_consent: formData.marketingConsent,
          _hp: formData.honeypot,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) setTopError(t.err400);
        else if (response.status === 429) setTopError(t.err429);
        else setTopError(t.errSubmit);
        return;
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
      else window.setTimeout(() => router.push(withLocale("/merci", locale)), 1400);
    } catch {
      setTopError(t.errSubmit);
    } finally {
      setSubmitting(false);
    }
  }

  // ── Unavailable ────────────────────────────────────────────────────────────
  if (!isAvailable) {
    return (
      <div className="p-6 text-center text-sm text-marhaban-muted">
        {unavailableMessage ?? t.unavailable}
      </div>
    );
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex min-h-[180px] items-center justify-center p-8 text-center">
        <p className="font-heading text-xl font-semibold leading-snug text-marhaban-forestDark">{t.success}</p>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col">
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setField("honeypot", e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="sr-only"
      />

      {/* ── Scrollable body ─────────────────────────────────────────────── */}
      <div id="wizard-scroll-top" className="flex-1 px-5 pb-2 pt-4 sm:px-6">

        {/* Progress bar */}
        <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-colors ${
                n <= step ? "bg-marhaban-gold" : "bg-marhaban-leaf/15"
              }`}
            />
          ))}
        </div>

        {/* Step label */}
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-marhaban-clay">
          {t.step} {step} {t.of} {t.totalSteps}
        </p>
        <h2 className="mt-0.5 font-heading text-lg font-semibold text-marhaban-forestDark">
          {t.stepTitles[step - 1]}
        </h2>

        {/* Top error */}
        {topError ? (
          <div role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700">
            {topError}
          </div>
        ) : null}

        {/* ── Step 1: Contact details ──────────────────────────────────── */}
        {step === 1 && (
          <div className="mt-4 grid gap-3.5">
            <p className="text-xs leading-relaxed text-marhaban-muted">{t.helperContact}</p>
            <Field id="firstName" label={t.firstName} required error={errors.firstName}>
              <input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                autoComplete="given-name"
                className={INPUT}
              />
            </Field>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field id="email" label={t.email} required error={errors.email}>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                  className={INPUT}
                />
              </Field>
              <Field id="phone" label={t.phone}>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  autoComplete="tel"
                  className={INPUT}
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── Step 2: Situation ───────────────────────────────────────── */}
        {step === 2 && (
          <div className="mt-4 grid gap-3.5">
            <Field id="locationStatus" label={t.locationStatus} required error={errors.locationStatus}>
              <select
                id="locationStatus"
                value={formData.locationStatus}
                onChange={(e) => setField("locationStatus", e.target.value)}
                className={`${INPUT} cursor-pointer`}
              >
                <option value="" disabled>—</option>
                {t.locationOptions.map(([val, lbl]) => (
                  <option key={val} value={val}>{lbl}</option>
                ))}
              </select>
            </Field>

            {/* Needs — compact chips, max 3 */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className={LABEL}>
                  {t.needs} <span className="text-red-600">*</span>
                </p>
                <span className={`text-xs font-semibold tabular-nums ${
                  formData.needs.length >= MAX_NEEDS ? "text-marhaban-gold" : "text-marhaban-muted"
                }`}>
                  {t.needsCounter(formData.needs.length)}
                </span>
              </div>
              {errors.needs ? <p className={`${ERR} mb-2`}>{errors.needs}</p> : null}
              <div className="flex flex-wrap gap-2">
                {t.needsOptions.map(([val, lbl]) => {
                  const selected = formData.needs.includes(val);
                  const capped = !selected && formData.needs.length >= MAX_NEEDS;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => toggleNeed(val)}
                      disabled={capped}
                      aria-pressed={selected}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        selected
                          ? "border-marhaban-gold bg-marhaban-gold/15 text-marhaban-forestDark"
                          : capped
                          ? "cursor-not-allowed border-marhaban-leaf/10 bg-white/50 text-marhaban-muted/50"
                          : "border-marhaban-leaf/18 bg-white text-marhaban-ink hover:border-marhaban-gold/50 hover:bg-marhaban-gold/8"
                      }`}
                    >
                      {lbl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Call details + consent ──────────────────────────── */}
        {step === 3 && (
          <div className="mt-4 grid gap-3.5">
            <Field id="situation" label={t.situation} helper={t.situationHelper} required error={errors.situation}>
              <textarea
                id="situation"
                rows={4}
                maxLength={1200}
                value={formData.situation}
                onChange={(e) => setField("situation", e.target.value)}
                placeholder={t.situationPlaceholder}
                className={`${INPUT} resize-none`}
              />
            </Field>

            <Field id="preferredContactMethod" label={t.preferredContact} required error={errors.preferredContactMethod}>
              <select
                id="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={(e) => setField("preferredContactMethod", e.target.value)}
                className={`${INPUT} cursor-pointer`}
              >
                <option value="" disabled>—</option>
                {t.contactOptions.map(([val, lbl]) => (
                  <option key={val} value={val}>{lbl}</option>
                ))}
              </select>
            </Field>

            {/* WhatsApp soft warning */}
            {formData.preferredContactMethod === "whatsapp" && !formData.phone.trim() && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
                {t.whatsappWarning}
              </p>
            )}

            {/* Calendly slot picker */}
            {formData.preferredContactMethod === "calendly" && (
              <div className="rounded-xl border border-blue-200/70 bg-blue-50/60 p-4">
                <p className="text-sm font-semibold text-marhaban-forestDark">{t.calendlyTitle}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-marhaban-muted">{t.calendlyText}</p>
                {CALENDLY_URL ? (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[40px] items-center justify-center rounded-full border border-blue-300/60 bg-white px-5 py-2 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
                  >
                    {t.calendlyButton}
                  </a>
                ) : (
                  <p className="mt-2 text-[11px] leading-relaxed text-marhaban-muted/80 italic">{t.calendlyNoLink}</p>
                )}
              </div>
            )}

            <Field id="availability" label={t.availability} required error={errors.availability}>
              <textarea
                id="availability"
                rows={3}
                maxLength={600}
                value={formData.availability}
                onChange={(e) => setField("availability", e.target.value)}
                placeholder={t.availabilityPlaceholder}
                className={`${INPUT} resize-none`}
              />
            </Field>

            {/* Sensitive warning — compact */}
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
              {t.sensitiveWarning}
            </p>

            {/* Consent checkboxes — compact */}
            <CompactCheckbox
              checked={formData.consent}
              onChange={(v) => setField("consent", v)}
              error={errors.consent}
              label={t.consent}
              required
            />
            <CompactCheckbox
              checked={formData.privacyNoticeAccepted}
              onChange={(v) => setField("privacyNoticeAccepted", v)}
              error={errors.privacyNoticeAccepted}
              label={t.privacyNotice}
              required
            />
            <CompactCheckbox
              checked={formData.marketingConsent}
              onChange={(v) => setField("marketingConsent", v)}
              label={t.marketingConsent}
            />
          </div>
        )}
      </div>

      {/* ── Sticky footer — always visible ──────────────────────────────── */}
      <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 border-t border-marhaban-leaf/10 bg-marhaban-cream/95 px-5 py-3 backdrop-blur sm:px-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-marhaban-leaf/20 bg-white px-5 py-2 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
          >
            {t.back}
          </button>
        ) : (
          <span />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-marhaban-forestDark px-7 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40"
          >
            {t.next}
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-marhaban-forestDark px-7 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t.submitting : t.submit}
          </button>
        )}
      </div>
    </form>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  id, label, helper, error, required, children,
}: {
  id: string; label: string; helper?: string; error?: string; required?: boolean; children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}{required ? <span className="ml-0.5 text-red-600">*</span> : null}
      </label>
      {helper ? <p className="mb-1.5 text-[11px] leading-relaxed text-marhaban-muted">{helper}</p> : null}
      {children}
      {error ? <p className={ERR}>{error}</p> : null}
    </div>
  );
}

function CompactCheckbox({
  checked, onChange, label, error, required,
}: {
  checked: boolean; onChange: (v: boolean) => void; label: string; error?: string; required?: boolean;
}) {
  return (
    <div>
      <label
        className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 transition ${
          error ? "border-red-300 bg-red-50/60" : "border-marhaban-leaf/14 bg-white/60 hover:border-marhaban-leaf/30"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-marhaban-leaf/30 text-marhaban-forestDark focus:ring-marhaban-gold/40"
        />
        <span className="text-[11px] leading-relaxed text-marhaban-ink/90">
          {label}{required ? <span className="ml-0.5 text-red-600">*</span> : null}
        </span>
      </label>
      {error ? <p className={ERR}>{error}</p> : null}
    </div>
  );
}
