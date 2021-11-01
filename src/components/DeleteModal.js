import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

function DeleteModal({ name, open = false, close, remove }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => close(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás segur@ que deseas {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => close(false)}
            variant="outlined"
            color="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={remove} variant="outlined" color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
