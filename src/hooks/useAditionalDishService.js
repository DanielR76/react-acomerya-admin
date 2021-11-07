import { useState, useContext } from "react";

import FireRequest from "../services/Request";
import { AuthContext } from "../context/Auth";

export const useAditionalDishService = () => {
  const [authState] = useContext(AuthContext);
  const [listOfAdditions, setListOfAditions] = useState([]);
  const initialStateValues = {
    idRestaurant: authState.user,
    name: "",
    price: "",
  };
  const [additionalValue, setAdditionalValue] = useState({
    ...initialStateValues,
  });

  //Get aditionals food
  const getAdditional = () => {
    setAdditionalValue({ ...initialStateValues });
    FireRequest()
      .getServiceCondition("additionalDocument", "idRestaurant", authState.user)
      .then((response) => {
        const state = [];
        response.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setListOfAditions(state);
      })
      .catch(() => console.log("Ha ocurrido un error"));
  };

  //Get aditional by id
  const getAdditionById = (id) => {
    FireRequest()
      .getService("additionalDocument", id)
      .then((response) => {
        setAdditionalValue({ ...response.data() });
      })
      .catch((e) => console.log("Ha ocurrido un error", e));
  };

  //Create new aditional
  const addAditional = async () => {
    FireRequest()
      .postService("additionalDocument", {
        ...additionalValue,
        price: Number(additionalValue.price),
      })
      .then(() => console.log("Se cargó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al cargar en FireStore: ", error)
      );
    getAdditional();
  };

  //Edit exist aditional
  const editAditional = (currentIdForm) => {
    FireRequest()
      .updateService("additionalDocument", currentIdForm, {
        ...additionalValue,
        price: Number(additionalValue.price),
      })
      .then(() => console.log("Se actualizó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al actualizar en FireStore: ", error)
      );
    getAdditional();
  };

  //Delete aditional selected
  const deleteAddition = (currentId) => {
    FireRequest()
      .deleteService("additionalDocument", currentId)
      .then(() => {
        console.log("Document eliminado correctamente!");
      })
      .catch((error) => {
        console.error("Error eliminando el plato: ", error);
      });
  };

  return {
    additionalValue,
    listOfAdditions,
    setAdditionalValue,
    getAdditional,
    getAdditionById,
    addAditional,
    editAditional,
    deleteAddition,
  };
};
