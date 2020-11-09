import React, { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import firebase from 'firebase'
import { db } from '../utils/firebase'

function AdminLayout(props) {

    //Obtener imagen por id del usuario
    const [image, setImage] = useState('')
    const getDishes = async () => {
        db.collection("restaurantsDocument").where("idUser", "==", firebase.auth().currentUser.uid)
            .onSnapshot(querySnapshot => {
                const imageFirts = []
                querySnapshot.forEach((doc) => {
                    imageFirts.push(doc.data().nameRestaurant, doc.data().imagePath[0])
                })
                setImage(imageFirts)
            })
    }
    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            getDishes()
        }

    }, [])

    return (
        <React.Fragment>
            <SideBar data={image} />
            {props.children}
        </React.Fragment>
    )
}

export default AdminLayout