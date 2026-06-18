/**
 * Multilingual booking flow — FR / EN / AR
 *
 * All three locales share the same route template: /[locale]/reserver
 * The booking flow is: service card → ServiceBookingModal (2 steps) → POST /api/bookings
 *
 * Run against a local server: npm run dev
 * Execute: npx playwright test tests/booking-multilingual.spec.ts
 */

import { test, expect, type Page } from '@playwright/test';

// ── Locale fixtures ───────────────────────────────────────────────────────────

const ROUTES = {
  fr: '/fr/reserver',
  en: '/en/reserver',
  ar: '/ar/reserver',
} as const;

const PAGE_HEADINGS = {
  fr: "Réservez un appel d'orientation",
  en: 'Book an orientation call',
  ar: 'احجز مكالمة توجيه',
} as const;

const BOOKING_EYEBROWS = {
  fr: 'Choix du service',
  en: 'Service selection',
  ar: 'اختيار الخدمة',
} as const;

const MODAL_TITLES = {
  fr: 'Demander un créneau',
  en: 'Request a time slot',
  ar: 'طلب موعد',
} as const;

const NEXT_LABELS = {
  fr: 'Continuer',
  en: 'Continue',
  ar: 'متابعة',
} as const;

const SUBMIT_LABELS = {
  fr: 'Envoyer la demande',
  en: 'Send request',
  ar: 'إرسال الطلب',
} as const;

const SUCCESS_TEXTS = {
  fr: 'Demande envoyée',
  en: 'Request sent',
  ar: 'تم إرسال الطلب',
} as const;

const CONSENT_TEXTS = {
  fr: 'accompagnement général',
  en: 'general and informational support',
  ar: 'Marhaban Canada',
} as const;

// ── Shared helpers ────────────────────────────────────────────────────────────

type Locale = keyof typeof ROUTES;

/** Mock /api/bookings to avoid real Supabase calls during E2E tests. */
async function mockBookingApi(page: Page) {
  await page.route('/api/bookings', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, bookingId: 'test-booking-id-e2e' }),
      });
    } else {
      await route.continue();
    }
  });
}

/**
 * Fill step 1 of the booking modal (contact info) and advance to step 2.
 * Returns the intercepted request payload for assertions.
 */
async function fillStep1AndAdvance(page: Page, locale: Locale) {
  await page.fill('#booking-full-name', 'Test User');
  await page.fill('#booking-email', 'test@example.com');
  await page.fill('#booking-city-province', locale === 'ar' ? 'مونتريال' : 'Montréal, QC');
  await page.click(`button:has-text("${NEXT_LABELS[locale]}")`);
}

/**
 * Fill step 2 of the booking modal (situation + consent).
 */
async function fillStep2(page: Page) {
  await page.selectOption('#booking-status', 'newcomer');
  await page.selectOption('#booking-language', 'fr');
  await page.fill('#booking-message', 'Test booking message for automated QA.');
  await page.check('input[type="checkbox"][required]');
}

// ── Test suites ───────────────────────────────────────────────────────────────

