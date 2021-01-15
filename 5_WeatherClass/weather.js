class City {
	weatherData;
	cityName = '';

	constructor(cityName) {
		this.cityName = cityName;
		this.getWeatherData();
	}

	getWeatherData() {
		fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=f054371b11ebe3fa19fbcb60969b8b97&units=metric`)
			.then((res) => res.json())
			.then((data) => {
				this.weatherData = data;
				this.drawCity();
			});
	}

	drawCity() {
		const citiesParent = document.getElementById('cities');
		const cityElement = document.createElement('div');
		cityElement.classList.add('city');
		cityElement.innerHTML = `
      <p class="name">${this.weatherData.city.name}</p>
      <p class="date-now">${this.weatherData.list[0].dt_txt}</p>
      <p class="now-temp">${this.weatherData.list[0].weather[0].main}, <span class="temp">${this.weatherData.list[0].main.temp}°</span></p>
      <p class="now-visibility">visibility ${this.weatherData.list[0].visibility}m</p>
      <div class="next-temps">
        <div class="temp">
        ${this.weatherData.list[1].dt_txt} - ${this.weatherData.list[1].weather[0].main}, <span class="temp">${this.weatherData.list[1].main.temp}°</span>
        </div>
        <div class="temp">
        ${this.weatherData.list[2].dt_txt} - ${this.weatherData.list[2].weather[0].main}, <span class="temp">${this.weatherData.list[2].main.temp}°</span>
        </div>
        <div class="temp">
        ${this.weatherData.list[3].dt_txt} - ${this.weatherData.list[3].weather[0].main}, <span class="temp">${this.weatherData.list[3].main.temp}°</span>
        </div>
        <div class="temp">
        ${this.weatherData.list[4].dt_txt} - ${this.weatherData.list[4].weather[0].main}, <span class="temp">${this.weatherData.list[4].main.temp}°</span>
        </div>
      </div>
      <button class="delete">🧺</button>
    `;
		cityElement.querySelector('.delete').addEventListener('click', () => {
			this.removeCity();
		});
		citiesParent.appendChild(cityElement);
	}

	removeCity() {
		list.cities.splice(list.cities.indexOf(this), 1);
		list.saveCitiesToLocalStorage();
		list.renderWeather();
	}
}

class WeatherList {
	cities = [];

	constructor() {
		this.cities = this.getCitiesFromLocalStorage();
		this.renderWeather();
		this.initAddingNewCity();
	}

	getCitiesFromLocalStorage() {
		let cities = [];
		const citiesString = localStorage.getItem('weather-cities');
		if (citiesString) {
			cities = JSON.parse(citiesString);
		}
		return cities;
	}

	checkCityName(cityName) {
		return new Promise((resolve) => {
			fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f054371b11ebe3fa19fbcb60969b8b97`)
				.then((res) => res.json())
				.then((data) => {
					if (data.cod == 200) {
						resolve(true);
					} else {
						resolve(false);
					}
				});
		});
	}

	saveCitiesToLocalStorage() {
		localStorage.setItem('weather-cities', JSON.stringify(this.cities));
	}

	renderWeather() {
		const citiesParent = document.getElementById('cities');
		citiesParent.innerHTML = '';

		this.cities.forEach((city) => {
			new City(city);
		});
	}

	initAddingNewCity() {
		document.getElementById('add-new-city').addEventListener('click', () => {
			this.addNewCity();
		});
	}

	addNewCity() {
		const newCityName = document.getElementById('new-city').value;
		console.log(newCityName);
		this.checkCityName(newCityName).then((checked) => {
			if (checked) {
				this.cities.push(newCityName);
				this.saveCitiesToLocalStorage();
				this.renderWeather();
				document.getElementById('new-city').value = '';
			} else {
				alert('Invalid city name!');
			}
		});
	}
}

const list = new WeatherList();
