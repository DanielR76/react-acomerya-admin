import { useState, useEffect } from "react";

import firebase from "firebase";
import { db } from "../utils/firebase";

export const useOrderService = (currentOrder) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequest();
  }, []);

  //Get list of pending reservations
  const getRequest = async () => {
    db.collection("requestsDocument")
      .where("idRestaurant", "==", firebase.auth().currentUser.uid)
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
  const edditOrder = async (object) => {
    console.log(object);
    await db
      .collection("requestsDocument")
      .doc(currentOrder)
      .update(object)
      .then(() => console.log("Se actualizó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al actualizar en FireStore: ", error)
      );
  };

  return { requests, edditOrder };
};
