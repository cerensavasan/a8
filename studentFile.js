var _ = require("underscore");

var compiled1 = "<section>" +
"<div class='students'>" +
  "<img class='catimg' src='<%= imageURL %>'>" +
  "<h2><%= name %></h2>" +
  "<p class='midterm'><b>Midterm:</b> <%= midterm %></p>" +
  "<p class='hw1'><b>Homework 1:</b> <%= hw1 %></p>" +
  "<p class='quizzes'><b>Quizzes:</b> <%= (function() { return quizzes.join(', ') })() %> </p>" +
  "<br></br>" +
"</div>" +
"</section>";

exports.Compiled1 = _.template(compiled1);