import React from "react";
import moment from "moment";

const ReservationCard = ({ element, index, type, onClick }) => {
  return (
    <div className="card__reservation" key={index}>
      <div className={`card__reservation--header--${type}`}>
        <label>{element.requestNumber}</label>
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
      {type === "pending" && (
        <div className="card__reservation--footer">
          <button
            className="accept"
            onClick={() => onClick(element.id, "aceptado")}
          >
            Aceptar
          </button>
          <button
            className="reject"
            onClick={() => onClick(element.id, "rechazado")}
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
