/**
 * Preset to upload files to a Firebase storage bucket
 * @param {Object} options - Configuration object
 * @param {File} file - File object to upload
 * @param {Object} metadata - File metadata
 * @returns {Promise}
 */
export default (options, file, metadata) => {
	return new Promise((resolve, reject) => {
		if (!options.storageRef) {
			reject();
			return;
		}
		try {
			const reference = options.storageRef.child("/uppload/" + metadata.name);
			reference
				.put(file)
				.then(snapshot => resolve(snapshot.metadata.downloadURLs[0]))
				.catch(error => reject(error));
		} catch (error) {
			reject("Unable to upload to Firebase");
		}
	});
};
