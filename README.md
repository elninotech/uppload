<p align="center"><img alt="Uppload logo" src="https://user-images.githubusercontent.com/38886034/39478268-359f87f0-4d62-11e8-8b93-abd1ad2df398.png" width="140"></p>

<p align="center">
<img alt="Travis CI builds" src="https://api.travis-ci.org/elninotech/uppload.svg?branch=master">
<img alt="Licence" src="https://img.shields.io/npm/l/uppload.svg?maxAge=2592000&style=flat">
<img alt="Number of dependencies" src="https://img.shields.io/david/elninotech/uppload.svg?maxAge=2592000&style=flat">
<img alt="Updates to devDependencies" src="https://img.shields.io/david/dev/elninotech/uppload.svg?maxAge=2592001&style=flat">
<a href="https://cityofenschede.com/"><img alt="Made in Enschede" src="https://img.shields.io/badge/made%20in-Enschede-brightgreen.svg"></a>
</p>

<p align="center">Uppload is a better JavaScript file uploader inspired by <a href="https://github.com/uploadcare/uploadcare-widget">Uploadcare</a>'s widget, but is highly customizable, completely free and open-source, and can be used with any file uploading backend.</p>

![uppload](https://user-images.githubusercontent.com/2841780/40658486-bac5ca08-634b-11e8-895e-a788a89f8dd0.gif)

## Table of Contents

- [Usage](#usage)
	- [Browser Support](#browser-support)
	- [File Size](#file-size)
	- [Configutation](#configutation)
	- [Properties](#properties)
	- [Events](#events)
- [Demos](#demos)
	- [Automated Demo](#automated-demo)
- [Customization](#customization)
- [Server-side Implementation](#server-side-implementation)
	- [Starter Templates](#starter-templates)
- [Presets](#presets)
	- [Firebase](#firebase)
	- [AWS S3](#aws-s3)
- [Internationalization](#internationalization)
- [Wrappers](#wrappers)
- [Development](#development)
	- [Roadmap](#roadmap)
	- [Installation](#installation)
	- [Local Setup](#Local-setup)
	- [Production](#production)
-  [El Niño](#el-ni%C3%B1o)

## Usage

Install Uppload in your project directory:

```bash
yarn add uppload
```

And then import it to your project:

```js
import Uppload from "uppload";
```

You can also `require` it in your project since it ships as UMD, or use it from one of the CDNs below. You only need any one of the following, since wrappers come with Uppload built-in.

```html
<!-- Served by unpkg -->
<!-- Uppload --><script src="https://unpkg.com/uppload/dist/uppload.no-polyfills.min.js"></script> 
<!-- Uppload with polyfills --><script src="https://unpkg.com/uppload/dist/uppload.min.js"></script> 
<!-- Uppload Vue --><script src="https://unpkg.com/uppload-vue/dist/uppload-vue.min.js"></script> 
<!-- Uppload Vue with polyfills --><script src="https://unpkg.com/uppload-vue/dist/uppload-vue.polyfills.min.js"></script> 
<!-- Uppload React --><script src="https://unpkg.com/uppload-react/dist/uppload-react.min.js"></script> 
<!-- Uppload React with polyfills --><script src="https://unpkg.com/uppload-react/dist/uppload-react.polyfills.min.js"></script> 

<!-- Served by jsDelivr -->
<!-- Uppload --><script src="https://cdn.jsdelivr.net/npm/uppload/dist/uppload.no-polyfills.min.js"></script> 
<!-- Uppload with polyfills --><script src="https://cdn.jsdelivr.net/npm/uppload/dist/uppload.min.js"></script> 
<!-- Uppload Vue --><script src="https://cdn.jsdelivr.net/npm/uppload-vue/dist/uppload-vue.min.js"></script> 
<!-- Uppload Vue with polyfills --><script src="https://cdn.jsdelivr.net/npm/uppload-vue/dist/uppload-vue.polyfills.min.js"></script> 
<!-- Uppload React --><script src="https://cdn.jsdelivr.net/npm/uppload-react/dist/uppload-react.min.js"></script> 
<!-- Uppload React with polyfills --><script src="https://cdn.jsdelivr.net/npm/uppload-react/dist/uppload-react.polyfills.min.js"></script> 
```

Create a new Uppload object with sample configuration:

```js
const profilePicture = new Uppload({

    // Default file value, useful for empty-state images
    value: "https://randomuser.me/api/portraits/men/17.jpg",

    // Change the values of these elements with the file URL
    // Sets `value` for inputs and `src` for images
    bind: ["#profilePicInput", "#profilePicImage"],

    // Open the modal when the user clicks on this button
    call: ["form.profile button#uploadButton"],

    // Endpoint to send files to
    // Use either this or `uploadFunction` for a custom function
    endpoint: "https://example.com/upload_backend",

    // Maximum file size allowed in bytes (this is 25 MB)
    maxFileSize: 25000000,

    // Types of files to allow (string or MIME type array)
    allowedTypes: "image"

});
```

### Browser Support

With `babel-polyfill`, Uppload works with IE11 and above. Uppload ships this way by default. Without polyfills, it works with browsers that natively support both promises and the Fetch API.

### File Size

| File | Size |
| --- | --- |
| `uppload.min.js` | ![File size](https://img.shields.io/github/size/elninotech/uppload/dist/uppload.min.js.svg?style=flat) |
| `uppload.no-polyfills.min.js` | ![File size](https://img.shields.io/github/size/elninotech/uppload/dist/uppload.no-polyfills.min.js.svg?style=flat) |

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
| `defaultService` | `"upload"` | String | List of default service |
| `successDelay` | `1000` | Number | Number of milliseconds to show the success screen for |
| `minimumDelay` | `0` | Number | Number of milliseconds to delay uploading by |
| `errorDelay` | `2000` | Number | Number of milliseconds to show an error message for |
| `endpoint.url` | `""` | String | Endpoint URL to fetch |
| `endpoint.method` | `POST` | String | HTTP verb, can be changed to `PUT` if necessary |
| `endpoint.headers` | `null` | Headers | HTTP headers to send with the request |
| `allowedTypes` | `"*"` | Array or String | MIME types to allow (eg. string `"image/jpg"` or array `["image/jpg", "image/png"]`). Can also put [MIME registry](https://www.iana.org/assignments/media-types/media-types.xhtml) instead: `"image"`, `"audio"`, `"font"`, `"text"`, `"video"`, etc. |
| `maxFileSize` | `"infinite"` | Number | Maximum allowed file size in bytes, defaults to string infinte |
| `isFileTypeAllowed` | Checks `allowedTypes` types | Function | Function to check whether file type is allowed (returns boolean) |
| `isFileSizeAllowed` | Checks `maxFileSize` | Function | Function to check whether file size is allowed (returns boolean) |
| `i18n` | English (US) dictionary | Object | Object for internationalization strings ([configuration help](#internationalization)) |
| `crop.aspectRatio` | `null` | Number | Aspect ratio for image cropping |
| `crop.maxSize` | `null` | `[width, height, unit?]` | Maximum image size after cropping |
| `crop.minSize` | `null` | `[width, height, unit?]` | Minimum image size after cropping |
| `crop.startSize` | `[50, 50, "%"]` | `[width, height, unit?]` | Default size when cropping starts |

```js
// Endpoint is an object with configuration
const withEndpointOptions = new Uppload({
    endpoint: {
        method: "POST",
        url: "/my_backend"
    }
});

// Custom file upload handler
const withCustomUpload = new Uppload({
    uploadFunction: (file, metadata) => {
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

// Using an Uppload preset with configuration
const withUploadPreset = new Uppload({
    uploadPreset: {
        preset: "firebase",
        options: {
            storageRef: firebase.storage().ref()
        }
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
| `currentPage` | `"upload"` | String | Returns the current page from navbar |
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
| `uploadError` | An error ocurred in uploading the file | `Blob` File |
| `fileError` | Invalid file (size/type/etc.) selected | Server's response |
| `fileUploaded` | A new file is uploaded | `String` File URL |
| `fileDropped` | A file has been dropped in the drop area | `Blob` File |
| `modalOpened` | The Uppload modal was opened | Nothing |
| `modalClosed` | The Uppload modal was closed | Nothing |
| `pageChanged` | User navigated to this uploading service | `String` Service ID |
| `dragOver` | A file is being dragged in the drop area | Nothing |
| `dragEnter` | File has entered the drop area | Nothing |
| `dragLeave` | File has left the drop area | Nothing |
| `cropStart` | Image has started being cropped | `Object` with crop details |
| `cropMove` | Image is currently being cropped | `Object` with crop details |
| `cropEnd` | Image has ended being cropped | `Object` with crop details |

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

### Demos

#### Automated Demo

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

### Server-side Implementation

Uppload does **not** provide the server side implementation of handling the files, but the way files are uploaded is identical to simple file upload forms like this:

```html
<form action="/upload_endpoint" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
</form>
```

#### Starter Templates

You can also use any of the following starter templates for your backend:

- [Ruby on Rails](http://guides.rubyonrails.org/form_helpers.html#uploading-files)
- [PHP (Basic)](http://www.startutorial.com/articles/view/how-to-build-a-file-upload-form-using-dropzonejs-and-php)
- [Laravel](http://maxoffsky.com/code-blog/howto-ajax-multiple-file-upload-in-laravel/)
- [Symfony 2 and AWS S3](http://www.jesuisundev.fr/upload-drag-drop-via-dropzonejs-symfony2-on-cloud-amazon-s3/)
- [ASP.NET](http://venkatbaggu.com/file-upload-in-asp-net-mvc-using-dropzone-js-and-html5/)
- [ServiceStack](http://www.buildclassifieds.com/2016/01/08/uploading-images-servicestack-and-dropzone/)
- [Golang](https://hackernoon.com/how-to-build-a-file-upload-form-using-dropzonejs-and-go-8fb9f258a991)

### Presets

Instead of building your own backend or writing an upload handler, you can also use a preset:

```js
const profilePicture = new Uppload({
    uploadPreset: {
        preset: PRESET_NAME,
        options: OPTIONS_OBJECT
    }
});
```

| Preset Name | Configuration |
| --- | --- |
| `firebase` | `storageRef` contains the Firebase storage reference |
| `s3` | `s3Object` is the S3 object |

#### Firebase

```js
import firebase from "firebase";
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_SUBDOMAIN.appspot.com",
});
const profilePicture = new Uppload({
    uploadPreset: {
        preset: "firebase",
        options: {
            storageRef: firebase.storage().ref()
        }
    }
});
```

#### AWS S3

This preset is current in development

```js
import AWS from "aws-sdk";
AWS.config.update({
    region: "REGION",
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "IDENTITY_POOL_ID"
    })
});
const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "BUCKET_NAME" }
});
const profilePicture = new Uppload({
    uploadPreset: {
        preset: "s3",
        options: {
            s3Object: s3
        }
    }
});
```

### Internationalization

Uppload comes with i18n support built-in. We have over 100 languages, but most of them are machine translated. You can overwrite all string by supplying a `i18n` property during initialization. The template is available [here](https://github.com/elninotech/uppload/blob/master/modules/i18n/en.js).

### Wrappers

We've built the following wrappers for Uppload for our favorite frameworks:

- [Vue.js](https://github.com/elninotech/uppload/tree/master/wrappers/vue) (NPM `uppload-vue`)
- [React](https://github.com/elninotech/uppload/tree/master/wrappers/react) (NPM `uppload-react`)
- [Angular](https://github.com/elninotech/uppload/tree/master/wrappers/angular) (NPM `uppload-angular`)

## Development

### Roadmap
- ~~Modal~~
- ~~File preview~~
- ~~Image cropping~~
- ~~Upload function~~
- Import file/image (Facebook, Dropbox, etc.)
- ~~Add sample server configuration & files in docs~~
- IE support (`customEvent`)
- Presets for ~~Firebase~~, ~~S3~~, etc.
- ~~Wrappers for~~
	- ~~Vue.js~~
	- ~~React~~
	- ~~Angular~~
- Use Tardis for module loading

### Installation

```bash
yarn install
nvm use 8.11.1 # LTS
```

### Local Setup

```bash
yarn start:dev
```

Navigate to http://localhost:9000

### Production

```bash
yarn build
```

## El Niño

Uppload is made with ❤️ in Enschede, the Netherlands by [El Niño](https://www.elnino.tech) and [contributors](https://github.com/elninotech/uppload/graphs/contributors).

El Niño is een internetbureau uit Enschede. We hebben meer dan 12 jaar ervaring in het ontwikkelen van op maat gemaakte digitale oplossingen. Met een team van vakfanaten dragen we bij aan het succes van elke organisatie. 

- [Ben je student?](https://www.elnino.tech/krijgeenbaan)
- [Wil je samenwerken?](https://www.elnino.tech/samenwerken)
