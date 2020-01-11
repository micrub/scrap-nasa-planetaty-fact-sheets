const chai = require('chai');
const expect = chai.expect;

describe('green test suite', function() {
  it('should pass', function() {
    expect(true).to.be.true;
  });
});

const ep = require('../src/');

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
});
