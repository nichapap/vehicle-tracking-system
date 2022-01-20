import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import TablePaginationActions from './common/TablePaginationActions';

export default function Vehicles(props) {
  const { setSelectedVehicle } = props;
  const vehiclesRef = useRef();
  const [vehicleId, setVehicleId] = useState(null);

  useEffect(() => {
    setSelectedVehicle(vehicleId);
  }, [setSelectedVehicle, vehicleId]);

  const handleSelectVehicle = (id) => {
    setVehicleId(id);
  };

  const list = [
    {
      id: 7,
      vehicle_id: 667788,
    },
    {
      id: 1,
      vehicle_id: 1234567,
    },
    {
      id: 9,
      vehicle_id: 5678910,
    },
    {
      id: 3,
      vehicle_id: 9876543,
    },
    {
      id: 4,
      vehicle_id: 9898989,
    },
    {
      id: 5,
      vehicle_id: 1212312121,
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ flexGrow: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle ID</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : list
            ).map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell component='th' scope='row'>
                  {vehicle.vehicle_id}
                </TableCell>
                <TableCell align='right'>
                  <Button
                    variant='contained'
                    ref={vehiclesRef}
                    onClick={() => handleSelectVehicle(vehicle.vehicle_id)}
                  >
                    View Timeline
                  </Button>
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
