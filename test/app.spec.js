const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');
const fs = require('fs-extra');


describe(' node-es6:app', () => {

  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))

      .withPrompts({
        name: 'unit-test',
        author: 'mr. lab',
        version: '4.2.0',
        install: false
      })
      .toPromise();
  });

  it(' creates configuration files', () => {
    'use strict';
    assert.file([
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      'package.json',
      'yarn.lock'
    ]);
  });
});
