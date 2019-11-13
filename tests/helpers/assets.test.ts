import { colorSVG } from "../../src/helpers/assets";
import { UpploadService } from "../../src/service";

const sampleService = new UpploadService();
sampleService.icon = `<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#000" /></svg>`;
sampleService.color = "#9d2e2c";

test("colors an svg string from a service", () => {
  const SVG = sampleService.icon;
  expect(colorSVG(SVG, sampleService)).toContain("#9d2e2c");
});
