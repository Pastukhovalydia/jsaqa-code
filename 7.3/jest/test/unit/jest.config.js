module.exports = {
  testMatch: ['**/*.spec.js', '**/*.spec.jsx'], // Это позволит Jest найти все тесты
  collectCoverageFrom: ['**/*.js', '**/*.jsx', '!**/node_modules/**', '!**/coverage/**'], // Это указывает Jest, какие файлы следует включить в отчет о покрытии и какие исключить
  coverageThreshold: { // Добавляем желаемые параметры покрытия
    branches: 100, 
    functions: 100,
    lines: 100
  }
};