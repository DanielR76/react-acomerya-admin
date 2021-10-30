import { useState, useEffect } from "react";

import firebase from "firebase";
import { db } from "../utils/firebase";

export const useReservation = (currentId) => {
  const [reservations, setReservation] = useState([]);
  const [accepts, setAccepts] = useState([]);
  const [rejects, setRejects] = useState([]);

  useEffect(() => {
    getReservations();
    getAcceptsR();
    getRejectsR();
  }, []);

  //Get list of reservations pending
  const getReservations = async () => {
    db.collection("reservationDocument")
      .where("idRestaurant", "==", firebase.auth().currentUser.uid)
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
      .where("idRestaurant", "==", firebase.auth().currentUser.uid)
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
      .where("idRestaurant", "==", firebase.auth().currentUser.uid)
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
  const editReservation = async (object) => {
    await db
      .collection("reservationDocument")
      .doc(currentId)
      .update(object)
      .then(() => console.log("Se actualizó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al actualizar en FireStore: ", error)
      );
  };

  return { reservations, accepts, rejects, editReservation };
};
