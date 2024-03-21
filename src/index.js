function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature-main");
    let cityElementMain = document.querySelector("#current-city-main");
    let descriptionElementMain = document.querySelector("#description-main");
    let humidityElementDetails = document.querySelector("#humidity-details");
    let windSpeedElementDetails = document.querySelector("#wind-speed-details");
    let weatherIconElementMain = document.querySelector("#weather-icon-main");
    let currentDateMain = document.querySelector("#current-date-main");
    let currentDateDetails = document.querySelector("#current-date-details");
  
    if (temperatureElement && cityElementMain && descriptionElementMain && humidityElementDetails && windSpeedElementDetails && weatherIconElementMain) {
      cityElementMain.innerHTML = response.data.city;
      descriptionElementMain.innerHTML = response.data.condition.description;
      humidityElementDetails.innerHTML = response.data.humidity;
      windSpeedElementDetails.innerHTML = response.data.wind.speed;
  
      temperatureElement.innerHTML = Math.round(response.data.temperature.current);
      setWeatherIcon(weatherIconElementMain, response.data.condition.icon);
    
      currentDateDetails.innerHTML = formatDate(new Date());
    } else {
      console.error("One or more elements not found in HTML.");
    }
  }
  
  
  
  function setWeatherIcon(element, iconCode) {
    const iconMappings = {
      "01d": "☀️", "01n": "🌙", "02d": "⛅", "02n": "🌥️",
      "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
      "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌦️",
      "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
      "50d": "🌫️", "50n": "🌫️"
    };
  
    element.innerHTML = iconMappings[iconCode] || "⛅";
  }
  
  
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "6a31bo1005009840837b5525f35tf65a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);