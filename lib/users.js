var request = require('superagent')


function Users (obj) {

  this._config = obj._config
  
}


Users.prototype = {

  create: function (params, fn) {

    params.pio_appkey = this._config.key

    request
      .post( this._config.baseUrl + '/users.json')
      .send(params)
      .end(function (err, res) {

        fn && fn(err, res.body)

      })

  }

  , get: function (uid, fn) {

    var endpoint = this._config.baseUrl + '/users/' + uid + '.json'

    request
      .get(endpoint)
      .query({ pio_appkey: this._config.key })
      .end(function (err, res) {

        fn && fn(err, res.body)

      })

  }

  , remove: function (uid, fn) {

    var endpoint = this._config.baseUrl + '/users/' + uid + '.json'

    request
      .del(endpoint)
      .query({ pio_appkey: this._config.key })
      .end(function (err, res) {

        fn && fn(err, res.body)

      })

  }

}


module.exports = Users
