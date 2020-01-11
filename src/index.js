const rp = require('request-promise');
const validator = require('validator');

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

module.exports = {
  configLoader,
  getContent
};
