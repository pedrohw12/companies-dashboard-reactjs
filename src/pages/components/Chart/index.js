import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import jwt_decoded from "jwt-decode";

//Material ui components
import { useTheme } from "@material-ui/core/styles";

//Components
import Title from "../Title";

//Utils
import { formatDate } from "../../../utils/helpers";

import { api } from "../../../services/api";

export default function Chart() {
  const theme = useTheme();
  const token = useSelector((state) => state.auth.token.value);
  const id = jwt_decoded(token).data.id;
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/merchants/${id}/chart`).then((response) => {
      const res = response.data.merchant_sales_chart.map((item) => ({
        amount: item.Amount,
        date: formatDate(item.Date),
      }));

      setData(res);
    });
  }, []);

  return (
    <React.Fragment>
      <Title>Hoje</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Vendas ($)
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
