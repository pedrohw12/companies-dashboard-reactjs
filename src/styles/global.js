import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}
body {
  background: #fff;
  -webkit-font-smoothing: antialiased;
}
html, body, #root {
  height: 100%;
  /* overflow-y: hidden; */
}
body, input, button {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: 500;
}
button {
  cursor: pointer;
}
a {
  text-decoration: none;
}
`;