var options = {
  version: '1.3.4',
  where: 'client',
  packageName: 'huei90:angular-validation'
};

// meta data
Package.describe({
  name: options.packageName,
  version: options.version,
  summary: 'Client-side Validation for AngularJS',
  git: 'https://github.com/huei90/angular-validation',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0', 'METEOR@1.0');
  api.use('angular:angular@1.3.15', options.where);
  api.addFiles([
    'dist/angular-validation.js',
    'dist/angular-validation-rule.js'
  ], options.where);
});
