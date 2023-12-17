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
import { adminListItems} from './listItems';
import Deposits from './Deposits';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import MyPieChart from './MyPieChart';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom'; 
import { getDemandes, getTotalDemandesValidees, getTotalDemandesRejetees, getTotalDemandesEnInstance, getTotalDemandes, getTotalConstruction, getTotalDemolition, getTotalExtension, getTotalVilla,getTotalFerme,getTotalImmeuble,getTotalTerrain} from "../../API";

import OrdersAdmin from './OrdersAdmin';
import MyBarChart from './MyBarChart';









// Generate Order Data
function createData(id, num, demandeur, cin ,autorisation, occupation, commune, date,statut) {
  return {id, num, demandeur,cin, autorisation, occupation, commune, date,statut};
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


export default function DashboardAdmin() {
  const [loading, setLoading] = useState(false);
const [rows, setRows] = useState([]);
const [totalDemandes, setTotalDemandes] = useState(0);
const [totalDemandesAcceptees, setTotalDemandesAcceptees] = useState(0);
const [totalDemandesRejetees, setTotalDemandesRejetees] = useState(0);
const [totalDemandesEnInstance, setTotalDemandesEnInstance] = useState(0);
const [totalConstruction, setTotalConstruction] = useState(0);




const [totalExtension, setTotalExtension] = useState(0);

const [totalDemolition, setTotalDemolition] = useState(0);

const [totalVilla, setTotalVilla] = useState(0);

const [totalImmeuble, setTotalImmeuble] = useState(0);

const [totalFerme, setTotalFerme] = useState(0);

const [totalTerrain, setTotalTerrain] = useState(0);






const dataAutorisation = [
  { value: totalConstruction , label: 'Construction' },
  { value: totalExtension, label: 'Extension' },
  { value: totalDemolition, label: 'Démolition' },
];

const dataOccupation = [
  { value: totalVilla, label: 'Villa' },
  { value: totalImmeuble, label: 'Immeuble' },
  { value: totalTerrain, label: 'Terrain' },
  { value: totalFerme, label: 'Ferme' },

];



let username;




useEffect(() => {

  setLoading(true);
  getDemandes().then((res) => {
    const formattedRows = res.map((data) => {
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
        data.statut.type
      );
    });

    setRows(formattedRows.slice(0, 5));

    setLoading(false);
  });

  getTotalDemandes().then((res) =>{
    setTotalDemandes(res);
  });

  getTotalDemandesValidees().then((res) =>{
    setTotalDemandesAcceptees(res);
  });
  getTotalDemandesRejetees().then((res) =>{
    setTotalDemandesRejetees(res);
  });
  getTotalDemandesEnInstance().then((res) =>{
    setTotalDemandesEnInstance(res);
  });
  getTotalConstruction().then((res) =>{
    setTotalConstruction(res);
  });
  getTotalExtension().then((res) =>{
    setTotalExtension(res);
  });
  getTotalDemolition().then((res) =>{
    setTotalDemolition(res);
  });
  getTotalVilla().then((res) =>{
    setTotalVilla(res);
  });
  getTotalImmeuble().then((res) =>{
    setTotalImmeuble(res);
  });
  getTotalFerme().then((res) =>{
    setTotalFerme(res);
  });
  getTotalTerrain().then((res) =>{
    setTotalTerrain(res);
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
  
    navigate('/demandes');
  
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
              Tableau de bord Admin
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
                  <Deposits title="En instance" number={totalDemandesEnInstance} icon={<PendingActionsIcon sx={{ color: 'primary.main' }} />}/>
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
              <Grid item xs={12} >
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 500,
 }}>
                <MyBarChart  title = "Histogramme de répartition des demandes par arrondissement"/>

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
