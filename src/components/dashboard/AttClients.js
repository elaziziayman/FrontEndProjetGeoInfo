import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TitleChart from './TitleChart';
import { styled, alpha } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';





const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    fontFamily: 'Lato, sans-serif',

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(theme.palette.primary.light, 0.1), // Adjust the alpha value as needed
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function AttClients({title, rows, paginationEnabled, showStatus, showMotif, loading, showAction}) {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = rows.slice(startIndex, endIndex);
  const CenteredLoading = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });


  return (
    <React.Fragment>
      <TitleChart>{title}</TitleChart>
      {loading ? (
         <CenteredLoading>
         <CircularProgress />
       </CenteredLoading>) : (
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 20 }}>Id citoyen</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Nom complet</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>CIN</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Email</StyledTableCell>
            <StyledTableCell align="right" sx={{ fontSize: 20 }}>Statut</StyledTableCell>
            <StyledTableCell align="right" sx={{ fontSize: 20 }}>Motif</StyledTableCell>

            {showAction &&(<StyledTableCell sx={{ fontSize: 20 }}>Action</StyledTableCell>)}


          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.num}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.demandeur}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.cin}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.email}</StyledTableCell>
              <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.statut}</StyledTableCell>
              <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.motif}</StyledTableCell>
              {showAction &&( <Button variant="contained" color="error">Bloquer</Button>)}


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      )}
      {paginationEnabled && (
        <TablePagination
          rowsPerPageOptions={[7]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </React.Fragment>
  );
}