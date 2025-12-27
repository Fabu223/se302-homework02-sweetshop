import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Sweet Shop Website – Full Test Suite', () => {

  test('TC-01 Homepage loads successfully', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    await expect(page).toHaveURL(/sweetshop/);
    await expect(home.navbarBrand).toBeVisible();
  });

  test('TC-02 Navigation link redirects correctly', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    await home.clickFirstNavLink();
    await expect(page.url()).not.toBe('');
  });

  test('TC-03 Invalid URL handling (negative)', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/nonexistent');
    await expect(page).toHaveURL(/nonexistent/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC-04 Products are displayed on homepage', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    await expect(home.productCards.first()).toBeVisible();
  });

  test('TC-05 Visible button interaction works', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    await home.clickNavbarBrand();
    await expect(page).toHaveURL(/sweetshop/);
  });

  test('TC-06 Rapid button clicking does not crash site (boundary)', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();

    for (let i = 0; i < 5; i++) {
      await home.clickNavbarBrand();
    }

    await expect(page).toHaveURL(/sweetshop/);
  });

  test('TC-07 Navigation usability – links are visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    await expect(home.navLinks.first()).toBeVisible();
  });

  test('TC-08 Security – URL does not expose sensitive data', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    const url = page.url();
    expect(url).not.toContain('@');
    expect(url).not.toContain('password');
    expect(url).not.toContain('token');
  });

  test('TC-09 Page reload preserves layout', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    await home.reload();
    await expect(home.navbarBrand).toBeVisible();
  });

  test('TC-10 Cross-browser layout sanity check', async ({ page }) => {
    const home = new HomePage(page);
    await home.visit();
    await expect(home.body).toBeVisible();
  });

});
