(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === "object" && typeof module === "object") module.exports = factory();
	else if (typeof define === "function" && define.amd) define("uppload-vue", [], factory);
	else if (typeof exports === "object") exports["uppload-vue"] = factory();
	else root["uppload-vue"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
	return /******/ (function(modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/ var installedModules = {}; // The require function
		/******/
		/******/ /******/ function __webpack_require__(moduleId) {
			/******/
			/******/ // Check if module is in cache
			/******/ if (installedModules[moduleId]) {
				/******/ return installedModules[moduleId].exports;
				/******/
			} // Create a new module (and put it into the cache)
			/******/ /******/ var module = (installedModules[moduleId] = {
				/******/ i: moduleId,
				/******/ l: false,
				/******/ exports: {}
				/******/
			}); // Execute the module function
			/******/
			/******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded
			/******/
			/******/ /******/ module.l = true; // Return the exports of the module
			/******/
			/******/ /******/ return module.exports;
			/******/
		} // expose the modules object (__webpack_modules__)
		/******/
		/******/
		/******/ /******/ __webpack_require__.m = modules; // expose the module cache
		/******/
		/******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
		/******/
		/******/ /******/ __webpack_require__.d = function(exports, name, getter) {
			/******/ if (!__webpack_require__.o(exports, name)) {
				/******/ Object.defineProperty(exports, name, {
					/******/ configurable: false,
					/******/ enumerable: true,
					/******/ get: getter
					/******/
				});
				/******/
			}
			/******/
		}; // getDefaultExport function for compatibility with non-harmony modules
		/******/
		/******/ /******/ __webpack_require__.n = function(module) {
			/******/ var getter =
				module && module.__esModule
					? /******/ function getDefault() {
							return module["default"];
					  }
					: /******/ function getModuleExports() {
							return module;
					  };
			/******/ __webpack_require__.d(getter, "a", getter);
			/******/ return getter;
			/******/
		}; // Object.prototype.hasOwnProperty.call
		/******/
		/******/ /******/ __webpack_require__.o = function(object, property) {
			return Object.prototype.hasOwnProperty.call(object, property);
		}; // __webpack_public_path__
		/******/
		/******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
		/******/
		/******/ /******/ return __webpack_require__((__webpack_require__.s = 3));
		/******/
	})(
		/************************************************************************/
		/******/ [
			/* 0 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				const globalEvents = {};
				let scope;

				/**
				 * Add a event for user's listener
				 * @param {String} upploadEvent - Name of event
				 * @param {Function} upploadFunction - Callback function
				 * @param {Object} scopeElement - Parent Uppload object
				 */
				const addGlobalEvent = (upploadEvent, upploadFunction, scopeElement) => {
					if (!scope) scope = scopeElement;
					globalEvents[scope.meta.uniqueId] = globalEvents[scope.meta.uniqueId] || {};
					globalEvents[scope.meta.uniqueId][upploadEvent] = upploadFunction;
				};
				/* harmony export (immutable) */ __webpack_exports__["a"] = addGlobalEvent;

				/**
				 * Initialization function for Instagram service
				 * @param {Function} event - User's callback function
				 * @param {String} value - Param value
				 */
				/* harmony default export */ __webpack_exports__["b"] = (event, value) => {
					if (typeof globalEvents[scope.meta.uniqueId][event] === "function") {
						globalEvents[scope.meta.uniqueId][event](value);
					}
				};

				/***/
			},
			/* 1 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uppload__ = __webpack_require__(5);
				//
				//
				//
				//
				//
				//

				/* harmony default export */ __webpack_exports__["a"] = {
					props: {
						settings: {
							type: Object,
							default: {}
						}
					},

					data() {
						return {
							value: "",
							uppload: null
						};
					},

					mounted() {
						this.uppload = new __WEBPACK_IMPORTED_MODULE_0_uppload__["a" /* default */](this.settings);
						this.uppload.on("uploadStarted", () => {
							console.log("upload started");
						});
						setInterval(() => {
							console.log(this.uppload.value);
						}, 1000);
						this.uppload.on("fileUploaded", url => {
							console.log("upload successful");
							this.updateUrl(url);
							this.$emit("uploaded", url);
						});
					},

					methods: {
						openUppload() {
							this.uppload.openModal();
						},

						updateUrl(url) {
							console.log("UPDATE URL", url);
						}
					}
				};

				/***/
			},
			/* 2 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatch__ = __webpack_require__(0);

				/**
				 * Upload selected or new file
				 * @param {File} file - File object to upload
				 * @param {Object} scope - Parent Uppload object
				 * @returns {Promise}
				 */
				/* harmony default export */ __webpack_exports__["a"] = (file, scope) => {
					if (!file) file = scope.meta.file;
					return new Promise((resolve, reject) => {
						const throwFileUploadError = error => {
							scope.showError(error);
							reject(error);
						};
						if (!file) {
							throwFileUploadError(scope.i18n.errors.no_file_selected);
							return;
						}
						if (!scope.isFileTypeAllowed(file)) {
							throwFileUploadError(scope.i18n.errors.file_type_not_allowed);
							return;
						}
						if (!scope.isFileSizeAllowed(file)) {
							throwFileUploadError(
								scope.i18n.errors.file_too_large.replace(/_FILESIZE_/g, bytesToSize(scope.settings.maxFileSize))
							);
							return;
						}
						scope.isUploading = true;
						scope.changePage("uploading");
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("uploadStarted", file);
						setTimeout(() => {
							if (typeof scope.settings.uploadFunction === "function") {
								scope.settings
									.uploadFunction(file)
									.then(url => {
										scope.updateValue(url);
										Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileUploaded", url);
										resolve(url);
									})
									.catch(error => {
										Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("uploadError", error);
										reject(error);
									})
									.finally(() => {
										scope.isUploading = false;
										scope.changePage("uploaded");
									});
							} else if (scope.settings.endpoint) {
								if (typeof scope.settings.endpoint === "string") {
									scope.settings.endpoint = {
										url: scope.settings.endpoint
									};
								}
								fetch(scope.settings.endpoint.url, {
									method: scope.settings.endpoint.method || "POST",
									body: file,
									headers: scope.settings.headers || null
								})
									.then(response => response.json())
									.then(url => {
										Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileUploaded", url);
										resolve(url);
									})
									.catch(error => {
										Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileUploaded", error);
										reject(error);
									})
									.finally(() => {
										scope.isUploading = false;
										scope.changePage("uploaded");
									});
							} else {
								const error = scope.i18n.errors.no_endpoint;
								scope.showError(error);
								reject(error);
							}
						}, scope.settings.minimumDelay || 0);
					});
				};

				/***/
			},
			/* 3 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uppload_vue__ = __webpack_require__(
					1
				);
				/* empty harmony namespace reexport */
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9abc5a06_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_uppload_vue__ = __webpack_require__(
					15
				);
				var disposed = false;
				var normalizeComponent = __webpack_require__(4);
				/* script */

				/* template */

				/* template functional */
				var __vue_template_functional__ = false;
				/* styles */
				var __vue_styles__ = null;
				/* scopeId */
				var __vue_scopeId__ = null;
				/* moduleIdentifier (server only) */
				var __vue_module_identifier__ = null;
				var Component = normalizeComponent(
					__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uppload_vue__[
						"a" /* default */
					],
					__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9abc5a06_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_uppload_vue__[
						"a" /* default */
					],
					__vue_template_functional__,
					__vue_styles__,
					__vue_scopeId__,
					__vue_module_identifier__
				);
				Component.options.__file = "uppload.vue";

				/* hot reload */
				if (false) {
					(function() {
						var hotAPI = require("vue-hot-reload-api");
						hotAPI.install(require("vue"), false);
						if (!hotAPI.compatible) return;
						module.hot.accept();
						if (!module.hot.data) {
							hotAPI.createRecord("data-v-9abc5a06", Component.options);
						} else {
							hotAPI.reload("data-v-9abc5a06", Component.options);
						}
						module.hot.dispose(function(data) {
							disposed = true;
						});
					})();
				}

				/* harmony default export */ __webpack_exports__["default"] = Component.exports;

				/***/
			},
			/* 4 */
			/***/ function(module, exports) {
				/* globals __VUE_SSR_CONTEXT__ */

				// IMPORTANT: Do NOT use ES2015 features in this file.
				// This module is a runtime utility for cleaner component module output and will
				// be included in the final webpack user bundle.

				module.exports = function normalizeComponent(
					rawScriptExports,
					compiledTemplate,
					functionalTemplate,
					injectStyles,
					scopeId,
					moduleIdentifier /* server only */
				) {
					var esModule;
					var scriptExports = (rawScriptExports = rawScriptExports || {});

					// ES6 modules interop
					var type = typeof rawScriptExports.default;
					if (type === "object" || type === "function") {
						esModule = rawScriptExports;
						scriptExports = rawScriptExports.default;
					}

					// Vue.extend constructor export interop
					var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;

					// render functions
					if (compiledTemplate) {
						options.render = compiledTemplate.render;
						options.staticRenderFns = compiledTemplate.staticRenderFns;
						options._compiled = true;
					}

					// functional template
					if (functionalTemplate) {
						options.functional = true;
					}

					// scopedId
					if (scopeId) {
						options._scopeId = scopeId;
					}

					var hook;
					if (moduleIdentifier) {
						// server build
						hook = function(context) {
							// 2.3 injection
							context =
								context || // cached call
								(this.$vnode && this.$vnode.ssrContext) || // stateful
								(this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
							// 2.2 with runInNewContext: true
							if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
								context = __VUE_SSR_CONTEXT__;
							}
							// inject component styles
							if (injectStyles) {
								injectStyles.call(this, context);
							}
							// register component module identifier for async chunk inferrence
							if (context && context._registeredComponents) {
								context._registeredComponents.add(moduleIdentifier);
							}
						};
						// used by ssr in case component is cached and beforeCreate
						// never gets called
						options._ssrRegister = hook;
					} else if (injectStyles) {
						hook = injectStyles;
					}

					if (hook) {
						var functional = options.functional;
						var existing = functional ? options.render : options.beforeCreate;

						if (!functional) {
							// inject component registration as beforeCreate hook
							options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
						} else {
							// for template-only hot-reload because in that case the render fn doesn't
							// go through the normalizer
							options._injectStyles = hook;
							// register for functioal component in vue file
							options.render = function renderWithStyleInjection(h, context) {
								hook.call(context);
								return existing(h, context);
							};
						}
					}

					return {
						esModule: esModule,
						exports: scriptExports,
						options: options
					};
				};

				/***/
			},
			/* 5 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_dispatch__ = __webpack_require__(0);
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_i18n__ = __webpack_require__(6);
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_services__ = __webpack_require__(7);
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uppload_scss__ = __webpack_require__(10);
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uppload_scss___default = __webpack_require__.n(
					__WEBPACK_IMPORTED_MODULE_3__uppload_scss__
				);

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

				/**
				 * Returns whether current file type is allowed or not
				 * @constructor
				 * @param {string} author - The author of the book.
				 */
				class Uppload {
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
						this.i18n = this.settings.i18n || __WEBPACK_IMPORTED_MODULE_1__modules_i18n__["a" /* default */];

						// Stores boolean values if modal is open/uploading
						this.isOpen = false;
						this.isUploading = false;

						// Stores current image URL value
						this.value = null;

						// Current page you're on, fallback to default service or "upload"
						this.currentPage = this.settings.defaultService || "upload";

						// Array of services plugin should have, fallback default
						this.settings.services = this.settings.services || [
							"upload",
							"camera",
							"link",
							"facebook",
							"drive",
							"dropbox",
							"instagram"
						];

						// Array or string contains allowed file types, default "*" => all
						this.settings.allowedTypes = this.settings.allowedTypes || "*";

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
						this.services = Object(__WEBPACK_IMPORTED_MODULE_2__modules_services__["a" /* default */])(this);

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
						Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("fileError", error);
						document.querySelector(`#uppload_${this.meta.uniqueId} .errorMessage`).innerHTML = `<strong>${
							this.i18n.error
						}: </strong>${error}.`;
						document.querySelector(`#uppload_${this.meta.uniqueId} .errorMessage`).classList.add("visible");
						setTimeout(() => {
							document.querySelector(`#uppload_${this.meta.uniqueId} .errorMessage`).classList.remove("visible");
						}, this.settings.errorDelay || 3000);
					}

					/**
					 * Binds dispatch to user's callbacks
					 * @param {String} upploadEvent - Name of event listener
					 * @param {Function} upploadFunction - Function that receives callback
					 */
					on(upploadEvent, upploadFunction) {
						Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["a" /* addGlobalEvent */])(
							upploadEvent,
							upploadFunction,
							this
						);
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

					/**
					 * Opens the modal
					 */
					openModal() {
						if (this.isOpen === true) return;
						this.changePage(this.currentPage);
						this.isOpen = true;
						Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("modalOpened");
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
						Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("modalClosed");
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
						if (!this.services[newPage]) return;
						document.querySelector(`#uppload_${this.meta.uniqueId} .currentPage`).innerHTML = this.services[newPage].html;
						if (typeof this.services[newPage].init === "function") this.services[newPage].init();
						Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("pageChanged", newPage);
						const navbarChildren = document.querySelectorAll(`#uppload_${this.meta.uniqueId} .button_service`);
						for (let i = 0; i < navbarChildren.length; i++) {
							navbarChildren[i].classList.remove("active");
						}
						const currentChild = document.querySelector(`#uppload_${this.meta.uniqueId} .button_service_${newPage}`);
						if (currentChild) {
							currentChild.classList.add("active");
						}
						const navbar = document.querySelector(`#uppload_${this.meta.uniqueId} aside`);
						if (newPage === "uploading" || newPage === "uploaded") {
							navbar.classList.add("hidden");
						} else {
							navbar.classList.remove("hidden");
						}
					}
				}

				window.Uppload = Uppload; // for CDN
				/* harmony default export */ __webpack_exports__["a"] = Uppload; // for ES6/CJS

				/***/
			},
			/* 6 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				/* harmony default export */ __webpack_exports__["a"] = {
					uploading: "Uploading...",
					uploaded: "Uploaded",
					select_file: {
						drag_here: "Drag and drop here to upload",
						choose_file: "Choose a file",
						or: "or"
					},
					instagram: {
						post_url: "Instagram post URL",
						import: "Import from Instagram"
					},
					error: "Error",
					errors: {
						no_endpoint: "No endpoint or upload function found",
						no_file_selected: "You have not selected a file",
						file_type_not_allowed: "This file type is not allowed",
						file_too_large: "File should be smaller than _FILESIZE_",
						instagram_no_fetch: "Unable to fetch this image from Instagram"
					}
				};

				/***/
			},
			/* 7 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_select_file__ = __webpack_require__(8);
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_instagram__ = __webpack_require__(9);

				/**
				 * Returns layouts for different services
				 * @param {Object} scope - Parent Uppload object
				 */
				/* harmony default export */ __webpack_exports__["a"] = scope => {
					const services = scope.settings.services;
					const i18n = scope.i18n;
					const serviceMetas = {
						uploading: {
							html: `
                <div class="center-middle">
                    <div><i class="fas fa-spinner fa-spin loading-spinner"></i></div>
                    <div>${i18n.uploading}</div>
                </div>
            `
						},
						uploaded: {
							html: `
                <div class="center-middle">
                    <div><i class="fas fa-check uploaded-icon"></i></div>
                    <div>${i18n.uploaded}</div>
                </div>
            `
						},
						upload: {
							title: "Upload file",
							icon: `<i class="fas fa-fw fa-upload"></i>`,
							html: `
                <div class="center-middle">
                    <div id="dragDropElement" class="mb-full">${i18n.select_file.drag_here}</div>
                    <p class="mb-full"><em>${i18n.select_file.or}</em></p>
                    <button id="selectFileBtn" class="primary-button">${i18n.select_file.choose_file}</button>
                    <input type="file" id="dragDropFileElt">
                </div>
            `,
							init() {
								Object(__WEBPACK_IMPORTED_MODULE_0__services_select_file__["a" /* default */])(scope);
							}
						},
						camera: {
							icon: `<i class="fas fa-fw fa-camera"></i>`,
							title: "Camera",
							html: ``
						},
						link: {
							icon: `<i class="fas fa-fw fa-link"></i>`,
							title: "Import from URL",
							html: ``
						},
						facebook: {
							icon: `<i class="fab fa-fw fa-facebook"></i>`,
							title: "Facebook",
							html: ``
						},
						drive: {
							icon: `<i class="fab fa-fw fa-google-drive"></i>`,
							title: "Google Drive",
							html: ``
						},
						dropbox: {
							icon: `<i class="fab fa-fw fa-dropbox"></i>`,
							title: "Dropbox",
							html: ``
						},
						instagram: {
							icon: `<i class="fab fa-fw fa-instagram"></i>`,
							title: "Instagram",
							html: `
                <div class="center-middle">
                    <label>
                        <div>${i18n.instagram.post_url}</div>
                        <input id="instagramInput" type="text" value="https://www.instagram.com/p/BeV6tOhFUor" placeholder="https://www.instagram.com/p/BeV6tOhFUor">
                    </label>
                    <button id="instagramButton" class="primary-button">${i18n.instagram.import}</button>
                </div>
            `,
							init() {
								Object(__WEBPACK_IMPORTED_MODULE_1__services_instagram__["a" /* default */])(scope);
							}
						}
					};
					let navItems = ``;
					for (let i = 0; i < services.length; i++) {
						let currentService = serviceMetas[services[i]];
						if (currentService) {
							navItems += `
                <li class="button_service button_service_${services[i]}"><button>${currentService.icon || ""}${
								currentService.title
							}</button></li>
            `;
						}
					}
					serviceMetas.navbar = {
						html: `
            <aside>
                <nav>
                    <ul>
                        ${navItems}
                    </ul>
                </nav>
                <a class="uppload-branding" href="https://github.com/elninotech/uppload" target="_blank" rel="noopener noreferrer">Get Uppload</a>
            </aside>
        `
					};
					return serviceMetas;
				};

				/***/
			},
			/* 8 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatch__ = __webpack_require__(0);
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload__ = __webpack_require__(2);

				/**
				 * Initialization function for select/drag-drop file service
				 * @param {Object} scope - Parent Uppload object
				 */
				/* harmony default export */ __webpack_exports__["a"] = scope => {
					const safeUploadFile = () => {
						Object(__WEBPACK_IMPORTED_MODULE_1__upload__["a" /* default */])(null, scope).catch(() => {});
					};
					const dropper = document.querySelector(`#uppload_${scope.meta.uniqueId} #dragDropElement`);
					const inputFile = document.querySelector(`#uppload_${scope.meta.uniqueId} #dragDropFileElt`);
					dropper.addEventListener("drop", event => {
						if (event.dataTransfer.items) {
							if (event.dataTransfer.items[0].kind === "file") {
								scope.meta.file = event.dataTransfer.items[0].getAsFile();
								safeUploadFile();
								Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileDropped", scope.meta.file);
								Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
							}
						} else {
							scope.meta.file = event.dataTransfer.files[0];
							safeUploadFile();
							Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileDropped", scope.meta.file);
							Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
						}
						event.preventDefault();
					});
					dropper.addEventListener("dragenter", event => {
						dropper.classList.add("active");
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("dragEnter");
						event.preventDefault();
					});
					dropper.addEventListener("dragleave", event => {
						dropper.classList.remove("active");
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("dragLeave");
						event.preventDefault();
					});
					dropper.addEventListener("dragover", event => {
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("dragOver");
						event.preventDefault();
					});
					dropper.addEventListener("click", event => {
						inputFile.click();
						event.preventDefault();
					});
					document.querySelector(`#uppload_${scope.meta.uniqueId} #selectFileBtn`).addEventListener("click", event => {
						inputFile.click();
						event.preventDefault();
					});
					inputFile.addEventListener("change", event => {
						scope.meta.file = inputFile.files[0];
						safeUploadFile();
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
					});
				};

				/***/
			},
			/* 9 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatch__ = __webpack_require__(0);
				/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload__ = __webpack_require__(2);

				/**
				 * Initialization function for Instagram service
				 * @param {Object} scope - Parent Uppload object
				 */
				/* harmony default export */ __webpack_exports__["a"] = scope => {
					const safeUploadFile = () => {
						Object(__WEBPACK_IMPORTED_MODULE_1__upload__["a" /* default */])(null, scope).catch(() => {});
					};
					const err = () => {
						scope.changePage("instagram");
						const error = scope.i18n.errors.instagram_no_fetch;
						scope.showError(error);
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("uploadError", error);
						scope.isUploading = false;
					};
					const buttonElt = document.querySelector(`#uppload_${scope.meta.uniqueId} #instagramButton`);
					const inputElt = document.querySelector(`#uppload_${scope.meta.uniqueId} #instagramInput`);
					buttonElt.addEventListener("click", event => {
						scope.changePage("uploading");
						scope.isUploading = true;
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("uploadStarted");
						setTimeout(() => {
							fetch(`https://api.microlink.io/?url=${inputElt.value}`)
								.then(response => response.json())
								.then(json => {
									if (json.status === "success") {
										if (json.data && json.data.image && json.data.image.url) {
											Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileUploaded", json.data.image.url);
											scope.changePage("uploaded");
											scope.isUploading = false;
											scope.updateValue(json.data.image.url);
										} else {
											err();
										}
									} else {
										err();
									}
								})
								.catch(error => {
									err();
								});
						}, scope.settings.minimumDelay || 0);
					});
					inputElt.addEventListener("keyup", event => {
						event.preventDefault();
						if (event.keyCode === 13) {
							buttonElt.click();
						}
					});
				};

				/***/
			},
			/* 10 */
			/***/ function(module, exports, __webpack_require__) {
				var content = __webpack_require__(11);

				if (typeof content === "string") content = [[module.i, content, ""]];

				var transform;
				var insertInto;

				var options = { hmr: true };

				options.transform = transform;
				options.insertInto = undefined;

				var update = __webpack_require__(13)(content, options);

				if (content.locals) module.exports = content.locals;

				if (false) {
					module.hot.accept("!!../css-loader/index.js!../sass-loader/lib/loader.js!./uppload.scss", function() {
						var newContent = require("!!../css-loader/index.js!../sass-loader/lib/loader.js!./uppload.scss");

						if (typeof newContent === "string") newContent = [[module.id, newContent, ""]];

						var locals = (function(a, b) {
							var key,
								idx = 0;

							for (key in a) {
								if (!b || a[key] !== b[key]) return false;
								idx++;
							}

							for (key in b) idx--;

							return idx === 0;
						})(content.locals, newContent.locals);

						if (!locals) throw new Error("Aborting CSS HMR due to changed css-modules locals.");

						update(newContent);
					});

					module.hot.dispose(function() {
						update();
					});
				}

				/***/
			},
			/* 11 */
			/***/ function(module, exports, __webpack_require__) {
				exports = module.exports = __webpack_require__(12)(false);
				// imports

				// module
				exports.push([
					module.i,
					'.uppload-bg {\n  position: fixed;\n  z-index: 10000;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5); }\n\n.uppload-modal {\n  position: fixed;\n  background: #fff;\n  z-index: 11000;\n  box-sizing: border-box;\n  overflow: hidden;\n  border-radius: 0.25rem; }\n\n.uppload-modal, .uppload-bg {\n  display: none;\n  opacity: 0; }\n  .uppload-modal.visible, .uppload-bg.visible {\n    opacity: 1;\n    display: block; }\n  .uppload-modal.fadeIn, .uppload-bg.fadeIn {\n    animation: fadeIn 0.4s;\n    animation-iteration-count: 1;\n    animation-fill-mode: forwards; }\n  .uppload-modal.fadeOut, .uppload-bg.fadeOut {\n    animation: fadeOut 0.4s;\n    animation-iteration-count: 1;\n    animation-fill-mode: forwards; }\n  .uppload-modal.hidden, .uppload-bg.hidden {\n    display: none; }\n\n@keyframes fadeOut {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n.uppload-bg::after {\n  z-index: 1;\n  cursor: pointer;\n  content: "\\D7";\n  font-family: sans-serif;\n  position: fixed;\n  font-size: 32px;\n  line-height: 0.5;\n  right: 2vw;\n  top: 2vw;\n  color: rgba(255, 255, 255, 0.5); }\n\n@media (min-width: 860px) {\n  .uppload-modal {\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 720px;\n    height: 500px; } }\n\n@media (max-width: 860px) {\n  .uppload-modal {\n    left: 0;\n    right: 0;\n    top: 10vh;\n    bottom: 0; } }\n\n.uppload-modal aside {\n  background-color: whitesmoke;\n  border-right: 1px solid rgba(0, 0, 0, 0.075);\n  transition: 1s; }\n  .uppload-modal aside.hidden {\n    opacity: 0.333; }\n  .uppload-modal aside nav ul {\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n    .uppload-modal aside nav ul li svg {\n      margin-right: 0.5rem;\n      opacity: 0.5;\n      transition: 0.3s; }\n    .uppload-modal aside nav ul li button {\n      text-align: left;\n      transition: 0.3s;\n      font: inherit;\n      background: none;\n      appearance: none;\n      border: none;\n      padding: 1rem;\n      border-radius: 0;\n      color: inherit; }\n      .uppload-modal aside nav ul li button:focus {\n        outline: none;\n        background-color: rgba(0, 0, 0, 0.075); }\n        .uppload-modal aside nav ul li button:focus svg {\n          opacity: 1; }\n    .uppload-modal aside nav ul li.active button {\n      background-color: rgba(0, 0, 0, 0.075); }\n      .uppload-modal aside nav ul li.active button svg {\n        opacity: 1; }\n\n@media (min-width: 860px) {\n  .uppload-modal aside {\n    width: 200px;\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    overflow-y: auto;\n    padding-bottom: 2rem; }\n    .uppload-modal aside nav li button {\n      display: block;\n      width: 100%;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.075); }\n      .uppload-modal aside nav li button:hover {\n        background-color: rgba(0, 0, 0, 0.05); }\n  .uppload-modal section {\n    position: absolute;\n    right: 0;\n    left: 200px;\n    top: 0;\n    bottom: 0;\n    overflow-y: auto; } }\n\n.uppload-branding {\n  font-size: 80%;\n  color: rgba(0, 0, 0, 0.3);\n  text-decoration: none;\n  position: absolute;\n  bottom: 1rem;\n  left: 1rem; }\n  .uppload-branding:hover {\n    color: rgba(0, 0, 0, 0.5); }\n\n@media (max-width: 860px) {\n  .uppload-modal aside nav ul {\n    white-space: nowrap;\n    overflow-x: auto; }\n  .uppload-modal aside nav li {\n    display: inline-block; } }\n\n.uppload-modal #instagramButton {\n  background-color: #d62976; }\n\n.uppload-modal #dragDropElement {\n  border: 2px dashed #aaa;\n  padding: 5rem 0;\n  transition: 0.5s; }\n  .uppload-modal #dragDropElement.active {\n    transform: scale(1.05);\n    background-color: whitesmoke; }\n\n.uppload-modal #dragDropFileElt {\n  display: none !important; }\n\n.uppload-modal .center-middle {\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 5rem;\n  right: 5rem; }\n\n.uppload-modal .primary-button {\n  background-color: #00a8ff;\n  color: #fff;\n  border: none;\n  transition: 0.3s;\n  font: inherit;\n  font-size: 115%;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.25rem; }\n  .uppload-modal .primary-button:hover {\n    background-color: #0097e6; }\n\n.uppload-modal .uppload-modal p {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n  .uppload-modal .uppload-modal p:last-child {\n    margin-bottom: 0; }\n\n.uppload-modal .mb-full {\n  margin-bottom: 1.5rem !important; }\n\n.uppload-modal .loading-spinner, .uppload-modal .uploaded-icon {\n  color: #aaa;\n  font-size: 300%;\n  margin-bottom: 1.5rem; }\n\n.uppload-modal .uploaded-icon {\n  background-color: #2ed573;\n  color: #fff;\n  padding: 1rem;\n  border-radius: 100%; }\n\n.uppload-modal .errorMessage {\n  color: rgba(255, 255, 255, 0.9);\n  background-color: #ff4757;\n  padding: 1rem;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  opacity: 0;\n  transition: 0.5s; }\n  .uppload-modal .errorMessage.visible {\n    opacity: 1; }\n\n.uppload-modal label {\n  font-size: 110%;\n  margin-bottom: 1.5rem; }\n  .uppload-modal label div {\n    margin-bottom: 1rem; }\n\n@media (max-width: 860px) {\n  .uppload-modal .errorMessage {\n    top: auto;\n    bottom: 0; }\n  .uppload-modal .center-middle {\n    left: 1.5rem;\n    right: 1.5rem; } }\n',
					""
				]);

				// exports

				/***/
			},
			/* 12 */
			/***/ function(module, exports) {
				/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
				// css base code, injected by the css-loader
				module.exports = function(useSourceMap) {
					var list = [];

					// return the list of modules as css string
					list.toString = function toString() {
						return this.map(function(item) {
							var content = cssWithMappingToString(item, useSourceMap);
							if (item[2]) {
								return "@media " + item[2] + "{" + content + "}";
							} else {
								return content;
							}
						}).join("");
					};

					// import a list of modules into the list
					list.i = function(modules, mediaQuery) {
						if (typeof modules === "string") modules = [[null, modules, ""]];
						var alreadyImportedModules = {};
						for (var i = 0; i < this.length; i++) {
							var id = this[i][0];
							if (typeof id === "number") alreadyImportedModules[id] = true;
						}
						for (i = 0; i < modules.length; i++) {
							var item = modules[i];
							// skip already imported module
							// this implementation is not 100% perfect for weird media query combinations
							//  when a module is imported multiple times with different media queries.
							//  I hope this will never occur (Hey this way we have smaller bundles)
							if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
								if (mediaQuery && !item[2]) {
									item[2] = mediaQuery;
								} else if (mediaQuery) {
									item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
								}
								list.push(item);
							}
						}
					};
					return list;
				};

				function cssWithMappingToString(item, useSourceMap) {
					var content = item[1] || "";
					var cssMapping = item[3];
					if (!cssMapping) {
						return content;
					}

					if (useSourceMap && typeof btoa === "function") {
						var sourceMapping = toComment(cssMapping);
						var sourceURLs = cssMapping.sources.map(function(source) {
							return "/*# sourceURL=" + cssMapping.sourceRoot + source + " */";
						});

						return [content]
							.concat(sourceURLs)
							.concat([sourceMapping])
							.join("\n");
					}

					return [content].join("\n");
				}

				// Adapted from convert-source-map (MIT)
				function toComment(sourceMap) {
					// eslint-disable-next-line no-undef
					var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
					var data = "sourceMappingURL=data:application/json;charset=utf-8;base64," + base64;

					return "/*# " + data + " */";
				}

				/***/
			},
			/* 13 */
			/***/ function(module, exports, __webpack_require__) {
				/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

				var stylesInDom = {};

				var memoize = function(fn) {
					var memo;

					return function() {
						if (typeof memo === "undefined") memo = fn.apply(this, arguments);
						return memo;
					};
				};

				var isOldIE = memoize(function() {
					// Test for IE <= 9 as proposed by Browserhacks
					// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
					// Tests for existence of standard globals is to allow style-loader
					// to operate correctly into non-standard environments
					// @see https://github.com/webpack-contrib/style-loader/issues/177
					return window && document && document.all && !window.atob;
				});

				var getTarget = function(target) {
					return document.querySelector(target);
				};

				var getElement = (function(fn) {
					var memo = {};

					return function(target) {
						// If passing function in options, then use it for resolve "head" element.
						// Useful for Shadow Root style i.e
						// {
						//   insertInto: function () { return document.querySelector("#foo").shadowRoot }
						// }
						if (typeof target === "function") {
							return target();
						}
						if (typeof memo[target] === "undefined") {
							var styleTarget = getTarget.call(this, target);
							// Special case to return head of iframe instead of iframe itself
							if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
								try {
									// This will throw an exception if access to iframe is blocked
									// due to cross-origin restrictions
									styleTarget = styleTarget.contentDocument.head;
								} catch (e) {
									styleTarget = null;
								}
							}
							memo[target] = styleTarget;
						}
						return memo[target];
					};
				})();

				var singleton = null;
				var singletonCounter = 0;
				var stylesInsertedAtTop = [];

				var fixUrls = __webpack_require__(14);

				module.exports = function(list, options) {
					if (typeof DEBUG !== "undefined" && DEBUG) {
						if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
					}

					options = options || {};

					options.attrs = typeof options.attrs === "object" ? options.attrs : {};

					// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
					// tags it will allow on a page
					if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

					// By default, add <style> tags to the <head> element
					if (!options.insertInto) options.insertInto = "head";

					// By default, add <style> tags to the bottom of the target
					if (!options.insertAt) options.insertAt = "bottom";

					var styles = listToStyles(list, options);

					addStylesToDom(styles, options);

					return function update(newList) {
						var mayRemove = [];

						for (var i = 0; i < styles.length; i++) {
							var item = styles[i];
							var domStyle = stylesInDom[item.id];

							domStyle.refs--;
							mayRemove.push(domStyle);
						}

						if (newList) {
							var newStyles = listToStyles(newList, options);
							addStylesToDom(newStyles, options);
						}

						for (var i = 0; i < mayRemove.length; i++) {
							var domStyle = mayRemove[i];

							if (domStyle.refs === 0) {
								for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

								delete stylesInDom[domStyle.id];
							}
						}
					};
				};

				function addStylesToDom(styles, options) {
					for (var i = 0; i < styles.length; i++) {
						var item = styles[i];
						var domStyle = stylesInDom[item.id];

						if (domStyle) {
							domStyle.refs++;

							for (var j = 0; j < domStyle.parts.length; j++) {
								domStyle.parts[j](item.parts[j]);
							}

							for (; j < item.parts.length; j++) {
								domStyle.parts.push(addStyle(item.parts[j], options));
							}
						} else {
							var parts = [];

							for (var j = 0; j < item.parts.length; j++) {
								parts.push(addStyle(item.parts[j], options));
							}

							stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
						}
					}
				}

				function listToStyles(list, options) {
					var styles = [];
					var newStyles = {};

					for (var i = 0; i < list.length; i++) {
						var item = list[i];
						var id = options.base ? item[0] + options.base : item[0];
						var css = item[1];
						var media = item[2];
						var sourceMap = item[3];
						var part = { css: css, media: media, sourceMap: sourceMap };

						if (!newStyles[id]) styles.push((newStyles[id] = { id: id, parts: [part] }));
						else newStyles[id].parts.push(part);
					}

					return styles;
				}

				function insertStyleElement(options, style) {
					var target = getElement(options.insertInto);

					if (!target) {
						throw new Error(
							"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
						);
					}

					var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

					if (options.insertAt === "top") {
						if (!lastStyleElementInsertedAtTop) {
							target.insertBefore(style, target.firstChild);
						} else if (lastStyleElementInsertedAtTop.nextSibling) {
							target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
						} else {
							target.appendChild(style);
						}
						stylesInsertedAtTop.push(style);
					} else if (options.insertAt === "bottom") {
						target.appendChild(style);
					} else if (typeof options.insertAt === "object" && options.insertAt.before) {
						var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
						target.insertBefore(style, nextSibling);
					} else {
						throw new Error(
							"[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
						);
					}
				}

				function removeStyleElement(style) {
					if (style.parentNode === null) return false;
					style.parentNode.removeChild(style);

					var idx = stylesInsertedAtTop.indexOf(style);
					if (idx >= 0) {
						stylesInsertedAtTop.splice(idx, 1);
					}
				}

				function createStyleElement(options) {
					var style = document.createElement("style");

					if (options.attrs.type === undefined) {
						options.attrs.type = "text/css";
					}

					addAttrs(style, options.attrs);
					insertStyleElement(options, style);

					return style;
				}

				function createLinkElement(options) {
					var link = document.createElement("link");

					if (options.attrs.type === undefined) {
						options.attrs.type = "text/css";
					}
					options.attrs.rel = "stylesheet";

					addAttrs(link, options.attrs);
					insertStyleElement(options, link);

					return link;
				}

				function addAttrs(el, attrs) {
					Object.keys(attrs).forEach(function(key) {
						el.setAttribute(key, attrs[key]);
					});
				}

				function addStyle(obj, options) {
					var style, update, remove, result;

					// If a transform function was defined, run it on the css
					if (options.transform && obj.css) {
						result = options.transform(obj.css);

						if (result) {
							// If transform returns a value, use that instead of the original css.
							// This allows running runtime transformations on the css.
							obj.css = result;
						} else {
							// If the transform function returns a falsy value, don't add this css.
							// This allows conditional loading of css
							return function() {
								// noop
							};
						}
					}

					if (options.singleton) {
						var styleIndex = singletonCounter++;

						style = singleton || (singleton = createStyleElement(options));

						update = applyToSingletonTag.bind(null, style, styleIndex, false);
						remove = applyToSingletonTag.bind(null, style, styleIndex, true);
					} else if (
						obj.sourceMap &&
						typeof URL === "function" &&
						typeof URL.createObjectURL === "function" &&
						typeof URL.revokeObjectURL === "function" &&
						typeof Blob === "function" &&
						typeof btoa === "function"
					) {
						style = createLinkElement(options);
						update = updateLink.bind(null, style, options);
						remove = function() {
							removeStyleElement(style);

							if (style.href) URL.revokeObjectURL(style.href);
						};
					} else {
						style = createStyleElement(options);
						update = applyToTag.bind(null, style);
						remove = function() {
							removeStyleElement(style);
						};
					}

					update(obj);

					return function updateStyle(newObj) {
						if (newObj) {
							if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
								return;
							}

							update((obj = newObj));
						} else {
							remove();
						}
					};
				}

				var replaceText = (function() {
					var textStore = [];

					return function(index, replacement) {
						textStore[index] = replacement;

						return textStore.filter(Boolean).join("\n");
					};
				})();

				function applyToSingletonTag(style, index, remove, obj) {
					var css = remove ? "" : obj.css;

					if (style.styleSheet) {
						style.styleSheet.cssText = replaceText(index, css);
					} else {
						var cssNode = document.createTextNode(css);
						var childNodes = style.childNodes;

						if (childNodes[index]) style.removeChild(childNodes[index]);

						if (childNodes.length) {
							style.insertBefore(cssNode, childNodes[index]);
						} else {
							style.appendChild(cssNode);
						}
					}
				}

				function applyToTag(style, obj) {
					var css = obj.css;
					var media = obj.media;

					if (media) {
						style.setAttribute("media", media);
					}

					if (style.styleSheet) {
						style.styleSheet.cssText = css;
					} else {
						while (style.firstChild) {
							style.removeChild(style.firstChild);
						}

						style.appendChild(document.createTextNode(css));
					}
				}

				function updateLink(link, options, obj) {
					var css = obj.css;
					var sourceMap = obj.sourceMap;

					/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
					var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

					if (options.convertToAbsoluteUrls || autoFixUrls) {
						css = fixUrls(css);
					}

					if (sourceMap) {
						// http://stackoverflow.com/a/26603875
						css +=
							"\n/*# sourceMappingURL=data:application/json;base64," +
							btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) +
							" */";
					}

					var blob = new Blob([css], { type: "text/css" });

					var oldSrc = link.href;

					link.href = URL.createObjectURL(blob);

					if (oldSrc) URL.revokeObjectURL(oldSrc);
				}

				/***/
			},
			/* 14 */
			/***/ function(module, exports) {
				/**
				 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
				 * embed the css on the page. This breaks all relative urls because now they are relative to a
				 * bundle instead of the current page.
				 *
				 * One solution is to only use full urls, but that may be impossible.
				 *
				 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
				 *
				 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
				 *
				 */

				module.exports = function(css) {
					// get current location
					var location = typeof window !== "undefined" && window.location;

					if (!location) {
						throw new Error("fixUrls requires window.location");
					}

					// blank or null?
					if (!css || typeof css !== "string") {
						return css;
					}

					var baseUrl = location.protocol + "//" + location.host;
					var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

					// convert each url(...)
					/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
					var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
						// strip quotes (if they exist)
						var unquotedOrigUrl = origUrl
							.trim()
							.replace(/^"(.*)"$/, function(o, $1) {
								return $1;
							})
							.replace(/^'(.*)'$/, function(o, $1) {
								return $1;
							});

						// already a full url? no change
						if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
							return fullMatch;
						}

						// convert the url to a full url
						var newUrl;

						if (unquotedOrigUrl.indexOf("//") === 0) {
							//TODO: should we add protocol?
							newUrl = unquotedOrigUrl;
						} else if (unquotedOrigUrl.indexOf("/") === 0) {
							// path should be relative to the base url
							newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
						} else {
							// path should be relative to current directory
							newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
						}

						// send back the fixed url(...)
						return "url(" + JSON.stringify(newUrl) + ")";
					});

					// send back the fixed css
					return fixedCss;
				};

				/***/
			},
			/* 15 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				"use strict";
				var render = function() {
					var _vm = this;
					var _h = _vm.$createElement;
					var _c = _vm._self._c || _h;
					return _c(
						"div",
						{
							on: {
								click: function($event) {
									$event.preventDefault();
									return _vm.openUppload($event);
								}
							}
						},
						[_vm._t("default")],
						2
					);
				};
				var staticRenderFns = [];
				render._withStripped = true;
				var esExports = { render: render, staticRenderFns: staticRenderFns };
				/* harmony default export */ __webpack_exports__["a"] = esExports;
				if (false) {
					module.hot.accept();
					if (module.hot.data) {
						require("vue-hot-reload-api").rerender("data-v-9abc5a06", esExports);
					}
				}

				/***/
			}
			/******/
		]
	);
});
