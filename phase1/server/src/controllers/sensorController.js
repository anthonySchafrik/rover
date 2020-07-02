const db = require('../../database/index');

const weatherDataPost = async (req, res) => {
  console.log(req.body.weatherData);

  res.sendStatus(200);
};

const weatherDataGet = async (req, res) => {
  try {
    const t = await db.query('select * from Weather');
    res.send(t.rows);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { weatherDataPost, weatherDataGet };
