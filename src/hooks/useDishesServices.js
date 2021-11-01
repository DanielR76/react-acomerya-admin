import { useState, useContext } from "react";

import FireRequest from "../services/Request";
import { AuthContext } from "../context/Auth";

const initialArray = {
  data: [],
  loading: false,
};

export const useDishesServices = () => {
  const [authState] = useContext(AuthContext);
  const [listOfDishes, setListOfDishes] = useState({ ...initialArray });

  //Get all dishes and set state
  const getDishes = () => {
    setListOfDishes({ ...listOfDishes, loading: true });
    FireRequest()
      .getServiceCondition("dishDocument", "idRestaurant", authState.user)
      .then((response) => {
        const state = [];
        response.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setListOfDishes({ data: state, loading: false });
      })
      .catch((e) => {
        setListOfDishes({ ...initialArray });
        console.log(e);
      });
  };

  //Create new dish
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

  //Edit selected dish
  const editDish = (currentDish, payload) => {
    FireRequest()
      .updateService("dishDocument", currentDish, {
        ...payload,
        price: Number(payload.price),
      })
      .then(() => console.log("Se cargó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al cargar en FireStore: ", error)
      );
    getDishes();
  };

  //Delete selected dish
  const deleteDish = (currentDish) => {
    FireRequest()
      .deleteService("dishDocument", currentDish)
      .then(() => {
        console.log("Document eliminado correctamente!");
      })
      .catch((error) => {
        console.error("Error eliminando el plato: ", error);
      });
    getDishes();
  };

  return {
    listOfDishes,
    getDishes,
    addDish,
    editDish,
    deleteDish,
  };
};
