import { flattenObject, setI18N, translate } from "../../src/helpers/i18n";

test("flattens an object", () => {
  const nonFlatObject = {
    hello: "world",
    example: {
      exists: true
    }
  };
  const flatObject = {
    hello: "world",
    "example.exists": true
  };
  expect(flattenObject(nonFlatObject)).toEqual(flatObject);
});

test("get a translation", () => {
  const lang = {
    sayHello: "Hello, world!"
  };
  setI18N(lang);
  expect(translate("sayHello")).toBe("Hello, world!");
});

test("get a translation with a variable", () => {
  const lang = {
    sayHello: "Hello, $1$!"
  };
  setI18N(lang);
  expect(translate("sayHello", "Anand")).toBe("Hello, Anand!");
});

test("get a translation with multiple variables", () => {
  const lang = {
    sayHello: "Hello, $1$ $2$!"
  };
  setI18N(lang);
  expect(translate("sayHello", ["Anand", "Chowdhary"])).toBe(
    "Hello, Anand Chowdhary!"
  );
});
