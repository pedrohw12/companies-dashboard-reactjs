import styled from "styled-components";
import { shade } from "polished";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(0.5),
  },
  formTitle: {
    marginTop: 0,
    marginBottom: theme.spacing(5),
    fontSize: 28,
    color: theme.palette.primary.main,
  },
}));

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    width: 180px;
    margin-left: 25px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    span {
      color: #f22;
      align-self: flex-start;
      margin: 0 0 25px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 15px;
      height: 44px;
      background: #3b9eff;
      color: #fff;
      border: none;
      border-radius: 4px;
      transition: background-color 0.2s;
      &:hover {
        background-color: ${shade(0.02, "#3b9eff")};
      }
    }
  }
  a#registerbutton {
    color: #000;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;

export const PageContainer = styled.div`
  background-position: 650px 250px;
  width: 100%;
  height: 100%;
`;
