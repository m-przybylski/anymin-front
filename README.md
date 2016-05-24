# Profitelo Frontend [![Built with Gulp][build-with-gulp-png]][gulpjs-page]

## Requirements
*   `npm` (best install via [nvm][github-nvm])
*   `nginx`

## Installation
Download repository and inside:

> If you setup frontend localy with local domains, **DO NOT FORGET** to change
> `profitelo.urls.frontend` into `config.json` to those set into your server config,
> to avoid domains mismatch errors.

```bash
# node --version: min 4 or greater
npm install -g gulp-cli protractor
npm install
git submodule init
git submodule update
gulp build
```

> for more help type: `gulp` or `gulp about`

### Run protractor (e2e tests)
```bash
webdriver-manager update # manually get standalone server
webdriver-manager start # manually start selenium server
gulp protractor-run
```


## Development

*   [General frontend guidelines between Itelo projects][confluence-contactis-frontend-guidelines]


  [gulpjs-page]: https://www.gulpjs.com
  [build-with-gulp-png]: https://raw.githubusercontent.com/gulpjs/gulp/e2dd2b6c66409f59082c24585c6989244793d132/built-with-gulp.png
  [confluence-contactis-frontend-guidelines]: https://confluence.contactis.pl/display/GEN/Frontend+guidelines>
  [github-nvm]: https://github.com/creationix/nvm

