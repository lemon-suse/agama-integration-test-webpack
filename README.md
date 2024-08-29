# Webpack Experiment

This is experimental repository for compiling the
[Agama](https://github.com/openSUSE/agama) integration test into a single file
with all dependencies bundled.

## Advantages

- Puppeteer and it's dependencies are not needed on the Live ISO
- The tests can use additional libraries if needed, they do not need to depend
  on the Live ISO content
- The used Puppeteer version is not bound to the Live ISO (it only needs to be
  compatible with the included Firefox browser), the version update is simple
- The builtin nodeJS test runner supports the [Test Anything
  Protocol](https://en.wikipedia.org/wiki/Test_Anything_Protocol) (TAP),
  already supported by openQA

## Preparation

First install the NPM packages:

    npm ci

Then we need to patch the Puppeteer code and remove the magic `webpackIgnore`
comments which prevents from including some files in the bundle:

    find node_modules/puppeteer-core/lib -type f -exec sed -i -e "s/webpackIgnore//" \{\} \;

## Compilation

To compile the source test file run:

    npx webpack

This generates the new files into the `dist` subdirectory.

## Executing the Test

The generated test is executable, simply run it (this connects to the locally
running Agama instance, to use a remote one see the options below):

    ./dist/test_root_password.cjs

To use the TAP output format, use the `--test-reporter` nodeJS option:

    node --test-reporter=tap --test-timeout=60000 ./dist/test_root_password.cjs

Alternatively it is possible to implement [own test reporter](
https://www.nearform.com/insights/writing-a-node-js-test-reporter/).

The test currently accepts the options only via the environment variables. Full
example for running the browser using English locale, using local Chrome browser
in headed mode and connecting to a remote Agama instance:

    LC_ALL=en_US.UTF-8 AGAMA_BROWSER=chrome AGAMA_HEADLESS=false \
    AGAMA_SERVER=https://agama.local node --test-timeout=60000 \
    dist/test_root_password.cjs

## TODO

- [ ] Dump the HTML page and screenshot on test failure
- [ ] Use the [commander.js](https://github.com/tj/commander.js) library and
  implement a standard command line option parsing
- [ ] Check why Puppeteer uses that `webpackIgnore` comments, is there a better
  way than patching the Puppeteer code?
