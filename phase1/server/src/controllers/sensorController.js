const db = require('../../database/index');

const weatherDataPost = async (req, res) => {
  const {
    temperature,
    pressure,
    feet,
    meters,
    uvLight,
    humidity,
  } = req.body.weatherData;

  const queryText =
    'INSERT INTO Weather( temperature, pressure, feet, meters, uvindex, humidity) VALUES ($1, $2, $3, $4, $5, $6)';

  const queryValue = [temperature, pressure, feet, meters, uvLight, humidity];

  try {
    await db.query(queryText, queryValue);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const weatherDataGet = async (req, res) => {
  try {
    const weatherData = await db.query(
      'SELECT temperature, pressure, feet, meters, uvindex FROM Weather'
    );

    res.send(weatherData.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
};

module.exports = { weatherDataPost, weatherDataGet };
