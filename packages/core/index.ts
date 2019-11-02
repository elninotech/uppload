import { UpploadService } from "@uppload/service";
import { UpploadUploader } from "@uppload/uploader";
import { Elements, getElements } from "./elements";
import mitt from "mitt";

class DefaultService extends UpploadService {
  name = "default";
  template = () => `<p>Select a file</p>`;
};

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
  lang?: { [index: string]: string; };
}

export default class Uppload {
  services: UpploadService[] = [new DefaultService(), new UploadingService()];
  uploaders: UpploadUploader[] = [];
  isOpen = false;
  error?: string;
  activeService = "default";
  settings: UpploadSettings;
  container: HTMLDivElement;
  lang: { [index: string]: string; } = {};
  emitter = mitt();

  constructor(settings?: UpploadSettings) {
    this.settings = settings || {};
    const div = document.createElement("div");
    const body = document.body;
    if (body) {
      body.appendChild(div);
    }
    if (this.settings.defaultService) this.activeService = this.settings.defaultService;
    if (this.settings.lang) this.lang = this.settings.lang;
    this.container = div;
  }

  ready() {
    if (this.settings.value) this.bind(this.settings.value);
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

  use(plugin: UpploadUploader | UpploadService | UpploadUploader[] | UpploadService[]) {
    if (Array.isArray(plugin)) {
      plugin.forEach((item: UpploadUploader | UpploadService) => this.install(item));
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
    this.container.innerHTML = this.render();
    window.requestAnimationFrame(() => this.handlers());
  }

  private getNavbar() {
    return `<ul>
      ${this.services.filter(service => !service.invisible).map(service =>
        `<li data-uppload-service="${service.name}" class="service-${this.activeService === service.name ? 'active' : 'inactive'}">
          <span class="service-icon" aria-hidden="true" style="background-image: url('${service.icon || ""}')"></span>
          <span>${service.name}</span>
        </li>`
      ).join("")}
    </ul>`;
  }

  render() {
    return `
      <div class="uppload-modal">
        <aside>${this.getNavbar()}</aside>
        <section>
          ${this.error ? `<div class="uppload-error">${this.error}</div>` : ""}
          ${this.renderActiveService()}
        </section>
      </div>
      <div class="uppload-modal-bg"></div>
    `;
  }

  renderActiveService() {
    const activeServices = this.services.filter(service => service.name === this.activeService);
    if (activeServices.length) {
      const activeService = activeServices[0];
      requestAnimationFrame(() => {
        if (typeof activeService.handlers === "function") activeService.handlers({
          upload: this.upload.bind(this),
          handle: this.handle.bind(this)
        });
      });
      return `${typeof activeService.template === "function" ? activeService.template() : ""}`;
    }
  }

  upload(file: Blob): Promise<string> {
    this.emitter.emit("before-upload");
    return new Promise((resolve, reject) => {
      this.navigate("uploading");
      if (this.uploaders.length) {
        const uploader = this.uploaders[this.uploaders.length - 1];
        console.log("Uploading a file", file, "using", uploader);
        if (typeof uploader.upload === "function") {
          uploader.upload(file)
            .then(url => {
              console.log("File uploaded successfully", url);
              this.bind(url);
              this.navigate("default");
              resolve(url);
              this.emitter.emit("upload", url);
            })
            .catch(error => reject(error));
        }
      }
    })
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
    const sidebarLinks = this.container.querySelectorAll("aside ul li");
    sidebarLinks.forEach(link => {
      link.addEventListener("click", e => {
        const service = link.getAttribute("data-uppload-service");
        if (service) this.navigate(service);
        e.preventDefault();
        return false;
      });
    });
  }

  navigate(service: string) {
    if (!this.services.filter(item => item.name === service).length)
      throw new Error("invalid-service");
    this.activeService = service;
    this.update();
  }

  on(type: string, handler: (event?: any) => void) {
    return this.emitter.on(type, handler);
  }

  off(type: string, handler: (event?: any) => void) {
    return this.emitter.on(type, handler);
  }
}
