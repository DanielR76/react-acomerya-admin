import React from 'react'
import * as firebase from 'firebase'


function OrdersPage() {
    return (
        <div>
            <label>Pedidos</label>
            <button
                onClick={() => { firebase.auth().signOut() }}
            >Cerrar sesión</button>
        </div>
    )

}

export default OrdersPage