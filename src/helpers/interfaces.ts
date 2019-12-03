import { Uppload, UpploadEffect, UpploadService } from "../";

export type IElements = string | string[] | Element | Element[];
export interface IUppload {
  services: UpploadService[];
  effects: UpploadEffect[];
  isOpen: boolean;
  error?: string;
  activeService: string;
  activeEffect: string;
  settings: IUpploadSettings;
  container: HTMLDivElement;
}

export interface IUpploadSettings {
  value?: string;
  bind?: IElements;
  call?: IElements;
  defaultService?: string;
  lang?: ILanguage;
  uploader?: IUploader;
  inline?: boolean;
  customClass?: string;
  multiple?: boolean;
  compression?: number;
  compressionMime?: string;
  maxWidth?: number;
  maxHeight?: number;
  maxSize?: [number, number];
  compressor?: (file: Blob) => Promise<Blob>;
}

export interface IHandlersParams {
  upload: (file: Blob) => Promise<string>;
  uploadMultiple: (file: Blob[]) => Promise<string>;
  next: (file: Blob) => void;
  handle: (error: any) => void;
  uppload: Uppload;
}

export interface ITemplateParams {
  file: Blob;
}

export type IUploader = (
  file: Blob,
  updateProgress?: (progress: number) => void
) => Promise<string>;

export type IMultipleUploader = (
  file: Blob[],
  updateProgress?: (progress: number) => void
) => Promise<string>;

export type ILanguageHelper = (text: string) => string;

export interface ILanguage {
  [index: string]: string | ILanguage | ILanguageHelper;
}
