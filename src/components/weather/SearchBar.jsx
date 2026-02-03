import { useState } from "react";
import axios from "axios";

export default function SearchBar({ selectedCountry, onResult }) {
  const [city, setCity] = useState("");

  const handleSearch = async () => {
  if (!city) return;

  try {
    const res = await axios.get(
  `${import.meta.env.VITE_BACKEND_URL}/api/weather/by-city`,
  {
    params: {
      city,
      country: selectedCountry,
    },
  }
);


    onResult(res.data);
  } catch (err) {
    alert("City not found");
  }
};

  return (
    <>
      <input
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
    </>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
