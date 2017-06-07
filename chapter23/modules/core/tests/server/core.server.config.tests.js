'use strict';

// Module dependencies
var _ = require('lodash');
var should = require('should');
var mock = require('mock-fs');
var path = require('path');
var config = require(path.resolve('./config/config'));
var logger = require(path.resolve('./config/lib/logger'));

// Globals
var originalLogConfig;


describe('Configuration Tests:', function () {

  describe('Testing Logger Configuration', function () {

    beforeEach(function () {
      originalLogConfig = _.clone(config.log, true);
      mock();
    });

    afterEach(function () {
      config.log = originalLogConfig;
      mock.restore();
    });

    it('should retrieve the log format from the logger configuration', function () {
      config.log = {
        format: 'tiny'
      };
      
      var format = logger.getLogFormat();
      format.should.be.equal('tiny');
    });

    it('should retrieve the log options from the logger configuration for a valid stream object', function () {
      var options = logger.getMorganOptions();

      options.should.be.instanceof(Object);
      options.should.have.property('stream');
    });

    it('should verify that a file logger object was created using the logger configuration', function () {
      var _dir = process.cwd();
      var _filename = 'unit-test-access.log';

      config.log = {
        fileLogger: {
          directoryPath: _dir,
          fileName: _filename
        }
      };

      var fileTransport = logger.getFileTransportOptions(config);
      fileTransport.should.be.instanceof(Object);
      fileTransport.filename.should.equal(_dir + '/' + _filename);
    });

    it('should use the default log format of "combined" when an invalid format was provided', function () {   
      var _logger = require(path.resolve('./config/lib/logger'));
      
      // manually set the config log format to be invalid
      config.log = {
        format: '_some_invalid_format_'
      };
      
      var format = _logger.getLogFormat();
      format.should.be.equal('combined');
    });

    it('should not create a file transport object if critical options are missing: filename', function () { 
      // manually set the config stream fileName option to an empty string
      config.log = {
        format: 'combined',
        options: {
          stream: {
            directoryPath: process.cwd(),
            fileName: ''
          }
        }
      };
     
      var fileTransport = logger.getFileTransportOptions(config);
      fileTransport.should.be.false();
    });

    it('should not create a file transport object if critical options are missing: directory', function () {
      // manually set the config stream directoryPath option to an empty string
      config.log = {
        format: 'combined',
        options: {
          stream: {
            directoryPath: '',
            fileName: 'app.log'
          }
        }
      };
      var fileTransport = logger.getFileTransportOptions(config);
      fileTransport.should.be.false();
    });    
  });

  describe('Testing Session Secret Configuration', function () {

    it('should warn if using default session secret when running in production', function (done) {
      var conf = { sessionSecret: 'MEAN' };
      // set env to production for this test
      process.env.NODE_ENV = 'production';
      config.utils.validateSessionSecret(conf, true).should.equal(false);
      // set env back to test
      process.env.NODE_ENV = 'test';
      return done();
    });

    it('should accept non-default session secret when running in production', function () {
      var conf = { sessionSecret: 'super amazing secret' };
      // set env to production for this test
      process.env.NODE_ENV = 'production';
      config.utils.validateSessionSecret(conf, true).should.equal(true);
      // set env back to test
      process.env.NODE_ENV = 'test';
    });

    it('should accept default session secret when running in development', function () {
      var conf = { sessionSecret: 'MEAN' };
      // set env to development for this test
      process.env.NODE_ENV = 'development';
      config.utils.validateSessionSecret(conf, true).should.equal(true);
      // set env back to test
      process.env.NODE_ENV = 'test';
    });

    it('should accept default session secret when running in test', function () {
      var conf = { sessionSecret: 'MEAN' };
      config.utils.validateSessionSecret(conf, true).should.equal(true);
    });

    
  });

});