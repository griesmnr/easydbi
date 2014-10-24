// Generated by CoffeeScript 1.4.0
(function() {
  var DBI, Driver, EventEmitter, Pool, loglet;

  EventEmitter = require('events').EventEmitter;

  Driver = require('./driver');

  Pool = require('./pool');

  loglet = require('loglet');

  DBI = (function() {

    function DBI() {}

    DBI.drivers = {};

    DBI.pools = {};

    DBI.register = function(type, driver) {
      this.drivers[type] = driver;
      return this;
    };

    DBI.getType = function(type) {
      if (this.drivers.hasOwnProperty(type)) {
        return this.drivers[type];
      } else {
        throw {
          error: 'unknown_dbi_driver_type',
          type: type
        };
      }
    };

    DBI.setup = function(key, _arg) {
      var driver, options, pool, type;
      type = _arg.type, options = _arg.options, pool = _arg.pool;
      driver = this.getType(type);
      if (driver.pool) {
        this.pools[key] = new Pool(key, driver, options, pool);
      } else {
        this.pools[key] = new Pool.NoPool(key, driver, options, pool);
      }
      return this;
    };

    DBI.getPool = function(key) {
      if (this.pools.hasOwnProperty(key)) {
        return this.pools[key];
      } else {
        throw {
          error: 'unknown_driver_spec',
          key: key
        };
      }
    };

    DBI.connect = function(key, cb) {
      var pool;
      loglet.debug('DBI.connect', key);
      try {
        pool = this.getPool(key);
        return pool.connect(cb);
      } catch (e) {
        return cb(e);
      }
    };

    DBI.load = function(key, module) {
      var call, options;
      for (call in module) {
        options = module[call];
        this.prepare(key, call, options);
      }
      return this;
    };

    DBI.prepare = function(key, call, options) {
      var pool;
      pool = this.getPool(key);
      pool.prepare(call, options);
      return this;
    };

    return DBI;

  })();

  module.exports = DBI;

}).call(this);