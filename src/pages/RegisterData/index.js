import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jwt_decoded from "jwt-decode";

//Material ui components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//Components
import ContainerWrapper from "../components/Container";
import BankData from "./components/BankData";
import SendDocs from "./components/SendDocs";
import CompanyData from "./components/CompanyData";
import Menu from "./components/Menu";

import { api } from "../../services/api";

//Styles
import { useStyles } from "./styles";

const RegisterData = () => {
  const classes = useStyles();
  const [content, setContent] = useState("companyData");
  const [merchant, setMerchant] = useState(null);
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const { subpage = null } = useParams();

  useEffect(() => {
    api
      .get(`/merchants/${id}`)
      .then((response) => {
        setMerchant(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (subpage === "bank-data") {
      setContent("bankData");
    } else if (subpage === "docs") {
      setContent("sendDocs");
    }
  }, [subpage])

  return (
    <ContainerWrapper title="Dados cadastrais">
      <Container>
        <Grid container>
          <Grid item xs={3}>
            <Menu current={subpage} />
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              {content === "companyData" && <CompanyData />}
              {content === "bankData" && <BankData data={merchant} />}
              {content === "sendDocs" && <SendDocs data={merchant} />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ContainerWrapper>
  );
};

export default RegisterData;
