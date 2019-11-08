# 🖼️ Uppload 2

Uppload 2 is the upcoming major update to Uppload, El Niño's JavaScript file uploading widget. It's written in TypeScript and supports custom builds.

**[View Uppload 2 docs →](https://uppload.netlify.com)**

![Screenshot of Uppload](https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/wip-1.png)

![Screenshot of Unsplash service](https://raw.githubusercontent.com/elninotech/uppload/typescript/assets/screenshots/wip-2.png)

## 🛣️ Roadmap

- [x] Uppload 2 architecture
  - [x] TypeScript core & package support
  - [x] Support for custom builds instead of full build
  - [x] Build system with CI + CD to NPM
  - [x] Support for I18N
  - [x] Event emitter
  - [x] API for manipulating widget
- [ ] Services (ways to choose a file)
  - [ ] Drag and drop to upload file
  - [ ] Import image from URL
  - [ ] Click photo from camera
  - [ ] Import image from web service
    - [ ] Instagram
    - [ ] Facebook
    - [x] Unsplash
    - [ ] GIPHY
    - [ ] URL screenshot
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
- [ ] Change Netlify branch from `typescript` to `master`

## 📄 License

- Code: [MIT](https://github.com/elninotech/uppload/blob/master/LICENSE)
- Logo and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
