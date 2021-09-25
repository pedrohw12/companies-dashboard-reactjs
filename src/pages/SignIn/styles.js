import styled from "styled-components";
import { shade } from "polished";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(0.5),
  },
}));

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 700px;
  background-color: #fff;
  margin: 0 auto;

  img {
    width: 200px;
    height: 130px;
    margin-left: 25px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  div.bottom-buttons {
    display: flex;
    flex-direction: column;
  }

  p {
    margin-top: 10px;
    color: #4e4e4e;

    strong {
      color: #4e4e4e;
      font-weight: bold;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    span {
      color: #f22;
      align-self: flex-start;
      margin: 0 0 25px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 15px;
      height: 44px;
      background: #0062ff;
      color: #fff;
      border: none;
      border-radius: 8px;
      transition: background-color 0.2s;
      &:hover {
        background-color: ${shade(0.02, "#0062ff")};
      }
    }
  }

  div.register-container {
    margin-top: 10px;

    p {
      color: #4e4e4e;
      display: inline;
    }
  }

  a#registerbutton {
    color: #0062ff;
    font-weight: bold;
    opacity: 0.8;
    margin-bottom: 10px;
    &:hover {
      opacity: 1;
    }
  }

  a#forgot-password {
    color: #000;
    font-weight: bold;
    opacity: 0.8;
    margin-top: 20px;
    &:hover {
      opacity: 1;
    }
  }
`;

export const PageContainer = styled.div`
  background-position: 650px 250px;
  background-color: #0062ff;
  width: 100%;
  height: 100%;
`;
