import { takeLatest, all } from "redux-saga/effects";
import { api } from "../../../services/api";

export function setHeader({ payload }) {
  if (!payload) return;

  const environment = payload.environment ? payload.environment : payload.accountSettings.environment;

  if (environment) {
    api.defaults.headers["X-bitfy-checkout-mode"] = environment;
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setHeader),
  takeLatest("@accountSettings/CHANGE_ENVIRONMENT", setHeader),
]);
