const _ = require('lodash');
const rp = require('request-promise');
const validator = require('validator');
const cheerio = require('cheerio');
const crypto = require('crypto');

// TODO move to implementation
const $ = cheerio;

function t(v) {
  return $(v).text();
}
// END-TODO move to implementation

function configLoader() {
  let cfg;
  try {
    cfg = require('dotenv').config();
  } catch (e) {
    throw new Error('Havnt found any configuration to load');
  }
  return cfg;
}
function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}
/**
 * getContent
 *
 * @param url
 * @returns {Promise}
 */

function getContent(url) {
  if (!validator.isURL(url)) {
    throw new Error('Non valid url: ' + url);
  }
  return rp(url);
}

async function getPlanetLinks(url) {
  const resultArr = [];
  const contentPromise = getContent(url);
  const c = await handleContent(contentPromise);
  if (c instanceof Error) {
    throw c;
  }
  const queryForLinksOnIndexPage = 'p > a';
  let ais = c(queryForLinksOnIndexPage);
  resultArr == _.identity(ais);
  const cleanName = name => {
    name = name.trim().match(/^(.*) Fact Sheet$/gm);
    if (name instanceof Array) {
      return name;
    }
  };

  const result = [];

  let meta = ais.map((k, v) => {
    const name = cleanName(t(v));
    if (v && v.attribs && v.attribs.href && name) {
      let href = v.attribs.href;
      result.pop([name, href]);
    }
    return result;
  });

  return meta;
}

/**
 * handleContent - dispatch a promise to GET http content for specified url
 *
 * @param contentPromise
 * @param handler - function that handles Promise
 * @returns {undefined}
 */

function handleContent(contentPromise) {
  return contentPromise
    .then(content => {
      return $.load(content);
    })
    .error(err => {
      return new Error(err);
    });
}

module.exports = {
  configLoader,
  getContent,
  handleContent,
  checksum,
  getPlanetLinks
};
