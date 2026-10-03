import "./App.css";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Report</h1>
        <p>Search any city to see its current weather conditions.</p>
      </header>

      <main>
        <Weather />
      </main>

      <footer className="App-footer">
        <p>Weather data provided by Open-Meteo.</p>
      </footer>
    </div>
  );
}

export default App;
