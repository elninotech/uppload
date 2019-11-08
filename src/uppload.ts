import { UpploadService } from "./service";
import { UpploadUploader } from "./uploader";
import { Elements, getElements, safeListen } from "./helpers/elements";
import { show, hide } from "show-hide";
import mitt from "mitt";

let lang: { [index: string]: any } | undefined = undefined;
class DefaultService extends UpploadService {
  name = "default";
  invisible = true;
  template = () => `<p>${lang ? lang.services.default.heading : ""}</p>`;
}

class UploadingService extends UpploadService {
  name = "uploading";
  invisible = true;
  template = () => `<p>Uploading your file...</p>`;
}

export interface UpploadSettings {
  value?: string;
  bind?: Elements;
  call?: Elements;
  defaultService?: string;
  lang?: { [index: string]: any };
}

export class Uppload {
  services: UpploadService[] = [new DefaultService(), new UploadingService()];
  uploaders: UpploadUploader[] = [];
  isOpen = false;
  error?: string;
  activeService = "default";
  settings: UpploadSettings;
  container: HTMLDivElement;
  lang: { [index: string]: any } = {};
  emitter = mitt();

  constructor(settings?: UpploadSettings) {
    this.settings = settings || {};
    lang = this.settings.lang;
    const div = document.createElement("div");
    this.renderContainer();
    div.classList.add("uppload-container");
    const body = document.body;
    if (body) {
      body.appendChild(div);
    }
    if (this.settings.defaultService)
      this.activeService = this.settings.defaultService;
    if (this.settings.lang) this.lang = this.settings.lang;
    this.container = div;
  }

  ready() {
    if (this.settings.value) this.bind(this.settings.value);
    this.renderContainer();
    this.emitter.emit("ready");
  }

  bind(value: string) {
    if (this.settings.bind) {
      const elements = getElements(this.settings.bind);
      elements.forEach(element => {
        if (element.nodeName === "IMG") {
          element.setAttribute("src", value);
        } else {
          element.setAttribute("value", value);
        }
      });
      this.emitter.emit("bind");
    }
  }

  use(
    plugin:
      | UpploadUploader
      | UpploadService
      | UpploadUploader[]
      | UpploadService[]
  ) {
    if (Array.isArray(plugin)) {
      plugin.forEach((item: UpploadUploader | UpploadService) =>
        this.install(item)
      );
    } else {
      this.install(plugin);
    }
  }

  install(plugin: UpploadUploader | UpploadService) {
    if (plugin.type === "service") {
      // Install this service
      this.services.push(plugin as UpploadService);
      this.ready();
    } else if (plugin.type === "uploader") {
      this.uploaders.push(plugin as UpploadUploader);
      this.ready();
    }
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.update();
    this.emitter.emit("open");
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.update();
    this.emitter.emit("close");
  }

  update() {
    if (!this.container) return;
    const content = this.container.querySelector(".uppload-service-container");
    if (content) content.innerHTML = this.render();
    const aside = this.container.querySelector("aside");
    if (aside && this.activeService !== "default")
      aside.style.display = "block";
    window.requestAnimationFrame(() => this.handlers());
    if (!this.isOpen) {
      this.container.classList.remove("visible");
    } else {
      this.container.classList.add("visible");
    }
  }

