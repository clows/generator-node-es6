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
      type: 'confirm',
      name: 'tests',
      message: 'Would you like to add a test suite?',
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
      this.log('test suite', answers.tests);
      this.log('install', answers.tests);
    }.bind(this));
  },
  writing: {
    config: function () {
      this.fs.copyTpl(
        this.templatePath('config/_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copyTpl(
        this.templatePath('config/_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
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

    files: function () {
      this.log('library files writing')
    }
  }
});
