var express = require('express')
  , _ = require("underscore")
  , fs = require("fs")
  , url = require("url")
  , path = require("path")
  , postsFile = require("./post.js")
  , bodyParser = require('body-parser')

//SETTING UP SERVER
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({
    extended: true
}));

//DECLARING ARRAYS FOR TEMPLATES
var posts = [
{
  body: "Test Post",
  author: "82959",
}
]

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/content', function(req, res) {
  sendContent(req,res);
});

app.post('/message', function(req, res) {
  updateMessage(req,res);
});

// send big block of html via templates
function sendContent(req, res) {
//Received cookie
var cookieID = req.body.theid;
console.log("Cookie is: " + cookieID);

var str = "";
str +=  "<h1>Posts:</h1>";
//populate with posts
posts.forEach( function(p) {
 str += postsFile.Compiled(p);
})
//send giant string of html
res.end(str);
}

function updateMessage(req, res) {
//Received cookie
var cookieID = req.body.theid;
console.log("Cookie is: " + cookieID);
//Received message
var sentMess = req.body.messager;
console.log("Message is: " + sentMess + " of type: " + typeof sentMess);

var str = "";
//populate with posts
posts.push({body: sentMess, author: cookieID,});
str += postsFile.Compiled(posts.slice(-1).pop()); //send last post added
//send giant string of html
res.end(str);
}

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});

function sendFile(res, filename) {
  res.writeHead(200, {"Content-type": "text/html"})

  var stream = fs.createReadStream(filename)

  stream.on("data", function(data) {
    res.write(data);
  })

  stream.on("end", function(data) {
    res.end();
    return;
  })
}
