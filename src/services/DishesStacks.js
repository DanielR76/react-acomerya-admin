import React from 'react'
import { db } from '../utils/firebase'
import OrdersPage from '../pages/OrdersPage'
//import TestPage from '../pages/TestPage'

function DishesStacks() {

    /*     const addDishes = async (linkObject) => {
            console.log('nuevo plato')
            await db.collection('Platos').doc().set(linkObject)
        } */

    const addDish = async (linkObject) => {
        await db.collection('Platos').doc().set(linkObject)
        console.log('nuevo plato')
    }



    const print = {
        name: "pepito",
        des: "test"
    }

    return (
        <div>
            {/* <OrdersPage agregar={print} /> */}
        </div>
    )
}

export default DishesStacks
