import React, { useState } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

//Material-ui components
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

//Helpers
import { formatDate, formatMoney } from "../../utils/helpers";

//Transaction status object
import transactionStatus from "./transactionStatus";

import { api } from "../../services/api";

//Styles
import { useStyles } from "./styles";

const RenderRow = ({ row }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [chargebacks, setChargebacks] = useState([]);
  const token = useSelector((state) => state.auth.token.value);
  const merchant_id = jwt_decoded(token).data.id;

  const loadChargebacks = () => {
    setPending(true);

    api
      .get(`/merchants/${merchant_id}/sales/${row.id}/chargebacks`)
      .then((response) => {
        setPending(false);
        setChargebacks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenRow = () => {
    setOpen(!open);

    if (!open) {
      loadChargebacks();
    } else {
      setChargebacks([]);
    }
  };

  const handleCancel = (id) => {
    const confirmed = window.confirm('Tem certeza que deseja cancelar esta solicitação de estorno?');

    if (confirmed) {
      api
        .delete(`/merchants/${merchant_id}/sales/${row.id}/chargebacks/${id}`)
        .then((response) => {
          loadChargebacks();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (row === 'empty') {
    return (
      <TableRow>
        <TableCell colSpan={10} align="center">
          Não existem transações a serem exibidas
        </TableCell>
      </TableRow>
    )
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpenRow}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.created_at}</TableCell>
        <TableCell>{row.cart_id}</TableCell>
        <TableCell>{row.customer_name || '-'}</TableCell>
        <TableCell>{row.value}</TableCell>
        <TableCell>{row.value_in_crypto_currency}</TableCell>
        <TableCell className={classes[row.status]}>{transactionStatus[row.status]}</TableCell>
        <TableCell className={row.status !== 'EXPIRED' ? classes[row.status_bitfy] : null}>
          {row.status !== 'EXPIRED' ? transactionStatus[row.status_bitfy] : '-'}
        </TableCell>
        <TableCell>{row.chargeback ? 'Sim' : 'Não'}</TableCell>
        <TableCell>{row.chargeback_button}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.chargebacksArea} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={classes.chargebacks}>
              <Typography variant="h6" gutterBottom component="div">
                Estornos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chargebacks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>{pending ? 'Carregando...' : 'Nenhum estorno'}</TableCell>
                    </TableRow>
                  )}
                  {chargebacks.map((item) => (
                    <TableRow>
                      <TableCell>{formatDate(item.dt_created)}</TableCell>
                      <TableCell>
                        {formatMoney(item.value, row.currency)}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{transactionStatus[item.status]}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          className={classes.dangerButton}
                          onClick={() => handleCancel(item.id)}
                          disabled={item.status === 'PAID' || item.status === 'CANCELED'}
                        >
                          cancelar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default RenderRow;
