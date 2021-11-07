import React, { useState, useEffect } from "react";

import { Edit, Delete } from "@mui/icons-material";
import { TextField, IconButton } from "@mui/material";

import DeleteModal from "../components/DeleteModal";
import IconMoney from "../assets/icon/iconos-moneda-01.svg";

import { useAditionalDishService } from "../hooks/useAditionalDishService";
import { useConvertValues } from "../hooks/useConvertValues";

function AdditionalDish() {
  const [showAlert, setShowAlert] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [currentIdForm, setCurrentIdForm] = useState("");
  const [formAddition, setFormAddition] = useState(false);
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

  const handleOpenAlert = () => setShowAlert(true);

  const handleCloseAlert = (action) => setShowAlert(action);

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
    !currentIdForm ? addAditional() : editAditional(currentIdForm);
    setCurrentIdForm("");
    setFormAddition(false);
  };

  //List of aditions
  const AditionalsCard = () =>
    listOfAdditions.map((val) => (
      <div className="container__add--aditions--values" key={val}>
        <div className="container__add--aditions--form">
          <div>
            <label className="container__add--addition" key={`name ${val}`}>
              {val.name}
            </label>
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
              setCurrentIdForm(val.id);
              getAdditionById(val.id);
            }}
          >
            <Edit size="small" color="primary" />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            onClick={() => {
              setCurrentId(val.id);
              handleOpenAlert();
            }}
          >
            <Delete size="small" color="secondary" />
          </IconButton>
        </div>
      </div>
    ));

  return (
    <div className="container__form" key="1">
      <AditionalsCard />
      {currentIdForm || formAddition ? (
        <form
          className="form"
          onSubmit={
            additionalValue.price !== "" && additionalValue.name !== ""
              ? handleSubmit
              : null
          }
        >
          <div className="form__add-edit">
            <div className="form__addition">
              <TextField
                id="standard-basic"
                label="nombre"
                name="name"
                value={additionalValue.name}
                onChange={handleChange}
                fullWidth="true"
                required="true"
              />
            </div>
            <div className="form__addition">
              <TextField
                id="standard-basic"
                label="Precio"
                name="price"
                value={additionalValue.price}
                onChange={handleChange}
                fullWidth="true"
                required="true"
              />
            </div>
          </div>
          <button className="login__form--submit" type="submit">
            {currentIdForm ? "Guardar" : "Agregar"}
          </button>
        </form>
      ) : (
        <button
          className="login__form--submit"
          onClick={() => setFormAddition(true)}
        >
          Adicionar
        </button>
      )}
      <DeleteModal
        name={"eliminar la adición del menú"}
        open={showAlert}
        close={handleCloseAlert}
        remove={() => {
          setShowAlert(false);
          deleteAddition(currentId);
          setCurrentId("");
        }}
      />
    </div>
  );
}

export default AdditionalDish;
