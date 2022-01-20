import React from 'react';
import 'date-fns';
import {
  Grid,
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
  const list = [
    {
      id: 3,
      vehicle_id: 5678910,
      recorded_date: '2021-12-31T17:00:00.000Z',
      latitude: 2.222345,
      longitude: 10.45647,
    },
    {
      id: 4,
      vehicle_id: 5678910,
      recorded_date: '2021-12-31T17:00:00.000Z',
      latitude: 2.222345,
      longitude: 10.45647,
    },
    {
      id: 5,
      vehicle_id: 5678910,
      recorded_date: '2021-12-31T17:00:00.000Z',
      latitude: 2.222345,
      longitude: 10.45647,
    },
  ];

  const today = new Date();
  const lastMonth = new Date().setMonth(today.getMonth() - 1);

  const [fromDate, setFromDate] = React.useState(lastMonth);
  const [toDate, setToDate] = React.useState(today);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container justifyContent='flex-end' sx={{ pt: 4 }}>
            <Grid item sx={{ pr: 2 }}>
              <DesktopDatePicker
                label='From date'
                inputFormat='dd/MM/yyyy'
                value={fromDate}
                onChange={handleFromDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={toDate}
              />
            </Grid>
            <Grid item sx={{ pr: 2 }}>
              <DesktopDatePicker
                label='To date'
                inputFormat='dd/MM/yyyy'
                value={toDate}
                onChange={handleToDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={today}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Table sx={{ flexGrow: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Latitude</TableCell>
              <TableCell>Longtitude</TableCell>
              <TableCell>Recorded date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : list
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
                count={list.length}
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
