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

client
  .connect()
  .then(() => Logger.info('connected to database'))
  .catch((err) => Logger.error('connection error', err.stack));

module.exports = client;
