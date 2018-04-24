# Uppload

Uopload is a better JavaScript file uploader. Inspired by [Uploadcare](https://github.com/uploadcare/uploadcare-widget)'s widget, but highly customizable with an open API.

## Usage

Import Uppload to your project:

```bash
yarn add uppload
```

Or use a CDN:

```html
<script src="https://unpkg.com/uppload/dist/uppload.min.js"></script> <!-- unpkg -->
<script src="https://cdn.jsdelivr.net/npm/uppload/dist/uppload.min.js"></script> <!-- jsDelivr -->
```

Create a new Uppload object with sample configuration:

```js
const profilePicture = new Uppload({

	// Default file value, useful for empty-state images
	value: "https://randomuser.me/api/portraits/men/17.jpg",

	// Change the values of these elements with the file URL
	// Sets `value` for inputs and `src` for images
	bind: ["#profilePicInput", "#profilePicImage"],

	// Open the modal on clicking this button
	call: ["#upploadBtn"],

	// Function to upload the file to your server
	// Use either this or `endpoint` with URL
	onUpload: file => {
		return new Promise((resolve, reject) => {
			fetch("https://example.com/upload", {
				method: "POST",
				body: file
			})
				.then(response => response.json())
				.then(json => {
					let url = json.url;
					resolve(url);
				})
				.catch(error => console.log(error));
		});
	}

});
```

## Development

### Roadmap
- ~~Modal~~
- File preview
- Image cropping
- Upload function
- Import file/image (Facebook, Dropbox, etc.)
- Add sample server configuration & files in docs

### Installation

```
yarn install
nvm use 8.11.1
```

### Production

```
yarn build
```