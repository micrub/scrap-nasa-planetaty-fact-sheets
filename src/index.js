const rp = require('request-promise');
const validator = require('validator');
const cheerio = require('cheerio');

function configLoader() {
  let cfg;
  try {
    cfg = require('dotenv').config();
  } catch (e) {
    throw new Error('Havnt found any configuration to load');
  }
  return cfg;
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

/**
 * handleContent - dispatch a promise to GET http content for specified url
 *
 * @param contentPromise
 * @param handler - function that handles Promise
 * @returns {undefined}
 */

async function handleContent(contentPromise) {
  return contentPromise
    .then(content => {
      return cheerio.load(content);
    })
    .error(err => {
      throw new Error(err);
    });
}

module.exports = {
  configLoader,
  getContent,
  handleContent
};
