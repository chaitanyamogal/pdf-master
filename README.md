# PDF Master

The simplest way to generate static and dynamic PDF in NodeJS. Converts HTML(with `.hbs` extension) template into
PDF.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/chaitanyamogal/pdf-maker/blob/main/LICENSE)

## Features

- Generate PDF from HTML file.
- Generate dynamic PDFs
- Add custom header and footer to PDF

## Installation

To use PDF master in your project, run:

```bash
  npm install pdf-master
```

## How to Use

#### Step 1 - Add required packages and generate a PDF

```js
const express = require("express");
const pdfMaster = require("pdf-master");

const app = express();

app.get("", async (req, res) => {
  var PDF = await pdfMaster.generatePdf("pdfHtmlFormat.hbs");
  res.contentType("application/pdf");
  res.status(200).send(PDF);
});
```

`generatePdf()` syntax and parameters

```js
generatePdf(
  templatePath, //<string>
  data, //<object>   Pass data to template(optional)
  options //<object>   PDF format options(optional)
);
```

#### Step 2 - Create your HTML Template (save the template with .hbs extension instead of .html)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

## Render dynamic data in template and PDF format options

```js
const express = require("express");
const pdfMaster = require("pdf-master");

const app = express();

app.get("", async (req, res) => {

  var students = {
      {
          id: 1,
          name: "Sam",
          age: 21
      },
      {
          id: 2,
          name: "Jhon",
          age: 20
      },
      {
          id: 3,
          name: "Jim",
          age: 24
      }
  }

  let options = {
    displayHeaderFooter: true,
    format: "A4",
    headerTemplate: `<h3> Header </h3>`,
    footerTemplate: `<h3> Copyright 2023 </h3>`,
    margin: { top: "80px", bottom: "100px" },
  };

  let PDF = await pdfMaster.generatePdf("template.hbs", students, options);
  res.contentType("application/pdf");
  res.status(200).send(PDF);
});
```

[Read more on options](https://github.com/chaitanyamogal/pdf-maker/blob/main/docs/pdfFormatOptions.md)

### template for the above example (save the template with .hbs extension)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>Student List</h1>
    <ul>
      {{#each students}}
      <li>Name: {{this.name}}</li>
      <li>Age: {{this.age}}</li>
      <br />
      {{/each}}
    </ul>
  </body>
</html>
```

## Resources

- [Read how to generate dynamic PDF using the Mysql database](https://github.com/chaitanyamogal/pdf-maker/blob/main/example/pfdWithMysql.md).

- [Read more on .hb template](https://github.com/chaitanyamogal/pdf-maker/blob/main/docs/htmlTemplateFormating.md).

- [More PDF formating options](https://github.com/chaitanyamogal/pdf-maker/blob/main/docs/pdfFormatOptions.md).

## Contributing

Feel free to contribute. Your contribution will be appreciated.

## License

pdf-master is [MIT licensed](https://github.com/chaitanyamogal/pdf-maker/blob/main/LICENSE).
