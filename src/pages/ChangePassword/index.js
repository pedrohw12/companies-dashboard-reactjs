import React, { useState } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";
import * as Yup from "yup";

//Material Ui Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

//Erros
import getValidationErrors from "../../utils/getValidationErrors";

//Components
import ContainerWrapper from "../components/Container";
import SaveButton from "../components/SaveButton";
import Title from "../components/Title";

import { api } from "../../services/api";

//Styles
import { useStyles } from "./styles";

const schema = Yup.object().shape({
  oldPassword: Yup.string().required("Senha obrigatória"),
  newPassword: Yup.string().required("Senha obrigatória"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "As senhas não são iguais"
  ),
});

const ChangePassword = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setAlertSuccess(false);

    schema
      .validate(
        { oldPassword, newPassword, confirmPassword },
        { abortEarly: false }
      )
      .then(() => {
        setLoading(true);
        api
          .patch(`/merchants/${id}`, {
            old_password: oldPassword,
            new_password: newPassword,
          })
          .then((response) => {
            setLoading(false);
            setErrors({});
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setAlertSuccess(true);
            console.log(response);
          })
          .catch((err) => {
            setLoading(false);
            setErrors({ oldPassword: "A senha informada é inválida" });
            console.log(err);
          });
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
        console.log(err);
      });
  }

  return (
    <ContainerWrapper title="Alteração de senha">
      <Container>
        <Grid container className={classes.formContainer}>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <form
                onSubmit={handleSubmit}
                className={classes.root}
                noValidate
                autoComplete="off"
              >
                {alertSuccess && (
                  <Alert className={classes.alert} severity="success">
                    Senha alterada com sucesso.
                  </Alert>
                )}
                <Title>Alteração de senha</Title>
                <div>
                  <TextField
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    error={!!errors.oldPassword}
                    className={classes.textField}
                    fullWidth
                    required
                    name="oldPassword"
                    id="standard-required"
                    label="Senha atual"
                    defaultValue=""
                    type="password"
                  />
                  <span className={classes.span}>{errors.oldPassword}</span>
                  <TextField
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!!errors.newPassword}
                    className={classes.textField}
                    fullWidth
                    required
                    id="standard-required"
                    label="Nova senha"
                    defaultValue=""
                    type="password"
                  />
                  <span className={classes.span}>{errors.newPassword}</span>
                  <TextField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    className={classes.textField}
                    fullWidth
                    required
                    id="standard-required"
                    label="Confirmar nova senha"
                    defaultValue=""
                    type="password"
                  />
                  <span className={classes.span}>{errors.confirmPassword}</span>
                </div>
                <SaveButton type="submit" fullWidth>
                  {loading ? "Salvando..." : "Salvar"}
                </SaveButton>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ContainerWrapper>
  );
};

export default ChangePassword;
