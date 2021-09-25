import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decoded from "jwt-decode";

//Material ui components
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

//Components
import ContainerWrapper from "../components/Container";
import Title from "../components/Title";
import SaveButton from "../components/SaveButton";

import { api } from "../../services/api";

//Requests
import { changeEnvironment } from "../../store/modules/accountSettings/actions";

//Styles
import { useStyles } from "./styles";

const environmentOptions = [
  { label: "Ambiente de Sandbox", value: "sandbox" },
  { label: "Ambiente de Produção", value: "production" },
];

const Integration = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { environment } = useSelector((state) => state.accountSettings);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecretHml, setApiSecretHml] = useState("");
  const [apiSecretPrd, setApiSecretPrd] = useState("");
  const [documentsValidated, setDocumentsValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(true);
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;

  useEffect(() => {
    api
      .get(`/merchants/${id}`)
      .then((response) => {
        setPending(false);
        setCallbackUrl(response.data.callback_url);
        setApiKey(response.data.api_key);
        setApiSecretHml(response.data.api_secret_hml);
        setApiSecretPrd(response.data.api_secret_prd);
        setDocumentsValidated(
          response.data.status_user_document === "VALIDATED" &&
            response.data.status_company_document === "VALIDATED" &&
            response.data.status_address_document === "VALIDATED"
        );
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    api
      .patch(`/merchants/${id}`, {
        callback_url: callbackUrl,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleChangeEnvironment = (environment) => {
    dispatch(changeEnvironment(environment));
  };

  return (
    <ContainerWrapper title={"Integração"}>
      <Container>
        <Paper className={classes.paper}>
          {!pending && (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Title>Integração</Title>

              <div className={classes.documentationLink}>
                <p>
                  Documentação do fluxo de pagamento:{" "}
                  <a
                    href="https://github.com/bitfyapp/bitfy-checkout"
                    className={classes.link}
                    target="_blank"
                  >
                    Github
                  </a>
                </p>
                <p>
                  Documentação da api:{" "}
                  <a
                    href="https://app.swaggerhub.com/apis-docs/bitfy/bitfy-checkout/1.0.0"
                    className={classes.link}
                    target="_blank"
                  >
                    Swagger
                  </a>
                </p>
              </div>

              <p>
                <strong>Endereço API de sandbox:</strong>{" "}
                <a
                  href="https://api-sandbox.bitfyapp.com/checkout"
                  className={classes.link}
                  target="_blank"
                >
                  https://api-sandbox.bitfyapp.com/checkout
                </a>
              </p>
              {apiSecretPrd && (
                <p>
                  <strong>Endereço API de produção:</strong>{" "}
                  <a
                    href="https://api.bitfyapp.com/checkout"
                    className={classes.link}
                  >
                    https://api.bitfyapp.com/checkout
                  </a>
                </p>
              )}

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {apiKey && (
                    <TextField
                      value={apiKey}
                      className={classes.textField}
                      type="text"
                      label="API KEY"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  )}
                </Grid>
                <Grid item xs={4}>
                  {apiSecretHml && (
                    <TextField
                      value={apiSecretHml}
                      className={classes.textField}
                      type="text"
                      label="API SECRET (Sandbox)"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  )}
                </Grid>
                <Grid item xs={4}>
                  {apiSecretPrd && (
                    <TextField
                      value={apiSecretPrd}
                      className={classes.textField}
                      type="text"
                      label="API SECRET (Produção)"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  )}
                </Grid>
              </Grid>

              <div>
                <TextField
                  value={callbackUrl}
                  onChange={(e) => setCallbackUrl(e.target.value)}
                  className={classes.textField}
                  type="url"
                  label="URL de callback"
                  helperText="URL que será chamada sempre que uma compra for efetivada"
                  variant="outlined"
                  fullWidth
                  required
                />
                {apiSecretPrd && (
                  <TextField
                    value={environment}
                    onChange={(e) => handleChangeEnvironment(e.target.value)}
                    className={classes.textField}
                    variant="outlined"
                    label="Modo"
                    select
                  >
                    {environmentOptions.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </div>
              <>
                {!documentsValidated && (
                  <Alert className={classes.alert} severity="warning">
                    Para ter acesso às chaves de API, envie os documentos da sua
                    empresa pra análise.
                  </Alert>
                )}
                <SaveButton className={classes.button} type="submit">
                  {loading ? "Salvando..." : "Salvar"}
                </SaveButton>
              </>
            </form>
          )}
        </Paper>
      </Container>
    </ContainerWrapper>
  );
};

export default Integration;
