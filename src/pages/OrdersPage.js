import React, { useState, useEffect } from 'react'
import IconMoney from '../assets/icon/iconos-moneda-01.svg'
import firebase from 'firebase'
import { db } from '../utils/firebase'


function OrdersPage() {

    const [requests, setRequests] = useState([])
    const [requestDish, setRequestDish] = useState('')
    const [totalPrice, setTotalPrice] = useState('')

    //Obtener lista de reservas pending
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
            edditOrder({ status: "pagado" })
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
                        setTotalPrice(element.totalPrice)
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
                                <div className="dishes__body--ingredient">
                                    Ingredientes
                                    <div className="ingredient">
                                        {e.ingredient.map((ingre) => {
                                            return (
                                                <div >{ingre}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="dishes__body--addition">
                                    Adiciones
                                    <div className="addition">
                                        {e.addition.map((addit) => {
                                            return (
                                                <div >{addit}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="dishes__footer">
                                <div className="footer__amount">Cantidad: {e.quantity}</div>
                                <div className="footer__price">
                                    <img src={IconMoney} alt="icon" />
                                    <div>{e.priceAddition}</div>
                                </div>
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
                <div className="orders">
                    <div className="request__orders">
                        {dishesTable}
                    </div>
                </div>
                <div className="request__paid">
                    <div className="request__paid--money">
                        <img src={IconMoney} alt="icon" />
                        <div>
                            {totalPrice}
                        </div>
                    </div>
                    <button
                        onClick={handlePaid}>
                        Pagado
                </button>
                </div>

            </div>
            <div className="container__orders--dishes">
                <div className="request__dishes">
                    {dishesContain()}
                </div>
            </div>
        </div>
    )

}

export default OrdersPage