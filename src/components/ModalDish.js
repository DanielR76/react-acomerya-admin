import React, { useState, useEffect } from 'react'
import { Modal, Card } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch';
import { db, storage } from '../utils/firebase'
import * as firebase from 'firebase'

function ModalDish(props) {

    //Inicializar estado
    const initialStateValues = {
        description: "",
        dishName: "",
        imagePath: null,
        ingredient: "",
        price: "",
        idRestaurant: firebase.auth().currentUser.uid,
        status: true
    }

    const [values, setValues] = useState(initialStateValues)

    //Obtener plato por el id
    const getDishById = async (id) => {
        const doc = await db.collection('dishDocument').doc(id).get()
        setValues({ ...doc.data() })
    }

    useEffect(() => {
        if (props.idDish === '') {
            setValues({ ...initialStateValues })
        } else {
            getDishById(props.idDish)
        }
    }, [props.idDish])

    //Guardar imagen en storage y luego traer la ruta
    const handleLoad = e => {
        const file = e.target.files[0]
        const uploadImage = storage.ref(`images/${file.name}`)
        const task = uploadImage.put(file)

        task.on('state_changed', (snapshot) => { },
            (error) => { console.error(error.message) },
            () => { storage.ref("images").child(file.name).getDownloadURL().then(url => setValues({ ...values, imagePath: url })) })
    }

    //Guardar los datos en values
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            status: e.target.checked
        })
    }

    const handleSubmit = e => {
        console.log('se envia valor')
        e.preventDefault()
        console.log(values)
        props.addOrEdit(values)
        setValues({ ...initialStateValues })
    }


    return (
        <div className="modaldish" >
            <Modal
                show={props.show}
                onHide={props.close}
                backdrop="static"
                centered
                dialogClassName="modal-90w">

                <Modal.Header closeButton id="id_header_modal">
                    <Modal.Title>{props.idDish === '' ? 'Agregar plato' : 'Editar plato'}</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <form className="modaldish__container" onSubmit={handleSubmit}  >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img src={values.imagePath}></Card.Img>
                            <input
                                type="file"
                                onChange={handleLoad.bind(this)} />
                        </Card>
                        <div className="modaldish__container-input" >
                            <TextField
                                id="standard-basic"
                                label="Nombre plato"
                                name="dishName"
                                value={values.dishName}
                                onChange={handleChange}
                                required="true" />
                            <TextField
                                id="standard-textarea"
                                label="Descripción"
                                name="description"
                                value={values.description}
                                multiline
                                onChange={handleChange}
                                required="true" />
                            <TextField
                                id="standard-basic"
                                label="Ingredientes"
                                name="ingredient"
                                value={values.ingredient}
                                onChange={handleChange}
                                required="true" />
                            <TextField
                                id="standard-basic"
                                label="Precio"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                required="true" />
                            <FormControlLabel
                                control={<Switch
                                    checked={values.status}
                                    onChange={handleChange}
                                    name="status" />}
                            />

                            <button
                                className="login__form--submit"
                                onClick={props.close}>
                                {props.idDish === '' ? 'Crear' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div >
    )

}

export default ModalDish

