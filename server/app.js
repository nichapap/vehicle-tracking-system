import express from 'express';
import cors from 'cors';

export default function (database) {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.post('/register', async (req, res) => {
    const { vehicleId } = req.body;

    const result = await database.createVehicle(vehicleId);

    if (result.error) {
      res.status(400).send(result.error);
    } else {
      res.send('Registered the vehicle successfully!');
    }
  });

  app.get('/vehicles', async (req, res) => {
    const result = await database.getVehicles();

    if (result.error) {
      res.send(result.error);
    } else {
      res.send(result.data);
    }
  });

  app.post('/vehicle/:id', async (req, res) => {
    const { id } = req.params;
    const { fromDate, toDate } = req.body;

    const result = await database.getCoordinates(id, fromDate, toDate);

    if (result.error) {
      res.send(result.error);
    } else {
      res.send(result.data);
    }
  });

  app.post('/vehicle/:id/update', async (req, res) => {
    const { vehicleId, date, latitude, longitude } = req.body;

    const result = await database.updateCoordinate(
      vehicleId,
      date,
      latitude,
      longitude
    );

    if (result.error) {
      res.send(result.error);
    } else {
      res.send(`Updated coordinate of ${vehicleId}`);
    }
  });

  return app;
}
