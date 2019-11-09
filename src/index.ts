export { Uppload } from "./uppload";

// Base classes
export { UpploadService } from "./service";
export { UpploadUploader } from "./uploader";
export { UpploadEffect } from "./effect";

// Helpers
export * from "./helpers/elements";
export * from "./helpers/interfaces";
export * from "./helpers/http";
export * from "./helpers/i18n";

// Language packs
export { en } from "./i18n";

// Uploaders
import Camera from "./services/camera";
import Instagram from "./services/instagram";
import Facebook from "./services/facebook";
import Local from "./services/local";
import GIPHY from "./services/giphy";
import Unsplash from "./services/unsplash";
import URL from "./services/url";
import Screenshot from "./services/screenshot";
export { Camera, Instagram, Facebook, Local, URL, Screenshot, GIPHY, Unsplash };

// Effects
import Crop from "./effects/crop";
import Grayscale from "./effects/grayscale";
import Rotate from "./effects/rotate";
import Filters from "./effects/filters";
import Sharpen from "./effects/sharpen";
export { Crop, Grayscale, Rotate, Sharpen, Filters };
