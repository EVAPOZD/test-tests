import { test, expect, Page, Locator } from '@playwright/test';
import { text } from 'body-parser';
interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text: string;
  attribute: {
    type: string;
    value: string;
  };
}
const lightMode = ['light', 'dark'];
const elements = [
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
test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });
  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      test.step(`Проверка названия элемента ${name}`, async () => {
        await expect(locator(page)).toContainText(text);
      });
    });
  });
  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка атрибутов href элемента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });
  test('Проверка переключения light мода', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
  lightMode.forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pagewith${value}Mode.png`);
    });
  });
});
