import React, { useState, useEffect } from 'react'
import DeleteModal from '../components/DeleteModal'
import firebase from 'firebase'
import { db } from '../utils/firebase'

function ReservationPage() {

    const [showAlert, setShowAlert] = useState(false)
    const handleOpenAlert = () => setShowAlert(true)
    const handleCloseAlert = (action) => setShowAlert(action)
    const [currentId, setCurrentId] = useState('')
    const [selectStatus, setSelectStatus] = useState('')
    //var reserv

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


    //Cambiar estado de una reserva en BD
    const editReservation = async (object) => {
        await db.collection('reservationDocument').doc(currentId).update(object)
            .then(() => console.log("Se actualizó correctamente al documento"))
            .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error))
    }

    //Cambiar estado de reserva seleccionada
    const handleStatus = () => {
        setShowAlert(false)
        switch (selectStatus) {
            case 'accept':
                editReservation({ status: "aceptado" })
                break;
            case 'reject':
                editReservation({ status: "rechazado" })
                break;
            default:
                break;
        }
        setSelectStatus('')
        setCurrentId('')
    }

    const requestPending = reservations.map((element) => {
        let datePending = new Date(element.date.toMillis())
        return (
            <div className="card__reservation">
                <div className="card__reservation--header">
                    <label>{element.requestNumber} </label>
                </div>
                <div className="card__reservation--body">
                    <div className="reservation__name">
                        <label>Nombre: </label>
                        <label>{element.name}</label>
                    </div>
                    <div className="reservation__date">
                        <label>Fecha: </label>
                        <label>{`${datePending.getDate()}/${datePending.getMonth()}/${datePending.getFullYear()} ${datePending.getHours()}:${datePending.getMinutes()}`}</label>
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
                            //reserv = element.id
                            setCurrentId(element.id)
                            handleOpenAlert()
                            setSelectStatus('accept')
                            /* handleAccept() */
                        }}>
                        Aceptar</button>
                    <button
                        className="reject"
                        onClick={() => {
                            /* reserv = element.id */
                            setCurrentId(element.id)
                            handleOpenAlert()
                            setSelectStatus('reject')
                            /* handleReject() */
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
                    <label >{element.requestNumber} </label>
                </div>
                <div className="card__reservation--body">
                    <div className="reservation__name">
                        <label>Nombre: </label>
                        <label>{element.name}</label>
                    </div>
                    <div className="reservation__date">
                        <label>Fecha: </label>
                        <label>{`${dateAccept.getDate()}/${dateAccept.getMonth()}/${dateAccept.getFullYear()} ${dateAccept.getHours()}:${dateAccept.getMinutes()}`}</label>
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
                    <label> {element.requestNumber} </label>
                </div>
                <div className="card__reservation--body">
                    <div className="reservation__name">
                        <label>Nombre: </label>
                        <label>{element.name}</label>
                    </div>
                    <div className="reservation__date">
                        <label>Fecha: </label>
                        <label>{`${dateReject.getDate()}/${dateReject.getMonth()}/${dateReject.getFullYear()} ${dateReject.getHours()}:${dateReject.getMinutes()}`}</label>
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
            <DeleteModal
                name={selectStatus === 'accept' ? 'aceptar la reserva ' : 'rechazar la reserva'}
                open={showAlert}
                close={handleCloseAlert}
                delete={handleStatus} />
        </div>
    )
}

export default ReservationPage