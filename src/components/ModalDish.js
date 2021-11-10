import React, { useEffect } from "react";

import { Modal } from "react-bootstrap";
import {
  Button,
  TextField,
  FormControlLabel,
  IconButton,
  Switch,
} from "@mui/material";
import { RemoveCircleOutline, Add } from "@material-ui/icons";

import { UploadButtons } from "../components/MaterialUI";

import { useDishesServices } from "../hooks/useDishesServices";

import IconMoney from "../assets/icon/iconos-moneda-01.svg";
import ImageLoad from "../assets/img/upload_image.png";

const initialStateValues = {
  idRestaurant: "",
  imagePath: null,
  dishName: "",
  description: "",
  ingredient: [""],
  price: "",
  status: true,
};

const ModalDish = ({ idDish, addDish, editDish, show, close }) => {
  const {
    dishById,
    setDishById,
    listOfIngredients,
    setListOfIngredients,
    getDishById,
    handleLoad,
  } = useDishesServices();

  useEffect(() => {
    if (idDish === "") {
      setDishById({ ...initialStateValues });
      setListOfIngredients(initialStateValues.ingredient);
    } else {
      getDishById(idDish);
    }
  }, [idDish]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDishById({
      ...dishById,
      [name]: value,
    });
  };

  const handleChangeCheck = (e) => {
    const { checked } = e.target;
    setDishById({
      ...dishById,
      status: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      dishById.dishName !== null &&
      dishById.description !== null &&
      dishById.price !== null &&
      dishById.imagePath !== null &&
      dishById.ingredient !== []
    ) {
      idDish ? editDish(idDish, dishById) : addDish(dishById);
      setDishById({ ...initialStateValues });
    }
  };

  const handleChangeIngre = (e, index) => {
    const { value } = e.target;
    const list = [...listOfIngredients];
    list[index] = value;
    setListOfIngredients(list);
    setDishById({
      ...dishById,
      ingredient: list,
    });
  };

  const handleRemoveIngre = (index) => {
    const list = [...listOfIngredients];
    list.splice(index, 1);
    setListOfIngredients(list);
    setDishById({
      ...dishById,
      ingredient: list,
    });
  };

  const handleAddIngre = () => {
    setListOfIngredients([...listOfIngredients, ""]);
  };

  const Ingredients = () =>
    listOfIngredients.map((x, i) => {
      return (
        <div className="modal__ingredient" key={x}>
          <TextField
            id="standard-basic"
            label="ingrediente"
            name="ingredient"
            value={x}
            onChange={(e) => handleChangeIngre(e, i)}
            variant="standard"
          />

          <div className="modal__ingredient--buttons">
            {listOfIngredients.length !== 1 && (
              <div className="ingredient__buttons--delete">
                <IconButton
                  aria-label="eliminar"
                  onClick={() => handleRemoveIngre(i)}
                >
                  <RemoveCircleOutline size="small" color="action" />
                </IconButton>
              </div>
            )}
            {listOfIngredients.length - 1 === i && (
              <div className="ingredient__buttons--add">
                <IconButton
                  color="primary"
                  aria-label="Añadir ingrediente"
                  onClick={handleAddIngre}
                >
                  <Add />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      );
    });

  return (
    <div className="modaldish">
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        size="lg"
        centered
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton id="id_header_modal">
          <Modal.Title>
            {idDish === "" ? "Agregar plato" : "Editar plato"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="modaldish__container" onSubmit={handleSubmit}>
            <div className="modaldish__containder--left">
              <div className="modaldish__image">
                {dishById.imagePath !== null ? (
                  <img
                    className="image__dish"
                    src={dishById.imagePath}
                    alt="imagen 2"
                  />
                ) : (
                  <img className="image__dish" src={ImageLoad} alt="imagen 1" />
                )}
                <UploadButtons changeImg={handleLoad.bind(this)} />
              </div>
              <div className="modaldish__price">
                <img src={IconMoney} alt="icon" />
                <TextField
                  id="standard-basic"
                  label="Precio"
                  name="price"
                  value={dishById.price}
                  onChange={handleChange}
                  required={true}
                  variant="standard"
                />
              </div>
              <Button
                variant="contained"
                color="warning"
                type="submit"
                onClick={
                  dishById.dishName !== null &&
                  dishById.description !== null &&
                  dishById.price !== null &&
                  dishById.imagePath !== null
                    ? close
                    : null
                }
              >
                {idDish === "" ? "Crear" : "Guardar"}
              </Button>
            </div>
            <div className="modaldish__container-input">
              <TextField
                id="standard-basic"
                label="Nombre plato"
                name="dishName"
                value={dishById.dishName}
                onChange={handleChange}
                required={true}
                variant="standard"
              />
              <TextField
                id="standard-textarea"
                label="Descripción"
                name="description"
                value={dishById.description}
                multiline
                onChange={handleChange}
                required={true}
                variant="standard"
              />
              <div>
                <Ingredients />
              </div>

              <FormControlLabel
                label={"¿Adiciones?"}
                control={
                  <Switch
                    checked={dishById.status}
                    onChange={handleChangeCheck}
                    color="warning"
                    name="status"
                  />
                }
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalDish;
