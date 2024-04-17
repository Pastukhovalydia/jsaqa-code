const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

module.exports = {
  launch: {
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  },

  // Добавляем метод globalSetup для инициализации
  globalSetup: async (globalConfig) => {
    await setupPuppeteer(globalConfig);

    // Возвращаем объект с данными, которые будут переданы в глобальную область видимости тестов
    return {
      // Возвращаем переменную browser
      browser: global.__BROWSER__,
    };
  },
};
