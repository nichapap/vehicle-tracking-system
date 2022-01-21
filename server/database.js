import mysql from 'mysql2';

const connection = mysql.createPool({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: '8889',
  database: 'vehicle_tracking_system',
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});

async function createVehicle(vehicleId) {
  let error = '';
  await connection
    .promise()
    .query(
      `INSERT INTO vehicles (vehicle_id)
      VALUES(?)`,
      [vehicleId]
    )
    .catch((err) => {
      console.log(err);
      error = err.sqlMessage;
    });
  return { error };
}

async function getVehicles() {
  let error = '';
  const [data] = await connection
    .promise()
    .query(
      `SELECT * 
      FROM vehicles`
    )
    .catch((err) => {
      console.log(err);
      errorMessage = err.sqlMessage;
    });

  return { data, error };
}

async function getCoordinates(id, fromDate, toDate) {
  let error = '';
  const [data] = await connection
    .promise()
    .query(
      `SELECT * 
      FROM coordinates 
      WHERE vehicle_id = '${id}' 
      AND recorded_date >= '${fromDate}' 
      AND recorded_date <= '${toDate}'`
    )
    .catch((err) => {
      console.log(err);
      errorMessage = err.sqlMessage;
    });

  return { data, error };
}

async function updateCoordinate(vehicleId, date, latitude, longitude) {
  let error = '';
  const [data] = await connection
    .promise()
    .query(
      `INSERT INTO coordinates (vehicle_id, recorded_date, latitude, longitude) 
      VALUES(?,?,?,?)`,
      [vehicleId, date, latitude, longitude]
    )
    .catch((err) => {
      console.log(err);
      errorMessage = err.sqlMessage;
    });

  return { data, error };
}

export default { createVehicle, getVehicles, getCoordinates, updateCoordinate };
