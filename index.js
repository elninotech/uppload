import { addGlobalEvent } from "./modules/dispatch";
import en from "./modules/i18n/en";
import dispatch from "./modules/dispatch";
import servicesFunction from "./modules/services";
import css from "./uppload.scss";
import loadFile from "./modules/loadFile";
import arrayIncludes from "./modules/arrayIncludes";

/*
 * Converts number of bytes to readable string
 * 10000 => "10 KB"
 * Source: https://stackoverflow.com/a/18650828
 */
const bytesToSize = (bytes, decimals) => {
	if (bytes == 0) return "0 bytes";
	let k = 1000,
		dm = decimals || 2,
		sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/*
 * Checks whether browsers supports video
 * without actually asking permission for it
 */
let webcamAvailable = false;
navigator.getMedia =
	(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
if (typeof navigator.getMedia === "function") {
	webcamAvailable = true;
}

class Uppload {
	/**
	 * Initialize the plugin
	 * @constructor
	 * @param {object} settings - Object with user's config
	 */
	constructor(settings) {
		/*
		 * Metadata containing unique ID (multiple instances)
		 * Also includes globals like files
		 */
		this.meta = {
			uniqueId: Math.random()
				.toString(36)
				.slice(2),
			file: null
		};

		// Set user preferences as `settings`
		this.settings = settings || {};

		// Internationalization of text
		this.i18n = this.settings.i18n || en;

		// Stores boolean values if modal is open/uploading
		this.isOpen = false;
		this.isUploading = false;

		// Stores current image URL value
		this.value = null;

		// Current page you're on, fallback to default service or "upload"
		this.currentPage = this.settings.defaultService || "upload";

		// Array of services plugin should have, fallback default
		this.settings.services = this.settings.services || ["upload", "camera", "link", "instagram", "facebook"];
		// Remove `camera` from the array if browser doesn't support it
		if (!webcamAvailable) {
			const index = this.settings.services.indexOf("camera");
			if (index > -1) {
				this.settings.services.splice(index, 1);
			}
		}

		// Array or string contains allowed file types, default "*" => all
		this.settings.allowedTypes = this.settings.allowedTypes || "*";

		// Object contains configuration for image cropping
		this.settings.crop = this.settings.crop || {};

		// Object contains configuration for image format
		this.settings.uploadFormat = this.settings.uploadFormat || {};

		// Integer containing maximum file size, fallback to 100 MB
		this.settings.maxFileSize = parseInt(this.settings.maxFileSize) || "infinite";

		/**
		 * Returns whether current file type is allowed or not
		 * @param {File} file - File object containing selected file
		 * @returns {boolean}
		 */
		this.isFileTypeAllowed =
			this.settings.isFileTypeAllowed ||
			((file = this.meta.file) => {
				if (typeof this.settings.allowedTypes === "object" && this.settings.allowedTypes.length > 0) {
					if (arrayIncludes(this.settings.allowedTypes, file.type)) {
						return true;
					}
				} else if (this.settings.allowedTypes === file.type) {
					return true;
				} else if (this.settings.allowedTypes === "*") {
					return true;
				} else {
					if (arrayIncludes(file.type, `${this.settings.allowedTypes}/`)) {
						return true;
					}
				}
				return false;
			});

		/**
		 * Returns whether file size is in allowed range
		 * @param {File} file - File object containing selected file
		 * @returns {boolean}
		 */
		this.isFileSizeAllowed =
			this.settings.isFileSizeAllowed ||
			((file = this.meta.file) => {
				if (this.settings.maxFileSize === "infinite") {
					return true;
				} else if (this.settings.maxFileSize > file.size) {
					return true;
				}
				return false;
			});

		// Get all services
		this.services = servicesFunction(this);

		// Append modal to body
		this.backgroundElement = document.createElement("div");
		this.backgroundElement.classList.add("uppload-bg");
		document.body.appendChild(this.backgroundElement);

		this.modalElement = document.createElement("div");
		this.modalElement.classList.add("uppload-modal");
		this.modalElement.setAttribute("id", `uppload_${this.meta.uniqueId}`);
		this.modalElement.innerHTML = `
		<div>
			${this.services.navbar.html}
			<section>
				<div class="errorMessage"></div>
				<div class="currentPage"></div>
			</section>
		</div>
		`;
		document.body.appendChild(this.modalElement);
		const navbarChildren = document.querySelectorAll(`#uppload_${this.meta.uniqueId} .button_service`);
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
	}

	/**
	 * Shows error after selecting file
	 * @param {string} error - String for error text
	 */
	showError(error) {
		dispatch("fileError", error);
		const errorDiv = document.querySelector(`#uppload_${this.meta.uniqueId} .errorMessage`);
		errorDiv.style.display = "block";
		errorDiv.innerHTML = `<strong>${this.i18n.error}: </strong>${error}.`;
		setTimeout(() => {
			errorDiv.classList.add("visible");
		}, 1);
		setTimeout(() => {
			errorDiv.classList.remove("visible");
			const hideMe = () => {
				errorDiv.style.display = "none";
				errorDiv.removeEventListener("transitionend", hideMe);
			};
			errorDiv.addEventListener("transitionend", hideMe);
		}, this.settings.errorDelay || 3000);
	}

	/**
	 * Binds dispatch to user's callbacks
	 * @param {String} upploadEvent - Name of event listener
	 * @param {Function} upploadFunction - Function that receives callback
	 */
	on(upploadEvent, upploadFunction) {
		addGlobalEvent(upploadEvent, upploadFunction, this);
	}

	/**
	 * Binds dispatch to user's callbacks
	 * @param {String} newValue - New URL value to update to
	 * @param {Number} initial - 1 or 0 to say whether it's the initial URL update
	 */
	updateValue(newValue, initial = 0) {
		const elements = this.settings.bind || ["[data-uppload-value]"];
		for (let i = 0; i < elements.length; i++) {
			let $element = document.querySelector(elements[i]);
			if ($element) {
				if ($element.tagName === "IMG") {
					$element.setAttribute("src", newValue);
				} else {
					$element.setAttribute("value", newValue);
				}
				$element.classList.add(`uppload-${initial === 0 ? "updated" : "initialized"}`);
			}
		}
		this.value = newValue;
		if (initial === 0) {
			setTimeout(() => {
				this.closeModal();
			}, this.settings.successDelay || 1000);
		}
	}

	/**
	 * Opens the modal
	 */
	openModal() {
		loadFile("https://use.fontawesome.com/releases/v5.0.12/js/all.js");
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
	}

	/**
	 * Closes the modal
	 */
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
	}

	/**
	 * Navigates to a new service/page
	 * @param {String} newPage - Name of the service to go to
	 */
	changePage(newPage) {
		if (window.globalStream && typeof window.globalStream.getTracks === "function") window.globalStream.getTracks()[0].stop();
		if (!this.services[newPage]) return;
		document.querySelector(`#uppload_${this.meta.uniqueId} .currentPage`).innerHTML = this.services[newPage].html;
		if (typeof this.services[newPage].init === "function") this.services[newPage].init();
		dispatch("pageChanged", newPage);
		const navbarChildren = document.querySelectorAll(`#uppload_${this.meta.uniqueId} .button_service`);
		for (let i = 0; i < navbarChildren.length; i++) {
			navbarChildren[i].classList.remove("active");
		}
		const currentChild = document.querySelector(`#uppload_${this.meta.uniqueId} .button_service_${newPage}`);
		const navbar = document.querySelector(`#uppload_${this.meta.uniqueId} aside`);
		if (currentChild) {
			currentChild.classList.add("active");
		}
		navbar.querySelector(".button_service_preview").classList.add("active");
		if (newPage === "uploading" || newPage === "uploaded") {
			navbar.classList.add("hidden");
		} else {
			navbar.classList.remove("hidden");
		}
		if (arrayIncludes(["preview", "crop", "uploading", "uploaded"], newPage)) {
			navbar.querySelector(".button_service_preview").style.display = "";
		} else {
			navbar.querySelector(".button_service_preview").style.display = "none";
		}
	}
}

window.Uppload = Uppload; // for CDN
export default Uppload; // for ES6/CJS
