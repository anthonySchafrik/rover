const db = require('../../database/index');
const Logger = require('js-logger');

const weatherDataPost = async (req, res) => {
  Logger.warn('Weather data post request coming in');

  const {
    temperature,
    pressure,
    feet,
    meters,
    uvLight,
    humidity,
  } = req.body.weatherData;

  Logger.debug({ temperature, pressure, feet, meters, uvLight, humidity });

  const queryText =
    'INSERT INTO Weather( temperature, pressure, feet, meters, uvindex, humidity) VALUES ($1, $2, $3, $4, $5, $6)';

  const queryValue = [temperature, pressure, feet, meters, uvLight, humidity];

  try {
    await db.query(queryText, queryValue);

    res.sendStatus(200);
  } catch (error) {
    Logger.error(error);
    res.sendStatus(500);
  }
};

const weatherDataGet = async (req, res) => {
  Logger.warn('Weather data get request coming in');

  try {
    const weatherData = await db.query(
      'SELECT temperature, pressure, feet, meters, uvindex FROM Weather'
    );

    res.send(weatherData.rows);
  } catch (error) {
    Logger.error(error);
    res.sendStatus(404);
  }
};

module.exports = { weatherDataPost, weatherDataGet };
