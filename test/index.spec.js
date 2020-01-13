const _ = require('lodash');
const { first } = _;
const chai = require('chai');
const expect = chai.expect;
const ep = require('../src/');
const ch = require('cheerio');

const LINKSCOUNT = 30;

describe('green test suite', function() {
  it('should pass', function() {
    expect(true).to.be.true;
  });
});

describe('entry point', function() {
  it('should be an Object', function() {
    expect(ep).to.be.instanceOf(Object);
  });
  it('should have configLoader Function', function() {
    expect(ep.configLoader).to.be.instanceOf(Function);
  });
  describe('configLoader', function() {
    const config = ep.configLoader();
    it('should load a default conf object', function() {
      expect(config.error).to.be.undefined;
    });
    it('should have root url for parsing', function() {
      const url = config.parsed.ROOTURL;
      expect(url).to.be.not.empty;
    });
  });
  describe('getContent', function() {
    let config, url;
    before(function() {
      config = ep.configLoader();
      url = config.parsed.ROOTURL;
    });
    it('should have getContent Function', function() {
      expect(ep.getContent).to.be.instanceOf(Function);
    });
    it('should returm an "promise" Object when passed valid url', function() {
      const p = ep.getContent(url);
      expect(p).to.be.instanceOf(Object);
    });

    it('should return testual content on valid url', function() {
      const p = ep.getContent(url);
      p.then(v => {
        expect(v).to.be.not.empty;
      });
    });
  });

  describe('handleContent', function() {
    let config, url;
    before(function() {
      config = ep.configLoader();
      url = config.parsed.ROOTURL;
    });
    it('should have handleContent Function', function() {
      expect(ep.handleContent).to.be.instanceOf(Function);
    });
    it('should have 8 p html tags , in order not to break parsing.', function() {
      const contentPromise = ep.getContent(url);
      const handledContent = ep.handleContent(contentPromise);
      handledContent.then($ => {
        expect($('p').length).to.be.eq(8);
      });
    });
  });

  describe('get all links from index page', function() {
    let config, url;
    before(function() {
      config = ep.configLoader();
      url = config.parsed.ROOTURL;
    });
    it('should ' + LINKSCOUNT + ' tags.', function() {
      const contentPromise = ep.getContent(url);
      const handledContent = ep.handleContent(contentPromise);
      handledContent.then($ => {
        expect($('a').length).to.be.eq(LINKSCOUNT);
      });
    });
  });

  describe('checksum', function() {
    it('should have checksum Function', function() {
      expect(ep.checksum).to.be.instanceOf(Function);
    });
    it('should return check sum of content', function() {
      const text = 'This is my test text';
      expect(ep.checksum(text)).to.be.eq('e53815e8c095e270c6560be1bb76a65d');
      expect(ep.checksum(text, 'sha1')).to.be.eq(
        'cd5855be428295a3cc1793d6e80ce47562d23def'
      );
    });
  });

  describe('getLinks', function() {
    let config, url;
    let links;
    before(async function() {
      config = ep.configLoader();
      url = config.parsed.ROOTURL;
    });
    it(
      'getLinks should return ' + LINKSCOUNT + ' length arrays of links',
      async function() {
        links = await ep.getLinks(url);
        console.log(links);
        expect(links.length).to.be.eq(LINKSCOUNT);
      }
    );
  });
});
