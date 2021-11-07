import React, { useState, useEffect } from "react";

import { Edit, RemoveCircleOutline } from "@mui/icons-material";
import { TextField, Button, IconButton } from "@mui/material";

import AlertModal from "../components/AlertModal";
import IconMoney from "../assets/icon/iconos-moneda-01.svg";

import { useAditionalDishService } from "../hooks/useAditionalDishService";
import { useConvertValues } from "../hooks/useConvertValues";

const AdditionalDish = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [editDish, setEditDish] = useState("");
  const [deleteDish, setDeleteDish] = useState("");
  const { numberToCop } = useConvertValues();
  const {
    additionalValue,
    listOfAdditions,
    setAdditionalValue,
    getAdditional,
    getAdditionById,
    addAditional,
    editAditional,
    deleteAddition,
  } = useAditionalDishService();

  useEffect(() => {
    getAdditional();
  }, []);

  const handleConfirmAlert = () => {
    setShowAlert(false);
    deleteAddition(deleteDish);
    setDeleteDish("");
  };

  const handleCloseAlert = () => setShowAlert(false);

  //Save state values
  const handleChange = (e) => {
    setAdditionalValue({
      ...additionalValue,
      [e.target.name]: e.target.value,
    });
  };

  //Create o edit aditional
  const handleSubmit = (e) => {
    e.preventDefault();
    if (additionalValue?.price !== "" && additionalValue?.name !== "") {
      console.log("imprimeeeee");
      !editDish ? addAditional() : editAditional(editDish);
    }
    setEditDish("");
  };

  //List of aditions
  const AditionalsCard = () =>
    listOfAdditions.map((val, index) => (
      <div className="container__add--aditions--values" key={index}>
        <div className="container__add--aditions--form">
          <div>
            <label className="container__add--addition">{val.name}</label>
          </div>
          <div className="price">
            <img src={IconMoney} alt="icon" />
            <label className="container__add--price">
              {numberToCop(val.price)}
            </label>
          </div>
        </div>
        <div className="container__delete__edit--dish">
          <IconButton
            aria-label="editar"
            onClick={() => {
              setEditDish(val.id);
              getAdditionById(val.id);
            }}
          >
            <Edit size="small" color="warning" />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            onClick={() => {
              setDeleteDish(val.id);
              setShowAlert(true);
            }}
          >
            <RemoveCircleOutline size="small" color="action" />
          </IconButton>
        </div>
      </div>
    ));

  return (
    <div className="container__form" key="createEdit">
      <AditionalsCard />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__add-edit">
          <div className="form__addition">
            <TextField
              id="standard-basic"
              label="nombre"
              name="name"
              value={additionalValue?.name}
              onChange={handleChange}
              variant="standard"
              fullWidth="true"
              required="true"
            />
          </div>
          <div className="form__addition">
            <TextField
              id="standard-basic"
              label="Precio"
              name="price"
              value={additionalValue?.price}
              onChange={handleChange}
              variant="standard"
              fullWidth="true"
              required="true"
            />
          </div>
        </div>
        <Button variant="contained" color="warning" type="submit">
          {editDish ? "Actualizar" : "Agregar"}
        </Button>
      </form>
      <AlertModal
        name={"eliminar la adición del menú"}
        open={showAlert}
        handleCloseAlert={handleCloseAlert}
        handleConfirmAlert={handleConfirmAlert}
      />
    </div>
  );
};

export default AdditionalDish;
