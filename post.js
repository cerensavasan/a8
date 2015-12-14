var _ = require("underscore");

var compiled = "<div class='posts'>" +
  "<p class='message'><%= order %>. <%= body %></p>" +
  "<p class='timestamp'><b>Posted at: </b> <%= timestamp %></p>" +
  "<p class='author'><b>Posted by: </b> <%= author %> </p>" +
  "<br></br>" +
"</div>";

exports.Compiled = _.template(compiled);