// Setup Database
const mysql = require('mysql2/promise');

console.log("Connecting to mySQL database...");
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "custom-link"
}).then(connection => {
  console.log("Connected to mySQL database!");

  const Links = {
    create: async (sourceLink, targetUrl) => {
      // Enter info into database
      const command = `
        INSERT INTO links (sourceLink, targetUrl)
        VALUES (?, ?)
        `;
      const result = await connection.execute(command, [sourceLink, targetUrl]);
      return result[0];
    },
    read: async (sourceLink) => {
      const command = `
        SELECT targetUrl
        FROM links
        WHERE sourceLink = ?
        `;
      const result = await connection.execute(command, sourceLink);
      return result[0].targetUrl;
    },
    update: async (sourceLink, targetUrl) => {
      // Enter info into database
      const command = `
        UPDATE links
        SET targetUrl = ?
        WHERE sourceLink = ?
        `;
      const result = await connection.execute(command, [targetUrl, sourceLink]);
      return result[0];
    }
  }

  module.exports = Links;
});
