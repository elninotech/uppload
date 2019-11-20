import { getElements, safeListen } from "../../src/helpers/elements";

test("get elements", () =>
  expect(getElements(".no-elements-returned")).toEqual([]));

test("safe listen", () =>
  expect(
    safeListen(document.createElement("div"), "click", () => {})
  ).toBeUndefined());

test("safe listen adds listener", () => {
  let completed = false;
  const button = document.createElement("button");
  safeListen(button, "click", () => (completed = true));
  button.click();
  expect(completed).toBeTruthy();
});
