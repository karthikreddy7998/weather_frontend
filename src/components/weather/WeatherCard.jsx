export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <div style={styles.card}>
      <h3 style={styles.city}>{data.city}</h3>

      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="weather icon"
        style={styles.icon}
      />

      <p>🌡 {data.temp} °C</p>
      <p>☁ {data.condition}</p>
      <p>💧 {data.humidity} %</p>
      <p>💨 {data.wind} m/s</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#f6f7fb",
    borderRadius: "12px",
    padding: "15px",
    marginTop: "15px",
  },
  city: {
    marginBottom: "10px",
  },
  icon: {
    width: "80px",
  },
};
