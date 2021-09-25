import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    margin: 5,
    width: "24%",
    height: 200,
    cursor: 'pointer',
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  answered: {
    color: "#44bd32",
    marginBottom: 10,
  },
  waitingAnswer: {
    color: "#000",
    marginBottom: 10,
  },
  cardsContainer: {
    marginTop: 20
  }
});

export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
  justify-content: center;

  span {
    color: #000;
  }
`;

export const Box = styled.button`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: none;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px 0px;
  background-color: #fff;
  color: rgb(112, 112, 112);
  padding: 20px 20px 20px 20px;
  height: 250px;
  transition: box-shadow 0.25s;
  overflow: hidden;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 25px 0px;
  }

  h6 {
    color: #61ce70;
    font-weight: bold;
    margin: 20px 0px 20px 0px;
  }

  div.title {
    display: flex;
    flex: 1;

    h3 {
      color: #777;
      height: 20%;
    }
  }

  div.content {
    display: flex;
    flex: 1;
  }

  div.vermais {
    display: flex;
    flex: 1;
    align-items: flex-end;
  }

  p {
    color: #777;
    font-size: 14px;
    line-height: 1.5em;
    margin-top: 5px;
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 30px;
  padding: 20px;
`;
