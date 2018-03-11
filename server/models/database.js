const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(`ALTER TABLE links RENAME targeturl TO target_url`, (err, res) => {
  console.log(err ? err.stack : res) // Hello World!
  client.end();
});
