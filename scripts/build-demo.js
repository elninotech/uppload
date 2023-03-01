const { join } = require("path");
const { writeFileSync, readdirSync, readFileSync, mkdirSync } = require("fs");

const siteFiles = readdirSync(join(__dirname, "..", "dist")).filter(
  file =>
    file.startsWith("demo.") && (file.endsWith(".css") || file.endsWith(".js"))
);

siteFiles.forEach(file => {
  const content = readFileSync(join(__dirname, "..", "dist", file)).toString();
  if (file.endsWith(".js")) {
    writeFileSync(join(__dirname, "..", "public", "uppload-demo.js"), content);
  } else {
    writeFileSync(join(__dirname, "..", "public", "uppload-demo.css"), content);
  }
});
