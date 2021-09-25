import React, { useState } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";
import * as Yup from "yup";

//Material ui components
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";

//Material ui icons
import CloseIcon from "@material-ui/icons/Close";

import { api } from "../../../../services/api";

//Erros
import getValidationErrors from "../../../../utils/getValidationErrors";

//Styles
import {
  Container,
  ModalHeader,
  CreateTicketContent,
  useStyles,
} from "./styles";

const schema = Yup.object().shape({
  title: Yup.string().required("Campo obrigatório"),
  description: Yup.string().required("Campo obrigatório"),
});

const CreateTicket = ({ visible, onClose }) => {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    schema
      .validate({ title, description }, { abortEarly: false })
      .then(() => {
        setLoading(true);
        api
          .post(`/merchants/${id}/tickets`, {
            title,
            description,
          })
          .then((response) => {
            setLoading(false);
            onClose(true);
            console.log(response);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
        console.log(err);
      });
  }

  return (
    <Modal open={visible}>
      <Container>
        <ModalHeader>
          <h3>Criar novo ticket</h3>
          <button
            className="closebtn"
            type="button"
            onClick={() => onClose(false)}
          >
            <CloseIcon />
          </button>
        </ModalHeader>
        <CreateTicketContent>
          <form action="POST" onSubmit={handleSubmit}>
            <p>Está tendo algum problema, ou está com alguma dúvida? Entre em contato conosco através do formulário abaixo.</p>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={classes.textField}
              error={errors.title}
              name="title"
              type="text"
              label="Título"
              variant="outlined"
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Descrição"
              placeholder="Descreva em detalhes sobre o problema ou dúvida"
              error={errors.description}
              name="description"
              multiline
              rows={4}
              variant="outlined"
            />

            <button className="addticket" type="submit">
              {loading ? "Enviando..." : "Criar ticket"}
            </button>
          </form>
        </CreateTicketContent>
      </Container>
    </Modal>
  );
};

export default CreateTicket;
