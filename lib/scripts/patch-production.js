const fs = require('fs');

console.log('Patching Angular CLI configuration ...');
/**
 * read file from angular cli.
 */
fs.readFile('./node_modules/@angular/cli/models/webpack-configs/production.js', 'utf-8', (error, fileContent) => {
  /**
   * providing externals to webpack config it excludes putting external
   * libraries to the build itself.
   * externals: {
   *   'core-js/es6/reflect': 'reflect',
   *   'core-js/es7/reflect': 'reflect'
   * },
   * for short it can be replaced with RegExp
   * because everyone loves RegExp
   * externals: /^core-js\\/(es6|es7)\\/reflect$/,
   */
  const reflectPolyfills = `externals: /^core-js\\/(es6|es7)\\/reflect$/,`;
  if (fileContent.indexOf(reflectPolyfills) === -1) {
    const uniqueContentToReplace = 'return {';
    fileContent = fileContent.replace(uniqueContentToReplace, `${uniqueContentToReplace}\n        ${reflectPolyfills}`);
    console.log('Patching completed.');
  } else {
    console.log('Nothing to patch');
  }

  /**
   * modification completed need to update the file
   */
  fs.writeFile('./node_modules/@angular/cli/models/webpack-configs/production.js', fileContent, 'utf-8', error => {
    console.log('Write completed!');
  });
});
