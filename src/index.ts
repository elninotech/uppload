export { Uppload } from "./uppload";

// Base classes
export { UpploadService } from "./service";
export { UpploadUploader } from "./uploader";

// Helpers
export { getElements } from "./helpers/elements";
export { HandlersParams } from "./helpers/interfaces";

// Language packs
export { en } from "./i18n";

// Uploaders
import Camera from "./uploaders/camera";
import Instagram from "./uploaders/instagram";
import Local from "./uploaders/local";
import URL from "./uploaders/url";
export { Camera, Instagram, Local, URL };
