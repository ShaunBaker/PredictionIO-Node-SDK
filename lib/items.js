var request = require('superagent')
  , when = require('when')


function Items (obj) {

  this._config = obj._config
  this._createDeferred = obj._createDeferred
  
}


Items.prototype = {

  create: function (params, fn) {

    var deferred = this._createDeferred(fn)
    params.pio_appkey = this._config.key

    request
      .post(this._config.baseUrl + '/items.json')
      .send(params)
      .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
        else deferred.resolve(res.body)

      })
    
    return deferred.promise

  }

  , get: function (uid, fn) {

    var deferred = this._createDeferred(fn)
      , endpoint = this._config.baseUrl + '/items/' + uid + '.json'

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
      , endpoint = this._config.baseUrl + '/items/' + uid + '.json'

    request
      .del(endpoint)
      .send({ pio_appkey: this._config.key })
      .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
        else deferred.resolve(res.body)

      })

    return deferred.promise

  }

  , similarity: function (params, fn) {

    var deferred = this._createDeferred(fn)

    if (!params.pio_engine) {
      deferred.reject('Engine must be supplied')
      return deferred.promise
    }

    params.pio_appkey = this._config.key

    var endpoint = this._config.baseUrl + '/engines/itemsim/' + params.pio_engine + '/topn.json'

    request
      .post(endpoint)
      .query({
        pio_appkey: this._config.key
        , pio_iid: params.pio_iid
        , pio_n: params.pio_n || 10
        , pio_itypes: params.pio_itypes || ''
        , pio_latlng: params.pio_latlng || ''
        , pio_within: params.pio_within || ''
        , pio_unit: params.pio_unit || ''
        , pio_attributes: params.pio_attributes || ''
      })
      .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
        else deferred.resolve(res.body)

      })

    return deferred.promise

  }

  , recommendation: function (params, fn) {

    var deferred = this._createDeferred(fn)

    if (!params.pio_engine) {
      deferred.reject('Engine must be supplied')
      return deferred.promise
    }

    params.pio_appkey = this._config.key

    var endpoint = this._config.baseUrl + '/engines/itemrec/' + params.pio_engine + '/topn.json'

    request
      .post(endpoint)
      .query({
        pio_appkey: this._config.key
        , pio_uid: params.pio_uid
        , pio_n: params.pio_n || 10
        , pio_itypes: params.pio_itypes || ''
        , pio_latlng: params.pio_latlng || ''
        , pio_within: params.pio_within || ''
        , pio_unit: params.pio_unit || ''
        , pio_attributes: params.pio_attributes || ''
      })
      .end(function (err, res) {

        if (err || !res || !res.body) deferred.reject(err)
        else deferred.resolve(res.body)

      })

    return deferred.promise

  }

}


module.exports = Items
