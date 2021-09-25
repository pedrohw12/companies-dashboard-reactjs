import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pagination: {
    marginTop: 15,
    display: "flex",
    justifyContent: "flex-end",
  },
  chargebacksArea: {
    padding: theme.spacing(0),
  },
  chargebacks: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    backgroundColor: "#f5f5f5",
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 22,
    marginLeft: theme.spacing(3),
    marginTop: '16.5px',
  },
  PENDING: {
    color: '#ff9800'
  },
  PAID: {
    color: '#4caf50'
  },
  dangerButton: {
    backgroundColor: '#f44336',
    color: '#FFF'
  }
}));
