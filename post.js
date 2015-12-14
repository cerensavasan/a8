var _ = require("underscore");

var compiled = "<div class='posts'>" +
  "<p class='message'><b>Message: </b> <%= body %> </p>" +
  "<p class='author'><b>Posted by: </b> <%= author %> </p>" +
  "<br></br>" +
"</div>";

exports.Compiled = _.template(compiled);