import React from 'react'
import { UploadButtons } from '../components/MaterialUI'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton'
import CodesRestaurant from '../components/CodesRestaurant'

import { useProfileServices } from '../hooks/useProfileServices'

function ProfilePage() {

    const {
        restaurant,
        images,
        handleLoad,
        editRestaurant,
        setImages,
        setRestaurant,

    } = useProfileServices()

    // const [restaurant, setRestaurant] = useState('')
    // const [images, setImages] = useState([])

    // useEffect(() => {
    //     getRestaurant()
    // }, [])


    // //Obtener informacion del restaurante
    // const getRestaurant = async () => {
    //     db.collection("restaurantsDocument").where("idUser", "==", firebase.auth().currentUser.uid)
    //         .onSnapshot(querySnapshot => {
    //             let state = ''
    //             querySnapshot.forEach((doc) => {
    //                 state = {
    //                     ...doc.data(),
    //                     id: doc.id
    //                 }
    //             })
    //             setRestaurant(state)
    //             setImages(state.imagePath)
    //         })
    // }



    // //Editar restaurante
    // const editRestaurant = async () => {
    //     await db.collection('restaurantsDocument').doc(restaurant.id).update(restaurant)
    //         .then(() => console.log("Se actualizó correctamente al documento"))
    //         .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error))
    // }

    // //Guardar imagen en storage y luego traer la ruta
    // const handleLoad = e => {
    //     let totalImage = images
    //     const file = e.target.files[0]
    //     const uploadImage = storage.ref(`imagesRestaurants/${file.name}`)
    //     const task = uploadImage.put(file)
    //     const save = () => {
    //         task.on('state_changed', (snapshot) => { },
    //             (error) => { console.error(error.message) },
    //             () => {
    //                 storage.ref("imagesRestaurants").child(file.name).getDownloadURL()
    //                     .then(url => {
    //                         setImages(images.concat(url))
    //                         totalImage.push(url)
    //                     })
    //                 //.then(url => {setImages(images.concat(url))})
    //             })
    //     }
    //save()
    //setRestaurant({ ...restaurant, imagePath: totalImage })
    // }

    const handleSubmit = () => {
        editRestaurant()
    }

    const handleDelete = (index) => {
        let test = [].concat(images)
        test.splice(index, 1)
        console.log(test)
        setImages(test)
        setRestaurant({ ...restaurant, imagePath: test })
    }


    const dataImage = images.map((element, index) => {
        return (

            <div className="card__container" key={index}>
                <IconButton
                    //key={index}
                    className="delete__img"
                    aria-label="eliminar"
                    onClick={() => handleDelete(index)}>
                    <HighlightOffIcon
                        size="small"
                        color="primary"
                    />
                </IconButton>
                <img
                    src={element}
                    className="sidebar__container--img"
                    alt="imagenes del restaurante" />
            </div>


        )
    })

    return (
        <div className="profile__main">
            <div className="codes">
                <CodesRestaurant />

            </div>
            <div className="cards">
                <h6 className="tittle__image"> Fotografias de mi restaurante</h6>
                <div className="image__card">
                    {dataImage}
                </div>
                <UploadButtons changeImg={handleLoad.bind(this)} />
                <div className="save__image">
                    <button
                        className="login__form--submit"
                        onClick={handleSubmit}>
                        Guardar
                    </button>
                </div>
            </div>


        </div>
    )
}

export default ProfilePage
