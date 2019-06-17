const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./geocode.js');
const forecast = require('./forecast.js');

const app = express();
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Kewal Pasad'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'kewal Pasad'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'HELP',
		name: 'kewal Pasad'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.location) {
		return res.send({
			error: 'You must provide the location'
		});
	}
	geoCode(
		req.query.location,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forecastData,
					location: location
				});
			});
		}
	);
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide the search term'
		});
	}
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404page', {
		title: 'Help 404 Page',
		name: 'Kewal Pasad',
		error: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404page', {
		title: '404 Page',
		name: 'Kewal Pasad',
		error: 'Page not found'
	});
});

app.listen(port, () => {
	console.log('Server is running on port' + port);
});
