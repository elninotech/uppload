import fileUploader from "./services/file-upload";

export default (uploadFile, services) => {
    const serviceMetas = {
        uploading: {
            html: `
                <div class="center-middle">
                    <div><i class="fas fa-spinner fa-spin loading-spinner"></i></div>
                    <div>Uploading...</div>
                </div>
            `
        },
        uploaded: {
            html: `
                <div class="center-middle">
                    <div><i class="fas fa-check uploaded-icon"></i></div>
                    <div>Uploaded</div>
                </div>
            `
        },
        upload: {
            title: "Upload file",
            icon: `<i class="fas fa-fw fa-upload"></i>`,
            html: `
                <div class="center-middle">
                    <div id="dragDropElement" class="mb-full">Drag and drop here to upload</div>
                    <p class="mb-full"><em>or</em></p>
                    <button id="selectFileBtn" class="primary-button">Choose a file</button>
                    <input type="file" id="dragDropFileElt">
                </div>
            `,
            init() {
                fileUploader(uploadFile);
            }
        }
    };
    let navItems = ``;
    for (let i = 0; i < services.length; i++) {
        let currentService = serviceMetas[services[i]];
        if (currentService) {
            navItems += `
                <li class="service_${services[i]}"><button>${currentService.icon || ""}${currentService.title}</button></li>
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