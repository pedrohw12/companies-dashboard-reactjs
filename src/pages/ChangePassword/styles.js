import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  textField: {
    marginBottom: "15px",
  },
  formContainer: {
    justifyContent: "center",
  },
  span: {
    color: "#f33",
  },
  alert: {
    marginBottom: 10,
  },
}));
