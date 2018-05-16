/**
 * Preset to upload files to a S3 bucket
 * @param {Object} options - Configuration object
 * @param {File} file - File object to upload
 * @param {Object} metadata - File metadata
 * @returns {Promise}
 */
export default (options, file, metadata) => {
	return new Promise((resolve, reject) => {
		if (!options.s3Object) {
			reject();
			return;
		}
		try {
			options.s3Object.upload(
				{
					Key: metadata.name,
					Body: file,
					ACL: options.acl || "public-read"
				},
				(error, data) => {
					if (error) {
						reject(error.message);
					} else {
						alert("Successfully uploaded photo.");
						console.log("S3 DATA", data);
					}
				}
			);
		} catch (error) {
			reject("Unable to upload to S3");
		}
	});
};
