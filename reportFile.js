var _ = require("underscore");

var compiled2 = "<div class='report'>" +
  "<table style='width:100%'>" +
    "<tr>" +
      "<td><b><%= name %></b></td>" +
      "<td><b>Date: </b> <%= date %></td>" +
      "<td><b>Average: </b><%= average %></td>" +
      "</tr>" +
      "</table>" +
  "<p class='points'><b>Points: </b> <%= (function() { return points.join(', ') })() %> </p>" +
  "<p class='missing'><b>Missing Students:</b> <%= (function() { return missing.join(', ') })() %> </p>" +
  "<br></br>" +
"</div>";

exports.Compiled2 = _.template(compiled2);