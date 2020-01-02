[![Uppload](https://raw.githubusercontent.com/elninotech/uppload/master/assets/logo-dark.svg?sanitize=true)](https://uppload.js.org)

Uppload is a better JavaScript image uploader. It's highly customizable with 30+ plugins, completely free and open-source, and can be used with any file uploading backend.

|  | Status |
| - | - |
| Build | [![GitHub Actions](https://github.com/elninotech/uppload/workflows/Node%20CI/badge.svg)](https://github.com/elninotech/uppload/actions) [![Travis CI](https://img.shields.io/travis/elninotech/uppload?label=Travis%20CI)](https://travis-ci.org/elninotech/uppload) [![Circle CI](https://img.shields.io/circleci/build/github/elninotech/uppload?label=Circle%20CI)](https://circleci.com/gh/elninotech/uppload) [![Azure Pipelines](https://dev.azure.com/anandchowdhary0001/Uppload/_apis/build/status/elninotech.uppload?branchName=master)](https://dev.azure.com/anandchowdhary0001/Uppload/_build/latest?definitionId=11&branchName=master) |
| Dependencies | [![Dependencies](https://img.shields.io/david/elninotech/uppload.svg)](https://david-dm.org/elninotech/uppload) [![Dev dependencies](https://img.shields.io/david/dev/elninotech/uppload.svg)](https://david-dm.org/elninotech/uppload) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/elninotech/uppload.svg) |
| Documentation | [![Netlify](https://img.shields.io/netlify/5e92d02d-b96b-4b42-8197-804f72a147cf)](https://app.netlify.com/sites/uppload/deploys) [![Website status](https://img.shields.io/website?down_color=red&down_message=down&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fuppload.js.org)](https://uppload.js.org) [![Uptime](https://img.shields.io/uptimerobot/ratio/7/m783785688-048a2237d8844210960a6a76)](https://stats.uptimerobot.com/m29YvtjqOg) [![Articles](https://img.shields.io/endpoint?url=https%3A%2F%2Fuppload.js.org%2Fshield-schema%2Fall.json)](https://uppload.js.org) |
| Community | [![Contributors](https://img.shields.io/github/contributors/elninotech/uppload.svg)](https://github.com/elninotech/uppload/graphs/contributors) [![Code maintainability](https://img.shields.io/codeclimate/maintainability/elninotech/uppload)](https://codeclimate.com/github/elninotech/uppload) [![Codacy grade](https://img.shields.io/codacy/grade/403c8644e13e47df878156f3658220ce)](https://www.codacy.com/manual/AnandChowdhary/uppload) [![GitHub](https://img.shields.io/github/license/elninotech/uppload.svg)](https://github.com/elninotech/uppload/blob/master/LICENSE) [![Languages](https://img.shields.io/endpoint?url=https%3A%2F%2Fservices.anandchowdhary.now.sh%2Fapi%2Fgithub-files%3Frepo%3Delninotech%2Fuppload%26path%3Dsrc%2Fi18n%26subtract%3D1%26label%3Di18n%26message%3D%25241%2524%2520language%2524S%2524%26color%3Dblueviolet)](https://github.com/elninotech/uppload/tree/master/src/i18n) |
| Package | [![npm package version](https://img.shields.io/npm/v/uppload)](https://www.npmjs.com/package/uppload) [![npm downloads](https://img.shields.io/npm/dm/uppload)](https://www.npmjs.com/package/uppload) [![Type definitions](https://img.shields.io/badge/types-TypeScript-blue.svg)](https://uppload.js.org/typedoc) |

**[View Uppload demo and docs →](https://uppload.js.org)**

## ⭐ Features

- [Drag and drop file or click photo using camera](https://uppload.js.org/services)
- [Search for pictures and import (Unsplash, Pexels, Pixabay)](https://uppload.js.org/services/search-for-images)
- [Import image from web services (URL, Instagram, Facebook, etc.)](https://uppload.js.org/services/import-from-web-service)
- [Edit photo before uploading (filters, crop, rotate, etc.)](https://uppload.js.org/effects)
- [All file uploading backends supported](https://uppload.js.org/uploaders)
- [Supports frontend frameworks like Vue.js, React](https://uppload.js.org/wrappers)
- [Works with all modern browsers (IE 10+)](https://uppload.js.org/browser-support)

<table>
  <tr>
    <td><img alt="Screenshot of Uppload home" src="https://raw.githubusercontent.com/elninotech/uppload/master/assets/screenshots/home.png"></td>
    <td><img alt="Screenshot of local service" src="https://raw.githubusercontent.com/elninotech/uppload/master/assets/screenshots/local.png"></td>
  </tr>
  <tr>
    <td><img alt="Screenshot of Unsplash service" src="https://raw.githubusercontent.com/elninotech/uppload/master/assets/screenshots/unsplash.png"></td>
    <td><img alt="Screenshot of filter effects" src="https://raw.githubusercontent.com/elninotech/uppload/master/assets/screenshots/crop.png"></td>
  </tr>
  <tr>
    <td><img alt="Screenshot of GIPHY service" src="https://raw.githubusercontent.com/elninotech/uppload/master/assets/screenshots/brightness.png"></td>
    <td><img alt="Screenshot of Instagram effects" src="https://raw.githubusercontent.com/elninotech/uppload/master/assets/screenshots/instagram.png"></td>
  </tr>
</table>

## 🛠 Getting started

First, install Uppload using your package manager:

```bash
npm install uppload
```

Then, add styles, import Uppload and an uploader along with your language of choice and initialize the class:

```ts
import { Uppload, en, xhrUploader } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

const profilePicture = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button",
  lang: en,
  uploader: xhrUploader({
    endpoint: "https://example.com/upload"
  });
});
```

Finally, choose which services (ways to select a file), effects (ways to manipulate a file), and uploaders (ways to send the file to a server) you want. Then, import these classes and use the `Uppload.use()` function to create your package:

```ts
import { Uppload, en, Local, Unsplash, Crop, Brightness } from "uppload";

profilePicture.use([
  new Local(),                        // Select file from computer
  new Unsplash("your API key"),       // Search and import from Unsplash
  new Crop({ aspectRatio: 16 / 9 }),  // Let users crop image to 16:9
  new Brightness()                    // Let users apply image filters
]);
```

## 💻 Usage Docs

- [Getting started](https://uppload.js.org/getting-started)
- [Browser support](https://uppload.js.org/browser-support) (IE 10+)
- [Configuration](https://uppload.js.org/configuration)
- [Examples](https://uppload.js.org/examples)
- [A-la-carte (treeshaking) plugins](https://uppload.js.org/treeshaking)
- [Uppload API](https://uppload.js.org/api)
- [Listening to events](https://uppload.js.org/listening-to-events)
- [Services](https://uppload.js.org/services) (20+ ways to select a file)
- [Effects](https://uppload.js.org/effects) (10+ ways to edit a file)
- [Uploaders](https://uppload.js.org/uploaders) (ways to send a file to the server)
- [Themes](https://uppload.js.org/themes)
- [Backends](https://uppload.js.org/backends)
- [Frontend frameworks](https://uppload.js.org/wrappers)
- [Blog](https://uppload.js.org/blog)
- [Image compression](https://uppload.js.org/compression)
- [Internationalization](https://uppload.js.org/i18n)
- [Accessibility](https://uppload.js.org/a11y) · [Compare Uppload](https://uppload.js.org/compare) · [FAQs](https://uppload.js.org/faq)

**[View Uppload docs →](https://uppload.js.org)**

### Uppload 1.x

Uppload v2 is rewritten from the group up in TypeScript. You can [view the README of Uppload 1.x](https://github.com/elninotech/uppload/tree/1fe2caf2d0a0d4e34a10bef1b4870a823277ce21), the deprecated version, or the [migration guide](https://uppload.js.org/migrating-from-1x).

## ℹ️ Support

If you need help with using Uppload, check out the [Getting started](https://uppload.js.org/getting-started) guide and the documentation. If you found a bug or have a feature request, [open an issue](https://github.com/elninotech/uppload/issues). If you want to contribute to Uppload, read our [Contributing](https://github.com/elninotech/uppload/blob/master/CONTRIBUTING.md) guide.

Your organization can also request a custom build or get professional support. [Request a quote for free →](https://www.elnino.tech/samenwerken)

## 👥 Contributors

Uppload is built by [El Niño](https://www.elnino.tech), a digital development studio in Enschede, the Netherlands, that builds custom web and mobile apps, webstores, and more, backed by 14+ years of experience.

We'd like to thank these wonderful people and teams for contributing ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://www.elnino.tech"><img src="https://avatars0.githubusercontent.com/u/2854021?v=4" width="100px;" alt="El Niño"/><br /><sub><b>El Niño</b></sub></a><br /><a href="#business-elnino-ict" title="Business development">💼</a> <a href="#financial-elnino-ict" title="Financial">💵</a> <a href="#infra-elnino-ict" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-elnino-ict" title="Project Management">📆</a></td>
    <td align="center"><a href="https://anandchowdhary.com/?utm_source=github&utm_campaign=about-link"><img src="https://avatars3.githubusercontent.com/u/2841780?v=4" width="100px;" alt="Anand Chowdhary"/><br /><sub><b>Anand Chowdhary</b></sub></a><br /><a href="https://github.com/elninotech/uppload/issues?q=author%3AAnandChowdhary" title="Bug reports">🐛</a> <a href="https://github.com/elninotech/uppload/commits?author=AnandChowdhary" title="Code">💻</a> <a href="https://github.com/elninotech/uppload/commits?author=AnandChowdhary" title="Documentation">📖</a></td>
    <td align="center"><a href="http://thlassche.nl"><img src="https://avatars3.githubusercontent.com/u/2959888?v=4" width="100px;" alt="Teun Lassche"/><br /><sub><b>Teun Lassche</b></sub></a><br /><a href="https://github.com/elninotech/uppload/issues?q=author%3Athlassche" title="Bug reports">🐛</a> <a href="https://github.com/elninotech/uppload/commits?author=thlassche" title="Code">💻</a> <a href="#security-thlassche" title="Security">🛡️</a></td>
    <td align="center"><a href="https://victorlap.nl"><img src="https://avatars0.githubusercontent.com/u/1645632?v=4" width="100px;" alt="Victor"/><br /><sub><b>Victor</b></sub></a><br /><a href="https://github.com/elninotech/uppload/commits?author=victorlap" title="Code">💻</a> <a href="#translation-victorlap" title="Translation">🌍</a> <a href="https://github.com/elninotech/uppload/commits?author=victorlap" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Rick053"><img src="https://avatars1.githubusercontent.com/u/4579963?v=4" width="100px;" alt="Rick van Gemert"/><br /><sub><b>Rick van Gemert</b></sub></a><br /><a href="https://github.com/elninotech/uppload/issues?q=author%3ARick053" title="Bug reports">🐛</a> <a href="https://github.com/elninotech/uppload/commits?author=Rick053" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tomtenvoorde"><img src="https://avatars0.githubusercontent.com/u/38886034?v=4" width="100px;" alt="tomtenvoorde"/><br /><sub><b>tomtenvoorde</b></sub></a><br /><a href="#design-tomtenvoorde" title="Design">🎨</a></td>
    <td align="center"><a href="https://pegler.io/"><img src="https://avatars0.githubusercontent.com/u/94491?v=4" width="100px;" alt="Matt"/><br /><sub><b>Matt</b></sub></a><br /><a href="https://github.com/elninotech/uppload/issues?q=author%3Apegler" title="Bug reports">🐛</a> <a href="https://github.com/elninotech/uppload/commits?author=pegler" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://foxego.com"><img src="https://avatars2.githubusercontent.com/u/87010?v=4" width="100px;" alt="Rob"/><br /><sub><b>Rob</b></sub></a><br /><a href="https://github.com/elninotech/uppload/issues?q=author%3Arobisaks" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://mihir.ch"><img src="https://avatars1.githubusercontent.com/u/31861755?v=4" width="100px;" alt="Mihir Chaturvedi"/><br /><sub><b>Mihir Chaturvedi</b></sub></a><br /><a href="https://github.com/elninotech/uppload/commits?author=plibither8" title="Documentation">📖</a></td>
    <td align="center"><a href="https://marrec.io"><img src="https://avatars2.githubusercontent.com/u/25272043?v=4" width="100px;" alt="Kevin Marrec"/><br /><sub><b>Kevin Marrec</b></sub></a><br /><a href="https://github.com/elninotech/uppload/commits?author=kevinmarrec" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jkniest"><img src="https://avatars0.githubusercontent.com/u/15618191?v=4" width="100px;" alt="Jordan Kniest"/><br /><sub><b>Jordan Kniest</b></sub></a><br /><a href="#translation-jkniest" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/beeman"><img src="https://avatars3.githubusercontent.com/u/36491?v=4" width="100px;" alt="Bram Borggreve"/><br /><sub><b>Bram Borggreve</b></sub></a><br /><a href="https://github.com/elninotech/uppload/commits?author=beeman" title="Code">💻</a> <a href="#platform-beeman" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="http://AlexImbrea.com"><img src="https://avatars2.githubusercontent.com/u/4534299?v=4" width="100px;" alt="Alex Imbrea"/><br /><sub><b>Alex Imbrea</b></sub></a><br /><a href="https://github.com/elninotech/uppload/commits?author=AlexImb" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dingsbams"><img src="https://avatars2.githubusercontent.com/u/16029597?v=4" width="100px;" alt="Achim Krämer"/><br /><sub><b>Achim Krämer</b></sub></a><br /><a href="#translation-dingsbams" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/nsahukar"><img src="https://avatars3.githubusercontent.com/u/2324769?v=4" width="100px;" alt="Nikhil Sahukar"/><br /><sub><b>Nikhil Sahukar</b></sub></a><br /><a href="#design-nsahukar" title="Design">🎨</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## 📄 License

- Code: [MIT](https://github.com/elninotech/uppload/blob/master/LICENSE)
- Logo and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Image filter icons: [CC BY 3.0](https://thenounproject.com/nikhilsahukar/collection/image/)
