import metaData from "./meta";
import dispatch from "./dispatch";

export default file => {
    if (typeof this.settings.onUpload === "function") {
        this.onUpload(file).then(url => {
            this.updateValue(url);
            dispatch("fileUploaded", url);
        }).catch(error => {
            dispatch("fileError", error);
        });
    } else if (this.settings.endpoint) {
        fetch("URL")
            .then(response => response.json())
            .then(url => {
                dispatch("fileUploaded", url);
            }).catch(error => {
                dispatch("fileUploaded", error);
            });
    }
};