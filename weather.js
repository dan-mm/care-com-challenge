let APIKey = '6d142a833a71681d6e57e29f4ee7a30b';

function getWeatherInfo(city, units='metric') {
	let weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APIKey + '&units=' + units;

	return fetch(weatherAPI)
		.then( response => {
			if(response.status != 200) {
				console.log('Error calling weather API. Stormy clouds ahead. Response: ' + response.status);
				return;
			}
			return response.json().then( data => data);
		})
		.catch(function(err) {
			console.log('Fetch Error: ' + err);
		});
}

function initializeWeather() {
	getWeatherInfo('berlin, de')
		.then( weatherData => {
			document.getElementById('berlinMain').innerHTML += JSON.stringify(weatherData.weather[0].main);
			document.getElementById('berlinTemp').innerHTML += JSON.stringify(weatherData.main.temp);
			document.getElementById('berlinTempMin').innerHTML += JSON.stringify(weatherData.main.temp_min);
			document.getElementById('berlinTempMax').innerHTML += JSON.stringify(weatherData.main.temp_max);
		})

	getWeatherInfo('waltham, us')
		.then( weatherData => {
			document.getElementById('walthamMain').innerHTML += JSON.stringify(weatherData.weather[0].main);
			document.getElementById('walthamTemp').innerHTML += JSON.stringify(weatherData.main.temp);
			document.getElementById('walthamTempMin').innerHTML += JSON.stringify(weatherData.main.temp_min);
			document.getElementById('walthamTempMax').innerHTML += JSON.stringify(weatherData.main.temp_max);
		})
}

function getCustomCityWeather() {
	var city = document.UserCityForm.city.value;
	getWeatherInfo(city)
		.then( weatherData => {
				if(weatherData == null){
					document.getElementById('customInfo').innerHTML = '<h5>No weather information could be found :-('
				}
				else {
					document.getElementById('customInfo').innerHTML = '<h3>' + city + '</h3>' +
					'<span>Weather: ' + JSON.stringify(weatherData.weather[0].main) + ' </span> <br/>' +
					'<span>Temperature:' + JSON.stringify(weatherData.main.temp) + ' </span> &degC<br/> ' +
        			'<span>Low: ' + JSON.stringify(weatherData.main.temp_min) + '</span> &degC<br/>' +
        			'<span>High: ' + JSON.stringify(weatherData.main.temp_max) + '</span> &degC<br/>';
				}
			})
}