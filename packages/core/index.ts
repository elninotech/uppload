import UpploadPlugin from "../plugin";
import { UpploadService } from "../service";
import "./index.scss";

export interface HandlersParams {
  upload: (file: Blob) => Promise<string>;
  handle: (error: any) => void;
}

class DefaultService extends UpploadService {
  name = "default";
  template = () => `<p>Select a service from the left.</p>`;
};

export default class Uppload {
  services: UpploadService[] = [new DefaultService()];
  isOpen = false;
  activeService = "default";
  container: HTMLDivElement;

  constructor() {
    const div = document.createElement("div");
    const body = document.body;
    if (body) {
      body.appendChild(div);
    }
    this.container = div;
  }

  ready() {
  }

  use(plugin: UpploadPlugin | UpploadService | UpploadPlugin[] | UpploadService[]) {
    if (Array.isArray(plugin)) {
      plugin.forEach(item => this.install(item));
    } else {
      this.install(plugin);
    }
  }
  install(plugin: UpploadPlugin | UpploadService) {
    if (plugin.type === "service") {
      // Install this service
      this.services.push(plugin as UpploadService);
      this.ready();
    }
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.update();
  }

  update() {
    this.container.innerHTML = this.render();
    window.requestAnimationFrame(() => this.handlers());
  }

  render() {
    return `
      <div class="uppload-modal">
        <aside>
          <ul>
            ${this.services.map(service =>
              `<li data-uppload-service="${service.name}" class="service-${this.activeService === service.name ? 'active' : 'inactive'}">
                <span>${service.name}</span>
              </li>`
            ).join("")}
          </ul>
        </aside>
        <section>
          ${this.renderActiveService()}
        </section>
      </div>
    `;
  }

  renderActiveService() {
    const activeServices = this.services.filter(service => service.name === this.activeService);
    if (activeServices.length) {
      const activeService = activeServices[0];
      requestAnimationFrame(() => {
        if (typeof activeService.handlers === "function") activeService.handlers({ upload: this.upload, handle: this.handle });
      });
      return `${typeof activeService.template === "function" ? activeService.template() : ""}`;
    }
  }

  async upload(file: Blob) {
    return "";
  }
  handle(error: any) {

  }

  handlers() {
    const sidebarLinks = this.container.querySelectorAll("aside ul li");
    sidebarLinks.forEach(link => {
      link.addEventListener("click", e => {
        const service = link.getAttribute("data-uppload-service");
        if (service) this.activeService = service;
        this.update();
        e.preventDefault();
        return false;
      });
    });
  }
}
