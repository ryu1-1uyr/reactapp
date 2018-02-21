var twitter = require('ntwitter');
var tw = new twitter({
  consumer_key: 'xx',
  consumer_secret: 'xx',
  access_token_key: 'xx',
  access_token_secret: 'xx'
});

tw.stream('statuses/filter', {'track':'LIGinc'}, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
  });
});
