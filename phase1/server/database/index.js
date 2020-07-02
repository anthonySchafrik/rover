const pg = require('pg');
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
    console.log(`An error has happen connecting to pg database; -->: ${err}`);
  } else {
    console.log(`Connected to pg.`);
  }
});

module.exports = client;
