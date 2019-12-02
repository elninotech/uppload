import { UpploadService } from "./service";
import { UpploadEffect } from "./effect";
import { setI18N, translate } from "./helpers/i18n";
import {
  Elements,
  getElements,
  safeListen,
  compressImage
} from "./helpers/elements";
import { colorSVG } from "./helpers/assets";
import mitt from "mitt";
import { Uploader, MultipleUploader } from "./helpers/interfaces";

let lang: { [index: string]: any } | undefined = undefined;
class DefaultService extends UpploadService {
  name = "default";
  invisible = true;
  template = () => `<p>${lang ? lang.services.default.heading : ""}</p>`;
}

class UploadingService extends UpploadService {
  name = "uploading";
  invisible = true;
  template = () => `<div class="uppload-loader">
  <div></div>
    <p class="uppload-loader-text">${translate(
      "uploading"
    )}<span class="progress"></span></p>
  </div>`;
}

export interface UpploadSettings {
  value?: string;
  bind?: Elements;
  call?: Elements;
  defaultService?: string;
  lang?: { [index: string]: any };
  uploader?: Uploader;
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

/**
 * Uppload image uploading widget
 */
export class Uppload {
  services: UpploadService[] = [new DefaultService(), new UploadingService()];
  effects: UpploadEffect[] = [];
  isOpen = false;
  error?: string;
  activeService = "default";
  activeEffect = "";
  settings: UpploadSettings;
  container: HTMLDivElement;
  file: Blob | undefined = undefined;
  lang: { [index: string]: any } = {};
  uploader?: Uploader | MultipleUploader;
  emitter = mitt();
  uploadProgress = 0;
  inline = false;

  /**
   * Create a new Uppload instance
   * @param settings - Uppload instance settings
   */
  constructor(settings?: UpploadSettings) {
    this.settings = settings || {};
    this.updateSettings(this.settings);
    const div = document.createElement("div");
    this.renderContainer();
    div.classList.add("uppload-container");
    const body = document.body;
    if (body) {
      body.appendChild(div);
    }
    this.container = div;
    requestAnimationFrame(() => this.update());
  }

  /**
   * Update widget settings such as i18n
   * @param settings - Uppload settings object
   */
  updateSettings(settings: UpploadSettings) {
    this.emitter.emit("settingsUpdated", settings);
    if (settings.lang) setI18N(settings.lang);
    if (settings.defaultService) this.activeService = settings.defaultService;
    if (settings.lang) this.lang = settings.lang;
    if (settings.uploader) this.uploader = settings.uploader;
    this.inline = !!settings.inline;
    this.update();
    if (this.settings.customClass)
      this.container.classList.add(this.settings.customClass);
    if (this.inline) this.container.classList.add("uppload-inline");
  }

  private ready() {
    if (this.settings.value) this.bind(this.settings.value);
    this.renderContainer();
    this.emitter.emit("ready");
  }

  /**
   * Bind the image URL value to DOM elements
   * @param value - URL of the image
   */
  private bind(value: string) {
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

  /**
   * Use an uploader, service, or effect in your package
   * @param plugin - A single uploader, service, or effect or an array of them
   */
  use(
    plugin: UpploadService | UpploadEffect | UpploadService[] | UpploadEffect[]
  ) {
    if (Array.isArray(plugin)) {
      plugin.forEach((item: UpploadService | UpploadEffect) =>
        this.install(item)
      );
    } else {
      this.install(plugin);
    }
  }

  /**
   * Install a new uploader, service, or effect to this instance
   * @param plugin - A single uploader, service, or effect
   */
  private install(plugin: UpploadService | UpploadEffect) {
    // Check if the browser supports this plugin
    if (!plugin.supports()) return;
    if (plugin.type === "service") {
      // Install this service
      this.services.push(plugin as UpploadService);
      this.ready();
    } else if (plugin.type === "effect") {
      this.effects.push(plugin as UpploadEffect);
      this.ready();
    }
  }

  /**
   * Returns whether the modal is currently open
   */
  modalOpen() {
    return this.isOpen;
  }

  /**
   * Open the Uppload widget
   */
  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    const serviceRadio = this.container.querySelector(
      `input[type=radio][value='${this.activeService}']`
    );
    if (serviceRadio) serviceRadio.setAttribute("checked", "checked");
    this.update();
    const firstButton = this.container.querySelector(
      "button"
    ) as HTMLButtonElement | null;
    if (firstButton) firstButton.focus();
    this.emitter.emit("open");
  }

