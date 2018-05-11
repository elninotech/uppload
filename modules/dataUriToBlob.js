/**
 * Convert a Data URI object to blob
 * @param {String} dataURI - A base64-encoded data URI object
 */
export default dataURI => {
	const byteString = atob(dataURI.split(",")[1]);
	const mimeString = dataURI
		.split(",")[0]
		.split(":")[1]
		.split(";")[0];
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ab], { type: mimeString });
};
