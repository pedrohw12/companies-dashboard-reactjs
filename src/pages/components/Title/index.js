import React from "react";
import PropTypes from "prop-types";

//Material ui components
import Typography from "@material-ui/core/Typography";

const Title = ({ children, className }) => {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      className={className}
      gutterBottom
    >
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
