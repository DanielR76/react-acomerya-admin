import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import * as firebase from 'firebase'
import { db } from '../utils/firebase'

function CodesRestaurant(props) {

    const initialStateValues = {
        idRestaurant: firebase.auth().currentUser.uid,
        table: "",
        code: ""
    }

    const [newCode, setNewCode] = useState(initialStateValues)
    const [show, setShow] = useState(false)

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
        console.log(element)
        await db.collection('codesDocument').doc().set(element)
            .then(() => console.log("Se cargó correctamente al documento"))
            .catch(error => console.error("Hubo un error al cargar en FireStore: ", error))
    }

    //Eliminar codigo por id
    const deleteCode = async (id) => {
        console.log(id)
        await db.collection("codesDocument").doc(id).delete()
            .then(() => { console.log("Document eliminado correctamente!") })
            .catch(error => { console.error("Error eliminando el codigo: ", error) })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewCode({
            ...newCode,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createCode(newCode)
        setNewCode({ ...initialStateValues })
    }

    //generar codigo aleatorio
    const generateCode = () => {
        const numberCode = Math.floor(Math.random() * (999999 - 100001))
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
                    onClick={() => deleteCode(element.id)}>
                    <DeleteIcon
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
                            onClick={handleSubmit}>
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
        </>
    )
}

export default CodesRestaurant
