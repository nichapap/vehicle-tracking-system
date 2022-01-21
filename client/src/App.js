import React, { useCallback, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  AlertTitle,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CoordinatesTable from './components/CoordinatesTable';
import VehiclesTable from './components/VehiclesTable';

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:9000/vehicles')
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
        setIsLoading(false);
      })
      .catch((err) => setError(true));
  }, []);

  const handleSetSelectedVehicle = useCallback(
    (val) => {
      setSelectedVehicle(val);
    },
    [setSelectedVehicle]
  );

  const handleRemoveSelctedVehicle = () => {
    setSelectedVehicle('');
  };

  const mdTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
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
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
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
            {error ? (
              <Box sx={{ my: 2 }}>
                <Alert severity='error'>
                  <AlertTitle>Cannot Connect to the Server</AlertTitle>
                  Please check the internect connection.
                </Alert>
              </Box>
            ) : isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 5,
                }}
              >
                <CircularProgress size={50} />
              </Box>
            ) : selectedVehicle ? (
              <CoordinatesTable
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={handleSetSelectedVehicle}
              />
            ) : (
              <VehiclesTable
                list={vehicles}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={handleSetSelectedVehicle}
              />
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
