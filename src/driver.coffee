{ EventEmitter } = require 'events'


# extremely easy 
class Driver extends EventEmitter
  @id = 0
  @pool = true
  constructor: (@options) ->
    @constructor.id++
    @id = @constructor.id
  connect: (cb) ->
  isConnected: () -> false
  driverName: () ->
    @constructor.name
  query: (key, args, cb) -> # query will return results. 
  queryOne: (key, args, cb) ->
    @query key, args, (err, rows) ->
      if err
        cb err
      if rows?.length == 0
        cb {error: 'no_rows_found'}
      else
        cb null, rows[0]
  exec: (key, args, cb) ->
    @query key, args, (err, rows) ->
      if err
        cb err
      else
        cb null 
  begin: (cb) ->
  commit: (cb) ->
  rollback: (cb) ->
  disconnect: (cb) ->
  close: (cb) -> # same as disconnect except in pool scenario.

module.exports = Driver