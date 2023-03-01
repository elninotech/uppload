---
date: 2020-01-03T09:30:00.000Z
author: anand
---

# An even better file uploader for the web

In April 2018, I made the first commit to Uppload ([56bd930](https://github.com/elninotech/uppload/commit/56bd9307a020c692ed1383f0f4731690c00d90c9)) and pitched it as an idea to [Michael](/@michael), the founder of El Niño, to fund the development of an open-source JavaScript file uploader, something that the web desperately needed. Later that summer, we [launched Uppload](/blog/introducing-uppload) and started using it in our projects.

Today, I'm proud to launch **Uppload v2**, a rewrite from the group up in TypeScript, with support for over 30 a-la-carte plugins, keeping the same powerful API, easy-to-use interface, and browser support.

## What's new

### A-la-carte plugins

In Uppload v1, you could use a CDN to get start quickly, but the build would include all 4 features (drag-and-drop, camera, import from URL/Facebook/Instagram, and crop); there was no way of choosing which features to keep. With Uppload v2's a-la-carte plugins, you're in charge of your bundle. Simply select which effects and services you want to include, and treeshake the rest with our [`Uppload.use`](/treeshaking) function.

### 20+ services

Apart from Uppload v1's signature [drag-and-drop file uploader](services/local), [camera](/services/camera), and import from URL/Facebook/Instagram services, Uppload v2 supports several other new ways to select photos. For example, users can now import pictures from popular free image repositories like [Unsplash and Pexels](/services/search-for-images) without having to worry about the license. Similarly, we also support importing from several more [web services](/services/import-from-web-service), like GIPHY, Flickr, Pinterest, Twitter, and more, and with added utilities like taking a webpage screnshot.

### 10+ effects

What made Uppload v1 great was that it was end-to-end, meaning that users could take a picture from their camera, crop it to square, and upload it -- all from within the plugin. With Uppload v2, we've taken this a step further by introducing over 10 new effects apart from [cropping](https://uppload.js.org/effects/crop), like rotation, flipping, and [adjusting filters](https://uppload.js.org/effects/filter) like brightness, contrast, saturation, and more.

### Comprehensive documentation

We've also made a new [docs website](https://uppload.js.org) with tens of articles, code samples, and usage guidelines, along with integrated search by Algolia to help you find answers faster. It's easier than ever to get started with Uppload with our new and comprehensive documentation, built by [Staart Site](https://github.com/staart/site).

### User help guides

In our new docs website, we've also included a new [Help section](/help/) for guidelines for end users uploading images using the Uppload widget. We've incorporated these guidelines right into Uppload, so your users can click on the question mark (?) icon and get help about using the widget without leaving your site.

## What's the same

### Browser support

Uppload still has great support for older browsers, all the way up to Internet Explorer 10. And with progressive enhancement, newer features like [Camera](/services/camera) and [Filters](/effects/filter) will only show up in browser that support them.

### Supports all backends

Uppload still works with any file uploading backend you can build, customizable with a simple API endpoint. It still has templates for popular file uploading services like [Firebase](/uploaders/firebase), and easy support for [custom uploaders](uploaders/custom-uploader).

### Frontend frameworks

You can still use Uppload with your favorite [frontend frameworks](/wrappers) like React and Vue.js, though we provide examples instead of wrappers now. Using Uppload's API and event listeners, you can easily create your own wrappers and components for other frameworks.

### Internationalization

Uppload has community-powered translations to [several languages](/i18n), and you can easily add custom languages or overwrite specific keys. To get started, we've used machine translation to generate some i18n files, and members of our community will edit them and adding more languages with every release.

### Highly customizable

Uppload is still highly [customizable](/configuration), with support for custom endpoints, uploaders, styling, locales, and more. We tried to keep Uppload v2 as unopinionated as possible, while maintaining great experience for end users.

### Even more

With **progress percentage**, the default [XHR Uploader](/uploaders/xhr) and all your custom uploaders can report upload progress, so your users can see exactly how much of their file has been uploaded.

**First-class support for keyboard navigation** means that screen reader or mobility impaired users can use Uppload v2 easily, including new features like modal focus trap that make using Uppload without a mouse even easier.

New light and dark **themes**, along with support for custom color themes, make sure Uppload v2 dresses up to your brand and fits your visual style perfectly.

**Image compression** before uploading ensures that your server doesn't store large files, with built-in support for resizing and compression quality configuration.

## Get started in 5 lines

[Getting started](/getting-started) with Uppload v2 is as easy as importing the plugins you need, adding your backend URL, and using our new API:

```ts
import { Uppload, Local, Instagram, xhrUploader, en as lang } from "uppload";
const uploader = new Uppload({
  lang,
  uploader: xhrUploader({ endpoint: "https://example.com/upload" }),
});
uploader.use([new Local(), new Instagram()]);
```

We're very proud of how far this idea has come, and we're going to continue to work hard to make Uppload the best image uploader for the web.
