const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_DATABASE || '8889',
  user: process.env.MYSQL_PORT || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'vehicle_tracking_system',
});

connection.connect();

function registerVehicle(vehicleId, callback) {
  const query = `INSERT INTO vehicles (vehicle_id) VALUES(?)`;
  const values = [vehicleId];

  connection.query(query, values, (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result);
  });
}

function getVehicles(callback) {
  const query = `SELECT * FROM vehicles`;

  connection.query(query, (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result);
  });
}

function getCoordintes(vehicleId, fromDate, toDate, callback) {
  const query = `SELECT * FROM coordinates WHERE vehicle_id = '${vehicleId}' AND recorded_date >= '${fromDate}' AND recorded_date <= '${toDate}'`;

  connection.query(query, (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result);
  });
}

function updateCoordinate(vehicleId, date, latitude, longitude, callback) {
  const query = `INSERT INTO coordinates (vehicle_id, recorded_date, latitude, longitude) VALUES(?,?,?,?)`;
  const values = [vehicleId, date, latitude, longitude];

  connection.query(query, values, (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result);
  });
}

module.exports = {
  registerVehicle,
  getVehicles,
  getCoordintes,
  updateCoordinate,
};
