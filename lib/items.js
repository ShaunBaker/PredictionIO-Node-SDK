var request = require('superagent')


function Items (obj) {

  this._config = obj._config
  
}


Items.prototype = {

  create: function (params, fn) {

    params.pio_appkey = this._config.key

    request
      .post( this._config.baseUrl + '/items.json')
      .send(params)
      .end(function (err, res) {

        fn && fn(err, res.body)

      })


  }

  , get: function (uid, fn) {

    var endpoint = this._config.baseUrl + '/items/' + uid + '.json'

    request
      .get(endpoint)
      .query({ pio_appkey: this._config.key })
      .end(function (err, res) {

        fn && fn(err, res.body)

      })

  }

  , remove: function (uid, fn) {

    var endpoint = this._config.baseUrl + '/items/' + uid + '.json'

    request
      .del(endpoint)
      .query({ pio_appkey: this._config.key })
      .end(function (err, res) {

        fn && fn(err, res.body)

      })

  }

  , similarity: function (params, fn) {

    if (!params.engine) {
      fn && fn('Engine must be supplied', null)
    }

    params.pio_appkey = this._config.key

    var endpoint = this._config.baseUrl + '/engines/itemsim/' + params.engine + '/topn.json'

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

        fn && fn(err, res.body)

      })

  }

  , recommendation: function (params, fn) {

    if (!params.engine) {
      fn && fn('Engine must be supplied', null)
    }

    params.pio_appkey = this._config.key

    var endpoint = this._config.baseUrl + '/engines/itemrec/' + params.engine + '/topn.json'

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

        fn && fn(err, res.body)

      })

  }

}


module.exports = Items
