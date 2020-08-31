import React from 'react'
import icono from '../assets/icon/acomerya-logo-name.svg'

function AuthenticationPage() {
    return (
        <div className="container">
            <div className="login">
                <img className="login__img" src={icono} alt="Imagen-Acomerya"></img>
                <form className="login__form">
                    <h2>Inicia sesión</h2>
                    <div className="login__form--input">
                        <input type="text" required placeholder="Correo electrónico"></input>
                    </div>
                    <div className="login__form--input">
                        <input type="password" required placeholder="Contraseña"></input>
                    </div>
                    <button type="submit" className="login__form--submit">Continuar</button>
                </form>
            </div>
        </div>
    )
}

export default AuthenticationPage