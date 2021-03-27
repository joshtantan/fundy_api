const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getUsers = (request, response) => {
  queryString = `
    SELECT * FROM users
    ORDER BY id ASC;
  `;
  pool.query(queryString, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserByID = (request, response) => {
  const id = parseInt(request.params.id);

  queryString = `
    SELECT * FROM users 
    WHERE id = $1::integer
  `;
  pool.query(queryString, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  queryString = `
    INSERT INTO users (name, email) 
    VALUES ($1::text, $2::text);
  `;
  pool.query(queryString, [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${result.insertId}`);
  });
};