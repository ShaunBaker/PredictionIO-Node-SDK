require('mocha-as-promised')()

var chai = require('chai').use(require('chai-as-promised'))
  , prediction = require('../index.js')
  , key = 'DE3ymARmjiUKf2vL6fshw4nSzVqE3uiicKcejzpgWNKTVUJFs0IWoQmMV19atb9I'
  , domain
  , when = require('when')
  , expect = chai.expect
  , should = chai.should


describe('Testing PredictionIO', function () {

  it('prediction should be a function', function () {
    expect(prediction).to.be.a('function')
  })

})


describe('Lets test PredicitonIO with App Key, but without a baseUrl', function () {

  var boot = new prediction({
    key: key
  })

  it('prediction should be a object', function () {
    expect(boot).to.be.an('object')
  })

  describe('Lets test the configuration of PredicitonIO', function () {

    it('prediction should have a config object', function () {
      expect(boot._config).to.be.an('object')
    })

    it('prediction._config.key should be a string', function () {
      expect(boot._config.key).to.be.an('string')
    })

    it('prediction._config.key should be the same as the key used when initializing', function () {
      expect(boot._config.key).to.eql(key)
    })

  })

})


describe('Lets test PredicitonIO with an App Key and baseUrl == localhost', function () {

  var boot = new prediction({
    key: key
    , baseUrl: 'localhost'
  })

  it('prediction should be a object', function () {
    expect(boot).to.be.an('object')
  })

  describe('Lets test the configuration of PredicitonIO', function () {

    it('prediction should have a config object', function () {
      expect(boot._config).to.be.an('object')
    })

    it('prediction._config.key should be a string', function () {
      expect(boot._config.key).to.be.an('string')
    })

    it('prediction._config.key should be the same as the key used when initializing', function () {
      expect(boot._config.key).to.eql(key)
    })

    it('prediction._config.baseUrl should not be the same as the URL used when initializing', function () {
      expect(boot._config.baseUrl).to.not.eql('localhost')
      expect(boot._config.baseUrl).to.eql('http://127.0.0.1:8000')
    })

  })
  
})


describe('Lets test PredicitonIO with an App Key and baseUrl != localhost', function () {
  
  var boot = new prediction({
    key: key
    , baseUrl: 'http://127.0.0.0:8000'
  })

  it('prediction should be a object', function () {
    expect(boot).to.be.an('object')
  })

  describe('Lets test the configuration of PredicitonIO', function () {

    it('prediction should have a config object', function () {
      expect(boot._config).to.be.an('object')
    })

    it('prediction._config.key should be a string', function () {
      expect(boot._config.key).to.be.an('string')
    })

    it('prediction._config.key should be the same as the key used when initializing', function () {
      expect(boot._config.key).to.eql(key)
    })

    it('prediction._config.baseUrl should be the same as the URL used when initializing', function () {
      expect(boot._config.baseUrl).to.eql('http://127.0.0.0:8000')
    })

  })

})


describe('Test User functions', function () {
  
  var boot = new prediction({
    key: key
    , baseUrl: 'http://127.0.0.1:8000'
  })

  it('prediction.users should be an object', function () {
    expect(boot.users).to.be.an('object')
  })

  it('prediction.users.get should be a function', function () {
    expect(boot.users.get).to.be.a('function')
  })

  it('prediction.users.remove should be a function', function () {
    expect(boot.users.remove).to.be.a('function')
  })

  it('prediction.users.create should be a function', function () {
    expect(boot.users.create).to.be.a('function')
  }) 

  describe('Test creating a user', function (done) {
      
    it('Run prediction.users.create (callback)', function (done) {

      boot.users.create({
        pio_uid: '999'
        , pio_inactive: false
        , pio_latlng: '51.5072,0.1275'
        , pio_any_string: 'Test'
      }, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        expect(res.message).to.be.ok
        expect(res.message).to.be.a('string')
        done()

      })

    })

    it('Run prediction.users.create (promise)', function (done) {

      boot.users.create({
        pio_uid: '999'
        , pio_inactive: false
        , pio_latlng: '51.5072,0.1275'
        , pio_any_string: 'Test'
      }).then(function (res) {

        expect(res).to.be.an('object')
        expect(res.message).to.be.ok
        expect(res.message).to.be.a('string')
        done()

      })

    })

  })

  describe('Test fetching a user', function (done) {

    it('Run prediction.users.get (callback)', function (done) {

      boot.users.get(999, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        done()

      })

    })
    
    it('Run prediction.users.get (promise)', function (done) {

      boot.users.get(999).then(function (res) {

        expect(res).to.be.an('object')
        done()

      })

    })

  })

  describe('Test removing a user', function (done) {

    it('Run prediction.users.remove (callback)', function (done) {

      boot.users.remove(14, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        done()

      })

    })
    
    it('Run prediction.users.remove (promise)', function (done) {

      boot.users.remove(14).then(function (res) {

        expect(res).to.be.an('object')
        done()

      })

    })

  })

  describe('Test creating a user action', function (done) {
    
    it('Run prediction.users.createAction (callback)', function (done) {

      boot.users.createAction({
        pio_uid: 999
        , pio_iid: 999
        , pio_action: 'rate'
        , pio_rate: '5'
        , pio_latlng: '51.5072,0.1275'
        , pio_t: 1234567890000
        , pio_any_string: 'Test'
      }, function (err, res) {
        
        expect(err).to.be.null
        expect(res).to.be.an('object')
        expect(res.message).to.be.ok
        expect(res.message).to.be.a('string')
        done()

      })

    })

    it('Run prediction.users.createAction (promise)', function (done) {

      boot.users.createAction({
        pio_engine: 'test'
        , pio_uid: 999
        , pio_iid: 999
        , pio_action: 'rate'
        , pio_rate: '5'
        , pio_latlng: '51.5072,0.1275'
        , pio_t: 1234567890000
        , pio_any_string: 'Test'
      }).then(function (res) {
        
        expect(res).to.be.an('object')
        expect(res.message).to.be.ok
        expect(res.message).to.be.a('string')
        done()

      })

    })

  })

})


