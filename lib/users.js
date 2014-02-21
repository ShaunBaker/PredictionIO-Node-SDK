var request = require('superagent')
  , when = require('when')


function Users (obj) {

  this._config = obj._config
  this._createDeferred = obj._createDeferred

}


Users.prototype = {

  create: function (params, fn) {

    var deferred = this._createDeferred(fn)
    params.pio_appkey = this._config.key

    request
      .post(this._config.baseUrl + '/users.json')
      .send(params)
      .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
        else deferred.resolve(res.body)

      })

    return deferred.promise

  }

  , get: function (uid, fn) {

    var deferred = this._createDeferred(fn)
      , endpoint = this._config.baseUrl + '/users/' + uid + '.json'

    request
      .get(endpoint)
      .query({ pio_appkey: this._config.key })
      .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
        else deferred.resolve(res.body)

      })

    return deferred.promise

  }

  , remove: function (uid, fn) {

    var deferred = this._createDeferred(fn)
      , endpoint = this._config.baseUrl + '/users/' + uid + '.json'

      request
        .del(endpoint)
        .send({
          pio_appkey: this._config.key
        })
        .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
          else deferred.resolve(res.body)

        })

    return deferred.promise

  }

  , createAction: function (params, fn) {

    var deferred = this._createDeferred(fn)
    params.pio_appkey = this._config.key

    request
      .post(this._config.baseUrl + '/actions/u2i.json')
      .send(params)
      .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
        else deferred.resolve(res.body)

      })

    return deferred.promise
  }

}


module.exports = Users
