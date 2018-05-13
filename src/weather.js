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

function fillInCityData(city, weatherData) {
	document.getElementById(city+'Main').innerHTML = JSON.stringify(weatherData.weather[0].description);
	document.getElementById(city+'Temp').innerHTML = Math.round(JSON.stringify(weatherData.main.temp));
	document.getElementById(city+'TempMin').innerHTML = Math.round(JSON.stringify(weatherData.main.temp_min));
	document.getElementById(city+'TempMax').innerHTML = Math.round(JSON.stringify(weatherData.main.temp_max));
}


function getCustomCityWeather() {
	let city = document.UserCityForm.city.value;
	getWeatherInfo(city)
		.then( weatherData => {
				if(weatherData == null){
					document.getElementById('customErr').style.display = "inline";
				}
				else {
					window.localStorage.setItem("customCity", city);
					document.getElementById('customInfo').style.display = "inline";
					document.getElementById('customErr').style.display = "none";
					document.getElementById('customCity').innerHTML = city;
					fillInCityData("custom", weatherData)
					
				}
			})
}

function initializeWeather() {
	getWeatherInfo('berlin, de')
		.then( weatherData => {
			fillInCityData('berlin', weatherData);
		})

	getWeatherInfo('waltham, us')
		.then( weatherData => {
			fillInCityData('waltham', weatherData);
		})
	if(window.localStorage.customCity != null) {
		getWeatherInfo('waltham, us')
			.then( weatherData => {
				document.getElementById('customInfo').style.display = "inline";
				document.getElementById('customCity').innerHTML = window.localStorage.customCity;
				fillInCityData("custom", weatherData);
			});
	}
}

$('#UserCityForm').submit(function(event) {
    event.preventDefault(); 
    getCustomCityWeather();
});