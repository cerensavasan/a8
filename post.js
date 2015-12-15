var _ = require("underscore");

var compiled = "<div class='posts'>" + "<table>" + "<tr>" +
  "<td><b>Message: </b> <%= body %> </td>" +
  "<td><b>Posted by: </b> <%= author %> </td>" + "</tr>" +
  "</table" +
"</div>";

exports.Compiled = _.template(compiled);