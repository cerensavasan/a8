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

app.post('/', function(req, res) {
  console.log("POST / DONE");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', function(req, res) {
    console.log("GET /INDEX.HTML DONE");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/content', function(req, res) {
  console.log("POST /CONTENT DONE");
  sendContent(req,res);
});

app.post('/message', function(req, res) {
  console.log("POST /MESSAGE DONE");
  updateMessage(req,res);
});

var alreadyParsed = false;

// send big block of html via templates
function sendContent(req, res) {
  if(alreadyParsed === false){
    //Received cookie
    var cookieID = req.body.theid;
    console.log("Cookie is: " + cookieID);

    //get the comments already in server
    var commentsArray = fs.readFileSync('comments.txt').toString().trim().split("\n");
    var idsArray = fs.readFileSync('ids.txt').toString().trim().split("\n");
    var i = 0;

    commentsArray.forEach( function(p) {
      posts.push({body: p, author: idsArray[i],})
      i += 1;
    });


    var str = "";
    str +=  "<h1>Posts:</h1>";
    //populate with posts
    posts.forEach( function(p) {
      str += postsFile.Compiled(p);
    })
    //send giant string of html
    res.end(str);
    alreadyParsed = true;
  }
  else{
    var str2 = "";
    str2 +=  "<h1>Posts:</h1>";
    //populate with posts
    posts.forEach( function(p) {
      str2 += postsFile.Compiled(p);
    })
    //send giant string of html
    res.end(str2);   
  }
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
//send last post added
var lastPost = posts.slice(-1).pop();
str += postsFile.Compiled(lastPost);


//TODO ADD POST AND ID TO THE TEXT FILES
var commentsArray = fs.readFileSync('comments.txt').toString().trim().split("\n");
var idsArray = fs.readFileSync('ids.txt').toString().trim().split("\n");
commentsArray.push(sentMess);
idsArray.push(cookieID);

fs.writeFileSync('comments.txt', commentsArray.join('\n'));
fs.writeFileSync('ids.txt', idsArray.join('\n'));

//send string with the last post to be added to innerhtml
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
