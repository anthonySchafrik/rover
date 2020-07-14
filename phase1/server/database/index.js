const pg = require('pg');
const Logger = require('js-logger');

const { user, host, database, password, port } = require('./config');

const client = new pg.Client({
  user,
  host,
  database,
  password,
  port,
});

client.connect((err) => {
  if (err) {
    Logger.error(`An error has happen connecting to pg database; -->: ${err}`);
  } else {
    Logger.info(`Connected to pg.`);
  }
});

module.exports = client;
