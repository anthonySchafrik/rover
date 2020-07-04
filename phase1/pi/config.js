const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '.env'),
});

const baseURL = process.env.BASE_URL;

module.exports = { baseURL };
