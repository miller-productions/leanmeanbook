(function (app) {
  'use strict';
  
  app.registerModule('core');
  app.registerModule('core.routes', ['ui.router']);

}(ApplicationConfiguration));
