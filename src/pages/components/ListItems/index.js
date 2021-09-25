import React from "react";
import { useLocation } from "react-router-dom";

//Material ui components
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//Material ui icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import HistoryIcon from "@material-ui/icons/History";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DescriptionIcon from "@material-ui/icons/Description";

//Styles
import { LinkButton } from "./styles";

const MainListItems = () => {
  const location = useLocation();

  function isCurrent(path) {
    return location.pathname === path ? "true" : undefined;
  }

  return (
    <div>
      <LinkButton current={isCurrent("/")} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </LinkButton>
      <LinkButton current={isCurrent("/transactions")} to="/transactions">
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Transações" />
      </LinkButton>
      <LinkButton current={isCurrent("/payments")} to="/payments">
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Pagamentos" />
      </LinkButton>
      <LinkButton current={isCurrent("/support")} to="/support">
        <ListItemIcon>
          <HelpOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Suporte" />
      </LinkButton>
      <LinkButton
        current={
          isCurrent("/register-data") ||
          isCurrent("/register-data/bank-data") ||
          isCurrent("/register-data/docs")
        }
        to="/register-data"
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Dados cadastrais" />
      </LinkButton>
      <LinkButton current={isCurrent("/integration")} to="/integration">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Integração" />
      </LinkButton>
    </div>
  );
};

export default MainListItems;
