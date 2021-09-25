import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pagination: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end'
  },
}));

export const TextFieldContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
`;