  /**
   * Close the Uppload widget
   */
  close() {
    if (!this.isOpen) return;
    this.stopCurrentService();
    this.isOpen = false;
    this.update();
    this.emitter.emit("close");
  }

  /**
   * Toggles the Uppload widget
   */
  toggle() {
    if (this.modalOpen()) this.close();
    else this.open();
  }

  /**
   * Re-render the widget
   */
  private update() {
    if (!this.container) return;
    const content = this.container.querySelector(".uppload-active-container");
    if (content) content.innerHTML = this.render();
    const aside = this.container.querySelector("aside");
    if (aside && this.activeService !== "default" && !this.activeEffect)
      aside.style.display = "block";
    const footerEffectsNav: HTMLElement | null = this.container.querySelector(
      ".effects-nav"
    );
    if (aside && footerEffectsNav && this.activeEffect) {
      footerEffectsNav.style.display = "";
      aside.style.display = "none";
    } else if (aside && footerEffectsNav && this.activeService === "default") {
      aside.style.display = "none";
      footerEffectsNav.style.display = "none";
    } else if (aside && footerEffectsNav) {
      aside.style.display = "";
      footerEffectsNav.style.display = "none";
    }
    const effectsContainer = this.container.querySelector(
      ".uppload-effect"
    ) as HTMLElement;
    if (effectsContainer)
      effectsContainer.style.display = this.activeEffect ? "" : "none";
    window.requestAnimationFrame(() => this.handlers());
    if (!this.isOpen) {
      this.container.classList.remove("visible");
    } else {
      this.container.classList.add("visible");
    }
    const effectsNav = this.container.querySelector(
      "footer.effects-nav .effects-tabs"
    ) as HTMLDivElement | null;
    if (effectsNav) {
      const parent = effectsNav.parentElement;
      if (parent) {
        let totalButtonsWidth = 0;
        const buttons = parent.querySelectorAll(".effects-continue");
        buttons.forEach(button => {
          const buttonSize = button.getBoundingClientRect();
          totalButtonsWidth += buttonSize.width;
        });
        const size = parent.getBoundingClientRect();
        effectsNav.style.width = `${size.width - totalButtonsWidth}px`;
      }
    }
  }

  /**
   * Returns the HTML template for the services navbar
   * @param sidebar - Whether this is an input radio (for sidebar) or buttons (for home)
   */
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
                : colorSVG(service.icon, service)
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

  /**
   * Returns the HTML template for the effects navbar
   */
  private getEffectsNavbar() {
    return `<div class="effects-continue">
    <button class="effects-continue--cancel">Cancel</button>
  </div><div class="effects-tabs"><div class="effects-tabs-flow">
      ${this.effects
        .map(
          effect => `
      <input type="radio" id="uppload-effect-radio-${effect.name}" value="${
            effect.name
          }" name="uppload-effect-radio">
        <label for="uppload-effect-radio-${effect.name}">
          ${
            effect.icon.startsWith("http")
              ? `<img class="effect-icon" alt="" src="${effect.icon}">`
              : colorSVG(effect.icon, effect)
          }
          <span>${
            this.lang.effects &&
            this.lang.effects[effect.name] &&
            this.lang.effects[effect.name].title
              ? this.lang.effects[effect.name].title
              : effect.name
          }</span>
        </label>
      `
        )
        .join("")}
      </div></div><div class="effects-continue">
        <button class="effects-continue--upload">Upload</button>
      </div>`;
  }

  /**
   * Renders the main container for the widget
   */
  private renderContainer() {
    if (this.container)
      this.container.innerHTML = `
      <div class="uppload-modal">
        <aside style="display: none">
          ${this.getNavbar(true)}
        </aside>
        <section>
          ${this.error ? `<div class="uppload-error">${this.error}</div>` : ""}
          <div class="uppload-active-container"></div>
          <footer style="display: none" class="effects-nav">${this.getEffectsNavbar()}</footer>
        </section>
      </div>
      <div class="uppload-modal-bg">
        <button class="uppload-close" aria-label="Close">&times;</button>
      </div>
    `;
  }

