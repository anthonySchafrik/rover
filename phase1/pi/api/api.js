const axios = require('axios');
const baseURL = require('../config').baseURL;

const api = axios.create({
  baseURL: baseURL,
});

module.exports = api;
