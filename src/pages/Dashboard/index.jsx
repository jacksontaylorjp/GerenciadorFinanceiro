import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceitaIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import DespesasIcon from '@mui/icons-material/MoneyOff';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Accordion, AccordionDetails, AccordionSummary, Badge, MenuItem } from '@mui/material';
import BodyDashboard from 'componentes/BodyDashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDoubleRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import ModalAddReceita from 'componentes/ModalAddReceitas';
import ModalAddDespesas from 'componentes/ModalAddDespesas';
import AccountMenu from 'componentes/AccountMenu';

import { useContext } from 'react';
import { StatusModalContext } from 'context/StatusModalContext';
import { auth2 } from 'auth';

//INÍCIO DA CUSTOMIZAÇÃO GRÁFICA
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessário para que o conteúdo fique abaixo da barra do aplicativo
  ...theme.mixins.toolbar,
}));

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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
//FIM DA CUSTOMIZAÇÃO GRÁFICA

const Dashboard = () => {
  const theme = useTheme();

  const { openModal, toggleModalReceita, toogleModalDespesa } = useContext(StatusModalContext);

  const [open, setOpen] = React.useState(false);
  const [expandedAccordionReceitas, setExpandedAccordionReceitas] = React.useState(false);
  const [expandedAccordionDespesas, setExpandedAccordionDespesas] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    //fechando o accordion ao fechar o menu
    setExpandedAccordionReceitas(false);
    setExpandedAccordionDespesas(false);
  };

  const handleAccordionOpenCloseReceitas = () => {
    setOpen(true);
    setExpandedAccordionReceitas(!expandedAccordionReceitas);

  };
  const handleAccordionOpenCloseDespesas = () => {
    setOpen(true);
    setExpandedAccordionDespesas(!expandedAccordionDespesas);

  };
  return (
    <>
      <ModalAddReceita
        titulo="Receitas"
      />
      <ModalAddDespesas
        titulo="Despesas"
      />

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              {/* icone /// para abrir o menu */}
              <MenuIcon />
            </IconButton>
            {/* titulo do nav */}
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>

            <MenuItem>
              <Typography>
                {sessionStorage.getItem("user")}
              </Typography>

              
                <Badge badgeContent={1} color="error">
                {/* icone conta */}
                <AccountMenu />
                </Badge>

            </MenuItem>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>

          {/* barra horizontal divisora */}
          <Divider />
          {/* INICIO DE RECEITAS */}
          <Accordion
            expanded={expandedAccordionReceitas}
          >
            <AccordionSummary
              onClick={handleAccordionOpenCloseReceitas}
              expandIcon={open ? <ExpandMoreIcon /> : ''}
              aria-controls="panel1a-content"
              id="panel1a-header"

            >
              {/* lista dos icones */}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  ml: open ? 0 : 7.5,
                  justifyContent: 'center',
                }}
              >
                {/* icone */}
                <ReceitaIcon />
              </ListItemIcon>

              <ListItemText primary="Receitas"
                sx={{
                  opacity: open ? 1 : 0,
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Divider />

              <ListItemButton
                sx={{
                  ml: open ? 3 : 0,
                }}
                onClick={toggleModalReceita}
              >
                {/* icone */}
                <ArrowDoubleRight />
                <ListItemText primary={"Adicionar"}
                  sx={{
                    opacity: open ? 1 : 1,
                  }}
                />

              </ListItemButton>
            </AccordionDetails>
          </Accordion>

          {/* FIM DE RECEITAS */}

          {/* INICIO DE DESPESAS */}
          <Accordion
            expanded={expandedAccordionDespesas}
          >
            <AccordionSummary
              onClick={handleAccordionOpenCloseDespesas}
              expandIcon={open ? <ExpandMoreIcon /> : ''}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  ml: open ? 0 : 8,
                  justifyContent: 'center',
                }}
              >
                {/* icone */}
                <DespesasIcon />
              </ListItemIcon>
              <ListItemText primary={"Despesas"}
                sx={{
                  opacity: open ? 1 : 0,
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <ListItemButton
                sx={{
                  ml: open ? 3 : 0,
                }}
                onClick={toogleModalDespesa}
              >
                {/* icone */}
                <ArrowDoubleRight />
                <ListItemText primary={"Adicionar"}
                  sx={{
                    opacity: open ? 1 : 1,
                  }}
                />
              </ListItemButton>
            </AccordionDetails>
          </Accordion>

          {/* FIM DE DESPESAS */}

        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* corpo do dashboard */}
          <BodyDashboard />

        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