describe('Test Item functions', function () {

  var boot = new prediction({
    key: key
    , baseUrl: 'http://127.0.0.0:8000'
  })

  it('prediction.items should be an object', function () {
    expect(boot.items).to.be.an('object')
  })

  it('prediction.items.get should be a function', function () {
    expect(boot.items.get).to.be.a('function')
  })

  it('prediction.items.remove should be a function', function () {
    expect(boot.items.remove).to.be.a('function')
  })

  it('prediction.items.create should be a function', function () {
    expect(boot.items.create).to.be.a('function')
  })

  it('prediction.items.recommendation should be a function', function () {
    expect(boot.items.recommendation).to.be.a('function')
  })

  it('prediction.items.similarity should be a function', function () {
    expect(boot.items.similarity).to.be.a('function')
  })

  describe('Test creating an item', function (done) {

    var boot = new prediction({
      key: key
      , baseUrl: 'http://127.0.0.1:8000'
    })
      
    it('Run prediction.items.create (callback)', function (done) {
      
      boot.items.create({
        pio_iid: '999'
        , pio_itypes: 'Beep, Boop, Boom'
        , pio_latlng: '51.5072,0.1275'
        , pio_inactive: true
        , pio_startT: 1234567890000
        , pio_endT: 1234567890000
        , pio_price: 1
        , pio_profit: 1
        , pio_any_string: 'Test'
      }, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        expect(res.message).to.be.ok
        expect(res.message).to.be.a('string')
        done()

      })

    })

    it('Run prediction.items.create (promise)', function (done) {
      
      boot.items.create({
        pio_iid: '999'
        , pio_itypes: 'Beep, Boop, Boom'
        , pio_latlng: '51.5072,0.1275'
        , pio_inactive: true
        , pio_startT: 1234567890000
        , pio_endT: 1234567890000
        , pio_price: 1
        , pio_profit: 1
        , pio_any_string: 'Test'
      }).then(function (res) {

        expect(res).to.be.an('object')
        expect(res.message).to.be.ok
        expect(res.message).to.be.a('string')
        done()
        
      })

    })

  })

  describe('Test fetching an item', function (done) {

    var boot = new prediction({
      key: key
      , baseUrl: 'http://127.0.0.1:8000'
    })
      
    it('Run prediction.items.get (callback)', function (done) {

      boot.items.get(999, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        done()

      })

    })
    
    it('Run prediction.items.get (promise)', function (done) {

      boot.items.get(999).then(function (res) {

        expect(res).to.be.an('object')
        done()

      })

    })

  })

  describe('Test removing an item', function (done) {

    var boot = new prediction({
      key: key
      , baseUrl: 'http://127.0.0.1:8000'
    })
      
    it('Run prediction.items.remove (callback)', function (done) {

      boot.items.remove(999, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        done()

      })

    })
    
    it('Run prediction.items.remove (promise)', function (done) {

      boot.items.remove(999).then(function (res) {

        expect(res).to.be.an('object')
        done()

      })

    })
  
  })


  describe('Test fetching recommendations', function (done) {

    var boot = new prediction({
      key: key
      , baseUrl: 'http://127.0.0.1:8000'
    })
      
    it('Run prediction.items.recommendation (callback)', function (done) {

      boot.items.recommendation({
        pio_engine: 'test'
        , pio_uid: 999
        , pio_n: 20
        , pio_itypes: ''
        , pio_latlng: ''
        , pio_within: ''
        , pio_unit: ''
        , pio_attributes: ''
      }, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        done()

      })

    })
    
    it('Run prediction.items.recommendation (promise)', function (done) {

      boot.items.recommendation({
        pio_engine: 'test'
        , pio_uid: 999
        , pio_n: 20
        , pio_itypes: ''
        , pio_latlng: ''
        , pio_within: ''
        , pio_unit: ''
        , pio_attributes: ''
      }).then(function (res) {

        expect(res).to.be.an('object')
        done()

      })

    })

  })

  describe('Test fetching similarity', function (done) {

    var boot = new prediction({
      key: key
      , baseUrl: 'http://127.0.0.1:8000'
    })
      
    it('Run prediction.items.similarity (callback)', function (done) {

      boot.items.similarity({
        pio_engine: 'test'
        , pio_iid: 999
        , pio_n: 20
        , pio_itypes: ''
        , pio_latlng: ''
        , pio_within: ''
        , pio_unit: ''
        , pio_attributes: ''
      }, function (err, res) {

        expect(err).to.be.null
        expect(res).to.be.an('object')
        done()

      })

    })
    
    it('Run prediction.items.similarity (promise)', function (done) {

      boot.items.similarity({
        pio_engine: 'test'
        , pio_iid: 999
        , pio_n: 20
        , pio_itypes: ''
        , pio_latlng: ''
        , pio_within: ''
        , pio_unit: ''
        , pio_attributes: ''
      }).then(function (res) {

        expect(res).to.be.an('object')
        done()

      })

    })

  })

})

