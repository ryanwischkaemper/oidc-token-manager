var gulp = require('gulp');
var paths = require('../paths');
var jspm = require("jspm");

gulp.task('build:global', function() {
  var builder = new jspm.Builder();
  return builder.buildStatic('src', paths.output + 'oidc-token-manager.global.js', {  format: 'umd',globalName: 'IdentityModel',
    globalDeps: {'IdentityModel': 'OidcTokenManager'}, sourceMaps:false, minify:true, mangle:true });
});

gulp.task('build', function() {
  return jspm.bundle('src', paths.output + 'oidc-token-manager.bundled.js', { mangle: false, minify: true, sourceMaps: true,lowResSourceMaps:false, inject: true });
});

gulp.task('unbundle', function() {
  return jspm.unbundle();
});



