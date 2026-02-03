import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";

export default function Dashboard() {
  const [country, setCountry] = useState("IN");
  const [weather, setWeather] = useState(null);

  // ✅ AUTO LOCATION WEATHER
  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.get(
  `${import.meta.env.VITE_BACKEND_URL}/api/weather/by-coordinates`,
  {
    params: {
      lat: latitude,
      lon: longitude,
    },
  }
);


          setWeather(res.data);
        } catch (err) {
          console.error("Auto location failed");
        }
      },
      () => {
        console.log("User denied location access");
      }
    );
  };

  // ✅ RUN ON PAGE LOAD
  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌦 Weather Dashboard</h2>
        <p style={{ fontSize: "13px", opacity: 0.7 }}>
          Showing weather for your current location
        </p>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={styles.select}
        >
          <option value="IN">India</option>
          <option value="US">USA</option>
          <option value="GB">UK</option>
          <option value="AU">Australia</option>
        </select>

        <SearchBar selectedCountry={country} onResult={setWeather} />

        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    width: "360px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: {
    marginBottom: "8px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
};
