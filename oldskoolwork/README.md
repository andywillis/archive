[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

# Local Development Scaffold

Contains the scaffolding/files for an experimental 2014 JavaScript library.

## Table Of Contents

  1. [How to install this library](#install)
  1. [Running Grunt tasks](#grunt)
  1. [Folder Structure](#structure)

## <a name='install'>How to install this library</a>

- Clone the repo
- If you don't have the `grunt-cli` installed run: `npm install -g grunt-cli` (assumes NodeJS is installed).
- If you don't have bower installed then: `npm install -g bower`.
- `npm install && bower install` will install all the dependencies. Node modules will be in `node_modules` and bower components will be in `src/lib/js`.

## <a name='structure'>Folder structure</a>

### /

 - `.git-attributes`
 - `.git-ignore`
 - `.travis.yml` - the [TravisCI](https://travis-ci.org/andywillis/EVL) config file. Each time new code is committed to the repository the code is tested with Travis. A test report will appear alongside the commit notice. In addition a coverage report will become available. The status of the project is provided by the icons at the top of this README.md file.
 - `Gruntfile.js` - the main Grunt file. It directs Grunt to the Grunt folder full of the tasks.
 - `LICENCE`
 - `README.md`
 - `package.json` - contains all the information about this package.

### /build

Build folder. Where linted, tested, concatonated and minified code usually associated with `grunt build` ends up. Minification also adds a useful code source map.

### /grunt

Grunt task files for use with [`load-grunt-config`](https://www.npmjs.org/package/load-grunt-config) - a great plugin that allows you to separate out your Grunt concerns instead of having them all in one long incomprehensible configuration file.

`aliases.yml` is used to group the tasks into task lists.

The following are the current configuration files:

- `clean.js` - clear out the relevant folders. Uses [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean).
- `bump.js` - currently not used. Uses [grunt-bump](https://github.com/vojtajina/grunt-bump).
- `changelog.js` - creates change-logs (held in the release-notes folder) from the last 7 days of git commits. Still under investigation. Uses [grunt-changelog](https://github.com/ericmatthys/grunt-changelog).
- `concat.js` - concatonates the files. Uses [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat).
- `connect` - creates a server for use with the livereload feature.
- `copy.js` - copies files from one place to another. Uses [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy).
- `jscs.js` - performs a style check against the files using the rules described in the `.jscsrc` file. Uses [grunt-jscs](https://github.com/gustavohenke/grunt-jscs). __Note:__ Assumes the user has a copy of the `.jscsrc` file in their home folder.
- `jsdoc.js` - currently not used. Uses [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc).
- `jshint.js` - performs a style check against the files using the rules described in the `.jshintrc` file. Uses [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint). __Note:__ Assumes the user has a copy of the `.jshintrc` file in their home folder.
- `json-minify.js` - minifies JSON files. Uses [grunt-json-minify](https://github.com/andywillis/grunt-json-minify).
- `mochaTest.js` - run the tests against the source files. Uses [grunt-mocha-test](https://github.com/pghalliday/grunt-mocha-test).
- `open` - just sets up a `connect` parameter so the files can be watched properly.
- `sftp.js` - uploads files to a secure FTP site. Uses [grunt-ssh](https://github.com/andrewrjones/grunt-ssh).
- `uglify.js` - minifies the code. Uses [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify).
- `watch` - describes a list of files that should be watched for changes. These changes reflect how the livereload responds.

### /node-modules

All of the relevant NodeJS modules that will appear after the inital `npm install`. These are installed from the list contained in the `devDependencies` section in `package.json`.

There are a couple of extra modules listed in this folder that aren't listed above that I've included that are related to some of the other modules, or have been downloaded so some investigation can be run on them - you can ignore them.

### /release-notes

Release notes created by the Grunt `changelog.js` process.

### /src

Contains the source code for running the app. It includes an `index.html` file on to which the `connect` process grabs to launch the server. The core JavaScript is stored in `core`, and the additional (Bower) JavaScript / CSS files are stored in `lib`.

### /test

[Mocha](http://mochajs.org/)/[Chai](http://chaijs.com/)/[Sinon](sinonjs.org) tests and test coverage.

## <a name='grunt'>How to run a Grunt task</a>

The tasks are used with the `grunt` command, and each task has a number of subtasks as defined by the separate task JS files in the `grunt` folder. I've listed them here so the user can see how they're put together.

### `grunt server`

Run a new instance of the livereload server.

Uses:
  - connect
  - open
  - watch

### `grunt build`

Make a new distribution copy of the core JavaScript code.

Uses:
  - clear
  - cleanfolders
  - jshint
  - jscs
  - mochacov:test
  - concat:prod
  - uglify
  - copy:JSON
  - json-minify
  - clean:concat

### `grunt buildwithdocs`

Like `grunt build` but adding building documentation from the inline comments. Currently not working.

Uses:
  - clear
  - cleanfolders
  - jshint
  - jscs
  - mochacov:test
  - concat:prod
  - uglify
  - copy:JSON
  - json-minify
  - clean:concat
  - jsdoc

### `grunt cleanfolders`

Cleans the coverage, documentation and build folders.

Uses:
  - clean:coverage
  - clean:documentation
  - clean:build

### `grunt test`

Test the core JS.

Uses:
  - clear
  - clean:coverage
  - mochacov:test

### `grunt testwithcov`

Test the core JS code with a coverage report - for use with with TravisCI only.

Uses:
  - clear
  - clean:coverage
  - mochacov:test
  - mochacov:coverage

### `grunt lint`

Lint the core JS files

Uses:
  - clear
  - jshint
  - jscs

### `grunt minifyJSON`

Minify all JSON files

Uses:
  - copy:JSON
  - json-minify

### `grunt deploy`

Deploy the core JS files to the server. An `.sftprc` file must be added for this feature to work.

Uses:
  - clear
  - sftp
