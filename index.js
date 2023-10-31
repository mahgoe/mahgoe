require('dotenv').config();
const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');

const MUSTACHE_MAIN_DIR = "./main.mustache";

let DATA = {
  refresh_date: new Date().toLocaleDateString(`en-EN`, {
    weekday: "long",
    month: `long`,
    day: `numeric`,
    hour: `numeric`,
    minute: `numeric`,
    timeZoneName: `short`,
    timeZone: `Europe/Zurich`,
  }),
};

async function getWeather() {
  await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=zuerich&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
  )
    .then(r => r.json())
    .then(r => {
      DATA.city_temperature = Math.round(r.main.temp);
      DATA.city_weather = r.weather[0].description;
      DATA.city_weather_icon = r.weather[0].icon;
    });
}

async function getReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (ex, data) => {
    if (ex) {
      throw ex;
    }
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync("README.md", output);
  });
}

async function action() {
  await getWeather();

  await getReadMe();
}

action();
