import {
  getElements,
  safeListen,
  fitImageToContainer,
} from "../../src/helpers/elements";
import { handlersParams } from "../mocks";

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

test("fitImageToContainer waits for the image to load before resolving", async () => {
  const parent = document.createElement("div");
  const image = document.createElement("img");
  parent.appendChild(image);
  Object.defineProperty(image, "complete", { value: false });

  let resolved = false;
  const promise = fitImageToContainer(handlersParams, image).then(() => {
    resolved = true;
  });

  // still loading: must not have resolved yet
  await Promise.resolve();
  expect(resolved).toBeFalsy();

  image.dispatchEvent(new Event("load"));
  await promise;
  expect(resolved).toBeTruthy();
});

test("fitImageToContainer resolves immediately for an already-loaded image", async () => {
  const parent = document.createElement("div");
  const image = document.createElement("img");
  parent.appendChild(image);
  Object.defineProperty(image, "complete", { value: true });

  await expect(
    fitImageToContainer(handlersParams, image)
  ).resolves.toBeUndefined();
});
