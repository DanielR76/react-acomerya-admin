import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { db } from "../utils/firebase";

function DishesCard(props) {
  const getPlatos = async () => {
    db.collection("dishDocument")
      .where("restaurant", "==", 123465)
      .onSnapshot((querySnapshot) => {
        const state = [];
        querySnapshot.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });
  };

  useEffect(() => {
    getPlatos();
  }, []);

  const platos = props.map((todo, i) => {
    return (
      <div className="col-md-3">
        <div className="card mt-3">
          <Card.Img variant="top" src={todo.imagePath} />
          <Card.Body>
            <Card.Title>
              {todo.dishName}
              <Button variant="primary">Editar</Button>
            </Card.Title>
          </Card.Body>
        </div>
      </div>
    );
  });

  return (
    <div className="containerext">
      <div className="row mt-5">{platos}</div>
    </div>
  );
}

export default DishesCard;
