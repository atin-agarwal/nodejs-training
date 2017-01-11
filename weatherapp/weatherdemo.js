var request = require('request');
var url = "http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=af5c74897a1809e5ccf0af92650cc8d5";

module.exports = function (callback) {
    request({
    url:  url,
    json: true
  }, function(error, response, body) {
    if(error) {
      callback("Unable to fetch weather!!!");
    } else {
      callback("Weather is " + body.main.temp + " in " + body.name + "!!!");
    }
  });
}
