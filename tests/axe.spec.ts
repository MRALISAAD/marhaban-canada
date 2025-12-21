import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('axe accessibility scan for checklist page', async ({ page }) => {
  await page.goto('/checklist');
  const accessibilityScan = await new AxeBuilder({ page }).analyze();
  // Fail test if any critical or serious violations
  const violations = accessibilityScan.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
  expect(violations.length, `Accessibility violations: ${violations.map(v => v.id).join(', ')}`).toBe(0);
});
