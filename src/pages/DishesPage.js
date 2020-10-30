import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ModalDish from '../components/ModalDish'
import AdditionalDish from '../components/AdditionalDish'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import * as firebase from 'firebase'
import { db } from '../utils/firebase'

function DishesPage() {

    //Mostrar u ocultar modal
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        setTimeout(() => { setCurrentDish('') }, 1000)
    }
    const handleShow = () => setShow(true)

    //Obtener platos de firebase
    const [dish, setDish] = useState([])
    const getDishes = async () => {
        db.collection("dishDocument").where("idRestaurant", "==", firebase.auth().currentUser.uid)
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setDish(state)
            })
    }
    useEffect(() => {
        getDishes()
    }, [])

    const [currentDish, setCurrentDish] = useState('')

    //Crear o editar platos
    const addOrEditDish = async (object) => {
        if (currentDish === '') {
            await db.collection('dishDocument').doc().set({ ...object, price: Number(object.price) })
                .then(() => console.log("Se cargó correctamente al documento"))
                .catch(error => console.error("Hubo un error al cargar en FireStore: ", error))
        } else {
            console.log(object)
            await db.collection('dishDocument').doc(currentDish).update({ ...object, price: Number(object.price) })
                .then(() => console.log("Se actualizó correctamente al documento"))
                .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error))
            setCurrentDish('')
        }
    }

    //eliminar platos
    const deleteDish = async (id) => {
        await db.collection("dishDocument").doc(id).delete()
            .then(() => { console.log("Document eliminado correctamente!") })
            .catch(error => { console.error("Error eliminando el plato: ", error) })
    }

    //estructura de cards de platos
    const DishesCard = dish.map((todo, i) => {
        return (
            <div className="card__dish__cont" key={`0${todo.id}`} >
                <img
                    key={`1${todo.id}`}
                    className="card__dish--image"
                    src={todo.imagePath}
                    alt="imageDish" />
                <div className="card__dish--cont">
                    <div className="dish__name" key={`2${todo.id}`}>
                        {todo.dishName}
                    </div>
                    <div className="dish__method">
                        <IconButton
                            key={`3${todo.id}`}
                            aria-label="editar"
                            onClick={() => {
                                setCurrentDish(todo.id)
                                handleShow()
                            }}>
                            <EditIcon
                                size="small"
                                color="primary"
                            />
                        </IconButton>
                        <IconButton
                            key={`4${todo.id}`}
                            aria-label="eliminar"
                            onClick={() => { deleteDish(todo.id) }}>
                            <DeleteIcon
                                size="small"
                                color="secondary"
                            />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="container__dishes">
            <div className="container__cards">
                <h6 className='tittle__header'>Platos</h6>
                <div className="card__main">
                    <div className="card__button--add">
                        <IconButton
                            color="primary"
                            aria-label="Añadir plato"
                            onClick={handleShow}>
                            <AddIcon />
                        </IconButton>
                    </div>

                    <div className="card__dish">
                        {DishesCard}
                    </div>
                </div>
                <ModalDish
                    show={show}
                    close={handleClose}
                    {...({
                        addOrEdit: addOrEditDish, idDish: currentDish
                    })} />
            </div>
            <div className="container__add">
                <h6 className='tittle__header'>Adiciones</h6>
                <div className="container__add--aditions">
                    <AdditionalDish />
                </div>
            </div>
        </div>
    )
}

export default DishesPage
