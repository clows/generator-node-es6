# generator-node-es6

A node module generator for yeoman. Opinionated in the sense that it creates

 - ES6 node modules, no transpiling via babel
 - Uses [yarn](https://yarnpkg.com/) for dependency management
 - [Lab](https://github.com/hapijs/lab) for testing
 - eslint with airbnb rules ( with some minor tweaks )
 - installs [pre-commit hook](https://www.npmjs.com/package/pre-commit) to ensure lint at test works before a commit

## install it 

Install the genrator with npm:
```
$ npm install -g yo generator-node-es6
```


## Use it

Usage of the generator is via [yo](http://yeoman.io/)
```
$ yo node-es6
```

Answer the questions and celebreate that a new node module is generated for you.


# TODO

 - use cache to save answers
 - submodule generator for tests up and running
 - submodule generator for hapi-plugin
 - submodule generator for hapi-plugin test
 - submodule generator for hapi api

