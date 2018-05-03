import dispatch from "../dispatch";
import uploadFile from "../upload";

/**
 * Initialization function for Microlink fetch service
 * Used for Instagram and others
 * @param {Object} scope - Parent Uppload object
 */
export default (scope, serviceName, isMicroLink = false) => {
	const safeUploadFile = () => {
		uploadFile(null, scope).catch(() => {});
	};
	const err = () => {
		scope.changePage(serviceName);
		const error = scope.i18n.errors[`${serviceName}_no_fetch`];
		scope.showError(error);
		dispatch("uploadError", error);
		scope.isUploading = false;
	};
	const buttonElt = document.querySelector(`#uppload_${scope.meta.uniqueId} #microLinkButton`);
	const inputElt = document.querySelector(`#uppload_${scope.meta.uniqueId} #microLinkInput`);
	buttonElt.addEventListener("click", event => {
		scope.changePage("uploading");
		scope.isUploading = true;
		setTimeout(() => {
			if (isMicroLink) {
				fetch(`https://api.microlink.io/?url=${encodeURIComponent(inputElt.value)}`)
					.then(response => response.json())
					.then(json => {
						if (json.status === "success") {
							if (json.data && json.data.image && json.data.image.url) {
								fetch(
									`${scope.settings.fileFetchEndpoint || "https://images.weserv.nl/"}?url=${encodeURIComponent(
										json.data.image.url.replace(/^https?\:\/\//i, "")
									)}`
								)
									.then(response => response.blob())
									.then(blob => {
										scope.meta.file = blob;
										dispatch("fileSelected", scope.meta.file);
										scope.changePage("preupload");
									})
									.catch(() => {
										err();
									});
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
			} else {
				fetch(
					`${scope.settings.fileFetchEndpoint || "https://images.weserv.nl/"}?url=${encodeURIComponent(
						inputElt.value.replace(/^https?\:\/\//i, "")
					)}`
				)
					.then(response => response.blob())
					.then(blob => {
						scope.meta.file = blob;
						dispatch("fileSelected", scope.meta.file);
						scope.changePage("preupload");
					})
					.catch(() => {
						err();
					});
			}
		}, scope.settings.minimumDelay || 0);
	});
	inputElt.addEventListener("keyup", event => {
		event.preventDefault();
		if (event.keyCode === 13) {
			buttonElt.click();
		}
	});
};
