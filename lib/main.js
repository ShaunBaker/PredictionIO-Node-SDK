var when = require('when')
  , resources = {

  users: require('./users')
  , items: require('./items')

}


function PredictionIO (config, version) {

  if (!config || !config.key) return new Error('App Key must be supplied')

  if (!(this instanceof PredictionIO)) {
    return new PredictionIO(config, version)
  }

  this._config = config

  if (!this._config.baseUrl || this._config.baseUrl === 'localhost') {
    this._config.baseUrl = 'http://127.0.0.1:8000'
  }

  this._prep()

}


PredictionIO.prototype = {

  _prep: function () {

    for (var name in resources) {

      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this)

    }

  }

  , _createDeferred: function(callback) {
    
    var deferred = when.defer()

    if (callback) {
      deferred.promise.then(function (res) {
        setTimeout(function(){ callback(null, res) }, 0)
      }, function (err) {
        setTimeout(function(){ callback(err, null) }, 0)
      });
    }

    return deferred

  }

}


module.exports = PredictionIO
