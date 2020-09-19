import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ModalDish from '../components/ModalDish'
import { Fab } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from '../utils/firebase'

function DishesPage(props) {

    //Mostrar u ocultar modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Obtener platos de firebase
    const [dish, setDish] = useState([])
    const getDishes = async () => {
        db.collection("dishDocument").where("restaurant", "==", 123465)
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
        if (currentDish === '') {
            await db.collection('dishDocument').doc().set(linkObject)
                .then(() => console.log("Se cargó correctamente al documento"))
                .catch(error => console.error("Hubo un error al cargar en FireStore: ", error))
        } else {
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
    const platos = dish.map((todo, i) => {
        return (
            <div className="col-md-3">
                <div className="card mt-3">
                    <Card.Img variant="top" src={todo.imagePath} />
                    <Card.Body>
                        <Card.Title>
                            {todo.dishName}
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="editar"
                                onClick={() => {
                                    setCurrentDish(todo.id)
                                    handleShow()
                                }}>
                                <EditIcon />
                            </Fab>
                            <IconButton aria-label="eliminar">
                                <DeleteIcon
                                    onClick={() => {
                                        deleteDish(todo.id)
                                    }} />
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
                <Fab
                    color="primary"
                    aria-label="Añadir plato"
                    onClick={handleShow}>
                    <AddIcon />
                </Fab>
                <div className="form-group">
                </div>
                <div className="containerext">
                    <div className="row mt-5">
                        {platos}
                    </div>
                </div>
                <ModalDish show={show} close={handleClose} /* addOrEdit={addOrEditDish} */ {...({ addOrEdit: addOrEditDish, idDish: currentDish })} />
            </div>
            <div className="container__add">

            </div>
        </div>
    )
}

export default DishesPage
