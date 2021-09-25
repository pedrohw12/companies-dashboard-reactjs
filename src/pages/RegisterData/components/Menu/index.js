import React from "react";

//Material ui components
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 230,
  },
  menuItemActive: {
    backgroundColor: '#f2f2f2',
  }
});

const Menu = ({ current }) => {
  const classes = useStyles();

  const handleClick = (contentPage) => {
    if (contentPage === 'companyData') {
      window.location.href = '/register-data';
    } else if (contentPage === 'bankData') {
      window.location.href = '/register-data/bank-data';
    } else if (contentPage === 'sendDocs') {
      window.location.href = '/register-data/docs';
    }
  }

  const activeClass = (item) => {
    return current === item ? classes.menuItemActive : null;
  }

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem className={activeClass(null)} onClick={() => handleClick("companyData")}>
          <Typography variant="inherit">Dados da empresa</Typography>
        </MenuItem>
        <MenuItem className={activeClass("bank-data")} onClick={() => handleClick("bankData")}>
          <Typography variant="inherit">Dados bancários</Typography>
        </MenuItem>
        <MenuItem className={activeClass("docs")} onClick={() => handleClick("sendDocs")}>
          <Typography variant="inherit" noWrap>
            Envio de documentos
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default Menu;
