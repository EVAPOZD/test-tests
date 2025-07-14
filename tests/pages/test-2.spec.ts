import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/Test2';

test.describe('Тесты главной страницы', () => {
  test('Проверка отображения элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElements();
  });
  test('Проверка названия элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });
  test('Проверка атрибутов href элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsHref();
  });
  test('Проверка переключения light мода', async ({ mainPage }) => {
    await test.step('Нажатие на иконку light мода', async () => {
      await mainPage.clickSwitchLightmodeIcon();
    });
    await test.step('Проверка смены значения аттрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });
  test(`Проверка стилей со светлой темой`, async ({ mainPage }) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриншот светлой темы', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });
  test(`Проверка стилей с темной темой`, async ({ mainPage }) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншот темной темы', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
