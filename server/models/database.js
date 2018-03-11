const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:9517503a@localhost:5432/custom-link';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(`
  CREATE TABLE links(
    id INT PRIMARY KEY NOT NULL,
    source_link VARCHAR(2083) NOT NULL,
    target_url VARCHAR(2083) NOT NULL,
    clicks int
  )
  `, (err, res) => {
  console.log(err ? err.stack : res) // Hello World!
  client.end();
});
