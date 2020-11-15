import React, { useEffect, useState } from 'react'
import DeleteModal from './DeleteModal'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import firebase from 'firebase'
import { db } from '../utils/firebase'

function CodesRestaurant(props) {

    const [show, setShow] = useState(false)
    const handleOpen = () => setShow(true)
    const handleClose = (action) => setShow(action)
    const [currentId, setCurrentId] = useState('')

    const initialStateValues = {
        idRestaurant: firebase.auth().currentUser.uid,
        table: "",
        code: ""
    }

    const [newCode, setNewCode] = useState(initialStateValues)

    //Obtener codigos
    const [codes, setCodes] = useState([])
    const getCodes = async () => {
        db.collection('codesDocument').where("idRestaurant", "==", firebase.auth().currentUser.uid)
            .onSnapshot(querySnapshot => {
                let state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setCodes(state)
            })
    }

    useEffect(() => {
        getCodes()
    }, [])


    //Agregar un codigo
    const createCode = async (element) => {
        await db.collection('codesDocument').doc().set(element)
            .then(() => console.log("Se cargó correctamente al documento"))
            .catch(error => console.error("Hubo un error al cargar en FireStore: ", error))
    }

    //Eliminar codigo por id
    const deleteCode = async () => {
        setShow(false)
        await db.collection("codesDocument").doc(currentId).delete()
            .then(() => { console.log("Document eliminado correctamente!") })
            .catch(error => { console.error("Error eliminando el codigo: ", error) })
        setCurrentId('')
    }

    //Digitar texto
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewCode({
            ...newCode,
            [name]: value
        })
    }

    //Crear código
    const handleSubmit = (e) => {
        e.preventDefault()
        createCode(newCode)
        setNewCode({ ...initialStateValues })
    }

    //generar codigo aleatorio
    const generateCode = () => {
        const numberCode = Math.floor(Math.random() * 999999)
        setNewCode({
            ...newCode,
            code: numberCode
        })
    }

    const dataCodes = codes.map((element, index) => {
        return (
            <div className="code__item" key={index}>
                <h6>{element.table}</h6>
                <label >{element.code}</label>
                <IconButton
                    aria-label="eliminar"
                    onClick={() => {
                        handleOpen()
                        setCurrentId(element.id)
                    }}>
                    <HighlightOffIcon
                        size="small"
                        color="secondary"
                    />
                </IconButton>
            </div>
        )
    })

    return (
        <>
            <div className="code_contain">
                <h6 className="tittle__code"> Códigos por mesa</h6>
                {dataCodes}
            </div>
            <div className="form__add">
                <form /* onSubmit={handleSubmit} */>
                    <div className="form__add--table">
                        <TextField
                            id="standard-basic"
                            label="Mesa"
                            name="table"
                            value={newCode.table}
                            onChange={handleChange}
                            required={true} />
                        <label>{newCode.code}</label>
                    </div>

                </form>
                {
                    newCode.code !== '' ?
                        <button
                            className="login__form--submit"
                            onClick={newCode.table !== '' ? handleSubmit : null}>
                            Guardar
                    </button>
                        :
                        <button
                            className="login__form--submit"
                            onClick={generateCode}>
                            Generar código
                </button>
                }
            </div>
            <DeleteModal name={'eliminar el código y la mesa'} open={show} close={handleClose} delete={deleteCode} />
        </>
    )
}

export default CodesRestaurant
