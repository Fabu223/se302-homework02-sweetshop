export class HomePage {
  constructor(page) {
    this.page = page;

    this.navbarBrand = page.locator('.navbar-brand');
    this.navLinks = page.locator('.navbar-nav a');
    this.productCards = page.locator('.card');
    this.visibleButtons = page.locator('button:visible');
    this.body = page.locator('body');
  }

  async visit() {
    await this.page.goto('https://sweetshop.netlify.app/');
  }

  async reload() {
    await this.page.reload();
  }

  async clickNavbarBrand() {
    await this.navbarBrand.click();
  }

  async clickFirstNavLink() {
    await this.navLinks.first().click();
  }
}
