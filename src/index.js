const fs = require("fs");
const path = require("path");
const utils = require("util");
const puppeteer = require("puppeteer");
const hb = require("handlebars");
const readFile = utils.promisify(fs.readFile);

// Loading HTML template
async function getTemplateHtml(htmlTemplatePath) {
  let templatePath;
  try {
    templatePath = path.resolve(htmlTemplatePath);
    return await readFile(templatePath, "utf8");
  } catch (err) {
    return Promise.reject("Could not load html template");
  }
}

// Generating PDF
async function generatePdf(htmlTemplatePath, data = {}, pdfFormatDetails = {}) {
  let PDF;
  await getTemplateHtml(htmlTemplatePath).then(async (res) => {
    // Now we have the html code of our template in res object
    // you can check by logging it on console
    const template = hb.compile(res);
    const result = await template(data);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(result);
    PDF = await page.pdf(pdfFormatDetails);
    await browser.close();
  });
  return PDF;
}

module.exports = { generatePdf };
