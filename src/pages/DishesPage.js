import React, { useState, useContext } from "react";

import ModalDish from "../components/ModalDish";
import AdditionalDish from "../components/AdditionalDish";
import DeleteModal from "../components/DeleteModal";
import { AuthContext } from "../context/Auth";

import { useDishesServices } from "../hooks/useDishesServices";

import { Edit, Add, HighlightOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

function DishesPage() {
  const { currentUser } = useContext(AuthContext);
  const [currentDish, setCurrentDish] = useState("");
  const [visibleModalDish, setVisibleModalDish] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const { listOfDishes, addDish, editDish, deleteDish } = useDishesServices();

  //estructura de cards de platos
  const DishesCard = listOfDishes?.data.map((todo, i) => (
    <div className="card__dish__cont" key={todo.id}>
      <img className="card__dish--image" src={todo.imagePath} alt="imageDish" />
      <div className="card__dish--cont">
        <div className="dish__name">{todo.dishName}</div>
        <div className="dish__method">
          <IconButton
            aria-label="editar"
            onClick={() => {
              setCurrentDish(todo.id);
              setVisibleModalDish(true);
            }}
          >
            <Edit size="small" color="primary" />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            onClick={() => {
              setCurrentDish(todo.id);
              setVisibleAlert(true);
            }}
          >
            <HighlightOff size="small" color="secondary" />
          </IconButton>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container__dishes">
      <div className="container__cards">
        <h6 className="tittle__header">Platos</h6>
        <div className="card__main">
          <div className="card__button--add">
            <IconButton
              color="primary"
              aria-label="Añadir plato"
              onClick={() => setVisibleModalDish(true)}
            >
              <Add />
            </IconButton>
          </div>

          <div className="card__dish">{DishesCard}</div>
        </div>
        <ModalDish
          idDish={currentDish}
          addOrEdit={(e) =>
            currentDish === "" ? addDish(e) : editDish(currentDish, e)
          }
          show={visibleModalDish}
          close={() => {
            setVisibleModalDish(false);
            setTimeout(() => {
              setCurrentDish("");
            }, 0);
          }}
        />
        <DeleteModal
          name={"eliminar el plato del menú"}
          open={visibleAlert}
          close={setVisibleAlert}
          deleteDish={() => {
            setVisibleAlert(false);
            deleteDish(currentDish);
            setCurrentDish("");
          }}
        />
      </div>
      <div className="container__add">
        <h6 className="tittle__header">Adiciones</h6>
        <div className="container__add--aditions">
          <AdditionalDish />
        </div>
      </div>
    </div>
  );
}

export default DishesPage;
