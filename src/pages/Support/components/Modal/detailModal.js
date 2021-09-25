import React from "react";
import moment from "moment-timezone";

//Material ui components
import Modal from "@material-ui/core/Modal";

//Material ui icons
import CloseIcon from "@material-ui/icons/Close";

//Styles
import { Container, ModalHeader, DetailModalContent } from "./styles";

const DetailModal = ({ visible, onClose, data }) => {
  return (
    <Modal open={visible}>
      <Container>
        <ModalHeader>
          <h3>{data.title}</h3>
          <button className="closebtn" type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </ModalHeader>
        <DetailModalContent>
          <p>{data.description}</p>
          <p className="mb">Criado em: {moment(data.dtCreated).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm')}</p>
          <h3>{data.response || "Aguardando resposta..."}</h3>
          <p className="mb">Respondido em: {moment(data.dtResponse).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm')}</p>
        </DetailModalContent>
      </Container>
    </Modal>
  );
};

export default DetailModal;
