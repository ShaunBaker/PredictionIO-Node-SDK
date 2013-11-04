var resources = {

  users: require('./users')
  , items: require('./items')
  , users2items: require('./user-to-item')

}


function PredictionIO (config, version) {

  if (!(this instanceof PredictionIO)) {
    return new PredictionIO(config, version)
  }

  this._config = config

  if (this._config.baseUrl === 'localhost') {
    this._config.baseUrl = 'http://127.0.0.1:9000'
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

}


module.exports = PredictionIO
