---
date: 2018-05-14T09:30:00.000Z
author: michael
---

# Building a better file uploader for the web

The input element was introduced in the first [HTML+ discussion document](https://www.w3.org/MarkUp/HTMLPlus/htmlplus_41.html) in July 1993 for entering data in forms on the web. Dave Raggett's iconic [HTML 3.2 Reference Specification](https://www.w3.org/TR/2018/SPSD-html32-20180315/#input) in January 1997 included `<input type=file>` from the 1995 memo [RFC1867](https://www.ietf.org/rfc/rfc1867.txt) written by Xerox scientists Larry Masinter and Ernesto Nebel that described HTML forms with file submissions:

> Currently, HTML forms allow the producer of the form to request information from the user reading the form. These forms have proven useful in a wide variety of applications in which input from the user is necessary. However, this capability is limited because HTML forms don't provide a way to ask the user to submit files of data. Service providers who need to get files from the user have had to implement custom user applications.

The MIME type multipart/form-data and the accept attribute — things that we still use to upload files today — were both described in that same paper over 20 years ago. Native file uploading is incredibly elegant and very easy to use. We're all used to the following syntax:

```php
<form method="post" enctype="multipart/form-data">
  <input type="file" accept="image/png" name="myFile">
  <button type="submit">Upload</button>
</form>
<?php
  if (isset($_POST["myFile"]) {
    move_uploaded_file($_FILES["myFile"]["tmp_name"], "./file");
  }
?>
```

Today, however, we have the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File) with FileReader, FileList, Blob, and more, which make it very easy to manipulate files on the client and then upload them to the server.

They're not supported by every browser, but when you combine it with new functionalities like [DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer), which lets you drag and drop files right in the browser and [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream), which lets you access the user's camera and microphone, we can create an exceptional user experience.

The problem is that building custom file uploading components is hard and time-consuming, especially when you consider maintaining compatibility for browsers that don't support these new APIs.

## The current landscape

![Filestack uploader](/assets/blog/filestack.png)
![Uploadcare uploader](/assets/blog/uploadcare.png)
![Cloudinary uploader](/assets/blog/cloudinary.png)

There are many services that offer file uploading widgets, but they're all into the business of file storage and content delivery.

Uploadcare, for example, lets you upload up to 500 MB of files for free and their next plan is 7.5 GB storage for $25/month. In comparison, Google's Firebase gives you 5GB of storage for free and then $0.026/GB, it comes out to be over 128x cheaper. Amazon Web Services' S3 storage is a little more expensive at $0.0390/GB but that's still over 85x cheaper.

Cloudinary gives you 10GB of free storage, which is comparatively better, until you realize that their next plan starts at $99 billed monthly. Filestack also gives you half a gig for free and starts billing $49/month for 25 GB.

## The solution

### An open-source file uploading widget…

Cloudinary, Filestack and others offer their own proprietary JavaScript widgets — which might be good for business, but doesn't promote community contributions and are therefore lacking and feel dated. Cloudinary especially looks like it was made for the Web 2.0 era. What we want is an MIT-licensed, completely free and open source solution that encourages extension.

### …which works with any backend…

Uploadcare does open source their widget under the BSD 2-clause license, but it only works with their backend services. It calls their APIs, uses `<iframe>`s for services like Instagram and Import from URL, and only lets you upload to your Uploadcare account (you can connect an external storage in premium plans.) What we want is a widget that is completely backend-agnostic; it should work with any server that can handle HTML form uploads and should let you upload to any third-party managed service like S3 or Firebase.

### …and allows modular services…

All three widgets support drag-and-drop uploads and importing from URLs. Uploadcare is the only one that supports clicking a picture from the user's webcam (something that's extremely handy for quick profile pictures, especially on mobile devices) and the others integrate with Google Image Search and let you find images. I cannot comment on the legality of uploading unlicensed photos, but it's interesting to know that it's there.

These services are very handy, but require constant updates and larger bundle sizes when new features have to be added:

> You can't run around and add a button to these things. They're already shipped. So what do you do? — Steve Jobs, iPhone introduction in 2007

What we want is a completely modular approach that lets developers create their own bundles based on the services they're interested in adding, and dynamic loading of those services when serving assets from a CDN. This would create small bundle sizes for webapps — check drag-and-drop, camera, and crop, and your bundle is created. Similarly, when using the CDN, only users who use the webcam or crop their images or import from Instagram will have to load the code for those services.

This also helps developers very easily build their own services and modules to extend the scope of the widget's functionality. A developer wanting to integrate Google Photos or YouTube videos can very easily write a module and dynamically load it through the uploader. It just works.

### …with graceful degradation

The new File API results in great UX — file previews, drag-and-drop, and easy Blob and Data URI manipulation. Unfortunately, these services aren't supported by older browsers (released over 5 years ago) even with polyfills. This doesn't mean that the widget should stop working, rather it should fallback to a simple HTML file input.

There is no workaround for drag‘n'drop in older browsers — it simply isn't supported. The same goes for image previews, etc…users using an old browser will \[still] be able to upload files. It just won't look and feel great. But hey, that's their fault. — Matias Meno for Dropzone

Our widget should work very well right out-of-the-box for the majority of users, but should still work well-enough for everyone else. It should definitely not not work for anyone.

### Say hello to Uppload

Uppload is free and open-source, modular, works with any backend, and cross-platform. It works for mobiles, desktops and even Internet Explorer 11. It works with regular HTML file upload backends with no extra configuration required, and has built-in extensibility support that makes using Firebase, S3, and other services a piece of cake. It's dependency-free and also comes with wrappers for Vue.js and React.

We have a [tasklist](https://github.com/elninotech/uppload) we're currently working on including a truly modular build system, increased browser support and test coverage, smaller bundles, more modules, and even more wrappers.

![Uppload demo](/assets/blog/v1-demo.gif)
