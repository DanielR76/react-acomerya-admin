import React, { useState, useEffect } from "react";

import DishesCard from "../components/DishesCard";
import AdditionalDish from "../components/AdditionalDish";
import ModalDish from "../components/ModalDish";
import AlertModal from "../components/AlertModal";

import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useDishesServices } from "../hooks/useDishesServices";

const DishesPage = () => {
  const [selectedEdit, setSelectedEdit] = useState("");
  const [selectedRemove, setSelectedRemove] = useState("");
  const [visibleModalDish, setVisibleModalDish] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const { listOfDishes, getDishes, addDish, editDish, deleteDish } =
    useDishesServices();

  useEffect(() => {
    getDishes();
  }, []);

  const handleConfirmAlert = () => {
    setVisibleAlert(false);
    deleteDish(selectedRemove);
    setSelectedEdit("");
  };

  const handleEdit = (id) => {
    setSelectedEdit(id);
    setVisibleModalDish(true);
  };

  const handleRemove = (id) => {
    setSelectedRemove(id);
    setVisibleAlert(true);
  };

  const handleCloseAlert = () => setVisibleAlert(false);

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
          <div className="card__dish">
            {listOfDishes?.data?.map((element) => (
              <DishesCard
                data={element}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="container__add">
        <h6 className="tittle__header">Adiciones</h6>
        <div className="container__add--aditions">
          <AdditionalDish />
        </div>
      </div>
      <ModalDish
        idDish={selectedEdit}
        addOrEdit={(e) =>
          selectedEdit === "" ? addDish(e) : editDish(selectedEdit, e)
        }
        show={visibleModalDish}
        close={() => {
          setVisibleModalDish(false);
          setTimeout(() => {
            setSelectedEdit("");
          }, 0);
        }}
      />
      <AlertModal
        name={"eliminar el plato del menú"}
        open={visibleAlert}
        handleCloseAlert={handleCloseAlert}
        handleConfirmAlert={handleConfirmAlert}
      />
    </div>
  );
};

export default DishesPage;
