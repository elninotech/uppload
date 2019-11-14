import {
  getElements,
  safeListen,
  fitImageToContainer
} from "../../src/helpers/elements";

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

test("fit image", () =>
  expect(typeof fitImageToContainer(document.createElement("img"))).toBe(
    "object"
  ));

test("fit image returns a promise", () =>
  expect(
    typeof (fitImageToContainer(document.createElement("img")) as Promise<
      undefined
    >).then
  ).toBe("function"));
