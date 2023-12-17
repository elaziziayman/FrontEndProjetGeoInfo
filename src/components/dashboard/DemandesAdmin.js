import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainListItems} from './listItems';
import { Link as RouterLink } from 'react-router-dom'; 
import { getDemandes} from "../../API"; 



import Orders from './Orders';
import OrdersAdmin from './OrdersAdmin';
import { adminListItems } from './listItems';


const drawerWidth = 240;
function createData(id, num, demandeur, cin ,autorisation, occupation, commune, date,statut, motif) {
    return {id, num, demandeur,cin, autorisation, occupation, commune, date,statut,motif};
  }
  


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function DemandesAdmin() {
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  let username;
  useEffect(() => {
    setLoading(true);
    getDemandes().then((res) => {
      const formattedRows = res.map((data) => {
          console.log(data);
          username = data.demandeur.nom + " " + data.demandeur.prenom;
        return createData(
          data.num_demande,
          data.num_demande,
          username,
          data.demandeur.cin,
          data.autorisation.type,
          data.occupation.type,
          data.commune.nom,
          formatDate(data.date),
          data.statut.type,
          data.statut.motif
        );
      });
  
      setRows(formattedRows);
      setLoading(false);
    });
  }, []);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp);
    const dd = String(dateObject.getDate()).padStart(2, '0');
    const mm = String(dateObject.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObject.getFullYear();
    const hh = String(dateObject.getHours()).padStart(2, '0');
    const min = String(dateObject.getMinutes()).padStart(2, '0');
    const ss = String(dateObject.getSeconds()).padStart(2, '0');
  
    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontSize: '2rem' }} 
            >
              Les demandes
            </Typography>
            <IconButton title="Notifications" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon sx={{ fontSize: 30}} />
              </Badge>

            </IconButton>
            <IconButton component={RouterLink} to="/"  title="Se déconnecter" color="inherit" sx={{ marginLeft: '8px' }}>
            <LogoutIcon sx={{ fontSize: 30 }}  />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List  component="nav" >
            {adminListItems}
          </List>
        </Drawer>
        <Box
          component="main"
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              {/* Mes demandes */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <OrdersAdmin title="Les demandes" rows={rows} paginationEnabled showStatus loading={loading} showActions={false} showMotif />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
