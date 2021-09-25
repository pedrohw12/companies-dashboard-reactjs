import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";

//Erros
import getValidationErrors from "../../utils/getValidationErrors";

//Requests
import { signInRequest } from "../../store/modules/sign/actions";

//Material ui components
import TextField from "@material-ui/core/TextField";

//Images
import Logo from "../../assets/images/logotransp.png";

//Styles
import { Container, Content, PageContainer, useStyles } from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("E-mail obrigatório"),
  password: Yup.string().required("Senha obrigatória"),
});

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.sign);

  function handleSubmit(e) {
    e.preventDefault();
    schema
      .validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      )
      .then(() => {
        dispatch(signInRequest(email, password));
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
      });
  }

  return (
    <PageContainer>
      <Container>
        <img src={Logo} alt="bitfy-logo" />
        <Content>
          <p>
            Bem-Vindo à <strong>Bitfy Empresas</strong>
          </p>
          <form method="POST" onSubmit={handleSubmit}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              className={classes.textField}
              label="E-mail"
              variant="outlined"
              type="email"
            />
            <span>{errors.email}</span>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              className={classes.textField}
              label="Senha"
              variant="outlined"
              type="password"
            />
            <span>{errors.password}</span>

            <button type="submit">{loading ? "Carregando..." : "Login"}</button>
          </form>
          <div className="bottom-buttons">
            <div className="register-container">
              <p>Ainda não tem cadastro? </p>
              <Link id="registerbutton" to="/register">
                Cadastre-se aqui
              </Link>
            </div>
            <Link id="forgot-password" to="/forgot-password">
              Esqueci minha senha
            </Link>
          </div>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default SignIn;
