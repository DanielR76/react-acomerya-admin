import { useState, useContext } from "react";

import { db, storage } from "../utils/firebase";
import FireRequest from "../services/Request";

import { AuthContext } from "../context/Auth";

export const useRestaurantService = () => {
  const [authState] = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");

  //Check existence of restaurant & redirect
  const getRestaurantById = (history, id) => {
    FireRequest()
      .getServiceCondition("restaurantsDocument", "idUser", id)
      .then((response) => {
        if (response.size) {
          history.push("/dishes");
        }
      })
      .catch((error) => {
        console.log(`este es el error ${error}`);
      });
  };

  //Get image by id
  const getResume = async () => {
    await db
      .collection("restaurantsDocument")
      .where("idUser", "==", authState.user)
      .onSnapshot((querySnapshot) => {
        const imageFirts = [];
        querySnapshot.forEach((doc) => {
          imageFirts.push(doc.data().nameRestaurant, doc.data().imagePath[0]);
        });
        setImage(imageFirts);
      });
  };

  //Get restaurant info
  const getRestaurant = async () => {
    await db
      .collection("restaurantsDocument")
      .where("idUser", "==", authState.user)
      .onSnapshot((querySnapshot) => {
        let state = "";
        querySnapshot.forEach((doc) => {
          state = {
            ...doc.data(),
            id: doc.id,
          };
        });
        setRestaurant(state);
        setImages(state.imagePath);
      });
  };

  //Edit restaurant
  const editRestaurant = async () => {
    FireRequest()
      .updateService("restaurantsDocument", restaurant.id, restaurant)
      .then(() => console.log("Se actualizó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al actualizar en FireStore: ", error)
      );
  };

  //Save image within storage & return path
  const handleLoad = (e) => {
    let totalImage = images;
    const file = e.target.files[0];
    const uploadImage = storage.ref(`imagesRestaurants/${file.name}`);
    const task = uploadImage.put(file);
    const save = () => {
      task.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error.message);
        },
        () => {
          storage
            .ref("imagesRestaurants")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setImages(images.concat(url));
              totalImage.push(url);
            });
        }
      );
    };
    save();
    setRestaurant({ ...restaurant, imagePath: totalImage });
  };

  return {
    restaurant,
    setRestaurant,
    images,
    setImages,
    image,
    getResume,
    getRestaurantById,
    getRestaurant,
    editRestaurant,
    handleLoad,
  };
};
