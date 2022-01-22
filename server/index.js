const express = require('express');
const cors = require('cors');

const database = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const vehicleId = req.body.vehicleId;
  database.registerVehicle(vehicleId, (error, result) => {
    if (error) {
      res.send({ error: error.message });
      return;
    }
    res.send(`Registered the vehicle ${vehicleId} successfully!`);
  });
});

app.get('/vehicles', (req, res) => {
  database.getVehicles((error, result) => {
    if (error) {
      res.send({ error: error.message });
      return;
    }
    res.send(result);
  });
});

app.post('/vehicle/:vehicleId', (req, res) => {
  const { vehicleId } = req.params;
  const { fromDate, toDate } = req.body;

  database.getCoordintes(vehicleId, fromDate, toDate, (error, result) => {
    if (error) {
      res.send({ error: error.message });
      return;
    }
    res.send(result);
  });
});

app.post('/vehicle/:vehicleId/update', (req, res) => {
  const { vehicleId } = req.params;
  const { date, latitude, longitude } = req.body;

  database.updateCoordinate(
    vehicleId,
    date,
    latitude,
    longitude,
    (error, result) => {
      if (error) {
        res.send({ error: error.message });
        return;
      }
      res.send(`Updated coordinate of ${vehicleId}`);
    }
  );
});

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
