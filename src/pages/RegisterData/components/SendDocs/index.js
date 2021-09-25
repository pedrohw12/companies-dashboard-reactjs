import React, { useState } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

//Material ui components
import Alert from "@material-ui/lab/Alert";

//Components
import SaveButton from "../../../components/SaveButton";
import UploadButton from "./UploadButton";
import Title from "../../../components/Title";

import { api } from "../../../../services/api";

//Styles
import { InputTitle, useStyles } from "./styles";

const SendDocs = ({ data }) => {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [contract, setContract] = useState("");
  const [residency, setResidency] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    status_address_document,
    status_company_document,
    status_user_document,
  } = data || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .patch(`merchants/${id}`, {
        contract,
        residency,
        document,
      })
      .then((response) => {
        setLoading(false);
        window.location.href = '/register-data/docs'
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 413) {
          alert('Os arquivos enviados são muito pesados. O arquivo somados devem ter no máximo 10mb.');
        }
      });
  };

  const renderAlert = (documentStatus) => {
    let severity = null;
    let message = null;

    if (documentStatus === "PENDING") {
      severity = "info";
      message = "Aguardando validação.";
    } else if (documentStatus === "REJECTED") {
      severity = "error";
      message = "Documento rejeitado. Por favor, envie novamente.";
    } else if (documentStatus === "VALIDATED") {
      severity = "success";
      message = "Documento validado com sucesso.";
    } else {
      return null;
    }

    return (
      <Alert className={classes.alert} severity={severity}>
        {message}
      </Alert>
    );
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Title>Enviar documentos</Title>
      <div>
        <div className={classes.buttonContainer}>
          <InputTitle>Contrato social</InputTitle>
          {(status_company_document === "REJECTED" ||
            status_company_document === "DOCUMENT_PENDING") && (
            <UploadButton
              id="contract"
              onChange={(base64) => setContract(base64)}
            />
          )}
          {renderAlert(status_company_document)}
        </div>
        <div className={classes.buttonContainer}>
          <InputTitle>Comprovante de endereço</InputTitle>
          {(status_address_document === "REJECTED" ||
            status_address_document === "DOCUMENT_PENDING") && (
            <UploadButton
              id="residency"
              onChange={(base64) => setResidency(base64)}
            />
          )}
          {renderAlert(status_address_document)}
        </div>
        <div className={classes.buttonContainer}>
          <InputTitle>Documento do responsável legal (com CPF)</InputTitle>
          {(status_user_document === "REJECTED" ||
            status_user_document === "DOCUMENT_PENDING") && (
            <UploadButton
              id="document"
              onChange={(base64) => setDocument(base64)}
            />
          )}
          {renderAlert(status_user_document)}
        </div>
      </div>
      <SaveButton disabled={!contract && !residency && !document} type="submit">
        {loading ? "Salvando..." : "Salvar"}
      </SaveButton>
    </form>
  );
};

export default SendDocs;
