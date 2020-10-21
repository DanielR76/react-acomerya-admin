import React, { useState, useEffect } from 'react'
import IconMoney from '../assets/icon/iconos-moneda-01.svg'
import * as firebase from 'firebase'
import { db } from '../utils/firebase'


function OrdersPage() {

    //Obtener lista de reservas pending
    const [requests, setRequests] = useState([])
    const [requestDish, setRequestDish] = useState('')
    const getRequest = async () => {
        db.collection("requestsDocument").where("idRestaurant", "==", firebase.auth().currentUser.uid).where("status", "==", "active")
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setRequests(state)
            })
    }

    useEffect(() => {
        getRequest()
    }, [])

    const [currentOrder, setCurrentOrder] = useState('')

    //Editar orden
    const edditOrder = async (object) => {
        console.log(object)
        await db.collection('requestsDocument').doc(currentOrder).update(object)
            .then(() => console.log("Se actualizó correctamente al documento"))
            .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error))
    }

    const handlePaid = () => {
        if (currentOrder) {
            edditOrder({ status: "paid" })
            setRequestDish('')
        }
    }

    const dishesTable = requests.map((element, index) => {
        return (
            <div
                className="orders__table"
                key={element + index}>
                <button
                    className="orders__table--button"
                    onClick={() => {
                        setRequestDish(element)
                        setCurrentOrder(element.id)
                    }}
                >
                    {element.table}
                </button>
            </div>
        )
    })

    const dishesContain = () => {
        if (requestDish !== '') {
            let value = requestDish.dishes
            console.log(value)
            return (
                value.map((e) => {
                    return (
                        <div className="request__dishes--cards">
                            <div className="dishes__header">
                                <img src={e.imagePath} alt="imagen plato"></img>
                                <h6> {e.dishName} </h6>
                            </div>
                            <div className="dishes__body">
                                <div>{e.description} </div>
                            </div>
                            <div className="dishes__footer">
                                <img src={IconMoney} alt="icon" />
                                <div>{e.price}</div>
                            </div>
                        </div>
                    )
                }))
        } else {
            return (
                <div>
                    No ha seleccionado ningún pedido
                </div>
            )
        }
    }


    return (
        <div className="container__orders">
            <div className="request">
                <div className="request__orders">
                    {dishesTable}
                </div>
                <button
                    className="request__paid"
                    onClick={handlePaid}>
                    Pagado
                    </button>

            </div>
            <div className="container__orders--dishes">
                {dishesContain()}
            </div>
        </div>
    )

}

export default OrdersPage