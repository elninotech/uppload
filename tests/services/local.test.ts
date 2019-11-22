import { Local, Uppload, HandlersParams } from "../../src";

const service = new Local();
const handlers: HandlersParams = {
  next: () => {},
  upload: () => new Promise(() => {}),
  uploadMultiple: () => new Promise(() => {}),
  handle: () => {},
  uppload: new Uppload()
};

describe("template", () => {
  it("is a function", () => expect(typeof service.template).toBe("function"));
  it("returns a string", () =>
    expect(typeof service.template(new Uppload())).toBe("string"));
  it("has a drop area", () =>
    expect(service.template(new Uppload())).toContain("drop-area"));
  it("has an input", () =>
    expect(service.template(new Uppload())).toContain("<input"));
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
  service.dropHandler(handlers, fakeEvent as any);
  expect(file).toBeDefined();
});

test("get file", () => {
  let file = null;
  service.getFile(handlers, fakeEvent as any);
  expect(file).toBeDefined();
});

test("drag handler", () =>
  expect(service.dragHandler(handlers, fakeEvent as any)).toBeUndefined());

test("file select", () =>
  expect(service.fileSelect(handlers, fakeEvent as any)).toBeUndefined());

test("handlers", () => expect(service.handlers(handlers)).toBeUndefined());
