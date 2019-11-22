[![Uppload](https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/logo-dark.svg)](https://uppload.netlify.com)

Uppload is a better JavaScript image uploader. It's highly customizable with 30+ plugins, completely free and open-source, and can be used with any file uploading backend.

|  | Status |
| - | - |
| Build | [![Travis CI](https://img.shields.io/travis/elninotech/uppload?label=Travis%20CI)](https://travis-ci.org/elninotech/uppload) [![Circle CI](https://img.shields.io/circleci/build/github/elninotech/uppload?label=Circle%20CI)](https://circleci.com/gh/elninotech/uppload) [![Azure Pipelines](https://dev.azure.com/anandchowdhary0001/Uppload/_apis/build/status/elninotech.uppload?branchName=typescript)](https://dev.azure.com/anandchowdhary0001/Uppload/_build/latest?definitionId=11&branchName=typescript) |
| Dependencies | [![Dependencies](https://img.shields.io/david/elninotech/uppload.svg)](https://david-dm.org/elninotech/uppload) [![Dev dependencies](https://img.shields.io/david/dev/elninotech/uppload.svg)](https://david-dm.org/elninotech/uppload) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/elninotech/uppload.svg) |
| Documentation | [![Netlify](https://img.shields.io/netlify/5e92d02d-b96b-4b42-8197-804f72a147cf)](https://app.netlify.com/sites/uppload/deploys) [![Website status](https://img.shields.io/website?down_color=red&down_message=down&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fuppload.netlify.com)](https://uppload.netlify.com) [![Uptime](https://img.shields.io/uptimerobot/ratio/7/m783785688-048a2237d8844210960a6a76)](https://stats.uptimerobot.com/m29YvtjqOg) [![Articles](https://img.shields.io/endpoint?url=https%3A%2F%2Fuppload.netlify.com%2Fshield-schema%2Fall.json)](https://uppload.netlify.com) |
| Community | [![Contributors](https://img.shields.io/github/contributors/elninotech/uppload.svg)](https://github.com/elninotech/uppload/graphs/contributors) [![GitHub](https://img.shields.io/github/license/elninotech/uppload.svg)](https://github.com/elninotech/uppload/blob/master/LICENSE) ![Type definitions](https://img.shields.io/badge/types-TypeScript-blue.svg) [![npm package version](https://img.shields.io/npm/v/uppload)](https://www.npmjs.com/package/uppload) |

**[View Uppload demo and docs →](https://uppload.netlify.com)**

## ⭐ Features

- Drag and drop to upload file
- Import image from web services (URL, Instagram, Facebook, etc.)
- Search for pictures and import (Unsplash, Pexels, Pixabay)
- Edit photo before uploading (filters, crop, rotate, etc.)
- All file uploading backends supported
- Works with all modern browsers (IE 11+)

<table>
  <tr>
    <td><img alt="Screenshot of Uppload home" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/home.png"></td>
    <td><img alt="Screenshot of local service" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/local.png"></td>
  </tr>
  <tr>
    <td><img alt="Screenshot of Unsplash service" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/unsplash.png"></td>
    <td><img alt="Screenshot of filter effects" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/filters.png"></td>
  </tr>
  <tr>
    <td><img alt="Screenshot of GIPHY service" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/giphy.png"></td>
    <td><img alt="Screenshot of Instagram effects" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/instagram.png"></td>
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
import { Uppload, en, Local, Unsplash, Crop, Filters } from "uppload";

profilePicture.use([
  new Local(),                        // Select file from computer
  new Unsplash("your api-key"),       // Search and import from Unsplash
  new Crop(16 / 9),                   // Let users crop image to 16:9
  new Filters()                       // Let users apply image filters
]);
```

## 💻 Usage Docs

- [Getting started](https://uppload.netlify.com/getting-started)
- [Browser support](https://uppload.netlify.com/browser-support) (IE 10+)
- [Configuration](https://uppload.netlify.com/configuration)
- [Examples](https://uppload.netlify.com/examples)
- [Building a custom package](https://uppload.netlify.com/custom-package)
- [API](https://uppload.netlify.com/api)
- [Listening to events](https://uppload.netlify.com/listening-to-events)
- [Multiple Uppload instances](https://uppload.netlify.com/multiple-instances)
- [Migrating from Uppload 1.x](https://uppload.netlify.com/migrating-from-1x)
- [Services](https://uppload.netlify.com/services) (20+ ways to select a file)
- [Effects](https://uppload.netlify.com/effects) (10+ ways to edit a file)
- [Uploaders](https://uppload.netlify.com/uploaders) (ways to send a file to the server)
- [Themes](https://uppload.netlify.com/themes)
- [Wrappers](https://uppload.netlify.com/wrappers)
- [Backends](https://uppload.netlify.com/backends)
- [Internationalization](https://uppload.netlify.com/i18n)
- [Compare Uppload](https://uppload.netlify.com/compare)

**[View Uppload docs →](https://uppload.netlify.com)**

### Uppload 1.x

Uppload v2 is completely rewritten in TypeScript. You can [view the README of Uppload 1.x](https://github.com/elninotech/uppload/tree/master), the current stable version, in the `master` branch, or the [migration guide](https://uppload.netlify.com/migrating-from-1x).

## 🛣️ Roadmap

- [ ] Effects
  - [ ] Instagram-like filters
  - [ ] Rotation, mirror
- [ ] Documentation
  - [ ] TypeDoc for exploring packages and interfaces
  - [ ] Docs to show people how to upload to:
    - [ ] AWS S3 bucket
    - [ ] Firebase
    - [ ] Upload to web service like Imgur
  - [ ] Docs to people how to use Uppload with frameworks:
    - [ ] Vue.js
    - [ ] React
    - [ ] Angular
    - [ ] Ember.js

## 👥 Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

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
