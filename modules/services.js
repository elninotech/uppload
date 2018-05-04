import crop from "./services/crop";
import preview from "./services/preview";
import selectFile from "./services/select-file";
import camera from "./services/camera";
import microLinkFetch from "./services/microLinkFetch";
import icons from "./icons";

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
							<button class="primary-button secondary" id="backBtn">${icons.back} &nbsp;${i18n.preview.back}</button>
							<button class="primary-button" id="continueBtn">${i18n.preview.continue} &nbsp;${icons.forward}</button>
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
                    <div>${icons.uploading}</div>
                    <div>${i18n.uploading}</div>
                </div>
            `
		},
		uploaded: {
			html: `
                <div class="center-middle">
                    <div>${icons.uploaded}</div>
                    <div>${i18n.uploaded}</div>
                </div>
            `
		},
		upload: {
			title: "Upload file",
			icon: icons.upload,
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
			icon: `${icons.camera}`,
			title: "Camera",
			html: `
				<div class="camera-container">
					<div class="preview">
						<video id="cameraVideo">${i18n.errors.video_unavailable}</video>
						<canvas id="cameraCanvas"></canvas>
					</div>
					<div class="bottom-buttons">
						<div class="cta"><button class="primary-button" id="clickButton">${icons.camera} &nbsp;${i18n.camera.click}</button></div>
					</div>
				</div>
			`,
			init() {
				camera(scope);
			}
		},
		link: {
			icon: icons.import,
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
		instagram: {
			icon: icons.instagram,
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
