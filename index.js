var express = require('express')
  , _ = require("underscore")
  , fs = require("fs")
  , url = require("url")
  , path = require("path")
  , studentsFile = require("./studentFile.js")
  , announcementFile = require("./announcementFile.js")
  , reportFile = require("./reportFile.js")

//SETTING UP SERVER
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname)));

//DECLARING ARRAYS FOR TEMPLATES
var students = [
{
  name: "Carl Jodan",
  quizzes: ["80", "88","57"],
  hw1: "40",
  midterm: "89",
  imageURL: "./cats/cat1.jpg",
},
{
  name: "Xiaochen Ding",
  quizzes: ["70", "90","100"],
  hw1: "70",
  midterm: "94",
  imageURL: "./cats/cat2.jpg",
},
{
  name: "Ceren Savasan",
  quizzes: ["100", "100","100"],
  hw1: "90",
  midterm: "95",
  imageURL: "./cats/cat3.jpg",
}
]

var quiz1s = [];
var quiz2s = [];
var quiz3s= [];
var hw1s= [];
var midterms= [];

//POPULATE QUIZ GRADES FOR REPORT
students.forEach( function(student) {
 quiz1s.push(Number(student.quizzes[0]));
 quiz2s.push(Number(student.quizzes[1]));
 quiz3s.push(Number(student.quizzes[2]));
 hw1s.push(Number(student.hw1));
 midterms.push(Number(student.midterm));
})

function calculateAverage(a){
  var total = 0;
  var count = 0;
  a.forEach( function(elem){
    var intA = parseInt(elem);
    total += intA;
    count += 1;
    console.log("total is:" + total);
  })
  var newAve = Math.round(total/count);
  return newAve;
}

console.log("quiz1s contains:");
quiz1s.forEach(function(p){
console.log(typeof p);
});

console.log("quiz2s contains: \n");
quiz2s.forEach(function(p){
console.log(typeof p);
});


var q1_ave = calculateAverage(quiz1s).toString();
var q2_ave = calculateAverage(quiz2s).toString();
var q3_ave = calculateAverage(quiz3s).toString();
var hw1_ave = calculateAverage(hw1s).toString();
var mid_ave = calculateAverage(midterms).toString();


var report = [
{
  name: "Quiz 1",
  points: quiz1s,
  date: "July 8th, 2015",
  average: q1_ave,
  missing: ["Billy Jones", "David Tennant"],
},
{
  name: "Quiz 2",
  points: quiz2s,
  date: "July 8th, 2015",
  average: q2_ave,
  missing: ["Billy Jones", "David Tennant"],
},
{
  name: "Quiz 3",
  points: quiz3s,
  date: "July 8th, 2015",
  average: q3_ave.toString(),
  missing: ["Billy Jones"]
}
]

var announcements = [
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

students.forEach( function(p) {
 str += studentsFile.Compiled1(p);
})

str +=  "<h1>Breakdown of Grade Components:</h1>";

report.forEach( function(p) {
 str += reportFile.Compiled2(p);
})

str +=  "<h1>Announcements:</h1>";

announcements.forEach( function(p) {
 str += announcementFile.Compiled3(p);
})

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
