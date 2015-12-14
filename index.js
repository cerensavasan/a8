var express = require('express')
  , _ = require("underscore")
  , fs = require("fs")
  , url = require("url")
  , path = require("path")
  , postsFile = require("./post.js")

//SETTING UP SERVER
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname)));

//DECLARING ARRAYS FOR TEMPLATES
var posts = [
{
  order: "1",
  body: "Final exam has been cancelled, instead we will only have project presentations on December 17th.",
  timestamp: "December 4th, 2015, 15:35",
  author: "Lane Harrison",
},
{
  order: "2",
  body: "Exam 2 grades have been sent out. Please check your answers and come to office hours if you wish to discuss your grades.",
  timestamp: "December 2nd, 2015, 11:09",
  author: "Lane Harrison",
},
{
  order: "3",
  body: "The office hours for Wednesday have been cancelled due to severe snow storms.",
  timestamp: "December 1st, 2015, 03:40",
  author: "TAs",
}
]


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/content', function(req, res) {
  sendContent(req,res);
});

// send big block of html via templates
function sendContent(req, res) {
var str = "";
str +=  "<h1>Posts:</h1>";
//populate with posts
posts.forEach( function(p) {
 str += postsFile.Compiled(p);
})
//send giant string of html
res.end( str );
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
