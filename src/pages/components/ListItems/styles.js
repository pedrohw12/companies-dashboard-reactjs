import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkButton = styled(Link)`
  display: flex;
  flex-direction: row;
  padding: 10px 15px 10px 15px;
  transition: background-color 0.2s;
  color: ${(props) => (props.current ? "#1b88ff" : "#777")};
  margin-left: ${(props) => (props.subItem ? "15px" : "0")};

  &:hover {
    background-color: #f4f4f4;
  }
`;

export const Logo = styled.img`
  position: absolute;
  top: -63px;
  left: 70px;
  width: 90px;
  height: 60px;
  background: #3b9eff;
`;
