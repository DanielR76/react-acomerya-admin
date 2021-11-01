import { useState, useContext } from "react";

import FireRequest from "../services/Request";
import { db } from "../utils/firebase";

import { AuthContext } from "../context/Auth";

export const useOrderService = (currentOrder) => {
  const [authState] = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  //Get list of pending reservations
  const getRequest = async () => {
    db.collection("requestsDocument")
      .where("idRestaurant", "==", authState.user)
      .where("status", "==", "active")
      .onSnapshot((querySnapshot) => {
        const state = [];
        querySnapshot.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setRequests(state);
      });
  };

  //Edit order
  const edditOrder = (object) => {
    FireRequest()
      .updateService("requestsDocument", currentOrder, object)
      .then(() => console.log("Se actualizó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al actualizar en FireStore: ", error)
      );
  };

  return { requests, getRequest, edditOrder };
};
