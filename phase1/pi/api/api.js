const axios = require('axios');
const baseURL = require('../config').baseURL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

module.exports = api;
