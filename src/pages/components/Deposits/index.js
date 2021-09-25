import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

//Material ui components
import Typography from "@material-ui/core/Typography";

import { api } from "../../../services/api";

//Utils
import { formatDate, formatMoney } from "../../../utils/helpers";

//Components
import Title from "../Title";

//Styles
import { useStyles } from "./styles";

export default function Deposits() {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [pendingValue, setPendingValue] = useState("");
  const [chargebacks, setChargebacks] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get(`/merchants/${id}/chart`).then((response) => {
      const balance = response.data.merchant_pending_value[0].Total;
      const ch = response.data.merchant_chargeback_value[0].Total;

      setPendingValue(balance);
      setChargebacks(ch);
      setDate(formatDate(new Date()));
    });
  }, []);

  return (
    <React.Fragment>
      <Title className={classes.textBlack}>Saldo Disponível</Title>
      <Typography component="p" variant="h5" className={classes.textPrimary}>
        {formatMoney(pendingValue)}
      </Typography>
      <br/>
      <Title className={classes.textBlack}>Estornos</Title>
      <Typography component="p" variant="h5" className={classes.textDanger}>
        {formatMoney(chargebacks)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        em {date}
      </Typography>
    </React.Fragment>
  );
}
