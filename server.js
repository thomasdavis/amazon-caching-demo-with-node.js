

var analyze = require('Sentimental').analyze;
var restify = require('restify');	
var _ = require('underscore');  
var request = require('superagent');  
var server = restify.createServer();
server.use(restify.queryParser());

function getUserMood(req, res, next) {
  var recent_tweets = [];
  // This just allows any client to view this data
  res.header("Access-Control-Allow-Origin", "*"); 
  // Amazon lets us set a cache expiry with the Expires header
  res.header('Expires', new Date(new Date().getTime() + 120000).toUTCString());
  var user = req.params.user;
  // Let's perform a slow/computational request
  // Fetch a bunch of tweets and analyse their sentiments
  request
    .get('http://search.twitter.com/search.json')
    .send({ q: 'from:' + user })
    .end(function(response){
      _.each(response.body.results, function(tweet) {
      	recent_tweets.push({
      		tweet: tweet.text,
      		sentiment: analyze(tweet.text)
      	})
      });
   	  res.send(recent_tweets);
    });
}

server.get('/mood/:user', getUserMood);

server.listen(8080, function() {
  console.log('%s listening at %s, love & peace', server.name, server.url);
});
