import dispatch from "./dispatch";

/**
 * Upload selected or new file
 * @param {File} file - File object to upload
 * @returns {Promise}
 */
export default (file, scope) => {
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
			throwFileUploadError(scope.i18n.errors.file_too_large.replace(/_FILESIZE_/g, bytesToSize(scope.settings.maxFileSize)));
			return;
		}
		scope.isUploading = true;
		scope.changePage("uploading");
		dispatch("uploadStarted", file);
		setTimeout(() => {
			if (typeof scope.settings.uploadFunction === "function") {
				scope.settings
					.uploadFunction(file)
					.then(url => {
						scope.updateValue(url);
						dispatch("fileUploaded", url);
						resolve(url);
					})
					.catch(error => {
						dispatch("uploadError", error);
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
						dispatch("fileUploaded", url);
						resolve(url);
					})
					.catch(error => {
						dispatch("fileUploaded", error);
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
