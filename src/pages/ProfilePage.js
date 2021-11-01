import React, { useEffect } from "react";

import { UploadButtons } from "../components/MaterialUI";
import CodesRestaurant from "../components/CodesRestaurant";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import { useRestaurantService } from "../hooks/useRestaurantService";

const ProfilePage = () => {
  const {
    restaurant,
    images,
    handleLoad,
    getRestaurant,
    editRestaurant,
    setImages,
    setRestaurant,
  } = useRestaurantService();

  useEffect(() => {
    getRestaurant();
  }, []);

  const handleSubmit = () => {
    editRestaurant();
  };

  const handleDelete = (index) => {
    let test = [].concat(images);
    test.splice(index, 1);
    setImages(test);
    setRestaurant({ ...restaurant, imagePath: test });
  };

  const DataImage = () =>
    images.map((element, index) => (
      <div className="card__container" key={index}>
        <IconButton
          className="delete__img"
          aria-label="eliminar"
          onClick={() => handleDelete(index)}
        >
          <HighlightOffIcon size="small" color="primary" />
        </IconButton>
        <img
          src={element}
          className="sidebar__container--img"
          alt="imagenes del restaurante"
        />
      </div>
    ));

  return (
    <div className="profile__main">
      <div className="codes">
        <CodesRestaurant />
      </div>
      <div className="cards">
        <h6 className="tittle__image"> Fotografias de mi restaurante</h6>
        <div className="image__card">
          <DataImage />
        </div>
        <UploadButtons changeImg={handleLoad.bind(this)} />
        <div className="save__image">
          <button className="login__form--submit" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
