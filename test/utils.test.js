const {
  ab2str,
  str2ab,
  isString,
  isNumber,
  isArrayBuffer
} = require("../src/utils");

test("isString works as expected", () => {
  expect(isString("test")).toBe(true);
  expect(isString(10)).toBe(false);
});

test("isNumber works as expected", () => {
  expect(isNumber(10)).toBe(true);
  expect(isNumber("10")).toBe(false);
});

test("isArrayBuffer works as expected", () => {
  expect(isArrayBuffer(10)).toBe(false);
  expect(isArrayBuffer(new ArrayBuffer())).toBe(true);
});

test("ab2str and str2ab works as expected", () => {
  const randomString = Math.random()
    .toString(36)
    .substring(2);
  const converted = str2ab(randomString);
  const convertedBack = ab2str(converted);
  expect(convertedBack === randomString).toBe(true);
});