  /**
   * Render the content inside the widget container
   */
  private render() {
    return `
      ${this.error ? `<div class="uppload-error">${this.error}</div>` : ""}
      ${
        this.activeEffect
          ? `<div class="uppload-effect uppload-effect--${this.activeEffect ||
              "none"}">
      ${
        this.activeEffect && this.file ? this.renderActiveEffect(this.file) : ""
      }
    </div>`
          : `<div class="uppload-service uppload-service--${
              this.activeService
            }">
      ${this.activeEffect && this.file ? "" : this.renderActiveService()}
      ${this.activeService === "default" ? this.getNavbar() : ""}
    </div>`
      }`;
  }

  /**
   * Render the currently active service
   */
  private renderActiveService() {
    const activeServices = this.services.filter(
      service => service.name === this.activeService
    );
    if (activeServices.length) {
      const activeService = activeServices[0];
      requestAnimationFrame(() => {
        if (typeof activeService.handlers === "function")
          activeService.handlers({
            next: this.next.bind(this),
            upload: this.upload.bind(this),
            uploadMultiple: this.uploadMultiple.bind(this),
            handle: this.handle.bind(this),
            uppload: this
          });
      });
      return `${
        typeof activeService.template === "function"
          ? activeService.template(this)
          : ""
      }`;
    }
  }

  /**
   * Render the currently active effect
   */
  private renderActiveEffect(file: Blob) {
    const activeEffects = this.effects.filter(
      effect => effect.name === this.activeEffect
    );
    if (activeEffects.length) {
      const activeEffect = activeEffects[0];
      requestAnimationFrame(() => {
        if (typeof activeEffect.handlers === "function")
          activeEffect.handlers({
            next: this.next.bind(this),
            upload: this.upload.bind(this),
            uploadMultiple: this.uploadMultiple.bind(this),
            handle: this.handle.bind(this),
            uppload: this
          });
      });
      return `
        <div class="active-effect-container">${
          typeof activeEffect.template === "function"
            ? activeEffect.template(file)
            : ""
        }</div>
      `;
    }
  }

  /**
   * Uploads multiple files to the server
   * @param file
   * @returns JSON response from server
   */
  private uploadMultiple(file: Blob[]): Promise<any> {
    this.emitter.emit("before-upload");
    return new Promise(resolve => {
      this.navigate("uploading");
      if (this.uploader && typeof this.uploader === "function") {
        (this.uploader as MultipleUploader)(
          file,
          this.updateProgress.bind(this)
        )
          .then((response: any) => {
            this.navigate("default");
            resolve(response);
            this.emitter.emit("upload", response);
            this.close();
          })
          .catch((error: Error) => this.handle(error));
      } else {
        this.handle(new Error("no-uploader"));
      }
    });
  }

  /**
   * Updates the file and goes to the active effect
   * @param file - The currently active file Blob
   */
  private next(file: Blob) {
    this.stopCurrentService();
    this.file = file;
    if (this.effects.length && !this.activeEffect) {
      this.activeEffect = this.effects[0].name;
      this.update();
      const activeRadio = this.container.querySelector(
        `input[name='uppload-effect-radio'][value='${this.activeEffect}']`
      );
      if (activeRadio) activeRadio.setAttribute("checked", "checked");
    } else {
      // Upload directly
    }
  }

  compress(file: Blob) {
    if (typeof this.settings.compressor === "function")
      return this.settings.compressor(file);
    return compressImage(file, this.settings);
  }

  /**
   * Upload a file to the server
   * @param file - A Blob object containing the file to upload
   * @returns The file URL
   */
  upload(file: Blob): Promise<string> {
    this.emitter.emit("before-upload");
    return new Promise((resolve, reject) => {
      this.navigate("uploading");
      if (this.uploader && typeof this.uploader === "function") {
        this.compress(file)
          .then(file => {
            if (this.settings.compression) this.emitter.emit("compress", file);
            return file;
          })
          .then(file =>
            (this.uploader as Uploader)(file, this.updateProgress.bind(this))
          )
          .then((url: string) => {
            this.bind(url);
            this.navigate("default");
            resolve(url);
            this.emitter.emit("upload", url);
            this.close();
          })
          .catch((error: Error) => this.handle(error));
      } else {
        reject("no-uploader");
      }
    });
  }

  /**
   * Gracefully display an error message
   * @param error - Error to display
   */
  private handle(error: Error) {
    this.error = translate(error.message) || error.message;
    this.emitter.emit("error", this.error);
    this.update();
    if (this.activeService === "uploading") this.navigate("default");
    setTimeout(() => {
      this.error = undefined;
      this.update();
    }, 4000);
  }

  /**
   * Adds event handlers for the widget
   */
  private handlers() {
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
        if (service) {
          this.navigate(service);
          const serviceDiv = this.container.querySelector(
            `[data-uppload-service="${service}"]`
          );
          if (serviceDiv && serviceDiv.parentElement) {
            let top = 0;
            let left = 0;
            const serviceDivRect = serviceDiv.getBoundingClientRect();
            const serviceNavRect = serviceDiv.parentElement.getBoundingClientRect();
            top = serviceDivRect.top - serviceNavRect.top;
            left = serviceDivRect.left - serviceNavRect.left;
            const aside = serviceDiv.parentElement.parentElement;
            try {
              // Edge doesn't support scrollTo and throws an error
              if (aside) aside.scrollTo(left, top);
            } catch (error) {}
          }
        }
        const serviceRadio = this.container.querySelector(
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
    const inputRadios: NodeListOf<HTMLInputElement> = this.container.querySelectorAll(
      ".uppload-services input[type='radio']"
    );
    inputRadios.forEach(radio => {
      const radioFunction = (e: Event) => {
        const inputRadio = this.container.querySelector(
          "[name='uppload-radio']:checked"
        ) as HTMLInputElement;
        if (!inputRadio) return;
        const service = inputRadio.value;
        this.navigate(service);
      };
      safeListen(radio, "change", radioFunction);
    });

    /**
     * Clicking on each sidebar link should open its service
     */
    const effectInputRadios: NodeListOf<HTMLInputElement> = this.container.querySelectorAll(
      ".effects-nav input[type='radio']"
    );
    effectInputRadios.forEach(radio => {
      const radioFunction = (e: Event) => {
        const inputRadio = this.container.querySelector(
          "[name='uppload-effect-radio']:checked"
        ) as HTMLInputElement;
        if (!inputRadio) return;
        const effect = inputRadio.value;
        this.activeEffect = effect;
        this.update();
      };
      safeListen(radio, "change", radioFunction);
    });

    /**
     * Clicking on the background should close the modal
     */
    const background = this.container.querySelector(".uppload-modal-bg");
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

    /**
     * Clicking on the cancel button restarts the process
     */
    const cancelButton = this.container.querySelector(
      ".effects-continue--cancel"
    );
    if (cancelButton)
      safeListen(cancelButton, "click", () => {
        this.file = undefined;
        this.activeService = "default";
        this.activeEffect = "";
        this.update();
      });

    /**
     * Clicking on the cancel button restarts the process
     */
    const uploadButton = this.container.querySelector(
      ".effects-continue--upload"
    );
    if (uploadButton)
      safeListen(uploadButton, "click", () => {
        if (!this.file) return;
        this.activeService = "";
        this.activeEffect = "";
        this.upload(this.file);
      });
  }

  /**
   * Stops any actions being done by the currently active service
   * For example, if your webcame is being accessed, kill that process
   */
  private stopCurrentService() {
    const currentService = this.services.filter(
      item => item.name === this.activeService
    );
    if (currentService.length) {
      const service = currentService[0];
      service.stop();
    }
  }

  /**
   * Navigate to an Uppload service page
   * @param service - Slug name of service (e.g., instagram)
   */
  navigate(service: string) {
    if (!this.services.filter(item => item.name === service).length)
      throw new Error("invalid-service");
    this.stopCurrentService();
    this.activeService = service;
    this.update();
    const focusable = this.container.querySelector(
      ".uppload-active-container input, .uppload-active-container button"
    ) as HTMLInputElement | null;
    if (focusable) focusable.focus();
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

  /**
   * Updates the upload progress
   * @param progressPercent Current progress in percent
   */
  private updateProgress(progressPercent: number) {
    this.uploadProgress = progressPercent;
    const progressText = this.container.querySelector(
      ".uppload-loader-text .progress"
    );
    if (progressText)
      progressText.innerHTML = `${parseInt(progressPercent.toString())}%`;
    this.emitter.emit("progress", this.updateProgress);
  }
}
