const sorting = require("../../app");

describe("Books names test suit", () => {
  // Проверяем, что названия книг сортируются по возрастанию
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  // Проверяем, что пустой массив должен возвращать пустой массив
  it("Empty array should return empty array", () => {
    expect(sorting.sortByName([])).toEqual([]);
  });

  // Проверяем, что массив с одним элементом должен возвращать этот элемент
  it("Array with one element should return that element", () => {
    expect(sorting.sortByName(["Single book"])).toEqual(["Single book"]);
  });

  // Проверяем, что массив с дубликатами элементов сортируется по алфавиту
  it("Array with duplicate elements should be sorted alphabetically", () => {
    expect(sorting.sortByName(["b", "a", "c", "a", "b", "c"])).toEqual(["a", "a", "b", "b", "c", "c"]);
  });
});