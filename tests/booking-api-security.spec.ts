/**
 * /api/bookings — server-side security and validation tests
 *
 * These tests use Playwright's request API context (no browser).
 * Run against a local server: npm run dev
 * Execute: npx playwright test tests/booking-api-security.spec.ts
 */

import { test, expect } from '@playwright/test';

const ENDPOINT = '/api/bookings';

/** Minimal valid payload that should be accepted when Supabase is available. */
const validPayload = {
  full_name: 'Test User',
  email: 'test-qa@example.com',
  city_province: 'Montréal, QC',
  service: 'orientation',
  service_label: 'Appel orientation',
  duration: '30 min',
  price_label: '29 $',
  client_status: 'newcomer',
  preferred_language: 'fr',
  message: 'Automated QA test — ignore this booking.',
  disclaimer_accepted: true,
  status: 'new',
  source: 'reserver_modal',
};

// ── Missing required fields ───────────────────────────────────────────────────

test.describe('POST /api/bookings — required field validation', () => {
  test('rejects empty body', async ({ request }) => {
    const res = await request.post(ENDPOINT, { data: {} });
    expect(res.status()).toBe(400);
    const json: { ok: boolean; error: string } = await res.json();
    expect(json.ok).toBe(false);
  });

  test('rejects missing full_name', async ({ request }) => {
    const { full_name: _, ...rest } = validPayload;
    void _;
    const res = await request.post(ENDPOINT, { data: rest });
    expect(res.status()).toBe(400);
  });

  test('rejects missing email', async ({ request }) => {
    const { email: _, ...rest } = validPayload;
    void _;
    const res = await request.post(ENDPOINT, { data: rest });
    expect(res.status()).toBe(400);
  });

  test('rejects missing service', async ({ request }) => {
    const { service: _, ...rest } = validPayload;
    void _;
    const res = await request.post(ENDPOINT, { data: rest });
    expect(res.status()).toBe(400);
  });

  test('rejects missing preferred_language', async ({ request }) => {
    const { preferred_language: _, ...rest } = validPayload;
    void _;
    const res = await request.post(ENDPOINT, { data: rest });
    expect(res.status()).toBe(400);
  });

  test('rejects missing disclaimer_accepted', async ({ request }) => {
    const { disclaimer_accepted: _, ...rest } = validPayload;
    void _;
    const res = await request.post(ENDPOINT, { data: rest });
    expect(res.status()).toBe(400);
  });

  test('rejects disclaimer_accepted=false', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, disclaimer_accepted: false },
    });
    expect(res.status()).toBe(400);
    const json: { ok: boolean; error: string } = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toContain('Disclaimer');
  });
});

// ── Sensitive field rejection ─────────────────────────────────────────────────

test.describe('POST /api/bookings — sensitive field rejection', () => {
  const sensitivePayloads: Array<{ label: string; field: Record<string, unknown> }> = [
    { label: 'NAS/SIN field', field: { sin: '123-456-789' } },
    { label: 'NAS field', field: { nas: '123-456-789' } },
    { label: 'passport field', field: { passport: 'AB123456' } },
    { label: 'passeport field', field: { passeport: 'AB123456' } },
    { label: 'credit_card field', field: { credit_card: '4111111111111111' } },
    { label: 'permit field', field: { permit: 'WP12345' } },
    { label: 'permis field', field: { permis: 'RP98765' } },
    { label: 'document field', field: { document: 'data:image/png;base64,...' } },
    { label: 'upload field', field: { upload: 'data:image/png;base64,...' } },
    { label: 'bank_account field', field: { bank_account: '000123456' } },
  ];

  for (const { label, field } of sensitivePayloads) {
    test(`rejects ${label}`, async ({ request }) => {
      const res = await request.post(ENDPOINT, {
        data: { ...validPayload, ...field },
      });
      expect(res.status()).toBe(400);
      const json: { ok: boolean } = await res.json();
      expect(json.ok).toBe(false);
    });
  }
});

// ── Unexpected / extra field rejection ───────────────────────────────────────

test.describe('POST /api/bookings — unexpected field rejection', () => {
  test('rejects unknown fields', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, unknown_field: 'injected' },
    });
    expect(res.status()).toBe(400);
    const json: { ok: boolean } = await res.json();
    expect(json.ok).toBe(false);
  });

  test('rejects token field', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, token: 'abc123' },
    });
    expect(res.status()).toBe(400);
  });

  test('rejects service_role_key field', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, service_role_key: 'eyJ...' },
    });
    expect(res.status()).toBe(400);
  });
});

// ── preferred_language validation ─────────────────────────────────────────────

test.describe('POST /api/bookings — preferred_language validation', () => {
  test('rejects invalid preferred_language', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, preferred_language: 'es' },
    });
    expect(res.status()).toBe(400);
    const json: { ok: boolean; error: string } = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toContain('preferred_language');
  });

  test('accepts preferred_language=fr', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, preferred_language: 'fr' },
    });
    // Either 200 (Supabase available) or 500 (Supabase not configured) — never 400
    expect(res.status()).not.toBe(400);
  });

  test('accepts preferred_language=en', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, preferred_language: 'en' },
    });
    expect(res.status()).not.toBe(400);
  });

  test('accepts preferred_language=ar', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      data: { ...validPayload, preferred_language: 'ar' },
    });
    expect(res.status()).not.toBe(400);
  });
});

// ── Response does not leak secrets ────────────────────────────────────────────

test.describe('POST /api/bookings — response safety', () => {
  test('error response does not expose server secrets', async ({ request }) => {
    const res = await request.post(ENDPOINT, { data: {} });
    const text = await res.text();
    expect(text).not.toContain('SUPABASE_SERVICE_ROLE_KEY');
    expect(text).not.toContain('service_role');
    expect(text).not.toContain('eyJ'); // JWT prefix used by Supabase keys
  });

  test('error response has correct Content-Type', async ({ request }) => {
    const res = await request.post(ENDPOINT, { data: {} });
    expect(res.headers()['content-type']).toContain('application/json');
  });

  test('error response contains ok:false and error string', async ({ request }) => {
    const res = await request.post(ENDPOINT, { data: {} });
    const json: { ok: boolean; error: string } = await res.json();
    expect(json.ok).toBe(false);
    expect(typeof json.error).toBe('string');
    expect(json.error.length).toBeGreaterThan(0);
  });
});

// ── Invalid JSON body ─────────────────────────────────────────────────────────

test.describe('POST /api/bookings — malformed input', () => {
  test('rejects non-JSON body', async ({ request }) => {
    const res = await request.post(ENDPOINT, {
      headers: { 'Content-Type': 'application/json' },
      data: 'not json at all',
    });
    expect(res.status()).toBe(400);
  });

  test('rejects array body', async ({ request }) => {
    const res = await request.post(ENDPOINT, { data: [validPayload] });
    expect(res.status()).toBe(400);
  });
});
