import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import { db } from '../utils/firebase'

function ReservationPage() {

    var reserv

    //Obtener lista de reservas pending
    const [reservations, setReservation] = useState([])
    const getReservations = async () => {
        db.collection("reservationDocument").where("idRestaurant", "==", firebase.auth().currentUser.uid).where("status", "==", "pendiente")
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setReservation(state)
            })
    }

    //Obtener lista de reservas accept
    const [accepts, setAccepts] = useState([])
    const getAcceptsR = async () => {
        db.collection("reservationDocument").where("idRestaurant", "==", firebase.auth().currentUser.uid).where("status", "==", "aceptado")
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setAccepts(state)
            })
    }

    //Obtener lista de reservas reject
    const [rejects, setRejects] = useState([])
    const getRejectsR = async () => {
        db.collection("reservationDocument").where("idRestaurant", "==", firebase.auth().currentUser.uid).where("status", "==", "rechazado")
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setRejects(state)
            })
    }

    useEffect(() => {
        getReservations()
        getAcceptsR()
        getRejectsR()
    }, [])


    //Cambiar estado a una reserva
    const editReservation = async (object) => {
        console.log(object)
        await db.collection('reservationDocument').doc(reserv).update(object)
            .then(() => console.log("Se actualizó correctamente al documento"))
            .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error))

    }

    const handleAccept = () => {
        editReservation({ status: "aceptado" })
    }

    const handleReject = () => {
        editReservation({ status: "rechazado" })
    }

    const requestPending = reservations.map((element, index) => {
        let datePending = new Date(element.date.toMillis())
        return (
            <div className="card__reservation">
                <div className="card__reservation--header">
                    <label>Solicitud # {element.requestNumber} </label>
                </div>
                <div className="card__reservation--body">
                    <div className="reservation__name">
                        <label>Nombre: </label>
                        <label>{element.name}</label>
                    </div>
                    <div className="reservation__date">
                        <label>Fecha: </label>
                        <label>{`${datePending.getDate()}/${datePending.getMonth()}/${datePending.getFullYear()} ${datePending.getMinutes()}:${datePending.getSeconds()}`}</label>
                    </div>
                    <div className="reservation__amount">
                        <label>Cantidad: </label>
                        <label>{element.quantity}</label>
                    </div>
                    <div className="reservation__description">
                        <label>Descripcion: </label>
                        <label>{element.summary}</label>
                    </div>
                </div>
                <div className="card__reservation--footer">
                    <button
                        className="accept"
                        onClick={() => {
                            reserv = element.id
                            handleAccept()
                        }}>
                        Aceptar</button>
                    <button
                        className="reject"
                        onClick={() => {
                            reserv = element.id
                            handleReject()
                        }}>
                        Rechazar</button>
                </div>
            </div>
        )
    })

    const requestAccept = accepts.map(element => {
        let dateAccept = new Date(element.date.toMillis())
        return (
            <div className="card__reservation">
                <div className="card__reservation--header--accept">
                    <label > Solicitud # {element.requestNumber} </label>
                </div>
                <div className="card__reservation--body">
                    <div className="reservation__name">
                        <label>Nombre: </label>
                        <label>{element.name}</label>
                    </div>
                    <div className="reservation__date">
                        <label>Fecha: </label>
                        <label>{`${dateAccept.getDate()}/${dateAccept.getMonth()}/${dateAccept.getFullYear()} ${dateAccept.getMinutes()}:${dateAccept.getSeconds()}`}</label>
                    </div>
                    <div className="reservation__amount">
                        <label>Cantidad: </label>
                        <label>{element.quantity}</label>
                    </div>
                    <div className="reservation__description">
                        <label>Descripcion: </label>
                        <label>{element.summary}</label>
                    </div>
                </div>
            </div>
        )
    })

    const requestReject = rejects.map(element => {
        let dateReject = new Date(element.date.toMillis())
        return (
            <div className="card__reservation">
                <div className="card__reservation--header--reject">
                    <label> Solicitud # {element.requestNumber} </label>
                </div>
                <div className="card__reservation--body">
                    <div className="reservation__name">
                        <label>Nombre: </label>
                        <label>{element.name}</label>
                    </div>
                    <div className="reservation__date">
                        <label>Fecha: </label>
                        <label>{`${dateReject.getDate()}/${dateReject.getMonth()}/${dateReject.getFullYear()} ${dateReject.getMinutes()}:${dateReject.getSeconds()}`}</label>
                    </div>
                    <div className="reservation__amount">
                        <label>Cantidad: </label>
                        <label>{element.quantity}</label>
                    </div>
                    <div className="reservation__description">
                        <label>Descripcion: </label>
                        <label>{element.summary}</label>
                    </div>
                </div>
            </div>
        )
    })

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
        </div>
    )
}

export default ReservationPage