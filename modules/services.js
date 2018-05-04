import crop from "./services/crop";
import preview from "./services/preview";
import selectFile from "./services/select-file";
import camera from "./services/camera";
import microLinkFetch from "./services/microLinkFetch";

let cameraIcon = `<svg class="svg-inline--fa fa-camera fa-w-16 fa-fw" aria-hidden="true" data-prefix="fas" data-icon="camera" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg>`;

/**
 * Returns layouts for different services
 * @param {Object} scope - Parent Uppload object
 */
export default scope => {
	const services = scope.settings.services;
	const i18n = scope.i18n;
	const serviceMetas = {
		preview: {
			html: `
				<div class="preview-container">
					<div class="preview">
						<img id="previewImage">
					</div>
					<div class="bottom-buttons">
						<div class="cta">
							<button class="primary-button secondary" id="backBtn"><i class="fas fa-arrow-left"></i> &nbsp;${i18n.preview.back}</button>
							<button class="primary-button" id="continueBtn">${i18n.preview.continue} &nbsp;<i class="fas fa-arrow-right"></i></button>
						</div>
					</div>
				</div>
            `,
			init() {
				preview(scope);
			}
		},
		crop: {
			html: `
				<div class="crop-container">
					<div class="preview">
						<div>
							<img id="previewImage" draggable="false">
						</div>
					</div>
					<div class="bottom-buttons">
						<div class="cta"><button class="primary-button" id="cropAndUploadBtn">${i18n.crop.upload}</button></div>
					</div>
				</div>
            `,
			init() {
				crop(scope);
			}
		},
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
				selectFile(scope);
			}
		},
		camera: {
			icon: `${cameraIcon}`,
			title: "Camera",
			html: `
				<div class="camera-container">
					<div class="preview">
						<video id="cameraVideo">${i18n.errors.video_unavailable}</video>
						<canvas id="cameraCanvas"></canvas>
					</div>
					<div class="bottom-buttons">
						<div class="cta"><button class="primary-button" id="clickButton">${cameraIcon} &nbsp;${i18n.camera.click}</button></div>
					</div>
				</div>
			`,
			init() {
				camera(scope);
			}
		},
		link: {
			icon: `<i class="fas fa-fw fa-link"></i>`,
			title: "Import from URL",
			html: `
                <div class="center-middle">
                    <label>
                        <div>${i18n.link.post_url}</div>
                        <input id="microLinkInput" type="text" value="https://www.w3schools.com/howto/img_paris.jpg" placeholder="https://www.w3schools.com/howto/img_paris.jpg">
                    </label>
                    <button id="microLinkButton" class="primary-button">${i18n.link.import}</button>
                </div>
            `,
			init() {
				microLinkFetch(scope, "link");
			}
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
                        <input id="microLinkInput" type="text" value="https://www.instagram.com/p/BeV6tOhFUor" placeholder="https://www.instagram.com/p/BeV6tOhFUor">
                    </label>
                    <button id="microLinkButton" class="primary-button instagram">${i18n.instagram.import}</button>
                </div>
            `,
			init() {
				microLinkFetch(scope, "instagram", true);
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
