import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  textField: {
    marginTop: 30,
  },
  documentationLink: {
    marginTop: 20,
    marginBottom: 20,
  },
  link: {
    color: theme.palette.primary.main,
  },
  button: {
    marginTop: 15,
  },
  alert: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));
