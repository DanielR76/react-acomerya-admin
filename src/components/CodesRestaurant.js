import React, { useEffect, useState, useContext } from "react";

import { TextField, Button, IconButton } from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";

import AlertModal from "./AlertModal";
import { AuthContext } from "../context/Auth";

import { useCodesService } from "../hooks/useCodesService";

const CodesRestaurant = () => {
  const [authState] = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const initialState = {
    idRestaurant: authState.user,
    table: "",
    code: "",
  };
  const [newCode, setNewCode] = useState({ ...initialState });
  const { codes, getListOfCodes, createCode, deleteCode } = useCodesService();
  const isValidForm =
    newCode.table !== "" && newCode.code !== "" ? true : false;

  useEffect(() => {
    getListOfCodes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCode({
      ...newCode,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCode(newCode);
    setNewCode({ ...initialState });
  };

  const generateCode = () => {
    const numberCode = Math.floor(Math.random() * 999999);
    setNewCode({
      ...newCode,
      code: numberCode,
    });
  };

  const handleCloseAlert = () => setShowAlert(false);

  const handleDelete = () => {
    setShowAlert(false);
    deleteCode(currentId);
    setCurrentId("");
  };

  const DataCodes = () =>
    codes.map((element, index) => {
      return (
        <div className="code__item" key={index}>
          <h6>{element.table}</h6>
          <label>{element.code}</label>
          <IconButton
            aria-label="eliminar"
            onClick={() => {
              setShowAlert(true);
              setCurrentId(element.id);
            }}
          >
            <RemoveCircleOutline size="small" color="warning" />
          </IconButton>
        </div>
      );
    });

  return (
    <>
      <div className="code_contain">
        <h6 className="tittle__code"> Códigos por mesa</h6>
        <DataCodes />
      </div>
      <div className="form__add">
        <form>
          <div className="form__add--table">
            <TextField
              id="standard-basic"
              label="Mesa"
              name="table"
              value={newCode.table}
              onChange={handleChange}
              variant="standard"
              color="info"
              required={true}
            />
            <label>{newCode.code}</label>
          </div>
        </form>
        <Button
          variant="contained"
          color="warning"
          type="submit"
          onClick={isValidForm ? handleSubmit : generateCode}
        >
          {isValidForm ? "Guardar" : "Generar"}
        </Button>
      </div>
      <AlertModal
        name={"eliminar el código y la mesa"}
        open={showAlert}
        handleCloseAlert={handleCloseAlert}
        handleConfirmAlert={handleDelete}
      />
    </>
  );
};

export default CodesRestaurant;
