var _ = require("underscore");

var compiled3 = "<div class='announce'>" +
  "<p class='message'><%= order %>. <%= body %></p>" +
  "<p class='timestamp'><b>Posted at: </b> <%= timestamp %></p>" +
  "<p class='author'><b>Written by: </b> <%= author %> </p>" +
  "<br></br>" +
"</div>";

exports.Compiled3 = _.template(compiled3);