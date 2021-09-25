import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { store } from "../store";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    window.location.href = '/login';
    return;
  }

  if (signed && !isPrivate) {
    window.location.href = '/';
    return;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {};
