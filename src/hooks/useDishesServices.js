import { useState, useContext } from "react";

import FireRequest from "../services/Request";
import { AuthContext } from "../context/Auth";

import { storage } from "../utils/firebase";

const initialArray = {
  data: [],
  loading: false,
};

const initialStateValues = {
  idRestaurant: "",
  imagePath: null,
  dishName: "",
  description: "",
  ingredient: [""],
  price: "",
  status: true,
};

export const useDishesServices = () => {
  const [authState] = useContext(AuthContext);
  const [listOfDishes, setListOfDishes] = useState({ ...initialArray });
  const [dishById, setDishById] = useState({ ...initialStateValues });
  const [listOfIngredients, setListOfIngredients] = useState([]);

  //Get all dishes and set state
  const getDishes = () => {
    setListOfDishes({ ...listOfDishes, loading: true });
    FireRequest()
      .getServiceCondition("dishDocument", "idRestaurant", authState.user)
      .then((response) => {
        const state = [];
        response.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setListOfDishes({ data: state, loading: false });
      })
      .catch((e) => {
        setListOfDishes({ ...initialArray });
        console.log(e);
      });
  };

  //Get dish by id
  const getDishById = (id) => {
    FireRequest()
      .getService("dishDocument", id)
      .then((response) => {
        setDishById({ ...response.data() });
        setListOfIngredients([...response.data().ingredient]);
      })
      .catch((e) => console.log("Ha ocurrido un error", e));
  };

  //Create new dish
  const addDish = (payload) => {
    FireRequest()
      .postService("dishDocument", {
        ...payload,
        idRestaurant: authState.user,
        price: Number(payload.price),
      })
      .then(() => console.log("Se cargó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al cargar en FireStore: ", error)
      );
    getDishes();
  };

  //Edit selected dish
  const editDish = (currentDish, payload) => {
    FireRequest()
      .updateService("dishDocument", currentDish, {
        ...payload,
        idRestaurant: authState.user,
        price: Number(payload.price),
      })
      .then(() => console.log("Se cargó correctamente al documento"))
      .catch((error) =>
        console.error("Hubo un error al cargar en FireStore: ", error)
      );
    getDishes();
  };

  //Delete selected dish
  const deleteDish = (currentDish) => {
    FireRequest()
      .deleteService("dishDocument", currentDish)
      .then(() => {
        console.log("Document eliminado correctamente!");
      })
      .catch((error) => {
        console.error("Error eliminando el plato: ", error);
      });
    getDishes();
  };

  //Upload image of dish
  const handleLoad = (e) => {
    const file = e.target.files[0];
    const uploadImage = storage.ref(`images/${file.name}`);
    const task = uploadImage.put(file);

    task.on(
      "state_changed",
      () => {},
      (error) => {
        console.error(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => setDishById({ ...dishById, imagePath: url }));
      }
    );
  };

  return {
    listOfDishes,
    dishById,
    setDishById,
    listOfIngredients,
    setListOfIngredients,
    getDishes,
    getDishById,
    addDish,
    editDish,
    deleteDish,
    handleLoad,
  };
};
