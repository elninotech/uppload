import { GlobalWithFetchMock } from "jest-fetch-mock";
import xhr from "xhr-mock";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;
export const fetch = customGlobal.fetch;

export { xhr };
