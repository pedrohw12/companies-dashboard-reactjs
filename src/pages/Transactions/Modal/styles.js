import styled from "styled-components";
import { shade } from "polished";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(1),
  },
}));

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 600px;
  height: 360px;
  border-radius: 10px;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;

  button.closebtn {
    position: absolute;
    right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: #fff;
  }
`;

export const CreateTicketContent = styled.div`
  width: 100%;
  max-width: 515px;
  margin-top: 50px;

  form {
    display: flex;
    flex-direction: column;
    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button.addticket {
      margin: 20px 0 0 0;
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
    a {
      color: #000;
      margin-top: 15px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const DetailModalContent = styled.div`
  max-width: 515px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 50px;
  }
`;
