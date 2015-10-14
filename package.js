var options = {
  "version": "1.3.2",
  "where": "client",
  "packageName": "dvelopment:angular-validation"
};

// meta data
Package.describe({
  name: options.packageName,
  version: options.version,
  summary: 'Client-side Validation for AngularJS',
  git: 'git@github.com:huei90/angular-validation.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0', 'METEOR@1.0');
  api.use('angular:angular@1.2.0', options.where);
  api.addFiles('dist/angular-validation.js', options.where);
  api.addFiles('dist/angular-validation-rule.js', options.where);
});
