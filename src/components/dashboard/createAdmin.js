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
import { mainListItems } from './listItems';
import { getCitoyens } from '../../API';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AttClients from './AttClients';
import { adminListItems } from './listItems';
import TextField from '@mui/material/TextField';

const drawerWidth = 240;

function createData(id, num, demandeur, cin, email, statut, motif) {
  return { id, num, demandeur, cin, email, statut, motif };
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

const handleButtonClick = () => {
  // Your button click logic here
  console.log('Button Clicked!');
};

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

const defaultTheme = createTheme();

export default function Citoyens() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    cin: '',
  });

  let username;

  useEffect(() => {
    setLoading(true);
    getCitoyens().then((res) => {
      const formattedRows = res.map((data) => {
        console.log(data);
        username = data.nom + ' ' + data.prenom;
        return createData(
          data.id,
          data.id,
          username,
          data.cin,
          data.email,
          data.statut.type,
          data.motif
        );
      });

      setRows(formattedRows);
      setLoading(false);
    });
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission (e.g., API call or local state update)
    console.log('Form submitted with data:', formData);
    // Clear the form fields after submission
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      cin: '',
    });
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
              Création compte Admin
            </Typography>
            <IconButton title="Notifications" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon sx={{ fontSize: 30 }} />
              </Badge>
            </IconButton>
            <IconButton title="Se déconnecter" color="inherit" sx={{ marginLeft: '8px' }}>
              <LogoutIcon sx={{ fontSize: 30 }} />
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
          <List component="nav">{adminListItems}</List>
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
              <Grid item xs={12}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', fontSize: '3rem' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    Remplissez ces informations (Un message de confirmation sera envoyé à l'adresse Email )
                  </Typography>
                  <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleFormChange}
                          fullWidth
                          required

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Prénom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleFormChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="CIN"
                          name="cin"
                          value={formData.cin}
                          onChange={handleFormChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" sx={{ fontSize: '1.2rem' }}>
                          Créer le compte
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}