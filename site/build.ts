import { readFile, writeFile, copy, ensureFile, ensureDir } from "fs-extra";
import { join } from "path";
import { render } from "sass";
import { minify } from "html-minifier";
import recursive from "recursive-readdir";
import marked from "marked";
import axios from "axios";

const startTime = new Date().getTime();
console.log("Building website...");

const build = async () => {
  const files = (await recursive(join(__dirname, "..", "content"))).map(
    f => f.split("content/")[1]
  );
  for await (const file of files) {
    let lastCommit: CommitInfo | undefined = undefined;
    try {
      lastCommit = await getLastCommit(`content/${file}`);
    } catch (error) {}
    let text =
      (await readFile(join(__dirname, "..", `content/${file}`)))
        .toString()
        .replace("# Home", "");
    if (lastCommit) {
      text += `${
        lastCommit
          ? `\n\n<p class="post-footer">This page was last modified by <a href="${
              lastCommit.author.html_url
            }" target="_blank">${
              lastCommit.commit.author.name
            }</a> on <time datetime="${
              lastCommit.commit.author.date
            }">${new Date(lastCommit.commit.author.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric"
              }
            )}</time>`
          : ""
      } in <a href="${
        lastCommit.html_url
      }" target="_blank">${lastCommit.sha.substr(
        0,
        6
      )}</a>. <a href="https://github.com/elninotech/uppload/blob/master/content/${file}">Edit this page on GitHub</a></p>`;
    }
    const content = marked(text);
    let extra = "";
    if (file === "sitemap.md") {
      for await (const f of files) {
        const fContent = (await readFile(
          join(__dirname, "..", `content/${f}`)
        )).toString();
        const title = fContent.split("\n")[0].replace("# ", "");
        extra += `- [${title}](/${f.replace(".md", ".html")})\n`;
      }
    }
    for await (const type of ["backend", "ui", "native", "css"]) {
      if (file === `${type}/index.md`) {
        extra += "## Articles\n\n";
        const iFiles = (await recursive(
          join(__dirname, "..", "content", type)
        )).map(f => f.split(`content/${type}/`)[1]);
        for await (const f of iFiles) {
          const fContent = (await readFile(
            join(__dirname, "..", "content", type, f)
          )).toString();
          const title = fContent.split("\n")[0].replace("# ", "");
          if (!f.endsWith("index.md"))
            extra += `- [${title}](/${type}/${f.replace(".md", ".html")})\n`;
        }
      }
    }
    const title = text.split("\n")[0].replace("# ", "");
    extra = marked(extra);
    const xhtml = (await readFile(join(__dirname, "..", "index.html")))
      .toString()
      .replace("</main>", `${content}${extra}</main>`);
    const scss = (await readFile(
      join(__dirname, "..", "styles.scss")
    )).toString();
    const css = <string>await renderScss(scss);
    const html = xhtml
      .replace("<!-- inject css -->", `<style>${css}</style>`)
      .replace("<!-- year -->", new Date().getUTCFullYear().toString())
      .replace(
        "<title>Uppload</title>",
        `<title>${
          file !== "index.md" ? `${title} &middot; Uppload` : "Uppload"
        }</title>`
      );
    await ensureDir(join(__dirname, "..", "public", "assets"));
    await copy(
      join(__dirname, "..", "assets"),
      join(__dirname, "..", "public", "assets")
    );
    await ensureFile(
      join(__dirname, "..", "public", file.replace(".md", ".html"))
    );
    await writeFile(
      join(__dirname, "..", "public", file.replace(".md", ".html")),
      minify(html, {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
      })
    );
  }
};

interface CommitInfo {
  html_url: string;
  sha: string;
  author: {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
  };
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
};
const getLastCommit = async (
  file: string
): Promise<CommitInfo> => {
  return (await axios.get(
    `https://api.github.com/repos/elninotech/uppload/commits?path=${file}`
  )).data[0];
};

const renderScss = (data: string) =>
  new Promise((resolve, reject) => {
    render({ data }, (error, result) => {
      if (error) return reject(error);
      resolve(result.css.toString());
    });
  });

build()
  .then(() =>
    console.log(
      `Built in ${((new Date().getTime() - startTime) / 1000).toFixed(2)}s`
    )
  )
  .catch(error => console.log("Error", error));
