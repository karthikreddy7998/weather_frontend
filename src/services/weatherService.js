import API from "./api";

export const getCurrentWeather = async (city, country) => {
  const res = await API.get(
    `/weather/current?city=${city}&country=${country}`
  );
  return res.data;
};
