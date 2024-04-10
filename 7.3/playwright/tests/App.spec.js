import { test, expect } from '@playwright/test';
import { userData } from '../user';

test('Successful authorization', async ({ page }) => {
  // Открываем форму авторизации
  await page.goto('https://netology.ru/?modal=sign_in');
  
  // Вводим email и пароль из констант
  await page.fill('input[name="email"]', userData.email);
  await page.fill('input[name="password"]', userData.password);
  
  // Нажимаем на кнопку "Войти"
  await page.click('[data-testid="login-submit-btn"]');

  //Ждем загрузки страницы профиля
  await page.waitForURL('https://netology.ru/profile/8832522', { timeout: 60000 });
  
 // Проверяем, что открылась страница открылась с заголовком "Моё обучение"
 const profilePageTitleElement = await page.locator('h2');
 const profilePageTitle = await profilePageTitleElement.innerText();
 expect(profilePageTitle).toContain('Моё обучение');

});

test('Unsuccessful authorization', async ({ page }) => {
  // Открываем  страницу авторизации
  await page.goto('https://netology.ru/?modal=sign_in');
  
  // Заполняем поле email
  await page.fill('input[name="email"]', 'test@gmail.com');
  
  // Заполняем поле password
  await page.fill('input[name="password"]', 'test');
  
  // Нажимаем кнопку "Войти"
  await page.click('[data-testid="login-submit-btn"]');
  
  // Ждем появления сообщения об ошибке
  await page.waitForSelector('[data-testid="login-error-hint"]');
  
  // Получаем текст сообщения об ошибке
  const errorMessage = await page.textContent('[data-testid="login-error-hint"]');
  
  // Проверяем, содержит ли сообщение определенный текст
  expect(errorMessage).toContain('Вы ввели неправильно логин или пароль');
});