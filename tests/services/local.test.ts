import { Local } from "../../src";
import { handlersParams } from "../mocks";

const service = new Local();

describe("template", () => {
  it("is a function", () => expect(typeof service.template).toBe("function"));
  it("returns a string", () =>
    expect(typeof service.template(handlersParams)).toBe("string"));
  it("has a drop area", () =>
    expect(service.template(handlersParams)).toContain("drop-area"));
  it("has an input", () =>
    expect(service.template(handlersParams)).toContain("<input"));
});

const fakeEvent = {
  target: {
    files: [
      {
        kind: "file",
        type: "image/png",
        getAsFile: () => new Blob()
      }
    ]
  },
  dataTransfer: {
    items: [
      {
        kind: "file",
        type: "image/png",
        getAsFile: () => new Blob()
      }
    ]
  },
  preventDefault: () => {}
};

test("drop handler", () => {
  let file = null;
  service.dropHandler(handlersParams, fakeEvent as any);
  expect(file).toBeDefined();
});

test("get file", () => {
  let file = null;
  service.getFile(handlersParams, fakeEvent as any);
  expect(file).toBeDefined();
});

test("drag handler", () =>
  expect(
    service.dragHandler(handlersParams, fakeEvent as any)
  ).toBeUndefined());

test("file select", () =>
  expect(service.fileSelect(handlersParams, fakeEvent as any)).toBeUndefined());

test("handlers", () =>
  expect(service.handlers(handlersParams)).toBeUndefined());
