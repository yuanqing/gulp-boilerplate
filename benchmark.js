/* globals suite, set, bench */
'use strict';

var foo = require('./index.js');

suite('foo', function() {

  set('iterations', 100);

  bench('foo', function() {
    foo();
  });

});
