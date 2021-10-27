import { useState, useEffect } from 'react'
import firebase from 'firebase'
import { db, storage } from '../utils/firebase'

export const useProfileServices = () => {
    const [restaurant, setRestaurant] = useState('')
    const [images, setImages] = useState([])

    useEffect(() => {
        getRestaurant()
    }, [])

    //Obtener informacion del restaurante
    const getRestaurant = async () => {
        db.collection("restaurantsDocument").where("idUser", "==", firebase.auth().currentUser.uid)
            .onSnapshot(querySnapshot => {
                let state = ''
                querySnapshot.forEach((doc) => {
                    state = {
                        ...doc.data(),
                        id: doc.id
                    }
                })
                setRestaurant(state)
                setImages(state.imagePath)
            })
    }



    //Editar restaurante
    const editRestaurant = async () => {
        await db.collection('restaurantsDocument').doc(restaurant.id).update(restaurant)
            .then(() => console.log("Se actualizó correctamente al documento"))
            .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error))
    }

    //Guardar imagen en storage y luego traer la ruta
    const handleLoad = e => {
        let totalImage = images
        const file = e.target.files[0]
        const uploadImage = storage.ref(`imagesRestaurants/${file.name}`)
        const task = uploadImage.put(file)
        const save = () => {
            task.on('state_changed', (snapshot) => { },
                (error) => { console.error(error.message) },
                () => {
                    storage.ref("imagesRestaurants").child(file.name).getDownloadURL()
                        .then(url => {
                            setImages(images.concat(url))
                            totalImage.push(url)
                        })
                    //.then(url => {setImages(images.concat(url))})
                })
        }
        save()
        setRestaurant({ ...restaurant, imagePath: totalImage })
    }




    return {
        restaurant,
        images,
        handleLoad,
        editRestaurant,
        setImages,
        setRestaurant,
    }
}

