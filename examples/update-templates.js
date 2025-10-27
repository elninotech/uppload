import { join } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { format } from "prettier";
import { parse as marked } from "marked";

const templateHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title><!-- Title --> &middot; Uppload</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/purecss@1.0.1/build/pure-min.css"
      integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47"
      crossorigin="anonymous"
    />
    <style>
      a {
        color: #0078e7;
      }
      .uppload-image {
        display: block;
        margin-bottom: 1rem;
        max-height: 600px;
        max-width: 600px;
      }
    </style>
  </head>
  <body>
    <div
      style="padding: 2rem; max-width: 800px; margin: auto; line-height: 1.5"
    >
      <main>
        <!-- Contents -->
        <p style="opacity: 0.5">Click on the button below to try this demo.</p>
        <img alt="" class="uppload-image" />
        <button class="pure-button pure-button-primary">
          Upload
        </button>
      </main>
      <footer style="margin-top: 4rem">
        <h2>Uppload</h2>
        <p>
          Uppload is a better JavaScript image uploader. It's highly
          customizable with 30+ plugins, completely free and open-source, and
          can be used with any file uploading backend.
        </p>
        <a href="https://github.com/elninotech/uppload" class="pure-button"
          >GitHub</a
        >
        <a href="https://uppload.js.org" class="pure-button">Docs</a>
      </footer>
    </div>
    <script type="module" src="index.ts"></script>
  </body>
</html>`;

const templatePackageJson = `{
  "name": "<!-- Title -->-example",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  },
  "author": "El Niño (https://www.elnino.tech)",
  "license": "MIT",
  "dependencies": {
    "uppload": "workspace:^"
  },
  "devDependencies": {
    "vite": "^6.0.7",
    "typescript": "^5.7.3"
  }
}
`
const templateTsConfigJson = `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
`

const examples = readdirSync(join(import.meta.dirname), { withFileTypes: true });
for (const example of examples) {
  if (!example.isDirectory()) {
    continue;
  }

  let indexHtml = templateHtml;
  const readmePath = join(import.meta.dirname, example.name, "README.md");
  try {
    const readmeMd = readFileSync(readmePath, { encoding: "utf8" });
    const readmeHtml = marked(readmeMd.toString()).split("\n", 2).join("\n");
    indexHtml = indexHtml
      .toString()
      .replace(
        "<!-- Contents -->",
        readmeHtml +
          `<p>You can <strong><a href="https://github.com/elninotech/uppload/tree/master/examples/${example.name}">view the source code</a></strong> of this example or <a href="https://codesandbox.io/s/github/elninotech/uppload/tree/master/examples/${example.name}">try it on CodeSandbox</a></p>`
      );
    const readmeTitle = readmeMd.split("\n", 1)[0].replace("# ", "");
    indexHtml = indexHtml.replace("<!-- Title -->", readmeTitle);
  } catch (error) {
    console.log(error);
  }

  console.log(`\nPreparing example: ${example.name}`);

  const indexPath = join(import.meta.dirname, example.name, "index.html");
  indexHtml = await format(indexHtml, { parser: "html" });
  writeFileSync(indexPath, indexHtml);
  console.log(`Written index.html`);

  const packageJsonPath = join(import.meta.dirname, example.name, "package.json");
  const packageJson = templatePackageJson.replace('<!-- Title -->', example.name);
  writeFileSync(packageJsonPath, packageJson);
  console.log(`Written package.json`);

  const tsConfigJsonPath = join(import.meta.dirname, example.name, "tsconfig.json");
  writeFileSync(tsConfigJsonPath, templateTsConfigJson);
  console.log(`Written tsconfig.json`);
}
