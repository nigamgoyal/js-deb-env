// This file isn't transpiled, so must use CommonJS and ES5

// Register babel to transpiled before our test run.
require('babel-register')();

// Disable the webpack features that Mocha doesn't understand.
require.extensions['.css'] = function() {};
