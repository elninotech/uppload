# 🖼️ Uppload

## Uppload 1.x

This README is for the upcoming TypeScript rewrite of Uppload, releasing in December 2019.

You can [view the README of Uppload 1.x](https://github.com/elninotech/uppload/tree/master), the current stable version, in the `master` branch.

## Uppload 2

Uppload 2 is the upcoming major update to Uppload, El Niño's JavaScript file uploading widget. It's written in TypeScript and supports custom builds.

|  | Status |
| - | - |
| Build | [![Travis CI](https://img.shields.io/travis/elninotech/uppload?label=Travis%20CI)](https://travis-ci.org/elninotech/uppload) [![Circle CI](https://img.shields.io/circleci/build/github/elninotech/uppload?label=Circle%20CI)](https://circleci.com/gh/elninotech/uppload) [![Azure Pipelines](https://dev.azure.com/anandchowdhary0001/Uppload/_apis/build/status/elninotech.uppload?branchName=typescript)](https://dev.azure.com/anandchowdhary0001/Uppload/_build/latest?definitionId=11&branchName=typescript) |
| Dependencies | [![Dependencies](https://img.shields.io/david/elninotech/uppload.svg)](https://david-dm.org/elninotech/uppload) [![Dev dependencies](https://img.shields.io/david/dev/elninotech/uppload.svg)](https://david-dm.org/elninotech/uppload) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/elninotech/uppload.svg) |
| Documentation | [![Netlify](https://img.shields.io/netlify/5e92d02d-b96b-4b42-8197-804f72a147cf)](https://app.netlify.com/sites/uppload/deploys) [![Website status](https://img.shields.io/website?down_color=red&down_message=down&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fuppload.netlify.com)](https://uppload.netlify.com) [![Uptime](https://img.shields.io/uptimerobot/ratio/7/m783785688-048a2237d8844210960a6a76)](https://stats.uptimerobot.com/m29YvtjqOg) [![Articles](https://img.shields.io/endpoint?url=https%3A%2F%2Fuppload.netlify.com%2Fshield-schema%2Fall.json)](https://uppload.netlify.com) |
| Community | [![Contributors](https://img.shields.io/github/contributors/elninotech/uppload.svg)](https://github.com/elninotech/uppload/graphs/contributors) [![GitHub](https://img.shields.io/github/license/elninotech/uppload.svg)](https://github.com/elninotech/uppload/blob/master/LICENSE) ![Type definitions](https://img.shields.io/badge/types-TypeScript-blue.svg) [![npm package version](https://img.shields.io/npm/v/uppload)](https://www.npmjs.com/package/uppload) |

**[View Uppload 2 docs →](https://uppload.netlify.com)**

**[View live demo →](https://uppload.netlify.com/demo.html)**

<table>
  <tr>
    <td><img alt="" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/wip-1.png"></td>
    <td><img alt="" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/wip-2.png"></td>
  </tr>
  <tr>
    <td><img alt="" src="https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/wip-3.png"></td>
  </tr>
</table>

## 🛣️ Roadmap

- [x] Uppload 2 architecture
  - [x] TypeScript core & package support
  - [x] Support for custom builds instead of full build
  - [x] Build system with CI + CD to NPM
  - [x] Support for I18N
  - [x] Event emitter
  - [x] API for manipulating widget
  - [x] Dark and light theme
- [ ] Services (ways to choose a file)
  - [ ] Drag and drop to upload file
  - [x] Import image from URL
  - [ ] Click photo from camera
  - [ ] Import image from web service
    - [x] Instagram
    - [x] Facebook
    - [x] Unsplash
    - [x] GIPHY
    - [x] URL screenshot
- [ ] Effects (ways to change the file)
  - [ ] Preview
  - [ ] Crop
  - [ ] Filters
  - [ ] Rotation
  - [ ] Sharpen
  - [ ] Flip/mirror
  - [ ] Grayscale
- [ ] Uploaders (ways to send the file to a server)
  - [x] Custom function
  - [ ] REST endpoint
  - [ ] AWS S3 bucket
  - [ ] Firebase
  - [ ] Upload to web service
- [ ] Wrappers
  - [ ] Vue.js
  - [ ] React
  - [ ] Angular
  - [ ] Ember.js
- [ ] Documentation
  - [x] Community guidelines
  - [x] PR and issue templates for the GitHub community
  - [x] Static site for docs
  - [ ] Starter templates to show people how to use Uppload with e.g., Firebase
  - [ ] Getting started page
  - [ ] TypeDoc for exploring packages

### Post-merge checklist

- [ ] Add all-contributors to README
  - [ ] Include previous I18N contributors
  - [ ] The Noun Project icons
    - [ ] https://thenounproject.com/nikhilsahukar/collection/image/
- [ ] Change Netlify branch from `typescript` to `master`

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
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/tomtenvoorde"><img src="https://avatars0.githubusercontent.com/u/38886034?v=4" width="100px;" alt="tomtenvoorde"/><br /><sub><b>tomtenvoorde</b></sub></a><br /><a href="#design-tomtenvoorde" title="Design">🎨</a></td>
    <td align="center"><a href="https://pegler.io/"><img src="https://avatars0.githubusercontent.com/u/94491?v=4" width="100px;" alt="Matt"/><br /><sub><b>Matt</b></sub></a><br /><a href="https://github.com/elninotech/uppload/issues?q=author%3Apegler" title="Bug reports">🐛</a> <a href="https://github.com/elninotech/uppload/commits?author=pegler" title="Code">💻</a></td>
    <td align="center"><a href="http://foxego.com"><img src="https://avatars2.githubusercontent.com/u/87010?v=4" width="100px;" alt="Rob"/><br /><sub><b>Rob</b></sub></a><br /><a href="https://github.com/elninotech/uppload/issues?q=author%3Arobisaks" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://mihir.ch"><img src="https://avatars1.githubusercontent.com/u/31861755?v=4" width="100px;" alt="Mihir Chaturvedi"/><br /><sub><b>Mihir Chaturvedi</b></sub></a><br /><a href="https://github.com/elninotech/uppload/commits?author=plibither8" title="Documentation">📖</a></td>
    <td align="center"><a href="https://marrec.io"><img src="https://avatars2.githubusercontent.com/u/25272043?v=4" width="100px;" alt="Kevin Marrec"/><br /><sub><b>Kevin Marrec</b></sub></a><br /><a href="https://github.com/elninotech/uppload/commits?author=kevinmarrec" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jkniest"><img src="https://avatars0.githubusercontent.com/u/15618191?v=4" width="100px;" alt="Jordan Kniest"/><br /><sub><b>Jordan Kniest</b></sub></a><br /><a href="#translation-jkniest" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## 📄 License

- Code: [MIT](https://github.com/elninotech/uppload/blob/master/LICENSE)
- Logo and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
