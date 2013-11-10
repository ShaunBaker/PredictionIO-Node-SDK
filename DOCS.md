##Documentation

The code within this module maps to utilise endpoints explained here: [PredictionIO](http://docs.prediction.io/current/apis/index.html)

Using the module is straightforward:

```javascript
  var prediction = require('predictionio')({
    key: YOUR_APP_KEY
  })
```

By default the module will communicate with the PredictionIO server running locally on port 8000

You can also specify to work against a different host

```javascript
  var prediction = require('predictionio')({
    key: YOUR_APP_KEY
    , baseUrl: 'http://url.to.work.against'
  })
```

The module works using both the traditional callback style and with promises.


###Create a User

```javascript
  prediction.users.create({
    pio_uid: '14'
    , pio_inactive: false
    , pio_latlng: '51.5072,0.1275'
    , pio_any_string: 'Test'
  }, function (err, res) {
    console.log(err, res)
  })

  prediction.users.create({
    pio_uid: '14'
    , pio_inactive: false
    , pio_latlng: '51.5072,0.1275'
    , pio_any_string: 'Test'  
  }).then(function (res) {
    console.log(res)
  })
```

###Fetch a User

```javascript
  prediction.users.get(14, function (err, res) {
    console.log(err, res)
  })
  
  prediction.users.get(14).then(function (res) {
    console.log(res)
  })
```

###Remove a User

```javascript
  prediction.users.remove(14, function (err, res) {
    console.log(err, res)
  })
  
  prediction.users.remove(14).then(function (res) {
    console.log(res)
  })
```

###Create an Item

```javascript
prediction.items.create({
  pio_iid: '15'
  , pio_itypes: 'Beep, Boop, Boom'
  , pio_latlng: '51.5072,0.1275'
  , pio_inactive: true
  , pio_startT: 1234567890000
  , pio_endT: 1234567890000
  , pio_price: 1
  , pio_profit: 1
  , pio_any_string: 'Test'
}, function (err, res) {
  console.log(err, res)
})

prediction.items.create({
  pio_iid: '14'
  , pio_itypes: 'Beep, Boop, Boom'
  , pio_latlng: '51.5072,0.1275'
  , pio_inactive: true
  , pio_startT: 1234567890000
  , pio_endT: 1234567890000
  , pio_price: 1
  , pio_profit: 1
  , pio_any_string: 'Test'
}).then(function (res) {
  console.log(res)
})
```

###Fetch an Item

```javascript
  prediction.items.get(14, function (err, res) {
    console.log(err, res)
  })

  prediction.items.get(14).then(function (res) {
    console.log(res)
  })
```

###Remove an Item

```javascript
  prediction.items.remove(14, function (err, res) {
    console.log(err, res)
  })

  prediction.items.remove(14).then(function (res) {
    console.log(res)
  })
```

###Create a User to Item action

```javascript
prediction.users.createAction({
  pio_engine: 'test'
  , pio_uid: 14
  , pio_iid: 14
  , pio_action: 'like'
  , pio_rate: '5'
  , pio_latlng: '51.5072,0.1275'
  , pio_t: 1234567890000
  , pio_any_string: 'Test'
}, function (err, res) {
  console.log(err, res)
})

prediction.users.createAction({
  pio_uid: 14
  , pio_iid: 14
  , pio_action: 'rate'
  , pio_rate: '5'
  , pio_latlng: '51.5072,0.1275'
  , pio_t: 1234567890000
  , pio_any_string: 'Test'
}).then(function (res) {
  console.log(res)
})
```

###Fetch User Recommendations

```javascript
  prediction.items.recommendation({
    pio_uid: 14
    , pio_n: 20
    , pio_itypes: ''
    , pio_latlng: ''
    , pio_within: ''
    , pio_unit: ''
    , pio_attributes: ''
  }, function (err, res) {
    console.log(err, res)
  })
  
  prediction.items.recommendation({
    pio_uid: 14
    , pio_n: 20
    , pio_itypes: ''
    , pio_latlng: ''
    , pio_within: ''
    , pio_unit: ''
    , pio_attributes: ''
  }).then(function (res) {
    console.log(res)
  })
```

### Fetch Similar for User

```javascript
  prediction.items.similarity({
    pio_uid: 14
    , pio_n: 20
    , pio_itypes: ''
    , pio_latlng: ''
    , pio_within: ''
    , pio_unit: ''
    , pio_attributes: ''
  }, function (err, res) {
    console.log(err, res)
  })

  prediction.items.similarity({
    pio_uid: 14
    , pio_n: 20
    , pio_itypes: ''
    , pio_latlng: ''
    , pio_within: ''
    , pio_unit: ''
    , pio_attributes: ''
  }).then(function (res) {
    console.log(res)
  })
```
