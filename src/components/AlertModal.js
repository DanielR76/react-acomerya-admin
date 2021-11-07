import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const AlertModal = ({
  name,
  open = false,
  handleCloseAlert,
  handleConfirmAlert,
}) => (
  <div>
    <Dialog
      open={open}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Confirmas que quieres {name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAlert} variant="outlined" color="info">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmAlert}
          variant="contained"
          color="warning"
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default AlertModal;
