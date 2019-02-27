const loadedFiles = [];
import arrayIncludes from "./arrayIncludes";

export default url => {
	return new Promise((resolve, reject) => {
		if (arrayIncludes(loadedFiles, url)) {
			resolve();
		} else {
			loadedFiles.push(url);
			const file = document.createElement("script");
			file.src = url;
			file.addEventListener("load", () => {
				resolve();
			});
			file.addEventListener("error", () => {
				resolve();
			});
			(document.head || document.body).appendChild(file);
		}
	});
};
