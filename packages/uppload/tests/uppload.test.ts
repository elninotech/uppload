import { Uppload, en, Instagram, Crop } from "../src";

const uppload = new Uppload({ lang: en });

test("adds an Uppload service", () => {
  uppload.use(new Instagram());
  expect(
    uppload.services.filter(services => services.name === "instagram").length
  ).toBe(1);
});

test("adds an Uppload effect", () => {
  uppload.use(new Crop());
  expect(
    uppload.effects.filter(effects => effects.name === "crop").length
  ).toBe(1);
});

describe("event emitter", () => {
  it("on should be a function", () =>
    expect(typeof uppload.on).toBe("function"));
  it("off should be a function", () =>
    expect(typeof uppload.off).toBe("function"));
  it("should emit open event", () => {
    let completed = false;
    uppload.on("open", () => {
      completed = true;
    });
    uppload.open();
    expect(completed).toBeTruthy();
  });
});

describe("modal functions", () => {
  it("opens", () => {
    uppload.open();
    expect(uppload.modalOpen()).toBeTruthy();
  });
  it("has a default active service", () => {
    expect(uppload.activeService).toBe("instagram");
  });
  it("has a default active effect", () => {
    expect(uppload.activeEffect).toBeFalsy();
  });
  it("navigates to service", () => {
    uppload.navigate("instagram");
    expect(uppload.activeService).toBe("instagram");
  });
  it("navigates to service", () => {
    expect(() => uppload.navigate("unknown-service")).toThrow();
  });
  it("navigates to effect", () => {
    uppload.navigate("instagram");
    expect(uppload.activeService).toBe("instagram");
  });
  it("closes", () => {
    uppload.close();
    expect(uppload.modalOpen()).toBeFalsy();
  });
});
