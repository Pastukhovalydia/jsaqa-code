const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

afterAll(async () => {
  await browser.close();
});

const startPageUrl = "https://github.com/team"; // Стартовая страница для первых трех тестов
const otherPages = [
  "https://github.com/features/actions",
  "https://github.com/pricing",
  "https://github.com/customer-stories"
];

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe("Github page tests", () => {
  test("The h1 header content on start page", async () => {
    await page.goto(startPageUrl);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toContain('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 15000); // Установка таймаута для теста в 15 секунд

  test("The first link attribute on start page", async () => {
    await page.goto(startPageUrl);
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 10000); // Установка таймаута для теста в 10 секунд

  test("The page contains Sign in button on start page", async () => {
    await page.goto(startPageUrl);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { timeout: 5000, visible: true });
    const actual = await page.$eval(btnSelector, link => link.textContent.trim());
    expect(actual).toContain("Get started with Team");
  }, 7000); // Установка таймаута для теста в 7 секунд
});

describe("Other pages tests", () => {
  otherPages.forEach((url, index) => {
    test(`The h1 header content on other page ${index + 1}`, async () => {
      await page.goto(url);
      await page.waitForSelector('h1');
      const title = await page.title();
    // Используем массив с ожидаемыми значениями и индексом страницы
      const expectedTitles = [
        "Actions · GitHub",
        "Pricing · Plans for every developer · GitHub",
        "Customer stories · GitHub"
      ];
      expect(title).toContain(expectedTitles[index]);
    }, 10000); // Установка таймаута для теста в 10 секунд
  });
});
