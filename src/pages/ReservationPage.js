import React, { useState, useEffect } from "react";

import DeleteModal from "../components/DeleteModal";
import ReservationCard from "../components/ReservationCard";

import { useReservationService } from "../hooks/useReservationService";

const initialState = {
  id: "",
  status: "",
};

const ReservationPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [reservation, setReservation] = useState({ ...initialState });
  const {
    reservations,
    accepts,
    rejects,
    editReservation,
    getReservations,
    getAcceptsR,
    getRejectsR,
  } = useReservationService(reservation.id);

  useEffect(() => {
    getReservations();
    getAcceptsR();
    getRejectsR();
  }, []);

  const handleChangeStatus = (id, status) => {
    setShowAlert(true);
    setReservation({ id, status });
  };

  const handleConfirmAlert = () => {
    setShowAlert(false);
    editReservation({ status: reservation.status });
    setReservation({ ...initialState });
  };

  const handleCloseAlert = (action) => setShowAlert(action);

  return (
    <div className="container__reservation">
      <div className="reservation__status">
        <h6 className="reservation__tittle">Pendientes</h6>
        {reservations.map((element, index) => (
          <ReservationCard
            element={element}
            index={index}
            type="pending"
            onClick={handleChangeStatus}
          />
        ))}
      </div>
      <div className="reservation__status">
        <h6 className="reservation__tittle">Aprobadas</h6>
        {accepts.map((element, index) => (
          <ReservationCard element={element} index={index} type="accept" />
        ))}
      </div>
      <div className="reservation__status">
        <h6 className="reservation__tittle">Rechazadas</h6>
        {rejects.map((element, index) => (
          <ReservationCard element={element} index={index} type="reject" />
        ))}
      </div>
      <DeleteModal
        name={
          reservation.status === "aceptado"
            ? "aceptar la reserva "
            : "rechazar la reserva"
        }
        open={showAlert}
        close={handleCloseAlert}
        remove={handleConfirmAlert}
      />
    </div>
  );
};

export default ReservationPage;
