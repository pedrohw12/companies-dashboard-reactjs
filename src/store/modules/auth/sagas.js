import { takeLatest, all } from "redux-saga/effects";

import history from "../../../services/history";
import { api } from "../../../services/api";

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `${token.type} ${token.value}`;
  }
}

export function signOut() {
  history.push("/login");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_OUT", signOut),
]);
