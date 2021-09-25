import { combineReducers } from "redux";

import auth from "./auth/reducer";
import accountSettings from "./accountSettings/reducer";
import sign from "./sign/reducer";

export default combineReducers({ auth, accountSettings, sign });
