// Function to format the current date as a string
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function displayTemperature(response) {
  console.log(response.data); // Log the API response for debugging

  const temperatureElement = document.querySelector("#current-temperature-main");
  const cityElementMain = document.querySelector("#current-city-main");
  const descriptionElementMain = document.querySelector("#description-main");
  const humidityElementDetails = document.querySelector("#humidity-details");
  const windSpeedElementDetails = document.querySelector("#wind-speed-details");
  const weatherIconElementMain = document.querySelector("#weather-icon-main");
  const currentDateDetails = document.querySelector("#current-date-details");

  if (temperatureElement && cityElementMain && descriptionElementMain && humidityElementDetails && windSpeedElementDetails && weatherIconElementMain && currentDateDetails) {
      cityElementMain.innerHTML = response.data.city;
      descriptionElementMain.innerHTML = response.data.condition.description;
      humidityElementDetails.innerHTML = response.data.humidity;
      windSpeedElementDetails.innerHTML = response.data.wind.speed;

      temperatureElement.innerHTML = Math.round(response.data.temperature.current);
      setWeatherIcon(weatherIconElementMain, response.data.condition.icon);

      const currentDate = new Date(); // Get the current date
      currentDateDetails.innerHTML = formatDate(currentDate); // Format and set the current date
  } else {
      console.error("One or more elements not found in HTML.");
  }
}

function setWeatherIcon(element, iconCode) {
  console.log('Icon Code:', iconCode); // Debugging the icon code
  const iconMappings = {
      "01d": "☀️", "01n": "🌙", "02d": "⛅", "02n": "🌥️",
      "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
      "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌦️",
      "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
      "50d": "🌫️", "50n": "🌫️"
  };

  element.innerHTML = iconMappings[iconCode] || "⛅"; // Default to a cloud icon if not found
}

function search(event) {
  event.preventDefault();
  const searchInputElement = document.querySelector("#search-input");
  const city = searchInputElement.value.trim();

  if (city === "") {
      alert("Please enter a city name.");
      return;
  }

  const apiKey = "6a31bo1005009840837b5525f35tf65a";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl)
      .then(displayTemperature)
      .catch((error) => {
          console.error("Error fetching weather data:", error);
          alert("Could not retrieve data. Please check your city name.");
      });
}

document.querySelector("#search-form").addEventListener("submit", search);