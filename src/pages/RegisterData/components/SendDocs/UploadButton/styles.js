import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  input: {
    display: "none",
  },
  fileName: {
    marginTop: 10,
  },
}));
