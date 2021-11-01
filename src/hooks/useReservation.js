import { useState, useContext } from "react";

import FireRequest from "../services/Request";
import { db } from "../utils/firebase";

import { AuthContext } from "../context/Auth";

export const useReservation = (currentId) => {
  const [authState] = useContext(AuthContext);
  const [reservations, setReservation] = useState([]);
  const [accepts, setAccepts] = useState([]);
  const [rejects, setRejects] = useState([]);

  //Get list of reservations pending
  const getReservations = async () => {
    db.collection("reservationDocument")
      .where("idRestaurant", "==", authState.user)
      .where("status", "==", "pendiente")
      .onSnapshot((querySnapshot) => {
        const state = [];
        querySnapshot.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setReservation(state);
      });
  };

  //Get list of reservation accepted
  const getAcceptsR = async () => {
    db.collection("reservationDocument")
      .where("idRestaurant", "==", authState.user)
      .where("status", "==", "aceptado")
      .onSnapshot((querySnapshot) => {
        const state = [];
        querySnapshot.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setAccepts(state);
      });
  };

  //Get list of reservation rejected
  const getRejectsR = async () => {
    db.collection("reservationDocument")
      .where("idRestaurant", "==", authState.user)
      .where("status", "==", "rechazado")
      .onSnapshot((querySnapshot) => {
        const state = [];
        querySnapshot.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setRejects(state);
      });
  };

  //Change reservation status
  const editReservation = (object) => {
    FireRequest()
      .updateService("reservationDocument", currentId, object)
      .then(() => console.log("Se actualizó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al actualizar en FireStore: ", error)
      );
  };

  return {
    reservations,
    accepts,
    rejects,
    editReservation,
    getReservations,
    getAcceptsR,
    getRejectsR,
  };
};
