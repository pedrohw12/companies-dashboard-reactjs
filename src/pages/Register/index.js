import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

//Erros
import getValidationErrors from "../../utils/getValidationErrors";

//Requests
import { signUpRequest } from "../../store/modules/sign/actions";

//Material ui components
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//Data
import countries from "../../assets/data/countries.json";
import states from "../../assets/data/br-states.json";

//Images
import Logo from "../../assets/images/logotransp.png";

//Utils
import { cnpjMask, phoneMask, cepMask, validarCNPJ } from "../../utils/helpers";

//Styles
import { Container, Content, PageContainer, useStyles } from "./styles";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Campo obrigatório")
    .max(125, "Máximo de 125 caracteres"),
  password: Yup.string()
    .required("Senha obrigatória")
    .min(6, "Digite uma senha de no mínimo 6 caracteres"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "As senhas não são iguais"
  ),
  phone: Yup.string().required("Número de telefone inválido"),
  document: Yup.string().required("Campo obrigatório"),
  legalResponsible: Yup.string()
    .required("Campo obrigatório")
    .max(250, "Máximo de 250 caracteres"),
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("E-mail obrigatório")
    .max(250, "Máximo de 250 caracteres"),
  addressPostalCode: Yup.string()
    .required("Campo obrigatório")
    .min(9, "CEP inválido"),
  address: Yup.string()
    .required("Campo obrigatório")
    .max(125, "Máximo de 125 caracteres"),
  addressNumber: Yup.string()
    .required("Campo obrigatório")
    .max(20, "Máximo de 20 caracteres"),
  addressNeighborhood: Yup.string()
    .required("Campo obrigatório")
    .max(40, "Máximo de 40 caracteres"),
  address_state: Yup.string().required("Campo obrigatório"),
  address_city: Yup.string().required("Campo obrigatório"),
  country: Yup.string().required("Campo obrigatório"),
});

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [legalResponsible, setLegalResponsible] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addressPostalCode, setAddressPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [addressNeighborhood, setAddressNeighborhood] = useState("");
  const [uf, setUf] = useState("");
  const [address_city, setAddress_city] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [ip, setIp] = useState("");
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [documentAlreadyInUse, setDocumentAlreadyInUse] = useState(false);

  const { loading, error } = useSelector((state) => state.sign);

  useEffect(() => {
    if (error.message === "CNPJ_IS_ALREADY_IN_USE") {
      setDocumentAlreadyInUse(true);
    } else if (error.message === "EMAIL_IS_ALREADY_IN_USE") {
      setEmailAlreadyInUse(true);
    } else {
      setDocumentAlreadyInUse(false);
      setEmailAlreadyInUse(false);
    }
  }, [error]);

  useEffect(() => {
    axios
      .get("https://api.ipify.org/?format=json")
      .then((response) => {
        setIp(response.data.ip);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    schema
      .validate(
        {
          name,
          phone,
          document,
          legalResponsible,
          email,
          password,
          confirmPassword,
          addressPostalCode,
          address,
          addressNumber,
          addressNeighborhood,
          address_state: uf,
          address_city,
          country,
        },
        { abortEarly: false }
      )
      .then(() => {
        if (validarCNPJ(document)) {
          dispatch(
            signUpRequest(
              name,
              phone,
              document,
              legalResponsible,
              email,
              password,
              addressPostalCode,
              address,
              addressNumber,
              addressComplement,
              addressNeighborhood,
              uf,
              address_city,
              country,
              ip
            )
          );
          setErrors({});
        } else {
          setErrors({ document: "Digite um CNPJ válido" });
        }
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
        console.log(err);
      });
  }

  const handleCEP = (CEP) => {
    setAddressPostalCode(CEP);

    if (CEP.length === 9) {
      axios.get(`https://viacep.com.br/ws/${CEP}/json/`).then((response) => {
        const { bairro, localidade, logradouro, uf: st, erro } = response.data;

        if (!erro) {
          setCountry("BRA");
          setAddressNeighborhood(bairro);
          setAddress(logradouro);
          handleUf(st, localidade);
        }
      });
    }
  };

  const handleUf = (uf, localidade) => {
    const findState = states.find((state) => state.initials === uf);

    setUf(uf);
    setCities(findState.cities);

    setAddress_city(localidade || "");
  };

  return (
    <PageContainer>
      <Container>
        <img src={Logo} alt="bitfy-logo" />
        <Content>
          <form method="POST" onSubmit={handleSubmit}>
            <p>Cadastro</p>

            <Grid container>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={classes.textField}
                  error={!!errors.name}
                  name="name"
                  type="text"
                  label="Nome da empresa"
                  variant="outlined"
                />
                <span className="error">{errors.name}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={document}
                  onChange={(e) => setDocument(cnpjMask(e, e.target.value))}
                  className={classes.textField}
                  error={!!errors.document}
                  name="document"
                  type="text"
                  label="CNPJ"
                  variant="outlined"
                  fullWidth
                />
                <span className="error">{errors.document}</span>
                <span className="error">
                  {documentAlreadyInUse
                    ? "O CNPJ informado já está em uso"
                    : ""}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={legalResponsible}
                  onChange={(e) => setLegalResponsible(e.target.value)}
                  className={classes.textField}
                  error={!!errors.legalResponsible}
                  name="legalResponsible"
                  type="text"
                  label="Responsável legal"
                  variant="outlined"
                  fullWidth
                />
                <span className="error">{errors.legalResponsible}</span>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      value={phone}
                      onChange={(e) => setPhone(phoneMask(e, e.target.value))}
                      className={classes.textField}
                      error={!!errors.phone}
                      name="phone"
                      type="text"
                      label="Telefone"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.phone}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={classes.textField}
                      error={!!errors.email}
                      name="email"
                      type="email"
                      label="E-mail"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.email}</span>
                    <span className="error">
                      {emailAlreadyInUse
                        ? "O email informado já está em uso"
                        : ""}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={classes.textField}
                      error={!!errors.password}
                      name="password"
                      type="password"
                      label="Senha"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.password}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={classes.textField}
                      error={!!errors.confirmPassword}
                      name="confirmPassword"
                      type="password"
                      label="Confirme a senha"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.confirmPassword}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={addressPostalCode}
                  onChange={(e) => handleCEP(cepMask(e, e.target.value))}
                  className={classes.textField}
                  error={!!errors.addressPostalCode}
                  name="cep"
                  type="text"
                  label="CEP"
                  variant="outlined"
                  fullWidth
                />
                <span className="error">{errors.addressPostalCode}</span>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={classes.textField}
                      error={!!errors.address}
                      label="Logradouro"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.address}</span>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={addressNumber}
                      onChange={(e) => setAddressNumber(e.target.value)}
                      className={classes.textField}
                      error={!!errors.addressNumber}
                      name="addressNumber"
                      type="text"
                      label="Número"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.addressNumber}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      value={addressComplement}
                      onChange={(e) => setAddressComplement(e.target.value)}
                      className={classes.textField}
                      error={!!errors.addressComplement}
                      name="addressComplement"
                      type="text"
                      label="Complemento"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.addressComplement}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={addressNeighborhood}
                      onChange={(e) => setAddressNeighborhood(e.target.value)}
                      className={classes.textField}
                      error={!!errors.addressNeighborhood}
                      label="Bairro"
                      variant="outlined"
                      fullWidth
                    />
                    <span className="error">{errors.addressNeighborhood}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      value={uf}
                      onChange={(e) => handleUf(e.target.value)}
                      className={classes.textField}
                      error={!!errors.address_state}
                      select
                      label="Estado"
                      variant="outlined"
                      fullWidth
                    >
                      {states.map((option) => (
                        <MenuItem key={option.initials} value={option.initials}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <span className="error">{errors.address_state}</span>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={address_city}
                      onChange={(e) => setAddress_city(e.target.value)}
                      className={classes.textField}
                      error={!!errors.address_city}
                      select
                      label="Cidade"
                      variant="outlined"
                      fullWidth
                    >
                      {cities.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <span className="error">{errors.address_city}</span>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={classes.textField}
                      error={!!errors.country}
                      select
                      label="País"
                      variant="outlined"
                      fullWidth
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.iso3} value={option.iso3}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <span className="error">{errors.country}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                size="large"
                fullWidth
              >
                {loading ? "Carregando..." : "Cadastrar"}
              </Button>
            </Grid>
          </form>

          <Link id="backbutton" to="/login">
            Voltar
          </Link>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default Register;
