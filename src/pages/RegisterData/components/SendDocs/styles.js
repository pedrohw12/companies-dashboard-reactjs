import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  buttonContainer: {
    marginBottom: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderBottom: '1px solid #999',
  },
}));

export const InputTitle = styled.p`
  margin-top: 20px;
  margin-bottom: 5px;
`;
