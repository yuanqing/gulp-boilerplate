# gulp-boilerplate [![Build Status](https://img.shields.io/travis/yuanqing/gulp-boilerplate.svg?style=flat)](https://travis-ci.org/yuanqing/gulp-boilerplate)

> A [Gulp](http://gulpjs.com/)-powered boilerplate for Node and JavaScript projects.

## Gulp tasks

Choose between one of `test` or `test-karma`, and edit accordingly. Use `test-karma` if you need to work with the DOM, otherwise use `test` (which is faster).

### `bench`

Run the [Matcha](https://github.com/logicalparadox/matcha) benchmarks in `benchmark/`.

### `dist`

[Browserify](http://browserify.org/) `index.js`, and write `foo.js` (with sourcemap) and `foo.min.js` into `dist/`.

### `lint`

Lint `index.js`, `test/*.spec.js`, `test/karma.conf.js`, `benchmark/*.js`, and `gulpfile.js` with [JSHint](http://jshint.com/docs/).

### `test`

Run the [Jasmine](http://jasmine.github.io/2.0/introduction.html) tests in `test/`. Writes code coverage reports generated by [Istanbul](http://gotwarlost.github.io/istanbul/) into `coverage/`.

### `test-browser`

Run the tests in `test/` on [PhantomJS](http://phantomjs.org/) via [Karma](http://karma-runner.github.io/). Writes code coverage reports generated by [Istanbul](http://gotwarlost.github.io/istanbul/) into `coverage/`.
