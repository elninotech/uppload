export default url => {
	return new Promise((resolve, reject) => {
		const file = document.createElement("script");
		file.src = url;
		file.addEventListener("load", () => {
			resolve();
		});
		file.addEventListener("error", () => {
			resolve();
		});
		(document.head || document.body).appendChild(file);
	});
};
