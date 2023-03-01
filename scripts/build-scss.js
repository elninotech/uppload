const sass = require("sass");
const { join } = require("path");
const { writeFileSync, readdirSync, mkdirSync } = require("fs");

const result = sass.renderSync({
  file: join(__dirname, "..", "src", "styles", "uppload.scss"),
});
writeFileSync(join(__dirname, "..", "dist", "uppload.css"), result.css);

const themes = readdirSync(join(__dirname, "..", "src", "themes")).filter(
  theme => theme !== "theme.scss"
);
mkdirSync(join(__dirname, "..", "dist", "themes"), {
  recursive: true,
});
themes.forEach(theme => {
  const result = sass.renderSync({
    file: join(__dirname, "..", "src", "themes", theme),
  });
  writeFileSync(
    join(__dirname, "..", "dist", "themes", theme.replace(".scss", ".css")),
    result.css
  );
});
