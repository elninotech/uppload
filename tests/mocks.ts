import { GlobalWithFetchMock } from "jest-fetch-mock";
import {
  IServiceTemplateParams,
  IHandlersParams,
  ITemplateParams,
  translate,
  Uppload,
} from "../src";
const uppload = new Uppload();
import xhr from "xhr-mock";

const customGlobal: GlobalWithFetchMock =
  global as unknown as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;
export const fetch = customGlobal.fetch;

const serviceTemplateParams: IServiceTemplateParams = {
  uppload,
  translate,
};
const handlersParams: IHandlersParams = {
  upload: () => new Promise(() => {}),
  uploadMultiple: () => new Promise(() => {}),
  next: () => {},
  handle: () => {},
  showHelp: () => {},
  uppload,
  translate,
};
const effectTemplateParams: ITemplateParams = {
  file: { blob: new Blob() },
  translate,
};

export { xhr, serviceTemplateParams, handlersParams, effectTemplateParams };
