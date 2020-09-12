import React, { useState } from 'react'
import { Modal, Card } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import { db, storage } from '../utils/firebase'

function ModalDish(props) {

    const [imagen, setImage] = useState(null)

    //Inicializar estado
    const state = {
        restaurant: 123465,
        status: "active",
        imagePath: null
    }

    //funcion para guardar imagen en storage y luego traer la ruta
    const handleLoad = e => {
        const file = e.target.files[0]
        console.log(e.target.files[0])
        const uploadImage = storage.ref(`images/${file.name}`)
        const task = uploadImage.put(file)

        task.on('state_changed', (snapshot) => { },
            (error) => {
                console.error(error.message)
            }, () => {
                storage.ref("images").child(file.name).getDownloadURL().then(url => setImage(url))
            })
    }

    //funcion para agregar platos a la coleccion
    const addDish = async (linkObject) => {
        console.log('nuevo plato')
        await db.collection('dishDocument').doc().set(linkObject)
    }


    const [values, setValues] = useState(state)

    //Funcion para guardar la imagen y los textos en values
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            imagePath: imagen
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        addDish(values)
        console.log(values)
    }

    return (
        <div className="modaldish" >
            <Modal
                show={props.mostrar}
                onHide={props.ocultar}
                backdrop="static"
                centered
                dialogClassName="modal-90w">

                <Modal.Header closeButton id="id_header_modal">
                    <Modal.Title>Agregar plato</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <form className="modaldish__container" onSubmit={handleSubmit}  >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img src={imagen}></Card.Img>
                            <input
                                type="file"
                                onChange={handleLoad.bind(this)} />
                        </Card>
                        <div className="modaldish__container-input" >
                            <TextField
                                id="standard-basic"
                                label="Nombre plato"
                                name="dishName"
                                value={state.dishName}
                                onChange={handleChange}
                                required="true" />
                            <TextField
                                id="standard-textarea"
                                label="Descripción"
                                name="description"
                                value={state.description}
                                multiline
                                onChange={handleChange}
                                required="true" />
                            <TextField
                                id="standard-basic"
                                label="Ingredientes"
                                name="ingredient"
                                value={state.ingredient}
                                onChange={handleChange}
                                required="true" />
                            <TextField
                                id="standard-basic"
                                label="Precio"
                                name="price"
                                value={state.price}
                                onChange={handleChange}
                                required="true" />
                            <button
                                className="login__form--submit"
                                onClick={props.ocultar}>
                                Continuar
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                {/*                 <form >
                    <Modal.Footer >
                        <button className="login__form--submit">Continuar</button>
                    </Modal.Footer>
                </form> */}

            </Modal>
        </div>
    )

}

export default ModalDish

