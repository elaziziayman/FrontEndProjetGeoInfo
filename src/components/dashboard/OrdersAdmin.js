import * as React from 'react';
import { useState } from 'react';

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
import Dialog from '@mui/material/Dialog';  // Add this import
import DialogTitle from '@mui/material/DialogTitle';  // Add this import
import DialogContent from '@mui/material/DialogContent';  // Add this import
import TextField from '@mui/material/TextField';  // Add this import
import DialogActions from '@mui/material/DialogActions';

import axios from 'axios';







const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px', // Adjust padding for cells
  minWidth: '100px', // Set minimum width for cells


  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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





export default function OrdersAdmin({title, rows, paginationEnabled, showStatus, showMotif, loading, showActions, showAvis}) {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [openReasonDialogRejetee, setOpenReasonDialogRejetee] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hiddenRows, setHiddenRows] = useState([]);


  const handleOpenReasonDialogRejetee = (id) => {
    setSelectedRowId(id);
    setOpenReasonDialogRejetee(true);
  };

  const handleCloseReasonDialog = () => {
    setSelectedRowId(null);
    setOpenReasonDialogRejetee(false);
  };

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

  const handleAction = (id, action) => {
    if (action === 'Rejeter') {
      handleOpenReasonDialogRejetee(id);
    }
    else if (action === 'Accepter'){
      console.log(`${action} clicked for row with ID: ${id}`);
      axios.post('http://172.16.18.100:8085/demandes/updateStatut', {
        num_demande: id,
        id_statut: 1,
        motif :''
      })
      .then(response => {
        console.log('Update successful:', response.data);
        setHiddenRows([...hiddenRows, id]); // Ajoutez l'ID de la ligne aux lignes cachées

      })
      .catch(error => {
        console.error('Update error:', error);
      });
    }
    else if (action === 'Défavorable') {
      handleOpenReasonDialogRejetee(id);
    } 
    else if (action === 'Favorable'){
      console.log(`${action} clicked for row with ID: ${id}`);
      axios.post('http://172.16.18.100:8085/demandes/updateStatut', {
        num_demande: id,
        id_statut: 5,
        motif :''
      })
      .then(response => {
        console.log('Update successful:', response.data);
        setHiddenRows([...hiddenRows, id]); // Ajoutez l'ID de la ligne aux lignes cachées

      })
      .catch(error => {
        console.error('Update error:', error);
      });
    }
  };

  const handleReject = () => {
    // Placeholder function for handling rejection
    console.log(`Rejection reason for row with ID ${selectedRowId}: ${rejectionReason}`);
    handleCloseReasonDialog();
    axios.post('http://172.16.18.100:8085/demandes/updateStatut', {
      num_demande: selectedRowId,
      id_statut:2,
      motif: rejectionReason,
    })
    .then(response => {
      console.log('Update successful:', response.data);
      setHiddenRows([...hiddenRows, selectedRowId]);

    })
    .catch(error => {
      // Gérer les erreurs
      console.error('Update error:', error);
    });
  };

  const [rejectionReason, setRejectionReason] = useState('');


  return (
    <React.Fragment>
      <TitleChart>{title}</TitleChart>
      {loading ? (
         <CenteredLoading>
         <CircularProgress />
       </CenteredLoading>) : (
      <Table size="medium" sx={{ minWidth: '700px' }} >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 15 }}>Numéro de demande</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Demandeur</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>CIN</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Autorisation</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Occupation</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Arrondissement</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Date</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Pièces jointes</StyledTableCell>

            {showStatus &&(<StyledTableCell align="right" sx={{ fontSize: 15 }}>Statut</StyledTableCell>)}
            {showMotif &&(<StyledTableCell align="right" sx={{ fontSize: 15 }}>Motif</StyledTableCell>)}
            {showActions &&(<StyledTableCell align="center" sx={{ fontSize: 15 }}>Actions</StyledTableCell>)}
            {showAvis &&(<StyledTableCell align="center" sx={{ fontSize: 15 }}>Avis</StyledTableCell>)}



          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row) => (
          !hiddenRows.includes(row.id) &&(
            <StyledTableRow key={row.id}>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.num}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.demandeur}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.cin}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.autorisation}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.occupation}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.commune}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.date}</StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 15 }}>
    <Button
      variant="contained"
      color="primary" // Green color for "Accepter"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      CIN
    </Button>
    <Button
      variant="contained"
      color="warning" // Red color for "Rejeter"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Demande
    </Button>
    <Button
      variant="contained"
      color="success" // Red color for "Rejeter"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Titre foncier
    </Button>
  </StyledTableCell>
              {showStatus &&( <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.statut}</StyledTableCell>)}
              {showMotif &&( <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.motif}</StyledTableCell>)}
              {showActions && (
  <StyledTableCell align="center" sx={{ fontSize: 15 }}>
    <Button
      variant="contained"
      color="primary" // Green color for "Accepter"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'Accepter')}
    >
      Accepter
    </Button>
    <Button
      variant="contained"
      color="secondary" // Red color for "Rejeter"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'Rejeter')}
    >
      Rejeter
    </Button>
  </StyledTableCell>
)}
{showAvis && (
  <StyledTableCell align="center" sx={{ fontSize: 15 }}>
    <Button
      variant="contained"
      color="primary" // Green color for "Accepter"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'Accepter')}
    >
    Favorable
    </Button>
    <Button
      variant="contained"
      color="secondary" // Red color for "Rejeter"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'Rejeter')}
    >
      Défavorable
    </Button>
  </StyledTableCell>
)}


            </StyledTableRow> )
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

<Dialog open={openReasonDialogRejetee} onClose={handleCloseReasonDialog} fullWidth maxWidth="md">
  <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}>
    Saisir le motif de rejet
  </DialogTitle>
  <DialogContent>
    <TextField
      multiline
      rows={4}
      fullWidth
      label="Motif de rejet"
      variant="outlined"
      value={rejectionReason}
      onChange={(e) => setRejectionReason(e.target.value)}
      sx={{ fontSize: '18px', fontFamily: 'YourFont, sans-serif' }}
    />
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleCloseReasonDialog}
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Annuler
    </Button>
    <Button
      onClick={handleReject}
      variant="contained"
      color="secondary"
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Rejeter
    </Button>
  </DialogActions>
</Dialog>

    </React.Fragment>
  );
}
