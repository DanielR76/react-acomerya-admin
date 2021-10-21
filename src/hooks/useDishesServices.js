import { useState, useEffect } from "react";

import firebase from "firebase";
import FireRequest from "../services/Request";

export const useDishesServices = () => {
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

  return {
    dish,
    setCurrentDish,
    handleShow,
    show,
    showAlert,
    handleOpenAlert,
    handleCloseAlert,
    deleteDish,
    currentDish,
    addDish,
    handleClose,
  };
};
