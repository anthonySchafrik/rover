const weatherDataPost = (req, res) => {
  console.log(req.body.weatherData);
  res.sendStatus(200);
};

module.exports = { weatherDataPost };
