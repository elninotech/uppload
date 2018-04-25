# Uppload

![](https://img.shields.io/npm/dw/uppload.svg?maxAge=2592000&style=flat)
![](https://img.shields.io/npm/l/uppload.svg?maxAge=2592000&style=flat)
![](https://img.shields.io/david/dev/elninotech/uppload.svg?maxAge=2592000)
![](https://img.shields.io/david/elninotech/uppload.svg?maxAge=2592000)

Uppload is a better JavaScript file uploader inspired by [Uploadcare](https://github.com/uploadcare/uploadcare-widget)'s widget, but is highly customizable and features an open API.

**Uppload is currently in development and is NOT production-ready.**

## Usage

Import Uppload to your project:

```bash
yarn add uppload
```

And then import it to your project:

```js
import Uppload from "uppload";
```

You can also `require` it in your project since it ships as UMD, or use it from one of the CDNs below:

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

	// Endpoint to send files to
	// Use either this or `uploadFunction` for a custom function
	endpoint: "https://example.com/upload_backend"

});
```

### Configutation

You can pass the following properties in the constructor:

| Property | Default | Type | Description |
| --- | --- | --- | --- |
| `value` | `""` | String | Default value of the file, useful for image placeholders |
| `bind` | `["[data-uppload-value]"]` | Array | Selectors for elements that need the uploaded file URL |
| `call` | `["[data-uppload-button]"]` | Array | Selectors for elements that open the modal on click |
| `uploadFunction` | Fetch (configurable) | Function | Function to upload file (returns promise with file URL) |
| `endpoint` | `""` | String | Endpoint to upload file using fetch POST |
| `services` | `["upload", "camera"]` | Array | List of upload services to show |
| `successDelay` | `1500` | Number | Number of milliseconds to show the success screen for |
| `minimumDelay` | `0` | Number | Number of milliseconds to delay uploading by |
| `endpoint.url` | `""` | String | Endpoint URL to fetch |
| `endpoint.method` | `POST` | String | HTTP verb, can be changed to `PUT` if necessary |
| `endpoint.headers` | `null` | Headers | HTTP headers to send with the request |

```js
const withEndpointOptions = new Uppload({
	endpoint: { // Endpoint is an object with configuration
		method: "POST",
		url: "/my_backend"
	}
});

const withCustomUpload = new Uppload({
	uploadFunction: file => {  // Custom file upload handler
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
				.catch(error => reject(error));
		});
	}
});
```

### Properties

You can use available properties to get information about the state of Uppload:

```js
const profilePicture = new Uppload();
console.log(profilePicture.isOpen); // Returns true or false
```

| Property | Default | Type | Description |
| --- | --- | --- | --- |
| `isOpen` | `false` | Boolean | Returns whether the modal is currently open |
| `isUploading` | `false` | Boolean | Returns whether a file is currently being uploaded |
| `value` | `null` | String | Returns the URL of the uploaded file |
| `currentPage` | `upload` | String | Returns the current page from navbar |
| `modalElement` | [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) | Object | Returns the modal HTML DOM element |
| `backgroundElement` | [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) | Object | Returns the background HTML DOM element |

### Events

For reactive frameworks, it doesn't make sense to use the native Uppload `bind` property. Instead, you can watch the `Uppload.value` and build around that URL value. Alternately, you can also listen to events using the `on` function:

```js
const profilePicture = new Uppload();
profilePicture.on("fileUploaded", fileURL => {
	console.log(fileURL); // Logs the uploaded file's URL
});
```

| Event | Dispatched when | Returns |
| --- | --- | --- | 
| `fileSelected` | A new file has been selected | `Blob` File |
| `uploadStarted` | Started to upload a new file | `Blob` File |
| `fileUploaded` | A new file is uploaded | `String` File URL |
| `fileError` | An error ocurred in uploading the file | Server's response |
| `dragOver` | A file is being dragged in the drop area | Nothing |
| `fileDropped` | A file has been dropped in the drop area | `Blob` File |
| `modalOpened` | The Uppload modal was opened | Nothing |
| `modalClosed` | The Uppload modal was closed | Nothing |
| `pageChanged` | User navigated to this uploading service | `String` Service ID |

You can also programatically call the following functions:

```js
const profilePicture = new Uppload();
profilePicture.openModal(); // Opens the modal
```

| Function | Parameters | Description |
| --- | --- | --- | 
| `uploadFile(param)` | `Blob` File | Upload this file to the server (returns promise) |
| `openModal()` | None | Opens the modal |
| `closeModal()` | None | Closes the modal |
| `updateValue(param)` | `String` URL | Make this URL the post-uploading value |
| `changePage(param)` | `String` Service ID | Navigate to this uploading service |

Using the above methods and events, you can also automatically upload a file using Uppload. For example, the following code fetches an image from Mashape's meme generator API and uploads it to your server:

```js
fetch("https://ronreiter-meme-generator.p.mashape.com/meme?meme=Baby+Godfather&font_size=50&font=Impact&top=Thanks+m&bottom=Later", {
	method: "GET",
	headers: new Headers({
		"X-Mashape-Key": "API_KEY"
	}),
	mode: "cors"
})
	.then(response.arrayBuffer())
	.then(buffer => {
		let binary = "";
		[].slice.call(new Uint8Array(buffer)).forEach(byte => binary += String.fromCharCode(byte));
		const file = "data:image/jpeg;base64," + window.btoa(binary);
		new Uppload({
			endpoint: "/upload_backend"
		}).uploadFile(file)
			.then(fileUrl => {
				console.log(`File uploaded: ${fileUrl}`);
			})
			.catch(error => {
				console.error("Error from server", error);
			});
	})
	.catch(error => {
		console.error("Error in fetching file", error);
	});
```

### Customization

You can customize the widget using CSS to overwrite properties. The following classes are used by Uppload:

| Selector | Description |
| --- | --- |
| `.uppload-modal` | Main white modal |
| `.uppload-bg` | Translucent background |
| `.uppload-bg::after` | Cross (×) button on the top-right |
| `.uppload-modal aside` | Left navbar |
| `.uppload-modal section` | Main content inside the modal |
| `.uppload-branding` | Small "Powered by Uppload" on the bottom-left |
| `.uppload-(modal/bg).fadeIn` | Fade in animation on open (400ms) |
| `.uppload-(modal/bg).fadeOut` | Fade out animation on close (400ms) |
| `.uppload-modal .primary-button` | "Upload" or "Import" call-to-action button |
| `.uppload-modal #dragDropElement` | Dashed "drag-and-drop here" area |

Uppload also adds some classes to your elements that it interacts with:

| Selector | Description |
| --- | --- |
| `.uppload-initialized` | Default value of file was set |
| `.uppload-updated` | New file was uploaded and set |

### Server-side implementation

Uppload does **not** provide the server side implementation of handling the files, but the way files are uploaded is identical to simple file upload forms like this:

```html
<form action="/upload_endpoint" method="post" enctype="multipart/form-data">
	<input type="file" name="file" />
</form>
```

You can also use any of the following starter templates for your backend:

- [Ruby on Rails](http://guides.rubyonrails.org/form_helpers.html#uploading-files)
- [PHP (Basic)](http://www.startutorial.com/articles/view/how-to-build-a-file-upload-form-using-dropzonejs-and-php)
- [Laravel](http://maxoffsky.com/code-blog/howto-ajax-multiple-file-upload-in-laravel/)
- [Symfony 2 and AWS S3](http://www.jesuisundev.fr/upload-drag-drop-via-dropzonejs-symfony2-on-cloud-amazon-s3/)
- [ASP.NET](http://venkatbaggu.com/file-upload-in-asp-net-mvc-using-dropzone-js-and-html5/)
- [ServiceStack](http://www.buildclassifieds.com/2016/01/08/uploading-images-servicestack-and-dropzone/)
- [Golang](https://hackernoon.com/how-to-build-a-file-upload-form-using-dropzonejs-and-go-8fb9f258a991)

## Development

### Roadmap
- ~~Modal~~
- File preview
- Image cropping
- Upload function
- Import file/image (Facebook, Dropbox, etc.)
- Add sample server configuration & files in docs
- IE support (`customEvent`)
- Starter templates for Firebase, S3, etc.

### Installation

```
yarn install
nvm use 8.11.1
```

### Production

```
yarn build
```
