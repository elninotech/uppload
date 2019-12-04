import { flattenObject, setI18N, translate } from "../../src/helpers/i18n";
import { en, nl, hi } from "../../src";

test("flattens an object", () => {
  const nonFlatObject = {
    hello: "world",
    example: {
      exists: true
    }
  };
  const flatObject = {
    hello: "world",
    "example.exists": true
  };
  expect(flattenObject(nonFlatObject)).toEqual(flatObject);
});

test("get a translation", () => {
  const lang = {
    sayHello: "Hello, world!"
  };
  setI18N(lang);
  expect(translate("sayHello")).toBe("Hello, world!");
});

test("get a translation with a variable", () => {
  const lang = {
    sayHello: "Hello, $1$!"
  };
  setI18N(lang);
  expect(translate("sayHello", "Anand")).toBe("Hello, Anand!");
});

test("get a translation with multiple variables", () => {
  const lang = {
    sayHello: "Hello, $1$ $2$!"
  };
  setI18N(lang);
  expect(translate("sayHello", ["Anand", "Chowdhary"])).toBe(
    "Hello, Anand Chowdhary!"
  );
});

const translationKeys: string[] = [
  "uploading",
  "uploaded",
  "fetching",
  "poweredBy",
  "needHelp",
  "units.px",
  "units.%",
  "units.deg",
  "errors.response_not_ok",
  "errors.unable_to_search",
  "errors.invalid_service_url",
  "errors.invalid_url",
  "errors.upload_aborted",
  "errors.upload_error",
  "errors.file_type_not_allowed",
  "errors.file_too_large",
  "services.default.heading",
  "services.local.title",
  "services.local.button",
  "services.local.or",
  "services.local.drop",
  "services.camera.title",
  "services.camera.button",
  "services.camera.switch",
  "services.camera.waiting",
  "services.camera.unableToRead",
  "services.microlink.button",
  "services.microlink.label",
  "services.microlink.placeholder",
  "services.microlink.type",
  "services.url.title",
  "services.url.label",
  "services.url.placeholder",
  "services.instagram.title",
  "services.facebook.title",
  "services.flickr.title",
  "services.flickr.type",
  "services.ninegag.title",
  "services.ninegag.type",
  "services.deviantart.title",
  "services.artstation.title",
  "services.twitter.title",
  "services.twitter.type",
  "services.pinterest.title",
  "services.pinterest.type",
  "services.flipboard.title",
  "services.flipboard.type",
  "services.fotki.title",
  "services.fotki.type",
  "services.linkedin.title",
  "services.reddit.title",
  "services.tumblr.title",
  "services.weheartit.title",
  "services.screenshot.title",
  "services.screenshot.button",
  "services.screenshot.label",
  "services.screenshot.placeholder",
  "services.screenshot.loading",
  "services.search.button",
  "services.search.label",
  "services.search.placeholder",
  "services.search.imagesPoweredBy",
  "services.giphy.title",
  "services.unsplash.title",
  "services.pixabay.title",
  "services.pexels.title",
  "effects.preview.title",
  "effects.filters.title",
  "effects.crop.title",
  "effects.crop.aspectRatios.free",
  "effects.crop.aspectRatios.square",
  "effects.rotate.title",
  "effects.flip.title",
  "effects.flip.buttons.horizontal",
  "effects.flip.buttons.vertical",
  "effects.sharpen.title",
  "effects.blur.title",
  "effects.brightness.title",
  "effects.contrast.title",
  "effects.grayscale.title",
  "effects.hue-rotate.title",
  "effects.invert.title",
  "effects.saturate.title",
  "effects.sepia.title"
];

describe("english translation", () => {
  const english: { [index: string]: any } = flattenObject(en);
  translationKeys.forEach(key => {
    it(`has translation for ${key}`, () => expect(english[key]).toBeDefined());
  });
});
describe("dutch translation", () => {
  const dutch: { [index: string]: any } = flattenObject(nl);
  translationKeys.forEach(key => {
    it(`has translation for ${key}`, () => expect(dutch[key]).toBeDefined());
  });
});
describe("hindi translation", () => {
  const hindi: { [index: string]: any } = flattenObject(hi);
  translationKeys.forEach(key => {
    it(`has translation for ${key}`, () => expect(hindi[key]).toBeDefined());
  });
});
