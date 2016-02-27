var outputRoot = 'dist/';
var appRoot = 'src/';

module.exports = {
  source: appRoot + '**/*.ts',
  output: outputRoot,

  typings: [
    './typings/browser/**/*.d.ts'
  ]
}