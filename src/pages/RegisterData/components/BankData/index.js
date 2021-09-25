import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import jwt_decoded from "jwt-decode";
import * as Yup from "yup";

//Erros
import getValidationErrors from "../../../../utils/getValidationErrors";

//Material ui components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

//Components
import Title from "../../../components/Title";

// Utils
import { api } from "../../../../services/api";
import banks from "../../../../assets/data/banks.json";

//Styles
import { useStyles } from "../../styles";

const schema = Yup.object().shape({
  bankNumber: Yup.string().required("Campo obrigatório"),
  bankAccount: Yup.string().required("Campo obrigatório"),
  bankAgency: Yup.string().required("Campo obrigatório"),
});

const BankData = ({ data }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankAgency, setBankAgency] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setCNPJ(data.cnpj || "");
      setBankNumber(data.bank_number || "");
      setBankAccount(data.bank_account || "");
      setBankAgency(data.bank_agency || "");

      if (data.bank_number && data.bank_account && data.bank_agency) {
        setDisabledButton(true);
      }
    }
  }, [data]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    schema
      .validate(
        {
          bankNumber,
          bankAgency,
          bankAccount,
        },
        { abortEarly: false }
      )
      .then(() => {
        api
          .put(`/merchants/${id}`, {
            bank_number: bankNumber,
            bank_agency: bankAgency,
            bank_account: bankAccount,
          })
          .then((response) => {
            setLoading(false);
            toast.success("Dados alterados com sucesso!");

            if (response.data.bank_number && response.data.bank_account && response.data.bank_agency) {
              setDisabledButton(true);
            }
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

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Title>Dados bancários</Title>
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
          onChange={(e) => setBankNumber(e.target.value)}
          value={bankNumber}
          className={classes.textField}
          label="Selecione o Banco"
          variant="outlined"
          disabled={disabledButton}
          select
          fullWidth
        >
          {banks.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <span>{errors.bankNumber}</span>
        <TextField
          onChange={(e) => setBankAgency(e.target.value)}
          value={bankAgency}
          error={!!errors.bankAgency}
          className={classes.textField}
          id="standard-disabled"
          label="Agência"
          variant="outlined"
          disabled={disabledButton}
          fullWidth
          required
        />
        <span>{errors.bankAgency}</span>
        <TextField
          onChange={(e) => setBankAccount(e.target.value)}
          value={bankAccount}
          error={!!errors.bankAccount}
          className={classes.textField}
          id="standard-disabled"
          label="Conta"
          variant="outlined"
          disabled={disabledButton}
          fullWidth
          required
        />
        <span>{errors.bankAccount}</span>
      </div>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        disabled={disabledButton}
      >
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
};

export default BankData;
