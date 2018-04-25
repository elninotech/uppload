import metaData from "./modules/meta";
import { addGlobalEvent } from "./modules/dispatch";
import dispatch from "./modules/dispatch";
import pagesFunction from "./modules/pages";
import css from "./uppload.scss";

const bytesToSize = bytes => {
    const sizes = ["bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
} 

class Uppload {

    constructor(settings) {
        
        // Settings and initialization
        this.meta = metaData;
        this.settings = settings || {};
        this.isOpen = false;
        this.isUploading = false;
        this.value = null;
        this.currentPage = this.settings.defaultService || "upload";
        this.settings.services = this.settings.services || ["upload"];
        this.settings.allowedTypes = this.settings.allowedTypes || "*";
        this.settings.maxFileSize = parseInt(this.settings.maxFileSize) || 100000000;

        this.isFileTypeAllowed = this.settings.isFileTypeAllowed || ((file = this.meta.file) => {
            if (typeof this.settings.allowedTypes === "object" && this.settings.allowedTypes.length > 0) {
                if (this.settings.allowedTypes.includes(file.type)) {
                    return true;
                }
            } else if (this.settings.allowedTypes === file.type) {
                return true;
            } else if (this.settings.allowedTypes === "*") {
                return true;
            } else {
                if (file.type.includes(`${this.settings.allowedTypes}/`)) {
                    return true;
                }
            }
            return false;
        });

        this.isFileSizeAllowed = this.settings.isFileSizeAllowed || ((file = this.meta.file) => {
            if (this.settings.maxFileSize > file.size) {
                return true;
            }
            return false;
        });

        this.showError = error => {
            dispatch("fileError", error);
            document.querySelector(`#uppload_${metaData.uniqueId} .errorMessage`).innerHTML = `<strong>Error: </strong>${error}.`;
            document.querySelector(`#uppload_${metaData.uniqueId} .errorMessage`).classList.add("visible");
            setTimeout(() => {
                document.querySelector(`#uppload_${metaData.uniqueId} .errorMessage`).classList.remove("visible");
            }, this.settings.errorDelay || 3000);
        };

        this.uploadFile = (file = this.meta.file) => {
            return new Promise((resolve, reject) => {
                if (!file) {
                    const error = "You have not selected a file";
                    showError(error);
                    reject(error);
                    return;
                }
                if (!this.isFileTypeAllowed(file)) {
                    const error = "This file type is not allowed";
                    this.showError(error);
                    reject(error);
                    return;
                }
                if (!this.isFileSizeAllowed(file)) {
                    const error = `File should be smaller than ${bytesToSize(this.settings.maxFileSize)}`;
                    this.showError(error);
                    reject(error);
                    return;
                }
                this.isUploading = true;
                this.changePage("uploading");
                dispatch("uploadStarted", file);
                setTimeout(() => {
                    if (typeof this.settings.uploadFunction === "function") {
                        this.settings.uploadFunction(file).then(url => {
                            this.updateValue(url);
                            dispatch("fileUploaded", url);
                            resolve(url);
                        }).catch(error => {
                            dispatch("uploadError", error);
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
                            body: file,
                            headers: this.settings.headers || null
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
                        showError(error);
                        reject(error);
                    }
                }, this.settings.minimumDelay || 0);
            });
        };
        this.pages = pagesFunction(this.uploadFile, this.settings.services);

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
            <section>
                <div class="errorMessage"></div>
                <div class="currentPage"></div>
            </section>
        </div>
        `;
        document.body.appendChild(this.modalElement);
        const navbarChildren = document.querySelectorAll(`#uppload_${metaData.uniqueId} .button_service`);
        for (let i = 0; i < navbarChildren.length; i++) {
            let currentChild = navbarChildren[i];
            currentChild.addEventListener("click", () => {
                this.changePage(currentChild.className.replace("button_service button_service_", ""));
            });
        }
        
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
        const navbarChildren = document.querySelectorAll(`#uppload_${metaData.uniqueId} .button_service`);
        for (let i = 0; i < navbarChildren.length; i++) {
            navbarChildren[i].classList.remove("active");
        }
        const currentChild = document.querySelector(`#uppload_${metaData.uniqueId} .button_service_${newPage}`);
        if (currentChild) {
            currentChild.classList.add("active");
        }
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