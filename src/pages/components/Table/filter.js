import 'date-fns';
import React, { useState } from "react";
import moment from "moment-timezone";

//Material ui components
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

//Styles
import { TextFieldContainer, useStyles } from "./styles";

const Filter = ({ onChangeFilter }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [initial_date, setInitialDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [startInputDate, setStartInputDate] = useState(null);
  const [endInputDate, setEndInputDate] = useState(null);

  return (
    <TextFieldContainer>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="none"
          id="date-picker-inline"
          label="Data Início"
          value={startInputDate}
          onChange={(date) => {
            onChangeFilter({
              initial_date: moment(date).format('YYYY-MM-DD'),
              end_date: end_date || null,
              search: search || null,
            });
            setStartInputDate(date);
            setInitialDate(moment(date).format('YYYY-MM-DD'));
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="none"
          id="date-picker-inline"
          label="Data Fim"
          value={endInputDate}
          onChange={(date) => {
            onChangeFilter({
              initial_date: initial_date || null,
              end_date: moment(date).format('YYYY-MM-DD'),
              search: search || null,
            });
            setEndInputDate(date);
            setInitialDate(moment(date).format('YYYY-MM-DD'));
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <TextField
        value={search}
        onChange={(e) => {
          onChangeFilter({
            initial_date: initial_date || null,
            end_date: end_date || null,
            search: e.target.value,
          });
          setSearch(e.target.value);
        }}
        label="Busca"
        type="text"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </TextFieldContainer>
  );
};

export default Filter;
