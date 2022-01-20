import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import TablePaginationActions from './common/TablePaginationActions';

export default function Coordinates(props) {
  const { selectedVehicle } = props;

  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );

  const [fromDate, setFromDate] = useState(lastMonth);
  const [toDate, setToDate] = useState(today);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = React.useState(true);

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromDate: format(fromDate, 'yyyy-MM-dd'),
        toDate: format(toDate, 'yyyy-MM-dd'),
      }),
    };
    fetch(`http://localhost:9000/vehicle/${selectedVehicle}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCoordinates(data));
  }, [selectedVehicle, fromDate, toDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFromDate = (newValue) => {
    setFromDate(newValue);
  };

  const handleToDate = (newValue) => {
    setToDate(newValue);
  };

  // console.log(window.theme.breakpoints);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container justifyContent='flex-end' sx={{ pt: 4 }}>
            <Grid item xs={5} sx={{ pr: 2 }}>
              <DesktopDatePicker
                label='From date'
                inputFormat='dd/MM/yyyy'
                value={fromDate}
                onChange={handleFromDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={toDate}
              />
            </Grid>
            <Grid item xs={5} sx={{ pr: 2 }}>
              <DesktopDatePicker
                label='To date'
                inputFormat='dd/MM/yyyy'
                value={toDate}
                onChange={handleToDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={fromDate}
                maxDate={today}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Box sx={{ m: 2 }}>
          {coordinates.length < 1 ? (
            <Collapse in={open}>
              <Alert
                severity='warning'
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
              >
                No data to display in this range of date
              </Alert>
            </Collapse>
          ) : (
            ''
          )}
        </Box>

        <Table
          sx={{
            flexGrow: 1,
            display: () => (coordinates.length < 1 ? 'none' : 'table'),
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Latitude</TableCell>
              <TableCell>Longtitude</TableCell>
              <TableCell>Recorded date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? coordinates.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : coordinates
            ).map((coordinate) => (
              <TableRow key={coordinate.id}>
                <TableCell>{coordinate.latitude}</TableCell>
                <TableCell>{coordinate.longitude}</TableCell>
                <TableCell>
                  {new Date(coordinate.recorded_date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={coordinates.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
