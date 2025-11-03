import { afterEach, vi } from "vitest";
import { createRequire } from "module";

const requireModule = createRequire(import.meta.url);

const jestLike = {
  fn: vi.fn,
  spyOn: vi.spyOn,
  requireActual: (id: string) => requireModule(id),
  isMockFunction: vi.isMockFunction,
};

Object.assign(globalThis, {
  jest: jestLike,
});

const fetchMock = requireModule("jest-fetch-mock");

fetchMock.enableMocks();

Object.assign(globalThis, {
  fetch: fetchMock,
  fetchMock,
});

afterEach(() => {
  fetchMock.resetMocks();
});
