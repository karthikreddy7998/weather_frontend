import axios from "axios";

export const getAllCountries = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all");
  return res.data
    .map((c) => ({
      name: c.name.common,
      code: c.cca2,
      flag: c.flags.png,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
