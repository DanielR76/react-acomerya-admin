import React from "react";

import { IconButton } from "@mui/material";
import { Edit, RemoveCircleOutline } from "@mui/icons-material";

const DishesCard = ({ data, handleEdit, handleRemove }) => {
  return (
    <div className="card__dish__cont" key={data.id}>
      <img className="card__dish--image" src={data.imagePath} alt="imageDish" />
      <div className="card__dish--cont">
        <div className="dish__name">{data.dishName}</div>
        <div className="dish__method">
          <IconButton aria-label="editar" onClick={() => handleEdit(data.id)}>
            <Edit size="small" color="warning" />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            onClick={() => handleRemove(data.id)}
          >
            <RemoveCircleOutline size="small" color="action" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default DishesCard;
