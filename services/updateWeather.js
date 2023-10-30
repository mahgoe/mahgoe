const axios = require("axios");
const fs = require("fs");

const API_KEY = process.env.WEATHER_API_KEY;
const CITY = "Zürich,CH";
const URL =
  "http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric";

axios,
  get(URL)
    .then((response) => {
      const temperature = response.data.main.temp;
      const description = response.data.weather[0].description;

      const content = fs.readFileSync("./README.md", "utf8");

      const updateContent = content.replace(
        /## Weather\n(.*?)/,
        `## Weather\nTemperature: ${temperature}°C\nDescription: ${description}\n`
      );
      fs.writeFileSync("./README.md", updateContent);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
