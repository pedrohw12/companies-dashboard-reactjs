import React from "react";

//Material ui components
import Button from "@material-ui/core/Button";

const SaveButton = ({ children, ...rest }) => {
  return (
    <Button color="primary" variant="contained" {...rest}>
      {children || "Salvar"}
    </Button>
  );
};

export default SaveButton;
