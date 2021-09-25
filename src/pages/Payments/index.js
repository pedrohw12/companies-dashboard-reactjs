import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

import { api } from "../../services/api";

//Utils
import {
  formatDate,
  formatMoney,
  formatCryptoCurrency,
} from "../../utils/helpers";

//Material ui components
import Grid from "@material-ui/core/Grid";

//Components
import ContainerWrapper from "../components/Container";
import Table from "../components/Table";
import { TableTitle } from "../components/TableTitle";
import Filter from "../components/Table/filter";

//Create table
import { columns } from "./columns";

let request = null;

const Payments = () => {
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
  });
  const [data, setData] = useState([
    {
      date: "---",
      price: "---",
    },
  ]);

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
    setLoading(true);
    api
      .get(`/merchants/${id}/payments`, {
        params,
      })
      .then((res) => {
        const response = res.data.items.map((payment) => ({
          ...payment,
          value_in_crypto_currency: formatCryptoCurrency(
            payment.value_in_crypto_currency,
            payment.crypto_currency,
            payment.crypto_currency_precision
          ),
          value: formatMoney(payment.value, payment.currency),
          created_at: formatDate(payment.created_at),
        }));
        setData(response);
        setLoading(false);
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
    setLoading(true);
    setFilter(f);

    clearTimeout(request);

    request = setTimeout(() => {
      requestApi(f);
    }, 2000);
  };

  return (
    <ContainerWrapper title="Pagamentos">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Filter onChangeFilter={handleFilters} />
          <Table
            pagination={pagination}
            onChangePage={handleChangePage}
            title={<TableTitle color="#1b88ff">Pagamentos</TableTitle>}
            emptyString="Não existem pagamentos a serem exibidos"
            content={{ columns, data }}
          />
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default Payments;
