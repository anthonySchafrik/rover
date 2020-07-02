const express = require('express');

const {
  weatherDataPost,
  weatherDataGet,
} = require('../controllers/sensorController');

const router = express.Router();

const baseApi = '/sensor';

router.post(`${baseApi}/weather`, weatherDataPost);
router.get(`${baseApi}/weather`, weatherDataGet);

module.exports = router;
