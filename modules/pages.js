import fileUploader from "./file-upload";

export default {
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