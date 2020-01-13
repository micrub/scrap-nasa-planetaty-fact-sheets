const _ = require('lodash');
const rp = require('request-promise');
const validator = require('validator');
const cheerio = require('cheerio');
const crypto = require('crypto');

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

async function getLinks(url) {
  const resultArr = [];
  const contentPromise = getContent(url);
  const c = await handleContent(contentPromise);
  if (c instanceof Error) {
    throw c;
  }
  const ais = c('p > a');

  resultArr == ais;
  return resultArr;
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
      return cheerio.load(content);
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
  getLinks
};
