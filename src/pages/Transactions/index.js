import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

//Utils
import {
  formatDate,
  formatMoney,
  formatCryptoCurrency,
} from "../../utils/helpers";

import { api } from "../../services/api";

//Material ui components
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

//Create table
import { columns } from "./columns";

//Components
import ContainerWrapper from "../components/Container";
import Filter from "../components/Table/filter";
import SaveButton from "../components/SaveButton";
import ChargebackModal from "./Modal/registerChargeback";
import RenderRow from "./renderRow";

//Styles
import { useStyles } from "./styles";

let request = null;

const Transactions = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [chargebackModal, setchargebackModal] = useState(null);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    requestApi();
  }, []);

  const handleChangePage = (page) => {
    requestApi({
      ...filter,
      page,
    });
  };

  const requestApi = (params) => {
    api
      .get(`/merchants/${id}/sales`, {
        params,
      })
      .then((res) => {
        const response = res.data.items.map((sale) => ({
          ...sale,
          value_in_crypto_currency: formatCryptoCurrency(
            sale.value_in_crypto_currency,
            sale.crypto_currency,
            sale.crypto_currency_precision
          ),
          chargeback_button: (
            <SaveButton
              disabled={
                !(sale.status === "PAID" && sale.status_bitfy === "PENDING") ||
                sale.chargeback === sale.value
              }
              onClick={() => setchargebackModal(sale)}
            >
              Estorno
            </SaveButton>
          ),
          value: formatMoney(sale.value, sale.currency),
          created_at: formatDate(sale.created_at),
        }));
        setData(response);
        setPagination({
          page: res.data.page,
          pages: res.data.pages,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilters = (f) => {
    setFilter(f);

    clearTimeout(request);

    request = setTimeout(() => {
      requestApi(f);
    }, 2000);
  };

  return (
    <ContainerWrapper title="Transações">
      <Grid container>
        <Grid item xs={12}>
          <Filter onChangeFilter={handleFilters} />
          <ChargebackModal
            data={chargebackModal}
            onClose={() => setchargebackModal(null)}
          />
          <TableContainer component={Paper}>
            <p className={classes.title}>Transações</p>

            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  {columns.map((item) => (
                    <TableCell>{item.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!data.length && (
                  <RenderRow row="empty" />
                )}
                {data.map((item) => (
                  <RenderRow row={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ButtonGroup
            className={classes.pagination}
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => handleChangePage(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Anterior
            </Button>
            <Button disabled>{pagination.page}</Button>
            <Button
              onClick={() => handleChangePage(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              Próximo
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default Transactions;
