import React, { useState, useEffect } from "react";
import DeleteModal from "../components/DeleteModal";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import IconMoney from "../assets/icon/iconos-moneda-01.svg";
import firebase from "firebase";
import { db } from "../utils/firebase";
import { useConvertValues } from "../hooks/useConvertValues";

function AdditionalDish() {
  const [showAlert, setShowAlert] = useState(false);
  const handleOpenAlert = () => setShowAlert(true);
  const handleCloseAlert = (action) => setShowAlert(action);
  const [currentId, setCurrentId] = useState("");
  const [currentIdForm, setCurrentIdForm] = useState("");
  const [formAddition, setFormAddition] = useState(false);
  const { numberToCop } = useConvertValues();

  const initialStateValues = {
    idRestaurant: firebase.auth().currentUser.uid,
    name: "",
    price: "",
  };

  const [additionalValue, setAdditionalValue] = useState(initialStateValues);

  //Obtener adiciones de firebase
  const [additional, setAdditional] = useState([]);
  const getAdditional = async () => {
    db.collection("additionalDocument")
      .where("idRestaurant", "==", firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const state = [];
        querySnapshot.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setAdditional(state);
      });
  };
  useEffect(() => {
    getAdditional();
  }, []);

  //Obtener adicion por el id
  const getAdditionById = async (id) => {
    const doc = await db.collection("additionalDocument").doc(id).get();
    setAdditionalValue({ ...doc.data() });
    console.log(additionalValue);
  };

  //Crear o editar adiciones
  const addOrEditDish = async (object) => {
    if (currentIdForm === "") {
      await db
        .collection("additionalDocument")
        .doc()
        .set({ ...object, price: Number(object.price) })
        .then(() => console.log("Se cargó correctamente al documento"))
        .catch((error) =>
          console.error("Hubo un error al cargar en FireStore: ", error)
        );
    } else {
      await db
        .collection("additionalDocument")
        .doc(currentIdForm)
        .update({ ...object, price: Number(object.price) })
        .then(() => console.log("Se actualizó correctamente al documento"))
        .catch((error) =>
          console.error("Hubo un error al actualizar en FireStore: ", error)
        );
      setCurrentIdForm("");
    }
  };

  //eliminar adiciones
  const deleteAddition = async () => {
    setShowAlert(false);
    await db
      .collection("additionalDocument")
      .doc(currentId)
      .delete()
      .then(() => {
        console.log("Document eliminado correctamente!");
      })
      .catch((error) => {
        console.error("Error eliminando el plato: ", error);
      });
    setCurrentId("");
  };

  //Guardar los datos en values
  const handleChange = (e) => {
    setAdditionalValue({
      ...additionalValue,
      [e.target.name]: e.target.value,
    });
  };

  //Crear o editar adicion
  const handleSubmit = (e) => {
    console.log(`se envia valor `);
    e.preventDefault();
    addOrEditDish(additionalValue);
    setAdditionalValue({ ...initialStateValues });
    setFormAddition(false);
  };

  //Adicionales
  const aditionalsCard = additional.map((val) => {
    return (
      <div className="container__add--aditions--values" key={val}>
        <div className="container__add--aditions--form">
          <div>
            <label className="container__add--addition" key={`name ${val}`}>
              {val.name}
            </label>
          </div>
          <div className="price">
            <img src={IconMoney} alt="icon" />
            <label className="container__add--price" key={`price ${val}`}>
              {numberToCop(val.price)}
            </label>
          </div>
        </div>
        <div className="container__delete__edit--dish">
          <IconButton
            key={`edit ${val}`}
            aria-label="editar"
            onClick={() => {
              setCurrentIdForm(val.id);
              getAdditionById(val.id);
            }}
          >
            <EditIcon size="small" color="primary" />
          </IconButton>
          <IconButton
            key={`delete ${val}`}
            aria-label="eliminar"
            onClick={() => {
              setCurrentId(val.id);
              handleOpenAlert();
            }}
          >
            <HighlightOffIcon size="small" color="secondary" />
          </IconButton>
        </div>
      </div>
    );
  });

  return (
    <div className="container__form" key="1">
      {aditionalsCard}
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
        delete={deleteAddition}
      />
    </div>
  );
}

export default AdditionalDish;
