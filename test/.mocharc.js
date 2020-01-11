'use strict';

// Here's a JavaScript-based config file.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
  diff: true,
  extension: ['js'],
  opts: false,
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  ui: 'tdd',
  'watch-files': ['src/**/*.js', 'test/**/*.spec.js'],
  'watch-ignore': ['lib/vendor'],
  // custom
  bail: true
};
