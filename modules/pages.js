import fileUploader from "./file-upload";

export default {
    navbar: {
        html: `
            <aside>
                <nav>
                    <ul>
                        <li class="active"><button><i class="fas fa-fw fa-upload"></i>Upload file</button></li>
                        <li><button><i class="fas fa-fw fa-camera"></i>Camera</button></li>
                        <li><button><i class="fas fa-fw fa-link"></i>Import from URL</button></li>
                        <li><button><i class="fab fa-fw fa-facebook"></i>Facebook</button></li>
                        <li><button><i class="fab fa-fw fa-google-drive"></i>Google Drive</button></li>
                        <li><button><i class="fab fa-fw fa-dropbox"></i>Dropbox</button></li>
                        <li><button><i class="fab fa-fw fa-instagram"></i>Instagram</button></li>
                    </ul>
                </nav>
                <a class="uppload-branding" href="https://github.com/elninotech/uppload" target="_blank" rel="noopener noreferrer">Get Uppload</a>
            </aside>
        `
    },
    upload: {
        html: `
            <div class="center-middle">
                <p id="dropzoneElt" class="mb-full">Drag and drop here to upload</p>
                <p class="mb-full"><em>or</em></p>
                <button id="dropzoneBtn" class="primary-button">Choose a file</button>
            </div>
        `,
        init() {
            fileUploader();
        }
    }
};