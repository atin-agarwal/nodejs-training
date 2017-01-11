var request = require('request');

module.exports = function (location, callback) {
	var encodedLocation = encodeURIComponent(location);
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodedLocation + '&units=metric&appid=af5c74897a1809e5ccf0af92650cc8d5';

	if (!location) {
		return callback('No location provided');
	}

	request({
		url: url,
		json: true
	}, function (error, response, body) {
		if (error) {
			callback('Unable to fetch weather.');
		} else {
			callback('It\'s ' + body.main.temp + ' in ' + body.name + '!');
		}
	});
}
