import React, { useState } from "react";

import Button from "@material-ui/core/Button";

//Styles
import { useStyles } from "./styles";

const UploadButton = ({ onChange, id }) => {
  const classes = useStyles();
  const [fileName, setFileName] = useState("");

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      onChange(reader.result, file.name);
    };
  };

  return (
    <div className={classes.root}>
      <label htmlFor={id}>
        <Button variant="contained" color="default" component="span">
          {fileName || "Selecionar arquivo"}
        </Button>
      </label>
      <input
        onChange={(e) => handleChangeFile(e)}
        accept="application/pdf, image/png, image/jpeg"
        className={classes.input}
        id={id}
        type="file"
      />
    </div>
  );
};

export default UploadButton;
