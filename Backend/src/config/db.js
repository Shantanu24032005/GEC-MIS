import mysql from "mysql2"

const db=mysql.createConnection({
  host: 'localhost',
   port:"3307",
  user: 'root',      // default user in XAMPP
  password: '',      // leave blank unless you set a password
  database: 'MIS' // your database name
})
export default db