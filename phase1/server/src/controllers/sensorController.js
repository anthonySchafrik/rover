const db = require('../../database/index');
const Logger = require('js-logger');

const weatherDataPost = async (req, res) => {
  Logger.warn('Weather data post request coming in');

  const weatherData = req.body.weatherData;

  Logger.debug({
    weatherData,
  });

  const dataWithError = [];

  await weatherData.forEach(async (data) => {
    const {
      temperature,
      pressure,
      feet,
      meters,
      uvLight,
      humidity,
      timecolumn = new Date(),
    } = data;

    const queryValue = [
      temperature,
      pressure,
      feet,
      meters,
      uvLight,
      timecolumn,
      humidity,
    ];

    const queryText =
      'INSERT INTO Weather( temperature, pressure, feet, meters, uvindex, timecolumn, humidity) VALUES ($1, $2, $3, $4, $5, $6, $7)';

    try {
      await db.query(queryText, queryValue);

      Logger.warn('Weather data saved');
    } catch (error) {
      Logger.error(error);

      dataWithError.push(data);
    }
  });

  Logger.debug({
    dataWithError,
  });

  if (dataWithError.length > 0) {
    res.send(dataWithError).status(500);
  } else {
    res.sendStatus(200);
  }
};

const weatherDataGet = async (req, res) => {
  Logger.warn('Weather data get request coming in');

  try {
    const weatherData = await db.query(
      'SELECT temperature, pressure, feet, meters, uvindex, timecolumn, humidity FROM Weather'
    );

    res.send(weatherData.rows);
  } catch (error) {
    Logger.error(error);
    res.sendStatus(404);
  }
};

module.exports = { weatherDataPost, weatherDataGet };
