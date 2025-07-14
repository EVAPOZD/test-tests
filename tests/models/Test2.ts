import test, { Page, Locator, expect } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text: string;
  attribute: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs logo link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'Api link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js link',
        text: 'Node.js',
        attribute: {
          type: '',
          value: '',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
        name: 'Community link',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable end-to-end testing for modern web apps.',
        attribute: {
          type: '',
          value: '',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElements() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHref() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        test.step(`Проверка атрибутов href элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }
  async clickSwitchLightmodeIcon() {
    await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
  }
  async checkDataThemeAttributeValue() {
    expect(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
  }
  async setLightMode() {
    await this.page.evaluate((value) => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }
  async setDarkMode() {
    await this.page.evaluate((value) => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }
  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot(`pagewithlightMode.png`);
  }
  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`pagewithdarkMode.png`);
  }
}
