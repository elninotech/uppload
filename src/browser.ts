import {
  Uppload,
  UpploadService,
  UpploadEffect,
  getElements,
  safeListen,
  fitImageToContainer,
  compressImage,
  canvasToBlob,
  cachedFetch,
  imageUrlToBlob,
  flattenObject,
  setI18N,
  translate,
  en,
  de,
  nl,
  hi,
  es,
  fr,
  it,
  ro,
  ru,
  tr,
  uk,
  zhTW,
  xhrUploader,
  fetchUploader,
  Camera,
  Instagram,
  Facebook,
  Pixabay,
  Local,
  URL,
  Screenshot,
  GIPHY,
  Unsplash,
  Pexels,
  Pinterest,
  Flickr,
  NineGag,
  DeviantArt,
  ArtStation,
  Twitter,
  Flipboard,
  Fotki,
  LinkedIn,
  Reddit,
  Tumblr,
  WeHeartIt,
  Brightness,
  Crop,
  Rotate,
  Flip,
  Preview,
  Blur,
  Contrast,
  Grayscale,
  HueRotate,
  Invert,
  Sepia,
  Saturate,
} from "./index";

export interface UpploadWindow extends Window {
  uppload_Uppload: typeof Uppload;
  uppload_UpploadService: typeof UpploadService;
  uppload_UpploadEffect: typeof UpploadEffect;
  uppload_getElements: typeof getElements;
  uppload_safeListen: typeof safeListen;
  uppload_fitImageToContainer: typeof fitImageToContainer;
  uppload_compressImage: typeof compressImage;
  uppload_canvasToBlob: typeof canvasToBlob;
  uppload_cachedFetch: typeof cachedFetch;
  uppload_imageUrlToBlob: typeof imageUrlToBlob;
  uppload_flattenObject: typeof flattenObject;
  uppload_setI18N: typeof setI18N;
  uppload_translate: typeof translate;
  uppload_en: typeof en;
  uppload_nl: typeof nl;
  uppload_hi: typeof hi;
  uppload_es: typeof es;
  uppload_fr: typeof fr;
  uppload_de: typeof de;
  uppload_it: typeof it;
  uppload_ro: typeof ro;
  uppload_ru: typeof ru;
  uppload_tr: typeof tr;
  uppload_uk: typeof uk;
  uppload_zhTW: typeof zhTW;
  uppload_xhrUploader: typeof xhrUploader;
  uppload_fetchUploader: typeof fetchUploader;
  uppload_Camera: typeof Camera;
  uppload_Instagram: typeof Instagram;
  uppload_Facebook: typeof Facebook;
  uppload_Pixabay: typeof Pixabay;
  uppload_Local: typeof Local;
  uppload_URL: typeof URL;
  uppload_Screenshot: typeof Screenshot;
  uppload_GIPHY: typeof GIPHY;
  uppload_Unsplash: typeof Unsplash;
  uppload_Pexels: typeof Pexels;
  uppload_Pinterest: typeof Pinterest;
  uppload_Flickr: typeof Flickr;
  uppload_NineGag: typeof NineGag;
  uppload_DeviantArt: typeof DeviantArt;
  uppload_ArtStation: typeof ArtStation;
  uppload_Twitter: typeof Twitter;
  uppload_Flipboard: typeof Flipboard;
  uppload_Fotki: typeof Fotki;
  uppload_LinkedIn: typeof LinkedIn;
  uppload_Reddit: typeof Reddit;
  uppload_Tumblr: typeof Tumblr;
  uppload_WeHeartIt: typeof WeHeartIt;
  uppload_Brightness: typeof Brightness;
  uppload_Crop: typeof Crop;
  uppload_Rotate: typeof Rotate;
  uppload_Flip: typeof Flip;
  uppload_Preview: typeof Preview;
  uppload_Blur: typeof Blur;
  uppload_Contrast: typeof Contrast;
  uppload_Grayscale: typeof Grayscale;
  uppload_HueRotate: typeof HueRotate;
  uppload_Invert: typeof Invert;
  uppload_Sepia: typeof Sepia;
  uppload_Saturate: typeof Saturate;
}
declare let window: UpploadWindow;

window.uppload_Uppload = Uppload;
window.uppload_UpploadService = UpploadService;
window.uppload_UpploadEffect = UpploadEffect;
window.uppload_getElements = getElements;
window.uppload_safeListen = safeListen;
window.uppload_fitImageToContainer = fitImageToContainer;
window.uppload_compressImage = compressImage;
window.uppload_canvasToBlob = canvasToBlob;
window.uppload_cachedFetch = cachedFetch;
window.uppload_imageUrlToBlob = imageUrlToBlob;
window.uppload_flattenObject = flattenObject;
window.uppload_setI18N = setI18N;
window.uppload_translate = translate;
window.uppload_en = en;
window.uppload_nl = nl;
window.uppload_hi = hi;
window.uppload_es = es;
window.uppload_fr = fr;
window.uppload_de = de;
window.uppload_it = it;
window.uppload_ro = ro;
window.uppload_ru = ru;
window.uppload_tr = tr;
window.uppload_uk = uk;
window.uppload_zhTW = zhTW;
window.uppload_xhrUploader = xhrUploader;
window.uppload_fetchUploader = fetchUploader;
window.uppload_Camera = Camera;
window.uppload_Instagram = Instagram;
window.uppload_Facebook = Facebook;
window.uppload_Pixabay = Pixabay;
window.uppload_Local = Local;
window.uppload_URL = URL;
window.uppload_Screenshot = Screenshot;
window.uppload_GIPHY = GIPHY;
window.uppload_Unsplash = Unsplash;
window.uppload_Pexels = Pexels;
window.uppload_Pinterest = Pinterest;
window.uppload_Flickr = Flickr;
window.uppload_NineGag = NineGag;
window.uppload_DeviantArt = DeviantArt;
window.uppload_ArtStation = ArtStation;
window.uppload_Twitter = Twitter;
window.uppload_Flipboard = Flipboard;
window.uppload_Fotki = Fotki;
window.uppload_LinkedIn = LinkedIn;
window.uppload_Reddit = Reddit;
window.uppload_Tumblr = Tumblr;
window.uppload_WeHeartIt = WeHeartIt;
window.uppload_Brightness = Brightness;
window.uppload_Crop = Crop;
window.uppload_Rotate = Rotate;
window.uppload_Flip = Flip;
window.uppload_Preview = Preview;
window.uppload_Blur = Blur;
window.uppload_Contrast = Contrast;
window.uppload_Grayscale = Grayscale;
window.uppload_HueRotate = HueRotate;
window.uppload_Invert = Invert;
window.uppload_Sepia = Sepia;
window.uppload_Saturate = Saturate;
