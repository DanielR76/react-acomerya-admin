import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ModalDish from '../components/ModalDish'
import AdditionalDish from '../components/AdditionalDish'
import { Fab } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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
        db.collection("dishDocument").where("idRestaurant", "==", 123465)
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
    const addOrEditDish = async (linkObject) => {
        console.log('llea el dato')
        if (currentDish === '') {
            await db.collection('dishDocument').doc().set(linkObject)
                .then(() => console.log("Se cargó correctamente al documento"))
                .catch(error => console.error("Hubo un error al cargar en FireStore: ", error))
        } else {
            console.log(linkObject)
            await db.collection('dishDocument').doc(currentDish).update(linkObject)
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
            <div className="col-md-4">
                <div className="card mt-4">
                    <Card.Img variant="top" src={todo.imagePath} />
                    <Card.Body>
                        <Card.Title>
                            {todo.dishName}
                            <IconButton
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
                                aria-label="eliminar"
                                onClick={() => { deleteDish(todo.id) }}>
                                <DeleteIcon
                                    size="small"
                                    color="secondary"
                                />
                            </IconButton>
                        </Card.Title>
                    </Card.Body>
                </div>
            </div>
        )
    })

    return (
        <div className="container__dishes">

            <div className="container__cards">
                <h6 className='tittle__header'>Platos</h6>
                <IconButton
                    color="primary"
                    aria-label="Añadir plato"
                    onClick={handleShow}>
                    <AddIcon />
                </IconButton>
                <div className="form-group">
                </div>
                <div className="containerext">
                    <div className="row mt-3">
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
