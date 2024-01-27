import sqlite3 from "sqlite3"

// Connect to DB
const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
});

// Create Table Users
function createTableUsers() {
  db.run(`CREATE TABLE users(id INTEGER PRIMARY KEY,user_name,phone_number,email,password)`);
}

// Run Command
function runCommand(command, data) {
  db.run(`${command}`, data);
}

// Insert User to DB
export async function insertUser(user_name, phone_number, email, password) {
  db.run(`INSERT INTO users(user_name,phone_number,email,password) VALUES (?,?,?,?)`, [], (err) => {
    if (err) console.error(err.message);
  });
}

// Update User from DB
export async function updateUser(userId, updateFields) {
  // Verificar si updateFields es nulo o undefined
  if (updateFields === null || updateFields === undefined) {
    throw new Error('updateFields is null or undefined');
  }

  const setClause = Object.keys(updateFields)
    .map((field) => `${field} = ?`)
    .join(", ");

  const params = Object.values(updateFields);

  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET ${setClause} WHERE id = ?`;

    db.run(query, [...params, userId], function (err) {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else {
        console.log(`${this.changes}`);
        resolve(this.changes);
      }
    });
  });
}

// Delete User From DB
export async function deleteUser(id) {
  db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
    if (err) console.error(err.message);
  });
}

// Get User From DB
export async function getUser(data, find_by) {
  let to_find;
  switch (find_by) {
    case "user_name":
      to_find = `user_name`;
      break;
    case "phone_number":
      to_find = `phone_number`;
      break;
    case "email":
      to_find = `email`;
      break;
    case "password":
      to_find = `password`;
      break;
    case "id":
      to_find = `id`;
      break;
    default:
      to_find = "id";
  }

  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE ${to_find} = ?`;

    db.all(query, [data], (err, row) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
}

// Get all Users From DB
export async function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}
