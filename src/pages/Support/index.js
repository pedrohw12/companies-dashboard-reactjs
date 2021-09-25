import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

//Components
import Cards from "./components/Cards";
import CreateTicketModal from "./components/Modal/createTicket";
import DetailModal from "./components/Modal/detailModal";
import ContainerWrapper from "../components/Container";
import SaveButton from "../components/SaveButton";

import { api } from "../../services/api";

//Styles
import { useStyles } from "./styles";

const Support = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [cardsData, setCardsData] = useState([]);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    response: "",
  });
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  const onClick = () => {
    setDetailModal(false);
  };

  const setModalComponent = (item) => {
    setDetailModal(true);
    setModalData(item);
  };

  const handleCloseCreateModal = (refresh) => {
    if (refresh) {
      getTickets();
    }

    setCreateModal(false);
  };

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = () => {
    api.get(`/merchants/${id}/tickets`).then((response) => {
      setCardsData(response.data);
    });
  };

  return (
    <ContainerWrapper title="Suporte">
      <div>
        <div className={classes.buttonContainer}>
          <SaveButton onClick={() => setCreateModal(true)}>
            Criar Ticket
          </SaveButton>
        </div>
        <Cards onClick={setModalComponent} data={cardsData} />
      </div>
      <CreateTicketModal
        visible={createModal}
        onClose={handleCloseCreateModal}
      />
      <DetailModal
        visible={detailModal}
        onClose={onClick}
        data={modalData}
      />
    </ContainerWrapper>
  );
};

export default Support;
