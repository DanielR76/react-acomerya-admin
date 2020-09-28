import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { db } from '../utils/firebase'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const AdditionalDish = (props) => {

    const initialStateValues = {
        idRestaurant: 123465,
        name: "",
        price: ""
    }

    const [formAddition, setFormAddition] = useState(false)

    const [additionalValue, setAdditionalValue] = useState(initialStateValues)

    //Obtener adiciones de firebase
    const [additional, setAdditional] = useState([])
    const getAdditional = async () => {
        db.collection("additionalDocument").where("idRestaurant", "==", 123465)
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setAdditional(state)
            })
    }
    useEffect(() => {
        getAdditional()
    }, [])

    const [currentId, setCurrentId] = useState('')

    //Obtener adicion por el id
    const getAdditionById = async (id) => {
        const doc = await db.collection('additionalDocument').doc(id).get()
        setAdditionalValue({ ...doc.data() })
        console.log(additionalValue)
    }

    //Crear o editar adiciones
    const addOrEditDish = async (linkObject) => {
        if (currentId === '') {
            await db.collection('additionalDocument').doc().set(linkObject)
                .then(() => console.log("Se cargó correctamente al documento"))
                .catch(error => console.error("Hubo un error al cargar en FireStore: ", error))
        } else {
            await db.collection('additionalDocument').doc(currentId).update(linkObject)
                .then(() => console.log("Se actualizó correctamente al documento"))
                .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error))
            setCurrentId('')
        }
    }

    //eliminar adiciones
    const deleteAddition = async (id) => {
        console.log(id)
        await db.collection("additionalDocument").doc(id).delete()
            .then(() => { console.log("Document eliminado correctamente!") })
            .catch(error => { console.error("Error eliminando el plato: ", error) })
    }

    //Guardar los datos en values
    const handleChange = e => {
        setAdditionalValue({
            ...additionalValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        console.log(`se envia valor `)
        e.preventDefault()
        addOrEditDish(additionalValue)
        setAdditionalValue({ ...initialStateValues })
        setFormAddition(false)
    }

    //Adicionales
    const aditionalsCard = additional.map((val) => {
        return (
            <div className="container__add--aditions--values">
                <div className="container__add--aditions--form">
                    <div >
                        <label className="container__add--addition">
                            {val.name}
                        </label>
                    </div>
                    <div>
                        <label className="container__add--price">
                            {val.price}
                        </label>
                    </div>
                </div>
                <div className="container__delete__edit--dish">
                    <IconButton
                        aria-label="editar"
                        onClick={() => {
                            getAdditionById(val.id)
                            setCurrentId(val.id)
                        }}>
                        <EditIcon
                            size="small"
                            color="Inherit"
                        />
                    </IconButton>
                    <IconButton
                        aria-label="eliminar"
                        onClick={() => deleteAddition(val.id)}>
                        <DeleteIcon
                            size="small"
                            color="secondary"
                        />
                    </IconButton>
                </div>

            </div>
        )
    })

    return (
        <div className="container__form">
            {aditionalsCard}
            {currentId || formAddition ?
                <form
                    className="form"
                    onSubmit={additionalValue.price !== '' && additionalValue.name !== '' ? handleSubmit : null}>
                    <div className="form__add-edit">
                        <div className="form__addition">
                            <TextField
                                id="standard-basic"
                                label="nombre"
                                name="name"
                                value={additionalValue.name}
                                onChange={handleChange}
                                fullWidth="true"
                                required="true" />
                        </div>
                        <div className="form__addition">
                            <TextField
                                id="standard-basic"
                                label="Precio"
                                name="price"
                                value={additionalValue.price}
                                onChange={handleChange}
                                fullWidth="true"
                                required="true" />
                        </div>
                    </div>
                    <button
                        className="login__form--submit"
                        type="submit">
                        {currentId ? 'Guardar' : 'Agregar'}
                    </button>
                </form>
                :
                <button
                    className="login__form--submit"
                    onClick={() => setFormAddition(true)}>
                    Adicionar
                </button>

            }
        </div>
    )
}

export default AdditionalDish
