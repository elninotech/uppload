import { UpploadService, Uppload } from "../src";
import {
  Camera,
  Local,
  GIPHY,
  Pexels,
  Pixabay,
  Unsplash,
  NineGag,
  ArtStation,
  DeviantArt,
  Facebook,
  Flickr,
  Instagram,
  Pinterest,
  Screenshot,
  Twitter,
  URL,
} from "../src";
import { serviceTemplateParams } from "./mocks";

const service = new UpploadService();
const services = [
  new Camera(),
  new Local(),
  new GIPHY("giphy-api-key"),
  new Pexels("pexels-api-key"),
  new Pixabay("pixabay-api-key"),
  new Unsplash("unsplash-api-key"),
  new NineGag(),
  new ArtStation(),
  new DeviantArt(),
  new Facebook(),
  new Flickr(),
  new Instagram(),
  new Pinterest(),
  new Screenshot(),
  new Twitter(),
  new URL(),
];

describe("service template", () => {
  it("is a function", () => expect(typeof service.template).toBe("function"));
  it("gives a string", () =>
    expect(typeof service.template(serviceTemplateParams)).toBe("string"));
});

const uppload = new Uppload();
uppload.use(services);

for (const currentService of services) {
  describe(`${currentService.name} service`, () => {
    it("template is a function", () =>
      expect(typeof currentService.template).toBe("function"));
    it("template gives a string", () =>
      expect(typeof currentService.template(serviceTemplateParams)).toBe(
        "string"
      ));
    it("service is registered", () =>
      expect(
        // The camera service would not be registered because no Media Devices API
        currentService.name === "camera"
          ? !uppload.services.includes(currentService)
          : uppload.services.includes(currentService)
      ).toBeTruthy());
  });
}
