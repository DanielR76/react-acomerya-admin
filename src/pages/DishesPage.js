import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ModalDish from '../components/ModalDish'
import DishesCard from '../components/DishesCard'


function DishesPage(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container__dishes">
            <div className="container__cards">
                <div className="form-group">
                </div>
                <DishesCard />
                <Button onClick={handleShow}>Crear plato</Button>
                <ModalDish mostrar={show} ocultar={handleClose} />
            </div>
            <div className="container__add">

            </div>
        </div>
    )
}

export default DishesPage
