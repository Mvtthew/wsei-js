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
				city.drawCity();
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
    `;
		citiesParent.appendChild(cityElement);
	}
}

const city = new City('Kraków');

class WeatherList {}
