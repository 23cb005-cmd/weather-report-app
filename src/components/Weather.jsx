import { useState } from "react";
import axios from "axios";

const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

function describeWeatherCode(code) {
  return WEATHER_CODES[code] || "Weather data unavailable";
}

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (searchCity) => {
    const trimmedCity = searchCity.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${trimmedCity}&count=1`;
      const geoResponse = await axios.get(geoUrl);
      const results = geoResponse.data.results;

      if (!results || results.length === 0) {
        setError(`No results found for "${trimmedCity}". Please check the spelling and try again.`);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = results[0];
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const forecastResponse = await axios.get(forecastUrl);
      const currentWeather = forecastResponse.data.current_weather;

      if (!currentWeather) {
        setError("Weather data is currently unavailable for this location.");
        setLoading(false);
        return;
      }

      setWeather({
        city: name,
        country,
        temperature: currentWeather.temperature,
        windspeed: currentWeather.windspeed,
        description: describeWeatherCode(currentWeather.weathercode),
      });
    } catch (err) {
      setError("Something went wrong while fetching the weather. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <section className="weather-section" aria-label="Weather search">
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="city-input" className="visually-hidden">
          City name
        </label>
        <input
          id="city-input"
          type="text"
          placeholder="Enter a city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <article className="weather-card">
          <h2>
            {weather.city}
            {weather.country ? `, ${weather.country}` : ""}
          </h2>
          <p className="temperature">{weather.temperature}&deg;C</p>
          <p className="description">{weather.description}</p>
          <p className="wind">Wind speed: {weather.windspeed} km/h</p>
        </article>
      )}
    </section>
  );
}

export default Weather;
