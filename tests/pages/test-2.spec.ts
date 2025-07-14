import { test, expect, Page, Locator } from '@playwright/test';
import { text } from 'body-parser';
import { MainPage } from '../models/Test2';

let mainPage: MainPage;

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });
  test('Проверка отображения элементов навигации хедера', async () => {
    await mainPage.checkElements();
  });
  test('Проверка названия элементов навигации хедера', async () => {
    await mainPage.checkElementsText();
  });
  test('Проверка атрибутов href элементов навигации хедера', async () => {
    await mainPage.checkElementsHref();
  });
  test('Проверка переключения light мода', async () => {
    await test.step('Нажатие на иконку light мода', async () => {
      await mainPage.clickSwitchLightmodeIcon();
    });
    await test.step('Проверка смены значения аттрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });
  test(`Проверка стилей со светлой темой`, async () => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриншот светлой темы', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });
  test(`Проверка стилей с темной темой`, async () => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншот темной темы', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
