import { test, expect } from '@playwright/test';

test.describe('Checklist offline persistence', () => {
  test('toggles persist across page navigation', async ({ page }) => {
    // Visit checklist page
    await page.goto('/checklist');

    // Ensure localStorage is clear for test
    await page.evaluate(() => localStorage.removeItem('mc_checklist_offline_v1'));

    // Get the first checkbox
    const checkboxSelector = 'input[type=checkbox]';
    const checkbox = page.locator(checkboxSelector).first();
    await checkbox.waitFor({ state: 'visible' });
    
    // Toggle first checkbox
    await checkbox.click();
    const checkedState = await checkbox.isChecked();
    expect(checkedState).toBe(true);

    // Verify localStorage saved the state
    const storage = await page.evaluate(() => localStorage.getItem('mc_checklist_offline_v1'));
    expect(storage).not.toBeNull();

    // Navigate to another page
    await page.goto('/parcours');
    
    // Go back to checklist and confirm state persisted
    await page.goto('/checklist');
    const checkbox2 = page.locator(checkboxSelector).first();
    await checkbox2.waitFor({ state: 'visible' });
    const finalState = await checkbox2.isChecked();
    expect(finalState).toBe(true);
  });

  test('localStorage survives page reload', async ({ page }) => {
    // Visit checklist page
    await page.goto('/checklist');

    // Ensure localStorage is clear for test
    await page.evaluate(() => localStorage.removeItem('mc_checklist_offline_v1'));

    // Toggle first checkbox
    const checkboxSelector = 'input[type=checkbox]';
    const checkbox = page.locator(checkboxSelector).first();
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.click();
    expect(await checkbox.isChecked()).toBe(true);

    // Reload page
    await page.reload();
    
    // Verify state persisted after reload
    const checkbox2 = page.locator(checkboxSelector).first();
    await checkbox2.waitFor({ state: 'visible' });
    expect(await checkbox2.isChecked()).toBe(true);
  });
});
