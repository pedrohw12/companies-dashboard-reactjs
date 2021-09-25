import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import { api } from "../../../services/api";

import {
  signInSuccess,
  signFailure,
  signUpSuccess,
  signUpFailure,
} from "./actions";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "/auth", {
      email,
      password,
    });

    const { token, name } = response.data;

    api.defaults.headers.Authorization = `${token.type} ${token.value}`;

    yield put(signInSuccess(token, name));

    window.location = "/";
  } catch (err) {
    toast.error("Falha nas credenciais.");
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const {
      name,
      phone,
      document,
      legal_responsible,
      email,
      password,
      address_postal_code,
      address,
      address_number,
      address_complement,
      address_neighborhood,
      address_state,
      address_city,
      country,
      ip,
    } = payload;

    const response = yield call(api.post, "/merchants", {
      name,
      phone,
      document,
      legal_responsible,
      email,
      password,
      address_postal_code,
      address,
      address_number,
      address_complement,
      address_neighborhood,
      address_state,
      address_city,
      country,
      ip,
    });

    const { token, name: userName } = response.data;

    api.defaults.headers.Authorization = `${token.type} ${token.value}`;

    yield put(signUpSuccess(token, userName));

    window.location = "/";
  } catch (err) {
    toast.error("Falha ao cadastrar.");

    yield put(
      signUpFailure({
        status: err.response.status,
        message: err.response.data.error,
      })
    );
  }
}

export default all([
  takeLatest("@sign/SIGN_IN_REQUEST", signIn),
  takeLatest("@sign/SIGN_UP_REQUEST", signUp),
]);
