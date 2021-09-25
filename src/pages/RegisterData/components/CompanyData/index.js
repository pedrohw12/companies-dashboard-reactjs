import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import jwt_decoded from "jwt-decode";
import axios from "axios";
import * as Yup from "yup";

//Erros
import getValidationErrors from "../../../../utils/getValidationErrors";

//Material ui components
import TextField from "@material-ui/core/TextField";

//Components
import SaveButton from "../../../components/SaveButton";
import Title from "../../../components/Title";

import { api } from "../../../../services/api";

//Styles
import { useStyles } from "../../styles";

const schema = Yup.object().shape({
  phone: Yup.string().required("Campo obrigatório"),
  address: Yup.string().required("Campo obrigatório"),
  legalResponsible: Yup.string().required("Campo obrigatório"),
  addressPostalCode: Yup.string().required("Campo obrigatório"),
  addressNeighborhood: Yup.string().required("Campo obrigatório"),
  addressCity: Yup.string().required("Campo obrigatório"),
  addressState: Yup.string().required("Campo obrigatório"),
  addressNumber: Yup.string().required("Campo obrigatório"),
  country: Yup.string().required("Campo obrigatório"),
});

const CompanyData = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [legalResponsible, setLegalResponsible] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressPostalCode, setAddressPostalCode] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [addressNeighborhood, setAddressNeighborhood] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [country, setCountry] = useState("");

  const getMerchantdata = () => {
    api
      .get(`/merchants/${id}`)
      .then((response) => {
        setName(response.data.name);
        setCnpj(response.data.cnpj);
        setLegalResponsible(response.data.legal_responsible);
        setPhone(response.data.phone);
        setAddressPostalCode(response.data.address_postal_code);
        setAddressComplement(response.data.address_complement);
        setAddressNeighborhood(response.data.address_neighborhood);
        setAddressCity(response.data.address_city);
        setAddressState(response.data.address_state);
        setAddressNumber(response.data.address_number);
        setAddress(response.data.address);
        setCountry(response.data.country);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMerchantdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    schema
      .validate(
        {
          address,
          addressNumber,
          addressPostalCode,
          addressNeighborhood,
          legalResponsible,
          addressState,
          addressCity,
          country,
          phone,
        },
        { abortEarly: false }
      )
      .then(() => {
        setLoading(true);
        api
          .put(`/merchants/${id}`, {
            legal_responsible: legalResponsible,
            address_postal_code: addressPostalCode,
            address_complement: addressComplement,
            address_number: addressNumber,
            address_neighborhood: addressNeighborhood,
            address_state: addressState,
            address_city: addressCity,
            address,
            country,
            phone,
          })
          .then((response) => {
            toast.success("Dados alterados com sucesso!");
            setLoading(false);
            setErrors({});
            getMerchantdata();
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
      });
  };

  const handleCEP = (CEP) => {
    setAddressPostalCode(CEP);

    if (CEP.length === 8) {
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
    setAddressState(uf);

    setAddressCity(localidade || "");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Title>Dados da empresa</Title>
      <div>
        <TextField
          value={name}
          className={classes.textField}
          label="Nome da Empresa"
          variant="outlined"
          disabled={true}
          fullWidth
          required
        />
        <TextField
          value={cnpj}
          className={classes.textField}
          label="Cnpj"
          variant="outlined"
          disabled={true}
          fullWidth
          required
        />
        <TextField
          value={legalResponsible}
          className={classes.textField}
          label="Responsável legal"
          variant="outlined"
          disabled={true}
          fullWidth
          required
        />
        <span>{errors.legalResponsible}</span>
        <TextField
          value={phone}
          className={classes.textField}
          label="Telefone"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          onChange={(e) => handleCEP(e.target.value)}
          value={addressPostalCode}
          error={!!errors.addressPostalCode}
          className={classes.textField}
          label="CEP"
          variant="outlined"
          fullWidth
          required
        />
        <span>{errors.addressPostalCode}</span>
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          error={!!errors.address}
          className={classes.textField}
          label="Rua"
          variant="outlined"
          fullWidth
          required
        />
        <span>{errors.address}</span>
        <TextField
          onChange={(e) => setAddressNumber(e.target.value)}
          value={addressNumber}
          error={!!errors.addressNumber}
          className={classes.textField}
          label="Número"
          variant="outlined"
          fullWidth
          required
        />
        <span>{errors.addressNumber}</span>
        <TextField
          onChange={(e) => setAddressComplement(e.target.value)}
          value={addressComplement}
          className={classes.textField}
          label="Complemento"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          onChange={(e) => setAddressNeighborhood(e.target.value)}
          value={addressNeighborhood}
          error={!!errors.addressNeighborhood}
          className={classes.textField}
          label="Bairro"
          variant="outlined"
          fullWidth
          required
        />
        <span>{errors.addressNeighborhood}</span>
        <TextField
          onChange={(e) => setAddressCity(e.target.value)}
          value={addressCity}
          error={!!errors.addressCity}
          className={classes.textField}
          label="Cidade"
          variant="outlined"
          fullWidth
          required
        />
        <span>{errors.addressCity}</span>
        <TextField
          onChange={(e) => handleUf(e.target.value)}
          value={addressState}
          error={!!errors.addressState}
          className={classes.textField}
          label="Estado"
          variant="outlined"
          fullWidth
          required
        />
        <span>{errors.addressState}</span>
        <TextField
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          error={!!errors.country}
          className={classes.textField}
          label="País"
          variant="outlined"
          fullWidth
          required
        />
        <span>{errors.country}</span>
      </div>
      <SaveButton type="submit">
        {loading ? "Salvando..." : "Salvar"}
      </SaveButton>
    </form>
  );
};

export default CompanyData;
