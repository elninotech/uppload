import { colorSVG } from "../../src/helpers/assets";
import { UpploadService } from "../../src/service";
import { UpploadEffect } from "../../src/effect";

const sampleService = new UpploadService();
sampleService.icon = `<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#000" /></svg>`;
sampleService.color = "#9d2e2c";

test("colors an svg string from a service", () => {
  const SVG = sampleService.icon;
  expect(colorSVG(SVG, sampleService)).toContain("#9d2e2c");
});

test("remove original color from an svg string from a service", () => {
  const SVG = sampleService.icon;
  expect(colorSVG(SVG, sampleService)).not.toContain("#000");
});

const sampleEffect = new UpploadEffect();
sampleEffect.icon = `<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#000" /></svg>`;
sampleEffect.color = "#1abc9c";

test("colors an svg string from a effect", () => {
  const SVG = sampleEffect.icon;
  expect(colorSVG(SVG, sampleEffect)).toContain("#1abc9c");
});

test("remove original color from an svg string from a effect", () => {
  const SVG = sampleEffect.icon;
  expect(colorSVG(SVG, sampleEffect)).not.toContain("#000");
});