  private getNavbar(sidebar = false) {
    return `<${sidebar ? "nav" : "div"} class="uppload-services">
      ${this.services
        .filter(service => !service.invisible)
        .map(
          service =>
            `<div data-uppload-service="${
              service.name
            }" class="uppload-service-name">
          ${
            sidebar
              ? `<input type="radio" id="uppload-service-radio-${service.name}" value="${service.name}" name="uppload-radio">`
              : ""
          }
          <${
            sidebar
              ? `label for="uppload-service-radio-${service.name}"`
              : "button"
          } data-uppload-service="${service.name}">
            ${
              service.icon.startsWith("http")
                ? `<img class="service-icon" alt="" src="${service.icon}">`
                : `<i class="${service.icon || "fas fa-image"}" style="color: ${
                    service.color
                  }"></i>`
            }
            <span>${
              this.lang.services &&
              this.lang.services[service.name] &&
              this.lang.services[service.name].title
                ? this.lang.services[service.name].title
                : service.name
            }</span>
          </${sidebar ? "label" : "button"}>
        </div>`
        )
        .join("")}
    </${sidebar ? "nav" : "div"}>`;
  }

  renderContainer() {
    if (this.container)
      this.container.innerHTML = `
      <div class="uppload-modal">
        <aside style="display: none">
          ${this.getNavbar(true)}
        </aside>
        <section>
          ${this.error ? `<div class="uppload-error">${this.error}</div>` : ""}
          <div class="uppload-service-container"></div>
        </section>
      </div>
      <div class="uppload-modal-bg">
        <button class="uppload-close" aria-label="Close">&times;</button>
      </div>
    `;
  }

  render() {
    return `
      ${this.error ? `<div class="uppload-error">${this.error}</div>` : ""}
      <div class="uppload-service uppload-service--${this.activeService}">
        ${this.renderActiveService()}
        ${this.activeService === "default" ? this.getNavbar() : ""}
      </div>
    `;
  }

  renderActiveService() {
    const activeServices = this.services.filter(
      service => service.name === this.activeService
    );
    if (activeServices.length) {
      const activeService = activeServices[0];
      requestAnimationFrame(() => {
        if (typeof activeService.handlers === "function")
          activeService.handlers({
            upload: this.upload.bind(this),
            handle: this.handle.bind(this)
          });
      });
      return `${
        typeof activeService.template === "function"
          ? activeService.template()
          : ""
      }`;
    }
  }

  /**
   * Upload a file
   * @param file - A Blob object containing the file to upload
   * @returns The file URL
   */
  private upload(file: Blob): Promise<string> {
    this.emitter.emit("before-upload");
    return new Promise((resolve, reject) => {
      this.navigate("uploading");
      if (this.uploaders.length) {
        const uploader = this.uploaders[this.uploaders.length - 1];
        console.log("Uploading a file", file, "using", uploader);
        if (typeof uploader.upload === "function") {
          uploader
            .upload(file)
            .then((url: string) => {
              console.log("File uploaded successfully", url);
              this.bind(url);
              this.navigate("default");
              resolve(url);
              this.emitter.emit("upload", url);
            })
            .catch((error: Error) => reject(error));
        }
      }
    });
  }

  handle(error: Error) {
    this.error = this.lang[error.message] || error.message;
    this.emitter.emit("error", this.error);
    this.update();
    setTimeout(() => {
      this.error = undefined;
      this.update();
    }, 4000);
  }

  handlers() {
    const openFunction = () => this.open();
    const closeFunction = () => this.close();

    /**
     * Clicking on each sidebar link should open its service
     */
    const defaultServiceLinks = this.container.querySelectorAll(
      ".uppload-service--default .uppload-service-name button"
    );
    defaultServiceLinks.forEach(link => {
      const linkFunction = (e: Event) => {
        const service = link.getAttribute("data-uppload-service");
        if (service) this.navigate(service);
        const serviceRadio = document.querySelector(
          `input[type=radio][value='${service}']`
        );
        if (serviceRadio) serviceRadio.setAttribute("checked", "checked");
        e.preventDefault();
        return false;
      };
      safeListen(link, "click", linkFunction);
    });

    /**
     * Clicking on each sidebar link should open its service
     */
    const inputRadios: NodeListOf<
      HTMLInputElement
    > = this.container.querySelectorAll(
      ".uppload-services input[type='radio']"
    );
    inputRadios.forEach(radio => {
      const radioFunction = (e: Event) => {
        const inputRadio = document.querySelector(
          "[name='uppload-radio']:checked"
        ) as HTMLInputElement;
        if (!inputRadio) return;
        const service = inputRadio.value;
        this.activeService = service;
        this.update();
      };
      safeListen(radio, "change", radioFunction);
    });

    /**
     * Clicking on the background should close the modal
     */
    const background = document.querySelector(".uppload-modal-bg");
    if (background) {
      safeListen(background, "click", closeFunction);
    }

    /**
     * All elements in `call` should open the modal on click
     */
    if (this.settings.call) {
      const elements = getElements(this.settings.call);
      elements.forEach(element => {
        safeListen(element, "click", openFunction);
      });
    }
  }

  /**
   * Navigate to an Uppload service page
   * @param service - Slug name of service (e.g., instagram)
   */
  navigate(service: string) {
    if (!this.services.filter(item => item.name === service).length)
      throw new Error("invalid-service");
    this.activeService = service;
    this.update();
  }

  /**
   * Add an event listener
   * @param type - Type of event listener (e.g., open)
   * @param handler - Event handler function
   */
  on(type: string, handler: (event?: any) => void) {
    return this.emitter.on(type, handler);
  }

  /**
   * Remove an event listener
   * @param type - Type of event listener (e.g., open)
   * @param handler - Event handler function
   */
  off(type: string, handler: (event?: any) => void) {
    return this.emitter.on(type, handler);
  }
}
