import React, { useCallback, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import CoordinatesTable from './components/CoordinatesTable';
import VehiclesTable from './components/VehiclesTable';

const App = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSetSelectedVehicle = useCallback(
    (val) => {
      setSelectedVehicle(val);
    },
    [setSelectedVehicle]
  );

  const handleRemoveSelctedVehicle = () => {
    setSelectedVehicle('');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='absolute'>
        <Toolbar>
          <Typography component='h1' variant='h6' noWrap sx={{ flexGrow: 1 }}>
            {selectedVehicle ? `Vehicle ID: ${selectedVehicle}` : 'Vehicles'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='main'
        sx={{
          backgroundColor: grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {selectedVehicle ? (
          <Button
            variant='text'
            startIcon={<ArrowBackIcon />}
            sx={{ ml: 3, my: 2, color: grey[900], fontWeight: 'bold' }}
            onClick={handleRemoveSelctedVehicle}
          >
            Back
          </Button>
        ) : null}
        <Container maxWidth='xl'>
          {selectedVehicle ? (
            <CoordinatesTable
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={handleSetSelectedVehicle}
            />
          ) : (
            <VehiclesTable
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={handleSetSelectedVehicle}
            />
          )}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default App;
