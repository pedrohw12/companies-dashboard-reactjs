import styled from "styled-components";
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
  background-color: #fff;
  width: 700px;
  margin: 0 auto;

  img {
    width: 180px;
    margin-left: 25px;
  }
`;

export const Content = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 5% 50px 5%;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    p {
      font-size: 28px;
      color: #0062ff;
      margin-bottom: 30px;
    }

    span.error {
      color: #f22;
      align-self: flex-start;
      margin: 0 0 25px;
      font-weight: bold;
    }

    button {
      margin-bottom: 20px;
    }

    .MuiGrid-item {
      margin-bottom: 10px;
    }
  }
  a#backbutton {
    color: #000;
    opacity: 0.8;
    display: block;

    &:hover {
      opacity: 1;
    }
  }
`;

export const PageContainer = styled.div`
  background-position: 650px 250px;
  background-color: #0062ff;
  width: 100%;
`;
