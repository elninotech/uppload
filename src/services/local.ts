import { UpploadService } from "../service";
import { IHandlersParams, IServiceTemplateParams } from "../helpers/interfaces";
import { safeListen } from "../helpers/elements";
import { translate } from "../helpers/i18n";
import { formatBytes } from "../helpers/utils";

export default class Local extends UpploadService {
  name = "local";
  icon = `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="M177 56L125 4l-3-2v57h57c0-2-1-3-2-3z"/><path d="M173 113h8V75h-66c-5 0-8-4-8-8V1H27c-4 0-8 4-8 8v184c0 4 4 8 8 8h65v-8c0-45 36-80 81-80z"/><path d="M173 128c-36 0-65 29-65 64s29 64 65 64c35 0 64-29 64-64s-29-64-64-64zm27 63h-14v33c0 2-2 3-4 3h-20c-2 0-3-1-3-3v-33h-14c-3 0-5-3-3-5l28-30c1-2 3-2 5 0l27 30c2 2 1 5-2 5z"/></g></svg>`;
  color = "#34495e";
  mimeTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
  maxFileSize: number = Infinity;

  constructor({
    mimeTypes,
    maxFileSize,
  }: { mimeTypes?: string[]; maxFileSize?: number } = {}) {
    super();
    if (mimeTypes) this.mimeTypes = mimeTypes;
    if (maxFileSize) this.maxFileSize = maxFileSize;
  }

  template = (params: IServiceTemplateParams) => {
    return `<div class="drop-area">
      <div>${params.translate("services.local.drop")}</div>
      <em>${params.translate("services.local.or")}</em>
      <button class="uppload-button uppload-button--cta" style="background: ${
        this.color
      }">${params.translate("services.local.button")}</button>
    </div>
      <div class="alternate-input">
        <input type="file" accept="${this.mimeTypes.join()}"${
      params.uppload.settings.multiple ? " multiple" : ""
    }></div><button class="need-help-link"><span>${translate(
      "needHelp"
    )}</span aria-hidden="true"><span>?</span></button>`;
  };

  handlers = (params: IHandlersParams) => {
    const dropArea = params.uppload.container.querySelector(".drop-area");
    if (dropArea) {
      safeListen(dropArea, "drop", event =>
        this.dropHandler(params, event as DragEvent)
      );
      safeListen(dropArea, "dragover", event =>
        this.dragHandler(params, event)
      );
      safeListen(dropArea, "dragend", event => this.dragStop(params, event));
      safeListen(dropArea, "dragexit", event => this.dragStop(params, event));
      safeListen(dropArea, "dragleave", event => this.dragStop(params, event));
      safeListen(dropArea, "click", event => this.fileSelect(params, event));
    }
    const input = params.uppload.container.querySelector(
      ".alternate-input input[type=file]"
    ) as HTMLInputElement | null;
    if (input)
      safeListen(input, "change", event => this.getFile(params, event));
    const helpButton =
      params.uppload.container.querySelector(".need-help-link");
    if (helpButton)
      safeListen(helpButton, "click", () => params.showHelp("/services/local"));
  };

  getFile(params: IHandlersParams, event: Event) {
    event.preventDefault();
    const files = (event.target as HTMLInputElement).files;
    let file: File | null = null;
    if (files) {
      if (params.uppload.settings.multiple && files.length > 1)
        return params.uploadMultiple(Array.from(files));
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        if (this.mimeTypes.indexOf(item.type) !== -1)
          if (item.size < this.maxFileSize) file = item;
          else
            params.handle(
              new Error(
                params.translate(
                  "errors.file_too_large",
                  formatBytes(this.maxFileSize)
                )
              )
            );
      }
    }
    if (!file) return;
    if (file)
      params.next({
        blob: file,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
          ? new Date(file.lastModified)
          : undefined,
        name: file.name,
      });
    return;
  }

  fileSelect(params: IHandlersParams, _event: Event) {
    const input = params.uppload.container.querySelector(
      ".alternate-input input[type=file]"
    ) as HTMLInputElement | null;
    if (input) input.click();
  }

  private dragStop(params: IHandlersParams, _event: Event) {
    const dropArea = params.uppload.container.querySelector(".drop-area");
    if (dropArea) dropArea.classList.remove("drop-area-active");
  }

  dragHandler(params: IHandlersParams, event: Event) {
    event.preventDefault();
    const dropArea = params.uppload.container.querySelector(".drop-area");
    if (dropArea) dropArea.classList.add("drop-area-active");
  }

  dropHandler(params: IHandlersParams, event: DragEvent) {
    event.preventDefault();
    this.dragStop(params, event);
    let file: File | null = null; // getAsFile() returns File | null
    if (event.dataTransfer && event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i];
        if (item.kind === "file" && this.mimeTypes.indexOf(item.type) !== -1) {
          file = item.getAsFile();
          if (!file || file.size > this.maxFileSize) {
            file = null;
            params.handle(
              new Error(
                params.translate(
                  "errors.file_too_large",
                  formatBytes(this.maxFileSize)
                )
              )
            );
          }
        }
      }
    }
    if (!file) return;
    if (file)
      params.next({
        blob: file,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
          ? new Date(file.lastModified)
          : undefined,
        name: file.name,
      });
  }
}
