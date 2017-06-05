(function (app) {
  'use strict';
  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleDependencies);
  
  // Set configuration for the main module
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);
  // Use dependency injection for the bootstrapConfig parameters 
  // so they survive minification
  bootstrapConfig.$inject = ['$compileProvider', '$locationProvider', '$logProvider'];
    
  // Define the bootstrapConfig
  function bootstrapConfig($compileProvider, $locationProvider, $logProvider) {
    // Set HTML5 Location mode
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');
    
    // Disable debug data for production environment
    $compileProvider.debugInfoEnabled(app.applicationEnvironment !== 'production');
    $logProvider.debugEnabled(app.applicationEnvironment !== 'production');
  }
  
  // Look for the document ready event and call init
  angular.element(document).ready(init);
    
  // Define the init function for starting up the application
  function init() {
    // Bootstrap Angular manually
    angular.bootstrap(document, [app.applicationModuleName]);
  }
  
}(ApplicationConfiguration));
