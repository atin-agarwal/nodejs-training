console.log("Welcome to weatherapp callback");

var weatherapp = require('./weatherdemo.js');

weatherapp(function(cw) {
  console.log(cw);
});
