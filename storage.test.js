import { saveToList, loadList } from "./storage.js";

const localStorageMock = (function () {
  return {
    getItem: function () {
      return '["city1", "city2"]';
    },
    setItem: function () {
      return true;
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

test("saveToList must complete with no errors", () => {
  expect(saveToList()).toBe(true);
});

test("loadList must return array of mocked cities", async () => {
  expect(await loadList()).toStrictEqual(["city1", "city2"]);
});
