import React, { useState } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";
import * as Yup from "yup";

//Material ui components
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";

//Material ui icons
import CloseIcon from "@material-ui/icons/Close";

import { api } from "../../../services/api";

//Erros
import getValidationErrors from "../../../utils/getValidationErrors";

//Utils
import { formatMoney } from "../../../utils/helpers";

//Styles
import {
  Container,
  ModalHeader,
  CreateTicketContent,
  useStyles,
} from "./styles";

const schema = Yup.object().shape({
  value: Yup.string().required("Campo obrigatório"),
  description: Yup.string().required("Campo obrigatório"),
});

const CreateChargeback = ({ data, onClose }) => {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    schema
      .validate({ value, description }, { abortEarly: false })
      .then(() => {
        setLoading(true);
        api
          .post(`/merchants/${id}/sales/${data.id}/chargebacks`, {
            merchant_sale_id: data.id,
            value: value.replace(/[^\d]+/g, ""),
            description,
          })
          .then((response) => {
            setLoading(false);
            onClose();
            setValue("");
            setDescription("");
            console.log(response);
          })
          .catch((err) => {
            setLoading(false);
            if (err.response.data.error === "INVALID_CHARGEBACK_VALUE") {
              alert("Valor acima do permitido");
            }
          });
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
        console.log(err);
      });
  }

  return (
    <Modal open={!!data}>
      <Container>
        <ModalHeader>
          <h3>Pedir estorno</h3>
          <button className="closebtn" type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </ModalHeader>
        <CreateTicketContent>
          <form action="POST" onSubmit={handleSubmit}>
            <TextField
              value={value}
              onChange={(e) =>
                setValue(formatMoney(e.target.value, "BRL", false))
              }
              className={classes.textField}
              error={errors.value}
              name="value"
              type="text"
              label="Informe o valor do estorno"
              variant="outlined"
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Descrição do estorno"
              error={errors.description}
              name="description"
              multiline
              rows={4}
              variant="outlined"
            />

            <button className="addticket" type="submit">
              {loading ? "..." : "Pedir estorno"}
            </button>
          </form>
        </CreateTicketContent>
      </Container>
    </Modal>
  );
};

export default CreateChargeback;
