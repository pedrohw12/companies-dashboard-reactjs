import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatMoney,
  formatDate,
  formatCryptoCurrency,
} from "../../../utils/helpers";
import jwt_decoded from "jwt-decode";

import { api } from "../../../services/api";

// Transaction status
import transactionStatus from "./transactionStatus";

//Material ui components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//Components
import Title from "../Title";

//Styles
import { useStyles } from "./styles";

export default function SimpleTable() {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api
      .get(`/merchants/${id}/sales`)
      .then((res) => {
        setRows(res.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Title>Transações Recentes</Title>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell align="right">Valor Criptomoeda</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!rows.length && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Não existem transações a serem exibidas
              </TableCell>
            </TableRow>
          )}
          {rows.slice(0, 6).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {formatDate(row.created_at)}
              </TableCell>
              <TableCell align="right">{row.customer_name}</TableCell>
              <TableCell align="right">
                {formatMoney(row.value, row.currency)}
              </TableCell>
              <TableCell align="right">
                {formatCryptoCurrency(
                  row.value_in_crypto_currency,
                  row.crypto_currency,
                  row.crypto_currency_precision
                )}
              </TableCell>
              <TableCell align="right">
                {transactionStatus[row.status]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
