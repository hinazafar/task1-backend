const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 2,
  host     : 'localhost',
  user     : 'hina',
  password : 'hina',
  database : 'hina_db'
});
const checkUserExists = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from user WHERE email = ? AND password = ?', [email, password], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = {
  checkUserExists
};