const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/785bc815c92ae02219df039899712d0f/${latitude},${longitude}?units=us`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined);
		} else if (body.error) {
			callback('unable to find  the location. Try another search', undefined);
		} else {
			callback(
				undefined,
				`${body.daily.data[0].summary}. It is currently ${
					body.currently.temperature
				} degrees. There is ${
					body.currently.precipProbability
				}% chance of rain | Humidity: ${
					body.currently.humidity
				} | Wind speed: ${body.currently.windSpeed}`
			);
		}
	});
};

module.exports = forecast;
