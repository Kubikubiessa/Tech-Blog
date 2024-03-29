const Sequelize = require("sequelize");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
});
//require("dotenv").config();

let sequelize;

console.log("process.env.JAWSDB_UR", process.env.JAWSDB_URL);
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    //  socketPath: '/var/run/tmp/mysql.sock',
    }
  );
}

module.exports = sequelize;
