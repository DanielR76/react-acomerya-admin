import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import icono from '../assets/icon/acomerya-logo-name.svg'
import TextField from '@material-ui/core/TextField'
import firebase from 'firebase'
import { db } from '../utils/firebase'

function AuthenticationPage({ history }) {

    const initialStateValues = {
        email: "",
        password: ""
    }

    const [values, setValues] = useState(initialStateValues)

    //Guardar los datos en values
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log(values)
    }

    //Validacion de autenticacion
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (values.email === "" || values.password === "") {
            alert("Todos los campos son obligatorios");
        } else {
            await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                    const user = firebase.auth().currentUser
                    getRestaurantById(user.uid)
                })
                .catch(() => {
                    alert('Usuario o clave erronea')
                    setValues({
                        ...values,
                        password: ""
                    })
                })
        }
    }

    //Obtener restaurante por el id
    const getRestaurantById = async (id) => {
        await db.collection("restaurantsDocument").where("idUser", "==", id)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.size) {
                    querySnapshot.forEach((doc) => {
                        console.log(`Si existe en la BD ${doc.id}`)
                        history.push("/dishes")
                        /* return (
                            <Redirect to="/dishes" />
                        ) */
                    })
                } else {
                    console.log('no existe en tabla')
                    alert('no existe en tabla')
                }
            }).catch((error) => { console.log(`este es el error ${error}`) })
    }

    const { currentUser } = useContext(AuthContext)

    /* if (!currentUser) {
        return <Redirect to="/dishes" />
    } */

    return (
        <div className="container__main">
            <div className="login">
                <img className="login__img" src={icono} alt="Imagen-Acomerya"></img>
                <form
                    className="login__form"
                    onSubmit={handleSubmit}>
                    <h2>Inicia sesión</h2>
                    <TextField
                        id="standard-basic"
                        label="Correo electrónico"
                        name="email"
                        value={values.email}
                        onChange={handleChange} />
                    <TextField
                        id="standard-password-input"
                        label="Constraseña"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="login__form--submit">Continuar</button>
                </form>
            </div>
            <a className="link__freepik" href='https://www.freepik.es/'>Foto de Comida creado por freepik</a>
        </div>
    )
}

export default withRouter(AuthenticationPage)