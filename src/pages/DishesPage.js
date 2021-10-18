import React, { useState, useEffect, useContext } from "react";

import ModalDish from "../components/ModalDish";
import AdditionalDish from "../components/AdditionalDish";
import DeleteModal from "../components/DeleteModal";
import { AuthContext } from "../context/Auth";

import { Edit, Add, HighlightOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import firebase from "firebase";
import FireRequest from "../services/Request";

function DishesPage() {
  const { currentUser } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [currentDish, setCurrentDish] = useState("");
  const [show, setShow] = useState(false);
  const [dish, setDish] = useState([]);
  const handleShow = () => setShow(true);
  const handleOpenAlert = () => setShowAlert(true);
  const handleCloseAlert = (action) => setShowAlert(action);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setCurrentDish("");
    }, 0);
  };

  useEffect(() => {
    getDishes();
  }, []);

  //Obtener platos de firebase
  const getDishes = () => {
    FireRequest()
      .getServiceCondition(
        "dishDocument",
        "idRestaurant",
        "==",
        firebase.auth().currentUser.uid
      )
      .then((response) => {
        const state = [];
        response.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setDish(state);
      })
      .catch((e) => console.log(e));
  };

  //Crear o editar platos
  const addDish = (object) => {
    FireRequest()
      .postService("dishDocument", {
        ...object,
        price: Number(object.price),
      })
      .then(() => console.log("Se cargó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al cargar en FireStore: ", error)
      );
    getDishes();
  };

  //Editar plato seleccionado
  const editDish = (object) => {
    FireRequest()
      .updateService("dishDocument", currentDish, {
        ...object,
        price: Number(object.price),
      })
      .then(() => console.log("Se cargó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al cargar en FireStore: ", error)
      );
  };

  //eliminar platos
  const deleteDish = () => {
    setShowAlert(false);
    FireRequest()
      .deleteService("dishDocument", currentDish)
      .then(() => {
        console.log("Document eliminado correctamente!");
      })
      .catch((error) => {
        console.error("Error eliminando el plato: ", error);
      });
    setCurrentDish("");
    getDishes();
  };

  //estructura de cards de platos
  const DishesCard = dish.map((todo, i) => {
    return (
      <div className="card__dish__cont" key={`0${todo.id}`}>
        <img
          key={`1${todo.id}`}
          className="card__dish--image"
          src={todo.imagePath}
          alt="imageDish"
        />
        <div className="card__dish--cont">
          <div className="dish__name" key={`2${todo.id}`}>
            {todo.dishName}
          </div>
          <div className="dish__method">
            <IconButton
              key={`3${todo.id}`}
              aria-label="editar"
              onClick={() => {
                setCurrentDish(todo.id);
                handleShow();
              }}
            >
              <Edit size="small" color="primary" />
            </IconButton>
            <IconButton
              key={`4${todo.id}`}
              aria-label="eliminar"
              onClick={() => {
                setCurrentDish(todo.id);
                handleOpenAlert();
              }}
            >
              <HighlightOff size="small" color="secondary" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container__dishes">
      <div className="container__cards">
        <h6 className="tittle__header">Platos</h6>
        <div className="card__main">
          <div className="card__button--add">
            <IconButton
              color="primary"
              aria-label="Añadir plato"
              onClick={handleShow}
            >
              <Add />
            </IconButton>
          </div>

          <div className="card__dish">{DishesCard}</div>
        </div>
        <ModalDish
          show={show}
          close={handleClose}
          {...{
            addOrEdit: addDish,
            idDish: currentDish,
          }}
        />
        <DeleteModal
          name={"eliminar el plato del menú"}
          open={showAlert}
          close={handleCloseAlert}
          delete={deleteDish}
        />
      </div>
      <div className="container__add">
        <h6 className="tittle__header">Adiciones</h6>
        <div className="container__add--aditions">
          <AdditionalDish />
        </div>
      </div>
    </div>
  );
}

export default DishesPage;
