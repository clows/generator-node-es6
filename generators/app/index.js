const generators = require('yeoman-generator');
const chalk = require('chalk');

module.exports = generators.Base.extend({
  prompting: function () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Module name',
      default: this.appname // Default to current folder name
    }, {
      type: 'input',
      name: 'author',
      message: 'Author name',
      default: '' // TODO read from yo rc file
    }, {
      type: 'input',
      name: 'version',
      message: 'Version of your library?',
      default: '1.0.0'
    }, {
      type: 'confirm',
      name: 'gitignore',
      message: 'Add .gitignore?',
      default: true
    }, {
      type: 'confirm',
      name: 'install',
      message: 'Install packages?',
      default: true
    }]).then(function (answers) {
      this.props = answers;

      this.log('app name', answers.name);
      this.log('author', answers.author);
      this.log('version', answers.version);
      this.log('gitignore', answers.gitignore);
      this.log('install', answers.install);
    }.bind(this));
  },
  configuring: function () {
    this.fs.copyTpl(
      this.templatePath('config/_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copyTpl(
      this.templatePath('config/_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        version: this.props.version,
        author: this.props.author
      }
    );
    this.fs.copyTpl(
      this.templatePath('config/_eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copyTpl(
      this.templatePath('config/_eslintignore'),
      this.destinationPath('.eslintignore')
    );
    this.fs.copyTpl(
      this.templatePath('config/_yarn.lock'),
      this.destinationPath('yarn.lock')
    );
    if(this.props.gitignore) {
      this.fs.copyTpl(
        this.templatePath('config/_gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('lib/_index.js'),
      this.destinationPath('lib/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('test/_index.spec.js'),
      this.destinationPath('test/index.spec.js')
    );
  },
  install: function () {
    if (!this.props.install) {
      this.log(chalk.red('  skipping install of deps'));
      return;
    }
    var _this = this;
    this.spawnCommand('yarn', ['install']).on('close', function yarnClose() {
      var isWin = /^win/.test(process.platform);
      if (isWin) return;

      _this.spawnCommand('chmod', ['+x', '.git/hooks/pre-commit']);
    });
  }
});
