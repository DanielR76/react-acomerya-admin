import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import IconMoney from "../assets/icon/iconos-moneda-01.svg";
import { UploadButtons } from "../components/MaterialUI";
import ImageLoad from "../assets/img/upload_image.png";
import { db, storage } from "../utils/firebase";
import { AuthContext } from "../context/Auth";

function ModalDish({ show, close, addOrEdit, idDish }) {
  const [authState] = useContext(AuthContext);
  const [inputList, setInputList] = useState([]);

  //Inicializar estado
  const initialStateValues = {
    idRestaurant: authState.user,
    imagePath: null,
    dishName: "",
    description: "",
    ingredient: [""],
    price: "",
    status: true,
  };

  const [values, setValues] = useState({ ...initialStateValues });

  //Obtener plato por el id
  const getDishById = async (id) => {
    const doc = await db.collection("dishDocument").doc(id).get();
    setValues({ ...doc.data() });
    setInputList([...doc.data().ingredient]);
  };

  //Si hay id en el props mostrar datos
  useEffect(() => {
    if (idDish === "") {
      setValues({ ...initialStateValues });
      setInputList(initialStateValues.ingredient);
    } else {
      getDishById(idDish);
    }
  }, [idDish]);

  //Guardar imagen en storage y luego traer la ruta
  const handleLoad = (e) => {
    const file = e.target.files[0];
    const uploadImage = storage.ref(`images/${file.name}`);
    const task = uploadImage.put(file);

    task.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => setValues({ ...values, imagePath: url }));
      }
    );
  };

  //Guardar los datos en values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //Guardar los datos en values
  const handleChangeCheck = (e) => {
    const { checked } = e.target;
    setValues({
      ...values,
      status: checked,
    });
  };

  //Enviar datos
  const handleSubmit = (e) => {
    console.log("se envia valor");
    e.preventDefault();

    if (
      values.dishName !== null &&
      values.description !== null &&
      values.price !== null &&
      values.imagePath !== null &&
      values.ingredient !== []
    ) {
      console.log(values);
      addOrEdit(values);
      setValues({ ...initialStateValues });
    }
  };

  //Logica para ingredientes
  const handleChangeIngre = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    console.log(list);
    list[index] = value;
    setInputList(list);
    setValues({
      ...values,
      ingredient: list,
    });
  };

  const handleRemoveIngre = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setValues({
      ...values,
      ingredient: list,
    });
  };

  const handleAddIngre = () => {
    setInputList([...inputList, ""]);
  };

  const ingredients = inputList.map((x, i) => {
    return (
      <div className="modal__ingredient" key={x}>
        <TextField
          id="standard-basic"
          label="ingrediente"
          name="ingredient"
          value={x}
          onChange={(e) => handleChangeIngre(e, i)}
        />

        <div className="modal__ingredient--buttons">
          {inputList.length !== 1 && (
            <div className="ingredient__buttons--delete">
              <IconButton
                aria-label="eliminar"
                onClick={() => handleRemoveIngre(i)}
              >
                <HighlightOffIcon size="small" color="secondary" />
              </IconButton>
            </div>
          )}
          {inputList.length - 1 === i && (
            <div className="ingredient__buttons--add">
              <IconButton
                color="primary"
                aria-label="Añadir ingrediente"
                onClick={handleAddIngre}
              >
                <AddIcon />
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
                {values.imagePath !== null ? (
                  <img
                    className="image__dish"
                    src={values.imagePath}
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
                  value={values.price}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <button
                className="login__form--submit"
                style={{ width: "200px" }}
                onClick={
                  values.dishName !== null &&
                  values.description !== null &&
                  values.price !== null &&
                  values.imagePath !== null
                    ? close
                    : null
                }
              >
                {idDish === "" ? "Crear" : "Guardar"}
              </button>
            </div>
            <div className="modaldish__container-input">
              <TextField
                id="standard-basic"
                label="Nombre plato"
                name="dishName"
                value={values.dishName}
                onChange={handleChange}
                required={true}
              />
              <TextField
                id="standard-textarea"
                label="Descripción"
                name="description"
                value={values.description}
                multiline
                onChange={handleChange}
                required={true}
              />
              <div>{ingredients}</div>

              <FormControlLabel
                control={
                  <Switch
                    checked={values.status}
                    onChange={handleChangeCheck}
                    color="primary"
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
}

export default ModalDish;
