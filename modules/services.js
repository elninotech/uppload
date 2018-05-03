import selectFile from "./services/select-file";
import preupload from "./preupload";
import microLinkFetch from "./services/microLinkFetch";

/**
 * Returns layouts for different services
 * @param {Object} scope - Parent Uppload object
 */
export default scope => {
	const services = scope.settings.services;
	const i18n = scope.i18n;
	const serviceMetas = {
		preupload: {
			html: `
				<div class="preupload-container">
					<div class="preview">
						<div><img id="previewImage"></div>
					</div>
					<div class="bottom-buttons">
						<div class="toolbar">
							<button data-aspect-ratio="null">Free</button>
							<button data-aspect-ratio="1">1:1</button>
							<button data-aspect-ratio="1.33333333">4:3</button>
						</div>
						<div class="cta"><button class="primary-button" id="cropAndUploadBtn">Crop &amp; upload</button></div>
					</div>
				</div>
            `,
			init() {
				preupload(scope);
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
			icon: `<i class="fas fa-fw fa-camera"></i>`,
			title: "Camera",
			html: ``
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
