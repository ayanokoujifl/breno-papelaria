import * as mysql from "mysql2"
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1718",
  database: "PapelariaBreno",
})

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack)
    return
  }
  console.log("connected as id " + connection.threadId)
})

export default connection
