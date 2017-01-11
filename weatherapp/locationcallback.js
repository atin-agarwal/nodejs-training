console.log("Welcome to locationinfo callback");

var locationinfo = require('./locationinfo.js');

locationinfo(function(loc) {
  if (!locationinfo) {
    console.log("unable to guess location");
    return;
  }

  console.log("Long/Lat: " + loc.city);
});
