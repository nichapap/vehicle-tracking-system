const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: '8889',
  database: 'vehicle_tracking_system',
});

app.post('/register', (req, res) => {
  const vehicleId = req.body.vehicleId;

  req.setTimeout(10000);

  db.query(
    'INSERT INTO vehicles (vehicle_id) VALUES(?)',
    [vehicleId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.sqlMessage);
      } else {
        res.send('Registered the vehicle');
      }
    }
  );
});

app.get('/vehicles', (req, res) => {
  req.setTimeout(10000);

  db.query('SELECT * FROM vehicles', (err, result) => {
    if (err) {
      console.log(err);
      res.send(err.sqlMessage);
    } else {
      res.send(result);
    }
  });
});

app.post('/vehicle/:id', (req, res) => {
  const id = req.params.id;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  req.setTimeout(10000);

  db.query(
    `SELECT * FROM coordinates WHERE vehicle_id = '${id}' AND recorded_date >= '${fromDate}' AND recorded_date <= '${toDate}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.sqlMessage);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/vehicle/:id/update', (req, res) => {
  const vehicleId = req.body.vehicleId;
  const date = req.body.date;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  req.setTimeout(10000);

  db.query(
    'INSERT INTO coordinates (vehicle_id, recorded_date, latitude, longitude) VALUES(?,?,?,?)',
    [vehicleId, date, latitude, longitude],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.sqlMessage);
      } else {
        res.send(`Updated coordinate of ${vehicleId}`);
      }
    }
  );
});

app.listen('9000', () => {
  console.log('Server is running on port 9000');
});
