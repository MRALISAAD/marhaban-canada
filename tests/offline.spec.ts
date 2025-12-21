import { test, expect } from '@playwright/test';

test.describe('Checklist offline persistence', () => {
  test('toggles persist across offline navigation', async ({ page, context }) => {
    // Visit checklist page
    await page.goto('/checklist');

    // Ensure localStorage is clear for test
    await page.evaluate(() => localStorage.removeItem('mc_checklist_offline_v1'));

    // Toggle first checkbox
    const checkbox = await page.locator('input[type=checkbox]').first();
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.click();
    const checkedState = await checkbox.isChecked();
    expect(checkedState).toBe(true);

    // Verify localStorage saved
    const storage = await page.evaluate(() => localStorage.getItem('mc_checklist_offline_v1'));
    expect(storage).not.toBeNull();

    // Simulate offline and navigate to another page
    await context.setOffline(true);
    await page.goto('/parcours');
    // Back online
    await context.setOffline(false);

    // Go back to checklist and confirm state persisted
    await page.goto('/checklist');
    const checkbox2 = await page.locator('input[type=checkbox]').first();
    await checkbox2.waitFor({ state: 'visible' });
    expect(await checkbox2.isChecked()).toBe(true);
  });
});
