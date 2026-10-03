# Weather Report Application

A responsive weather report web app built with React. Users can search for any city and view its current weather conditions in real time.

## Objective

Fetch live weather data from a public API and display it in a clean, responsive React UI.

## Features

- Search any city by name using a text input and search button
- Current temperature, wind speed, and weather description
- Friendly error handling for unknown cities or failed requests
- Responsive layout using Flexbox and media queries
- Weather logic isolated in its own `Weather` component using React hooks (`useState`)

## Tech Stack

- React (Create React App)
- Axios for HTTP requests
- Plain CSS (Flexbox + media queries)

## Weather API

This app uses the free, keyless [Open-Meteo](https://open-meteo.com/) API:

1. The city name is geocoded to latitude/longitude via the Open-Meteo Geocoding API.
2. The coordinates are used to request current weather conditions from the Open-Meteo Forecast API.

Both request URLs are built dynamically using template literals based on user input.

## Running locally

```bash
npm install
npm start
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
```
