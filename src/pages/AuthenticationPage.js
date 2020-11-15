import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import icono from '../assets/icon/acomerya-logo-name.svg'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import firebase from 'firebase'
import { db } from '../utils/firebase'

function AuthenticationPage({ history }) {

    const [showAlert, setShowAlert] = useState(false)
    const handleOpenAlert = () => setShowAlert(true)
    const handleCloseAlert = () => setShowAlert(false)

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
    }

    //Validacion de autenticacion
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (values.email === "" || values.password === "") {
            handleOpenAlert()
        } else {
            await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                    const user = firebase.auth().currentUser
                    getRestaurantById(user.uid)
                })
                .catch(() => {
                    handleOpenAlert()
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
                    querySnapshot.forEach(() => {
                        history.push("/dishes")
                        /* return (
                            <Redirect to="/dishes" />
                        ) */
                    })
                } else {
                    alert('no existe en tabla')
                }
            }).catch((error) => { console.log(`este es el error ${error}`) })
    }

    /*const { currentUser } = useContext(AuthContext)
     if (!currentUser) {
        return <Redirect to="/dishes" />
    } */

    const alertValidation = () => {
        return (
            <div>
                <Dialog
                    open={showAlert}
                    onClose={handleCloseAlert}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Algo ha salido mal :( valida tus datos e intenta nuevamente
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseAlert}
                            variant="outlined"
                            color="primary">
                            Aceptar
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

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
                        onChange={handleChange}
                        required="true" />
                    <TextField
                        id="standard-password-input"
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        required="true"
                    />
                    <button type="submit" className="login__form--submit">Continuar</button>
                </form>
            </div>
            {alertValidation()}
            <a className="link__freepik" href='https://www.freepik.es/'>Foto de Comida creada por freepik</a>
        </div>
    )
}

export default withRouter(AuthenticationPage)