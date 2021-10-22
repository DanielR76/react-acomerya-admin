import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#607d8b",
    },
  },
});

export function UploadButtons(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={props.changeImg}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          theme={theme}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera theme={theme} />
        </IconButton>
      </label>
    </div>
  );
}
