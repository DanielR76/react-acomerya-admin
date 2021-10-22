import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import icono from "../assets/icon/acomerya-logo-name.svg";

import FireRequest from "../services/Request";
import { useRestaurantService } from "../hooks/useRestaurantService";

const initialValues = {
  email: "",
  password: "",
};

function AuthenticationPage({ history }) {
  const [showAlert, setShowAlert] = useState(false);
  const [values, setValues] = useState({ ...initialValues });
  const { getRestaurantById } = useRestaurantService();

  const handleSubmit = (e) => {
    e.preventDefault();
    FireRequest()
      .signIn(values.email, values.password)
      .then((response) => {
        getRestaurantById(history, response.user.uid);
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (values.email === "" || values.password === "") {
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const alertValidation = () => (
    <div>
      <Dialog
        open={showAlert}
        onClose={() => setShowAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Algo ha salido mal :( valida tus datos e intenta nuevamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowAlert(false)}
            variant="outlined"
            color="primary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className="container__main">
      <div className="login">
        <img className="login__img" src={icono} alt="Imagen-Acomerya"></img>
        <form className="login__form" onSubmit={validateForm && handleSubmit}>
          <h2>Inicia sesión</h2>
          <TextField
            id="standard-basic"
            label="Correo electrónico"
            name="email"
            value={values.email}
            onChange={handleChange}
            required="true"
          />
          <TextField
            id="standard-password-input"
            label="Contraseña"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required="true"
          />
          <button type="submit" className="login__form--submit">
            Continuar
          </button>
        </form>
      </div>
      {alertValidation()}
      <a className="link__freepik" href="https://www.freepik.es/">
        Foto de Comida creada por freepik
      </a>
    </div>
  );
}

export default withRouter(AuthenticationPage);
