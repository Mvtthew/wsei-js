const getCityWeather = async (cityName) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f054371b11ebe3fa19fbcb60969b8b97&units=metric`;
	const res = await fetch(url);
	return await res.json();
};

const loadCities = () => {
	const cities = localStorage.getItem('cities');
	if (cities) {
		return JSON.parse(cities);
	} else {
		return [];
	}
};

const cities = loadCities();
const weatherTilesRoot = document.getElementById('weather-tiles-root');

const saveCities = () => {
	localStorage.setItem('cities', JSON.stringify(cities));
};

const addCity = async () => {
	const cityName = document.getElementById('city-input').value;
	const res = await getCityWeather(cityName);
	console.log(res);
	if (res.cod === 200) {
		cities.push(cityName);
		console.log(cities);
		saveCities();
		renderWeatherTiles();
	} else {
		alert(res.message);
	}
};

const renderWeatherTile = (data) => {
	const tile = document.createElement('div');
	tile.classList.add('weather-tile');

	tile.innerHTML = `
    <p class="city-name">${data.name}</p>
    <p class="temp">${data.main.temp}° (min ${data.main.temp_min}° | max ${data.main.temp_max}°)</p>
    <p class="temp-feels">Feels like ${data.main.feels_like}</p>
    <p class="humidity">Humidity: ${data.main.humidity}%</p>
    <p class="pressure">Air pressure: ${data.main.pressure} hPa</p>
  `;

	weatherTilesRoot.appendChild(tile);
};

const renderWeatherTiles = async () => {
	weatherTilesRoot.innerHTML = '';
	for (let i = 0; i < cities.length; i++) {
		const data = await getCityWeather(cities[i]);
		renderWeatherTile(data);
	}
};

renderWeatherTiles();
