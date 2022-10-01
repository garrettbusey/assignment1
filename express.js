var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = [];
var tweetsearch = [
//{
//id: 0,
//text: '',
//created_at: null
//}
];

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  // send the tweetinfo array
  res.send({tweetinfo: tweetinfo });
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info CURRENT
  // send the tweetinfo array
  res.send({tweetinfo: tweetinfo });
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  // send the tweetsearch array
  res.send({tweetsearch: tweetsearch });
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.

  // grab the data sent down from scripts.js
  var tweetText = req.body.text;
  var tweetID = req.body.id;

  // push the new tweet into the tweetinfo array so it can be displayed
  tweetinfo.push({
    id: tweetID,
    text: tweetText
  });
  res.send('success');

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet

  // grab data sent down from scripts.js
  var userID = req.body.id;

  // iterate through tweetinfo and check for the given ID to equal an id in tweetinfo
  tweetinfo.forEach(function(product, index) {
    if (userID == product.id) {
      // once found then push the info from that tweet to the tweetsearch array
      tweetsearch.push({
        id: product.id,
        text: product.text,
        created_at: product.created_at
      });
    }
  });

  res.send('success');

});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets

  // grab the data sent down from scripts.js
  var newName = req.body.newName;
  var name = req.body.name;

  // iterate through the tweetinfo array until finding the given name
  // then replace the screen name with new name
  tweetinfo.forEach(function(product, index) {
    if (product.user.name == name) {
      product.user.screen_name = newName;
    }
  });

  res.send('success');
});

//Delete 
app.delete('/tweetinfo/:id', function(req, res) {
  //TODO: delete a tweet

  // grab the data sent down from scripts.js
  var id = req.params.id;

  var found = false;

  // iterate through tweetinfo until an id matches the given id
  // then remove that tweet from tweetinfo
  tweetinfo.forEach(function(product, index) {
      if (!found && product.id == Number(id)) {
         tweetinfo.splice(index, 1);
      }
   });

    res.send('Successfully deleted product!');
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});