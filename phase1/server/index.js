const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

const healthRouter = require('./routes/healthRouter');
const sensorRouter = require('./routes/sensorRouter');

dotenv.config({
  path: path.join(__dirname, '.env'),
});

const app = express();

const port = process.env.PORT;
const apiBase = process.env.API_BASE;

app.use(bodyParser.json());

app.use(apiBase, healthRouter);
app.use(apiBase, sensorRouter);

app.listen(port, () => {
  console.log(`server listing on port ${port}`);
});
