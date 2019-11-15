# Getting started

Uppload 2 lets you build a custom Uppload package to make sure you only bundle the code you actually need. To get started, add Uppload to your project:

```bash
npm install uppload
```

Most commonly, you'd want to add the drag-and-drop and file select service (known as [Local](/services/local)), along with the [XHR Uploader](/uploaders/xhr) which will send an HTTP POST request to your backend.

Then, you can initialize your plugin with these plugins and your language of choice. In this example, we're also adding the "Import from Instagram" service:

```ts
import { Uppload, Local, Instagram, xhrUploader, en } from "uppload";

const uploader = new Uppload({
  lang: en,
  uploader: xhrUploader({
    endpoint: "https://example.com/upload"
  })
});
uploader.use([new Local(), new Instagram()]);
```

Now, let's say you have an HTML webpage like the following. Here, we have a `<button>` where users can click to open Uppload, and an `<img>` which the uploaded image should replace:

```html
<body>
  <img alt="Profile picture" class="profile-pic">
  <button class="pic-btn">Change picture</button>
</body>
```

You can add properties in the Uppload constructor to automate that functionality:

```ts
const uploader = new Uppload({
  lang: en,
  uploader: xhrUploader({
    endpoint: "https://example.com/upload"
  }),
  bind: document.querySelector("img.profile-pic"),
  call: document.querySelector("button.pic-btn")
});
uploader.use([new Local(), new Instagram()]);
```

Instead of using the `bind` and `call` properties, you can also directly use the Uppload API. For example, if you want to programatically open or close the widget:

```ts
// Open the plugin
uppload.open();

setTimeout(() => {
  // Close the plugin
  uppload.close();
}, 5000);
```
