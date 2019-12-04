# Contributing to Uppload

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

The following is a set of guidelines for contributing to Uppload and its packages. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Uppload Code of Conduct](https://github.com/elninotech/uppload/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [info@elnino.tech](mailto:info@elnino.tech).

## Gitmoji

We use [Gitmoji](https://gitmoji.carloscuesta.me) when writing commits to automatically generate changelogs, releases, etc. If you're writing code for Uppload, we highly encourage you to use Gitmoji.

## Icons

When adding a new service or effect, make sure you design an SVG icon using the following settings. This way, we can theme it using the CSS `fill` property:

- 256px square
- Black fill color (#000)
- Convert all text to outlines
- No borders, only shapes

Then, make sure you compress the icon using [SVGOMG](https://jakearchibald.github.io/svgomg/). On average, we've seen that a ~800 byte SVG icon can be compressed to ~250 bytes. Use the minimum precision setting that does not distort the icon and remove all metadata except for xmlns.

Finally, remove the `width` and `height` attributes from the SVG and use `viewbox` to allow scaling, and add the `aria-hidden="true"` attribute to help screen readers ignore the icon. Then, the beginning of your SVG string should be `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">`.

## Translations

To edit a language translation, head to the file in the [`./src/i18n`](https://github.com/elninotech/uppload/tree/typescript/src/i18n) folder and click on the Edit (pencil) icon on the top-right of the GitHub file contents UI. This will create a fork of the project and you can make a pull request with the changes. Alternately, you can also edit it in your preferred code editor after forking the project.

If you want to add a new language, create a new TypeScript file with the two-letter ISO 639-2 code in the [`./src/i18n`](https://github.com/elninotech/uppload/tree/typescript/src/i18n) folder that default exports an object containing the key-value pairs. For example, if you're adding a Dutch translation, create an `nl.ts` file. You can use the [`en.ts`](https://github.com/elninotech/uppload/blob/typescript/src/i18n/en.ts) as a template.

In both cases, since we use Gitmoji, your commit message should be ":globe_with_meridians: \[Update or Add] translation for \[Language name]".
