import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import Imagen from '../assets/img/hotel-el-auca.jpg'
import { db } from '../utils/firebase'


function DishesCard() {

    const [stateDish, setStateDish] = useState([])

    const getPlatos = async () => {

        db.collection('dishDocument').onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach(doc => {
                docs.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setStateDish(docs);
        });
    }

    useEffect(() => {
        getPlatos();
    }, []);


    const platos = stateDish.map((todo, i) => {
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

        )
    })

    return (
        <div className="containerext">
            <div className="row mt-5">
                {platos}
            </div>
        </div>
    )
}


export default DishesCard