for (const locale of ['fr', 'en', 'ar'] as const) {
  test.describe(`Booking page — ${locale.toUpperCase()}`, () => {
    test(`page loads and shows ${locale} heading`, async ({ page }) => {
      const response = await page.goto(ROUTES[locale]);

      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toContainText(PAGE_HEADINGS[locale]);
    });

    test(`${locale} page shows service selection section`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      await expect(page.locator(`text=${BOOKING_EYEBROWS[locale]}`).first()).toBeVisible();
    });

    test(`${locale} page shows 3 service cards`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      const serviceCards = page.locator('[aria-pressed]');
      await expect(serviceCards).toHaveCount(3);
    });

    test(`${locale} service card opens booking modal`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      const firstCard = page.locator('[aria-pressed]').first();
      await firstCard.click();
      await expect(page.locator('[role="dialog"]')).toBeVisible();
    });

    test(`${locale} modal shows localized title`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      await page.locator('[aria-pressed]').first().click();
      await expect(page.locator('#booking-modal-title')).toContainText(MODAL_TITLES[locale]);
    });

    test(`${locale} modal step 1 — required fields prevent advance`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      await page.locator('[aria-pressed]').first().click();
      const nextBtn = page.locator(`button:has-text("${NEXT_LABELS[locale]}")`);
      await expect(nextBtn).toBeDisabled();
    });

    test(`${locale} modal step 1 → step 2 navigation`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      await page.locator('[aria-pressed]').first().click();

      await page.fill('#booking-full-name', 'Test User');
      await page.fill('#booking-email', 'test@example.com');
      await page.fill('#booking-city-province', 'Montréal');

      const nextBtn = page.locator(`button:has-text("${NEXT_LABELS[locale]}")`);
      await expect(nextBtn).toBeEnabled();
      await nextBtn.click();

      // Step 2 is now active: submit button is present
      const submitBtn = page.locator(`button:has-text("${SUBMIT_LABELS[locale]}")`);
      await expect(submitBtn).toBeVisible();
    });

    test(`${locale} modal step 2 — consent required before submit`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      await page.locator('[aria-pressed]').first().click();
      await fillStep1AndAdvance(page, locale);

      await page.selectOption('#booking-status', 'newcomer');
      await page.selectOption('#booking-language', 'fr');
      await page.fill('#booking-message', 'Test message.');

      // Without consent, submit is disabled
      const submitBtn = page.locator(`button[type="submit"]:has-text("${SUBMIT_LABELS[locale]}")`);
      await expect(submitBtn).toBeDisabled();
    });

    test(`${locale} modal — consent text is present`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      await page.locator('[aria-pressed]').first().click();
      await fillStep1AndAdvance(page, locale);

      await expect(page.locator(`text=${CONSENT_TEXTS[locale]}`).first()).toBeVisible();
    });

    test(`${locale} full booking flow — shows success on submit`, async ({ page }) => {
      await mockBookingApi(page);
      await page.goto(ROUTES[locale]);

      await page.locator('[aria-pressed]').first().click();
      await fillStep1AndAdvance(page, locale);
      await fillStep2(page);

      await page.locator(`button[type="submit"]`).click();
      await expect(page.locator(`text=${SUCCESS_TEXTS[locale]}`)).toBeVisible({ timeout: 8000 });
    });

    test(`${locale} form submission — payload has correct preferred_language`, async ({ page }) => {
      const requestBodies: string[] = [];
      await page.route('/api/bookings', async (route) => {
        if (route.request().method() === 'POST') {
          requestBodies.push(route.request().postData() ?? '');
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ ok: true, bookingId: 'test-booking-id' }),
          });
        } else {
          await route.continue();
        }
      });

      await page.goto(ROUTES[locale]);
      await page.locator('[aria-pressed]').first().click();
      await fillStep1AndAdvance(page, locale);

      await page.selectOption('#booking-status', 'newcomer');
      // Select language matching the page locale
      await page.selectOption('#booking-language', locale);
      await page.fill('#booking-message', 'Test payload verification.');
      await page.check('input[type="checkbox"][required]');
      await page.locator('button[type="submit"]').click();

      await expect(page.locator(`text=${SUCCESS_TEXTS[locale]}`)).toBeVisible({ timeout: 8000 });
      expect(requestBodies.length).toBeGreaterThan(0);

      const payload: Record<string, unknown> = JSON.parse(requestBodies[0] ?? '{}');
      // Locale matches the selected language
      expect(payload['preferred_language']).toBe(locale);
      // Status is always 'new' from client
      expect(payload['status']).toBe('new');
      // Source is always 'reserver_modal' from client
      expect(payload['source']).toBe('reserver_modal');
      // Disclaimer accepted
      expect(payload['disclaimer_accepted']).toBe(true);
      // No sensitive fields in payload
      const sensitiveKeys = ['sin', 'nas', 'passport', 'passeport', 'card', 'credit_card', 'permit', 'permis', 'upload'];
      for (const key of sensitiveKeys) {
        expect(Object.keys(payload)).not.toContain(key);
      }
    });

    test(`${locale} modal closes on Escape key`, async ({ page }) => {
      await page.goto(ROUTES[locale]);
      await page.locator('[aria-pressed]').first().click();
      await expect(page.locator('[role="dialog"]')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('[role="dialog"]')).toBeHidden();
    });
  });
}

// ── Arabic RTL checks ─────────────────────────────────────────────────────────

test.describe('Arabic RTL layout', () => {
  test('html element has dir=rtl after hydration', async ({ page }) => {
    await page.goto(ROUTES.ar);
    // Wait for client-side HtmlAttributes useEffect to fire
    await page.waitForFunction(() => document.documentElement.getAttribute('dir') === 'rtl', { timeout: 5000 });
    const dir = await page.locator('html').getAttribute('dir');
    expect(dir).toBe('rtl');
  });

  test('body has rtl class after hydration', async ({ page }) => {
    await page.goto(ROUTES.ar);
    await page.waitForFunction(() => document.body.classList.contains('rtl'), { timeout: 5000 });
    await expect(page.locator('body')).toHaveClass(/rtl/);
  });

  test('Arabic page heading is readable (not broken/garbled)', async ({ page }) => {
    await page.goto(ROUTES.ar);
    await expect(page.locator('h1')).toContainText('احجز مكالمة');
  });

  test('Arabic modal form labels are visible', async ({ page }) => {
    await page.goto(ROUTES.ar);
    await page.locator('[aria-pressed]').first().click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    // Arabic labels from copy: fullName, email, cityProvince
    await expect(modal.locator('label[for="booking-full-name"]')).toContainText('الاسم الكامل');
    await expect(modal.locator('label[for="booking-email"]')).toContainText('البريد الإلكتروني');
    await expect(modal.locator('label[for="booking-city-province"]')).toContainText('المدينة');
  });

  test('Arabic full booking flow — success message in Arabic', async ({ page }) => {
    await mockBookingApi(page);
    await page.goto(ROUTES.ar);

    await page.locator('[aria-pressed]').first().click();
    await fillStep1AndAdvance(page, 'ar');
    await fillStep2(page);

    await page.locator('button[type="submit"]').click();
    await expect(page.locator(`text=${SUCCESS_TEXTS.ar}`)).toBeVisible({ timeout: 8000 });
  });
});

// ── Admin redirect (unauthenticated) ─────────────────────────────────────────

test.describe('Admin bookings visibility (unauthenticated)', () => {
  test('/admin/bookings redirects to /admin/login when not authenticated', async ({ page }) => {
    await page.goto('/admin/bookings');
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
