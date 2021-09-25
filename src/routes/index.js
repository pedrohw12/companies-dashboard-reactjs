import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Transactions from "../pages/Transactions";
import Payments from "../pages/Payments";
import Support from "../pages/Support";
import RegisterData from "../pages/RegisterData";
import ChangePassword from "../pages/ChangePassword";
import Register from "../pages/Register";
import Integration from "../pages/Integration";
import ForgotPassword from "../pages/ForgotPassword";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot-password" exact component={ForgotPassword} />

      <Route path="/" exact component={Home} isPrivate />
      <Route path="/transactions" exact component={Transactions} isPrivate />
      <Route path="/payments" exact component={Payments} isPrivate />
      <Route path="/support" exact component={Support} isPrivate />
      <Route path="/register-data/:subpage?" component={RegisterData} isPrivate />
      <Route path="/integration" exact component={Integration} isPrivate />
      <Route path="/change-password" exact component={ChangePassword} isPrivate />
    </Switch>
  </BrowserRouter>
);

export default Routes;
