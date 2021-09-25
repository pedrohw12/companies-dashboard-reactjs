import styled from "styled-components";
import { shade } from "polished";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  textField: {
    marginBottom: '15px',
  }
}));

export const Container = styled.div`
  display: flex;
  flex: 1;
`;

export const Menu = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const OptionButton = styled.button`
  margin: 5px 0 0;
  height: 44px;
  width: 200px;
  background: #3b9eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${shade(0.02, "#3b9eff")};
  }
`;
