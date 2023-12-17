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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainListItems} from './listItems';
import Deposits from './Deposits';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import MyPieChart from './MyPieChart';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom'; 
import { getDemandesByUser, getCitoyenTotalDemandes, getCitoyenTotalDemandesAcceptees, getCitoyenTotalDemandesRejetees, getCitoyenTotalDemandesEnInstance} from "../../API"; 


import Orders from './Orders';
import MyBarChart from './MyBarChart';





const dataAutorisation = [
  { value: 5 , label: 'Construction' },
  { value: 10, label: 'Extension' },
  { value: 15, label: 'Démolition' },
];

const dataOccupation = [
  { value: 5, label: 'Villa' },
  { value: 10, label: 'Immeuble' },
  { value: 15, label: 'Terrain' },
  { value: 20, label: 'Ferme' },

];

// Generate Order Data
function createData(id, num, autorisation, occupation, commune, date,statut,motif) {
  return {id, num, autorisation, occupation, commune, date,statut,motif};
}



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ fontSize: '1.2rem' }}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        E-Demandes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

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

const userId =2; 

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
const [rows, setRows] = useState([]);
const [totalDemandes, setTotalDemandes] = useState(0);
const [totalDemandesAcceptees, setTotalDemandesAcceptees] = useState(0);
const [totalDemandesRejetees, setTotalDemandesRejetees] = useState(0);
const [totalDemandesEnInstance, setTotalDemandesEnInstance] = useState(0);

useEffect(() => {
  setLoading(true);
  getDemandesByUser(userId).then((res) => {
    const formattedRows = res.map((data) => {
      console.log(data);
      return createData(
        data.num_demande,
        data.num_demande,
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

  getCitoyenTotalDemandes(userId).then((res) =>{
    setTotalDemandes(res);
  });

  getCitoyenTotalDemandesAcceptees(userId).then((res) =>{
    setTotalDemandesAcceptees(res);
  });
  getCitoyenTotalDemandesRejetees(userId).then((res) =>{
    setTotalDemandesRejetees(res);
  });
  getCitoyenTotalDemandesEnInstance(userId).then((res) =>{
    setTotalDemandesEnInstance(res);
  });
}, []);

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

  const navigate = useNavigate();

  function preventDefault(event) {
    event.preventDefault();
  
    navigate('/mes-demandes');
  
  }
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
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
              Tableau de bord
            </Typography>
            <IconButton title="Notifications" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon sx={{ fontSize: 30}} />
              </Badge>

            </IconButton>
            <IconButton  component={RouterLink} to="/" title="Se déconnecter" color="inherit" sx={{ marginLeft: '8px' }}>
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
            {mainListItems}
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            {/* Recent Deposits */}

            <Grid item xs={12} md={4} lg={3}>
                <Paper
                   sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                    alignItems: 'center',      // Center content vertically
                    justifyContent: 'center',  // Center content horizontally
                  }}
                >
                  <Deposits title="Total des demandes" number={totalDemandes} icon={<AssignmentIcon sx={{ color: 'primary.main' }} />}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                   sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                    alignItems: 'center',      // Center content vertically
                    justifyContent: 'center',  // Center content horizontally
                  }}
                >
                  <Deposits title="Demandes validées" number={totalDemandesAcceptees} icon={<TaskIcon sx={{ color: 'primary.main' }} />}  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                   sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                    alignItems: 'center',      // Center content vertically
                    justifyContent: 'center',  // Center content horizontally
                  }}
                >
                  <Deposits title="Demandes rejetées" number={totalDemandesRejetees} icon={<UnpublishedIcon sx={{ color: 'primary.main' }} />}/>
                </Paper>
                
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                   sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                    alignItems: 'center',      // Center content vertically
                    justifyContent: 'center',  // Center content horizontally
                  }}
                >
                  <Deposits title="En cours de traitement" number={totalDemandesEnInstance} icon={<PendingActionsIcon sx={{ color: 'primary.main' }} />}/>
                </Paper>
                
              </Grid>
              {/* Chart */}
             <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    alignItems: 'center',      // Center content vertically
                    justifyContent: 'center', 
                  }}
                >
                   {/* <Chart /> */}
                   <MyPieChart data = {dataAutorisation} title = "Demandes par autorisation" />
                  
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    alignItems: 'center',      // Center content vertically
                    justifyContent: 'center', 
                  }}
                >
                   {/* <Chart /> */}
                   <MyPieChart data = {dataOccupation} title = "Demandes par occupation de terrain" />
                  
                </Paper>
              </Grid>
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders title="Mes demandes récentes" rows = {rows} showStatus={true} loading={loading}  />
                  <Link color="primary"
  href="http://localhost:3000/mes-demandes"
  onClick={preventDefault}
  sx={{ mt: 3, fontSize: '1.2rem', fontWeight: 'bold' }}>
        Voir toutes mes demandes
      </Link>
                </Paper>
              </Grid> */}

<Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <MyBarChart data = {dataOccupation} title = "Histogramme de répartition des demandes par arrondissement" />

                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
