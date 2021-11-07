import { useState, useContext } from "react";

import FireRequest from "../services/Request";
import { AuthContext } from "../context/Auth";

export const useCodesService = () => {
  const [authState] = useContext(AuthContext);
  const [codes, setCodes] = useState([]);

  const getListOfCodes = () => {
    FireRequest()
      .getServiceCondition("codesDocument", "idRestaurant", authState.user)
      .then((response) => {
        let state = [];
        response.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setCodes(state);
      })
      .catch((e) => console.log("Ha ocurrido un error", e));
  };

  //Agregar un codigo
  const createCode = (element) => {
    FireRequest()
      .postService("codesDocument", element)
      .then(() => {
        console.log("Se cargó correctamente al documento");
        getListOfCodes();
      })
      .catch((error) =>
        console.error("Hubo un error al cargar en FireStore: ", error)
      );
  };

  //Eliminar codigo por id
  const deleteCode = (currentId) => {
    FireRequest()
      .deleteService("codesDocument", currentId)
      .then(() => {
        console.log("Document eliminado correctamente!");
        getListOfCodes();
      })
      .catch((error) => {
        console.error("Error eliminando el codigo: ", error);
      });
  };

  return { codes, getListOfCodes, createCode, deleteCode };
};
