const puppeteer = require('puppeteer');
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
 
const spinner = new Spinner({text: 'processing...'});
spinner.setSpinnerString(0);
spinner.start();

const URL = 'https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes';
const fileLocation = './county-iso.json';

async function main() {
  const browser = await puppeteer.launch();
  const countries = await getCountiesList(browser);
  const payload = await getByLanguageCountryNames(browser, countries);
  await saveFile(payload);
  await browser.close();
  spinner.stop();
  return true
}

/**
 * get list of all ISO countries
 * @param {puppeteer.Browser} browser
 * @returns {Promise<string>}
 */
async function getCountiesList(browser) {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });
  const tableRows = await page.$$('table.wikitable.sortable.jquery-tablesorter tbody tr');
  const countries = await Promise.all(
    tableRows.map(tr => tr.$eval('td:first-child > a', td => ({ textEn: td.innerText, link: td.href }))),
  );
  const ISOCodes = await Promise.all(
    tableRows.map(tr => tr.$eval('td > a[title="ISO 3166-1 alpha-2"]', td => td.innerText).catch(() => undefined)),
  );

  if (countries.length !== ISOCodes.length) {
    throw new Error('list missmatch');
  }

  countries.forEach((country, index, array) => {
    country.ISOCode = ISOCodes[index];
  });
  return countries.filter(country => country.ISOCode !== undefined);
}
/**
 * get Polish name from separate page
 * @param {puppeteer.Browser} browser
 * @param {string} link
 * @returns {Promise<string>}
 */
async function getByLanguageCountryName(browser, link, languageCode = 'pl') {
  const page = await browser.newPage();
  await page.goto(link);
  const plLink = await page.$eval(`.interlanguage-link a[lang="${languageCode}"]`, e => e.href).catch(() => undefined);
  if (plLink === undefined) {
    console.log('no');
    throw new Error('No polish translation');
  }
  await page.goto(plLink);
  const result = await page
    .$eval('h1#firstHeading', e => e.childNodes[0].textContent)
    .catch(() => {
      console.log('no no');
      return undefined;
    });
  await page.close();
  return result;
}

/**
 * iterate over names and get translation
 * @param {{textEn: string, link: string}[]} countries 
 */
async function getByLanguageCountryNames(browser, countries) {
  let results = [];
  for (let item of countries) {
    spinner.setSpinnerTitle(`${countries.indexOf(item)+1}/${countries.length}`)
    let r = await getByLanguageCountryName(browser, item.link);
    item.textPl = r;
    delete item.link;
    results.push(item);
  }
  return results;
}


/**
 * Save json object into system file
 * @param {Object} json 
 */
function saveFile(json) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileLocation, JSON.stringify(json, null, 2), function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }

      console.log('The file was saved!');
      resolve();
    });
  });
}

main();