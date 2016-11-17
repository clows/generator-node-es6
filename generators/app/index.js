var generators = require('yeoman-generator');

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
      name: 'install',
      message: 'Install packages?',
      default: true
    }]).then(function (answers) {
      this.props = answers;

      this.log('app name', answers.name);
      this.log('author', answers.author);
      this.log('version', answers.version);
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
      this.templatePath('config/_yarn.lock'),
      this.destinationPath('yarn.lock')
    );
  },
  writing: function () {
    this.log('library files writing')

  }
});
