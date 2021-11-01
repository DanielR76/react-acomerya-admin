import React, { useState, useEffect } from "react";
import DeleteModal from "../components/DeleteModal";
import moment from "moment";

import { useReservation } from "../hooks/useReservation";

const ReservationPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const handleOpenAlert = () => setShowAlert(true);
  const handleCloseAlert = (action) => setShowAlert(action);
  const [currentId, setCurrentId] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const {
    reservations,
    accepts,
    rejects,
    editReservation,
    getReservations,
    getAcceptsR,
    getRejectsR,
  } = useReservation(currentId);

  useEffect(() => {
    getReservations();
    getAcceptsR();
    getRejectsR();
  }, []);

  //Change reservation status
  const handleStatus = () => {
    setShowAlert(false);
    editReservation({ status: selectStatus });
    setSelectStatus("");
    setCurrentId("");
  };

  const requestPending = reservations.map((element) => (
    <div className="card__reservation" key={element}>
      <div className="card__reservation--header">
        <label>{element.requestNumber} </label>
      </div>
      <div className="card__reservation--body">
        <div className="reservation__name">
          <label className="reservation__firts">Nombre: </label>
          <label className="reservation__second">{element.name}</label>
        </div>
        <div className="reservation__date">
          <label className="reservation__firts">Fecha: </label>
          <label className="reservation__second">
            {moment(element.date.toMillis()).format("LLL")}
          </label>
        </div>
        <div className="reservation__amount">
          <label className="reservation__firts">Cantidad: </label>
          <label className="reservation__second">{element.quantity}</label>
        </div>
        <div className="reservation__description">
          <label className="reservation__firts">Descripcion: </label>
          <label className="reservation__second">{element.summary}</label>
        </div>
      </div>
      <div className="card__reservation--footer">
        <button
          className="accept"
          onClick={() => {
            setCurrentId(element.id);
            handleOpenAlert();
            setSelectStatus("aceptado");
          }}
        >
          Aceptar
        </button>
        <button
          className="reject"
          onClick={() => {
            setCurrentId(element.id);
            handleOpenAlert();
            setSelectStatus("rechazado");
          }}
        >
          Rechazar
        </button>
      </div>
    </div>
  ));

  const requestAccept = accepts.map((element) => (
    <div className="card__reservation">
      <div className="card__reservation--header--accept">
        <label>{element.requestNumber} </label>
      </div>
      <div className="card__reservation--body">
        <div className="reservation__name">
          <label className="reservation__firts">Nombre: </label>
          <label className="reservation__second">{element.name}</label>
        </div>
        <div className="reservation__date">
          <label className="reservation__firts">Fecha: </label>
          <label className="reservation__second">
            {moment(element.date.toMillis()).format("LLL")}
          </label>
        </div>
        <div className="reservation__amount">
          <label className="reservation__firts">Cantidad: </label>
          <label className="reservation__second">{element.quantity}</label>
        </div>
        <div className="reservation__description">
          <label className="reservation__firts">Descripcion: </label>
          <label className="reservation__second">{element.summary}</label>
        </div>
      </div>
    </div>
  ));

  const requestReject = rejects.map((element) => (
    <div className="card__reservation">
      <div className="card__reservation--header--reject">
        <label> {element.requestNumber} </label>
      </div>
      <div className="card__reservation--body">
        <div className="reservation__name">
          <label className="reservation__firts">Nombre: </label>
          <label className="reservation__second">{element.name}</label>
        </div>
        <div className="reservation__date">
          <label className="reservation__firts">Fecha: </label>
          <label className="reservation__second">
            {moment(element.date.toMillis()).format("LLL")}
          </label>
        </div>
        <div className="reservation__amount">
          <label className="reservation__firts">Cantidad: </label>
          <label className="reservation__second">{element.quantity}</label>
        </div>
        <div className="reservation__description">
          <label className="reservation__firts">Descripcion: </label>
          <label className="reservation__second">{element.summary}</label>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container__reservation">
      <div className="reservation__waiting">
        <h6 className="reservation__tittle">Pendientes</h6>
        {requestPending}
      </div>
      <div className="reservation__accept">
        <h6 className="reservation__tittle">Aprobadas</h6>
        {requestAccept}
      </div>
      <div className="reservation__reject">
        <h6 className="reservation__tittle">Rechazadas</h6>
        {requestReject}
      </div>
      <DeleteModal
        name={
          selectStatus === "aceptado"
            ? "aceptar la reserva "
            : "rechazar la reserva"
        }
        open={showAlert}
        close={handleCloseAlert}
        remove={handleStatus}
      />
    </div>
  );
};

export default ReservationPage;
