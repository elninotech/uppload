import { UpploadEffect, Uppload } from "../src";
import {
  Crop,
  Preview,
  Flip,
  Blur,
  Brightness,
  Contrast,
  Grayscale,
  HueRotate,
  Invert,
  Saturate,
  Sepia,
} from "../src";
import { effectTemplateParams } from "./mocks";
import "jest-canvas-mock";

const effect = new UpploadEffect();
const effects = [
  new Crop(),
  new Preview(),
  new Flip(),
  new Blur(),
  new Brightness(),
  new Contrast(),
  new Grayscale(),
  new HueRotate(),
  new Invert(),
  new Saturate(),
  new Sepia(),
];

describe("effect template", () => {
  it("is a function", () => expect(typeof effect.template).toBe("function"));
  it("gives a string", () =>
    expect(typeof effect.template(effectTemplateParams)).toBe("string"));
});

const uppload = new Uppload();
uppload.use(effects);

window.URL.createObjectURL = jest.fn();
window.URL.createObjectURL = jest.fn(() => "fake-url");

for (const currentEffect of effects) {
  describe(`${currentEffect.name} effect`, () => {
    it("template is a function", () =>
      expect(typeof currentEffect.template).toBe("function"));
    it("template gives a string", () =>
      expect(typeof currentEffect.template(effectTemplateParams)).toBe(
        "string"
      ));
  });
}
