import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

//Material ui components
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

//Images
import Logo from "../../assets/images/logotransp.png";

//Erros
import getValidationErrors from "../../utils/getValidationErrors";

import { api } from "../../services/api";

//Styles
import { Container, Content, PageContainer, useStyles } from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("E-mail obrigatório"),
  password: Yup.string().required("Senha obrigatória"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "As senhas não são iguais"
  ),
  passwordResetCode: Yup.string().required("Campo obrigatório"),
});

const schemaEmail = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("E-mail obrigatório"),
});

const ForgotPassword = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("1");
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  function handleSendEmail(e) {
    e.preventDefault();

    schemaEmail
      .validate({ email }, { abortEarly: false })
      .then(() => {
        setLoading(true);
        setErrors({});
        api
          .post("/auth/forgot-password", {
            email,
          })
          .then((response) => {
            setLoading(false);
            setStep("2");
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
      });
  }

  function handleRedefinePassword(e) {
    e.preventDefault();
    setAlertSuccess(false);

    schema
      .validate(
        { email, password, confirmPassword, passwordResetCode },
        { abortEarly: false }
      )
      .then(() => {
        setErrors({});
        setLoading(true);
        api
          .put("/auth/redefine-password", {
            email,
            password,
            confirmPassword,
            passwordResetCode,
          })
          .then((response) => {
            setLoading(false);
            setPassword("");
            setConfirmPassword("");
            setPasswordResetCode("");
            setAlertSuccess(true);
          })
          .catch((err) => {
            setLoading(false);
            setErrors({ passwordResetCode: "Código inválido" });
          });
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
          {step === "1" && (
            <form action="POST" onSubmit={handleSendEmail}>
              <p className={classes.formTitle}>Esqueci minha senha</p>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.textField}
                error={!!errors.email}
                name="email"
                type="email"
                label="Informe seu e-mail"
                variant="outlined"
              />
              <span>{errors.email}</span>

              <button type="submit">
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}
          {step === "2" && (
            <form method="POST" onSubmit={handleRedefinePassword}>
              <p className={classes.formTitle}>Alterar senha</p>
              {alertSuccess ? (
                <>
                  <Alert className={classes.alert} severity="success">
                    Senha alterada com sucesso. Faça o login utilizando sua nova senha.
                  </Alert>
                  <br/>
                </>
              ) : (
                <>
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.textField}
                    error={!!errors.password}
                    name="password"
                    type="password"
                    label="Nova senha"
                    variant="outlined"
                  />
                  <span>{errors.password}</span>
                  <TextField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={classes.textField}
                    error={!!errors.confirmPassword}
                    name="confirmPassword"
                    type="password"
                    label="Confirmar nova senha"
                    variant="outlined"
                  />
                  <span>{errors.confirmPassword}</span>
                  <TextField
                    value={passwordResetCode}
                    onChange={(e) => setPasswordResetCode(e.target.value)}
                    className={classes.textField}
                    error={!!errors.passwordResetCode}
                    name="passwordResetCode"
                    type="text"
                    label="Código de redefinição"
                    variant="outlined"
                  />
                  <span>{errors.passwordResetCode}</span>
                  <button type="submit">
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                </>
              )}
            </form>
          )}
          <Link id="registerbutton" to="/login">
            Voltar
          </Link>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default ForgotPassword;
