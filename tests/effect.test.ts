import { UpploadEffect, Uppload } from "../src";
import {
  Crop,
  Filters,
  Preview,
  Rotate,
  Sharpen,
  Blur,
  Brightness,
  Contrast,
  Grayscale,
  HueRotate,
  Invert,
  Saturate,
  Sepia
} from "../src";

const effect = new UpploadEffect();
const effects = [
  new Crop(),
  new Filters(),
  new Preview(),
  new Rotate(),
  new Sharpen(),
  new Blur(),
  new Brightness(),
  new Contrast(),
  new Grayscale(),
  new HueRotate(),
  new Invert(),
  new Saturate(),
  new Sepia()
];

describe("effect template", () => {
  it("is a function", () => expect(typeof effect.template).toBe("function"));
  it("gives a string", () =>
    expect(typeof effect.template(new Blob())).toBe("string"));
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
      expect(typeof currentEffect.template(new Blob())).toBe("string"));
    it("effect is registered", () =>
      expect(uppload.effects.includes(currentEffect)).toBeTruthy());
  });
}
