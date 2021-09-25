import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import jwt_decoded from "jwt-decode";

import { signOut } from "../../../store/modules/auth/actions";

//Material ui components
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Alert from "@material-ui/lab/Alert";

//Material ui icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircle from "@material-ui/icons/AccountCircle";

//Image
import LogoImg from "../../../assets/images/logotransp.png";

//Components
import MainListItems from "../ListItems";

import { api } from "../../../services/api";

//Styles
import { LogoContainer, Logo, UserName, LogoutButton } from "./styles";
import { useStyles } from "./styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Bitfy 2020
    </Typography>
  );
}

const ContainerWrapper = ({ children, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { environment } = useSelector((state) => state.accountSettings);
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [merchant, setMerchant] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const userName = useSelector((state) => state.auth.userName);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setShowAlert(
      window.location.pathname === "/" ||
        window.location.pathname.indexOf("/transactions") !== -1 ||
        window.location.pathname.indexOf("/payments") !== -1
    );

    api
      .get(`/merchants/${id}`)
      .then((response) => {
        const m = response.data;
        setMerchant(m);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <LogoutButton to="/change-password">Alterar senha</LogoutButton>
      <LogoutButton onClick={handleLogout} to="/">
        Sair
      </LogoutButton>
    </Menu>
  );

  const renderAlert = () => {
    let messages = [];

    if (
      merchant &&
      (merchant.status_address_document === "DOCUMENT_PENDING" ||
        merchant.status_company_document === "DOCUMENT_PENDING" ||
        merchant.status_user_document === "DOCUMENT_PENDING")
    ) {
      messages.push({
        message: "Documentação pendente. Envie seus documentos para análise.",
        path: "/register-data/docs",
      });
    } else if (
      merchant &&
      (merchant.status_address_document === "PENDING" ||
        merchant.status_company_document === "PENDING" ||
        merchant.status_user_document === "PENDING")
    ) {
      messages.push({ message: "Os documentos enviados estão em análise." });
    } else if (
      merchant &&
      (merchant.status_address_document === "REJECTED" ||
        merchant.status_company_document === "REJECTED" ||
        merchant.status_user_document === "REJECTED")
    ) {
      messages.push({
        message: "Atenção! Um ou mais documentos enviados foram recusados.",
      });
    } else if (
      merchant &&
      merchant.status_address_document === "VALIDATED" &&
      merchant.status_company_document === "VALIDATED" &&
      merchant.status_user_document === "VALIDATED" &&
      environment === "sandbox"
    ) {
      messages.push({
        message:
          "Atenção: Você está em modo Sandbox, os dados que estão sendo exibidos correspondem ao ambiente de testes.",
        severity: "warning",
        path: merchant.production_ready ? "/integration" : null,
        pathLabel: "Alterar ambiente",
      });
    }

    if (merchant && !merchant.bank_agency) {
      messages.push({
        message: "Cadastre os seus dados bancários.",
        path: "/register-data/bank-data",
      });
    }

    return messages && showAlert
      ? messages.map((message, index) => (
          <Alert
            key={index}
            className={classes.alert}
            severity={message.severity || "warning"}
          >
            {message.message}{" "}
            {message.path && (
              <Link to={message.path}>
                {message.pathLabel || "Acessar página"}
              </Link>
            )}
          </Alert>
        ))
      : null;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <UserName>{userName}</UserName>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <LogoContainer>
            <Logo src={LogoImg} alt="bitfy-logo" />
          </LogoContainer>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        {renderMenu}
        <Container maxWidth="xl" className={classes.container}>
          <Grid className={classes.gridContent} container>
            <Grid item xs={12}>
              {renderAlert()}
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default ContainerWrapper;
