const express = require('express');

const { weatherDataPost } = require('../controllers/sensorController');

const router = express.Router();

const baseApi = '/sensor';

router.post(`${baseApi}/weather`, weatherDataPost);

module.exports = router;
