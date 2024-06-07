module.exports = function(config) {
  config.set({
    // List of files/patterns to load in the browser
    files: [
      'src/**/*.ts',    // Your source files
      'test/**/*.spec.ts' // Your test files
    ],

    // Test framework to use
      frameworks: ['jasmine'],
    

    // Run tests and exit
    singleRun: true
  });
};