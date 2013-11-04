var request = require('superagent')


function Users2Items (obj) {

  this._config = obj._config

}


Users2Items.prototype = {

  create: function (params, fn) {

    params.pio_appkey = this._config.key

    request
      .post( this._config.baseUrl + '/actions/u2i.json')
      .send(params)
      .end(function (err, res) {

        fn && fn(err, res.body)

      })

  }

}


module.exports = Users2Items
