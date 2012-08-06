
// require restify
var analyze = require('Sentimental').analyze;
var restify = require('restify');
var _ = require('underscore');  
var request = require('superagent');  
var server = restify.createServer();
server.use(restify.queryParser());




function getMessages(req, res, next) {
  var recent_tweets = [];
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var user = req.params.user;
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




// Set up our routes and start the server
server.get('/mood', getMessages);

server.listen(8080, function() {
  console.log('%s listening at %s, love & peace', server.name, server.url);
});
