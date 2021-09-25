import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import accountSettings from "./accountSettings/sagas";
import sign from "./sign/sagas";

export default function* rootSaga() {
  return yield all([auth, accountSettings, sign]);
}
