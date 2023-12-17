import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import ListItemButton from '@mui/material/ListItemButton';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="/espace-citoyen">
      <ListItemIcon>
        <DashboardIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Tableau de bord" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/mes-demandes">
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Mes demandes" />
     </ListItemButton>
   {/* <ListItemButton component={RouterLink} to="/mes-demandes-acceptees">
      <ListItemIcon>
        <TaskIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Mes demandes acceptées" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/mes-demandes-rejetees">
      <ListItemIcon>
        <UnpublishedIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Mes demandes rejetées" />
    </ListItemButton> */}
    <ListItemButton component={RouterLink} to="/localiser-mes-demandes">
      <ListItemIcon>
        <MapIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Localiser mes demandes" />
    </ListItemButton>
  </React.Fragment>
);


export const adminListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="/espace-admin">
      <ListItemIcon>
        <DashboardIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Tableau de bord Admin" />
    </ListItemButton>


    <ListItemButton component={RouterLink} to="/demandes-en-instance">
      <ListItemIcon>
        <PendingActionsIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Les demandes en instance" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/demandes-en-cours">
      <ListItemIcon>
        <PendingActionsIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Les demandes en cours" />
    </ListItemButton>


    <ListItemButton component={RouterLink} to="/demandes">
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Toutes les demandes" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/localiser-les-demandes">
      <ListItemIcon>
        <MapIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Localiser les demandes" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/citoyens">
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Comptes Citoyens" />
    </ListItemButton>
  </React.Fragment>
);