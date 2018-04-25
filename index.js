import metaData from "./modules/meta";
import { addGlobalEvent } from "./modules/dispatch";
import dispatch from "./modules/dispatch";
import pagesFunction from "./modules/pages";
import css from "./uppload.scss";

class Uppload {

    constructor(settings) {
    
        // Settings and initialization
        this.meta = metaData;
        this.settings = settings || {};
        this.isOpen = false;
        this.isUploading = false;
        this.value = null;
        this.services = this.settings.services || [];
        this.currentPage = this.settings.defaultPage || "upload";

        this.uploadFile = (file = this.meta.file) => {
            return new Promise((resolve, reject) => {
                this.isUploading = true;
                this.changePage("uploading");
                if (!file) {
                    this.isUploading = false;
                    this.changePage("uploaded");
                    const error = "No file selected";
                    dispatch("uploadError", error);
                    reject(error);
                    return;
                }
                dispatch("uploadStarted", file);
                setTimeout(() => {
                    if (typeof this.settings.uploadFunction === "function") {
                        this.settings.uploadFunction(file).then(url => {
                            this.updateValue(url);
                            dispatch("fileUploaded", url);
                            resolve(url);
                        }).catch(error => {
                            dispatch("fileError", error);
                            reject(error);
                        }).finally(() => {
                            this.isUploading = false;
                            this.changePage("uploaded");
                        });
                    } else if (this.settings.endpoint) {
                        if (typeof this.settings.endpoint === "string") {
                            this.settings.endpoint = {
                                url: this.settings.endpoint
                            }
                        }
                        fetch(this.settings.endpoint.url, {
                            method: this.settings.endpoint.method || "POST",
                            body: file
                        })
                            .then(response => response.json())
                            .then(url => {
                                dispatch("fileUploaded", url);
                                resolve(url);
                            }).catch(error => {
                                dispatch("fileUploaded", error);
                                reject(error);
                            }).finally(() => {
                                this.isUploading = false;
                                this.changePage("uploaded");
                            });
                    } else {
                        const error = "No endpoint or upload function found";
                        dispatch("uploadError", error);
                        reject(error);
                    }
                }, this.settings.minimumDelay || 0);
            });
        };
        this.pages = pagesFunction(this.uploadFile);

        // Append modal to body
        this.backgroundElement = document.createElement("div");
        this.backgroundElement.classList.add("uppload-bg");
        document.body.appendChild(this.backgroundElement);

        this.modalElement = document.createElement("div");
        this.modalElement.classList.add("uppload-modal");
        this.modalElement.setAttribute("id", `uppload_${metaData.uniqueId}`);
        this.modalElement.innerHTML =`
        <div>
            ${this.pages.navbar.html}
            <section class="currentPage"></section>
        </div>
        `;
        document.body.appendChild(this.modalElement);
        
        // Add keyboard and click events to close modal
        this.backgroundElement.addEventListener("click", this.closeModal.bind(this));
        window.addEventListener("keyup", event => {
            if (event.keyCode === 27 || event.which === 27 || event.key === "Escape" || event.code === "Escape") {
                this.backgroundElement.click();
            }
        });

        // Update default value of image
        if (this.settings.value) {
            this.updateValue(this.settings.value, 1);
        }

        // Add click event to button
        this.settings.call = this.settings.call || ["[data-uppload-button]"];
        for (let i = 0; i < this.settings.call.length; i++) {
            let $button = document.querySelectorAll(this.settings.call[i]);
            for (let j = 0; j < $button.length; j++) {
                $button[j].addEventListener("click", this.openModal.bind(this));
            }
        }

        // Custom events
        this.on = (upploadEvent, upploadFunction) => {
            addGlobalEvent(upploadEvent, upploadFunction);
        }
    
    }

    updateValue(newValue, initial = 0) {
        const elements = this.settings.bind || ["[data-uppload-value]"];
        for (let i = 0; i < elements.length; i++) {
            let $element = document.querySelector(elements[i]);
            if ($element.tagName === "IMG") {
                $element.setAttribute("src", newValue);
            } else {
                $element.setAttribute("value", newValue);
            }
            $element.classList.add(`uppload-${initial === 0 ? "updated" : "initialized"}`);
        }
        this.value = newValue;
        if (initial === 0) {
            setTimeout(() => {
                this.closeModal();
            }, this.settings.successDelay || 1500);
        }
    }

    openModal() {
        if (this.isOpen === true) return;
        this.changePage(this.currentPage);
        this.isOpen = true;
        dispatch("modalOpened");
        this.modalElement.classList.add("visible");
        this.backgroundElement.classList.add("visible");
        this.modalElement.classList.add("fadeIn");
        this.backgroundElement.classList.add("fadeIn");
        setTimeout(() => {
            this.modalElement.classList.remove("fadeIn");
            this.backgroundElement.classList.remove("fadeIn");
        }, 399);
    };
    
    closeModal() {
        if (this.isOpen === false) return;
        this.isOpen = false;
        dispatch("modalClosed");
        this.modalElement.classList.add("fadeOut");
        this.backgroundElement.classList.add("fadeOut");
        setTimeout(() => {
            this.modalElement.classList.remove("fadeOut");
            this.modalElement.classList.remove("visible");
            this.backgroundElement.classList.remove("fadeOut");
            this.backgroundElement.classList.remove("visible");
        }, 399);
    };

    changePage(newPage) {
        if (!this.pages[newPage]) return;
        document.querySelector(`#uppload_${metaData.uniqueId} .currentPage`).innerHTML = this.pages[newPage].html;
        if (typeof this.pages[newPage].init === "function") this.pages[newPage].init();
        dispatch("pageChanged", newPage);
        const navbar = document.querySelector(`#uppload_${metaData.uniqueId} aside`);
        if (newPage === "uploading" || newPage === "uploaded") {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
        }
    }

};
window.Uppload = Uppload; // for CDN
export default Uppload; // for ES6/CJS