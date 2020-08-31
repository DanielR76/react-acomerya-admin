import React from 'react'
import { Link } from 'react-router-dom'
import { BiDish, BiBook, BiCookie } from 'react-icons/bi'
import profile from '../assets/icon/profile.svg'
import { IconContext } from 'react-icons'

function NavBar() {

    const sideBar = [
        {
            tittle: "Mis platos",
            path: "/dishes",
            icon: <BiCookie />,
            cName: "navbar__items--route"
        },
        {
            tittle: "Pedidos",
            path: "/orders",
            icon: <BiDish />,
            cName: "navbar__items--route"
        },
        {
            tittle: "Reservas",
            path: "/reservation",
            icon: <BiBook />,
            cName: "navbar__items--route"
        }
    ]

    return (
        <div className="main">
            <IconContext.Provider value={{ color: ' #85929e ' }}>
                <nav className="navbar">
                    <div className="navbar__container--head">
                        <img src={profile} className="navbar__container--img" alt="imagen restaurante" />
                        <h2 className="navbar__container--name">Le Maison Du Festin</h2>
                    </div>
                    <div className="navbar__container">
                        <ul className="navbar__items">
                            {sideBar.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.tittle}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
                <section className="section">
                    <div className="section__container">

                    </div>
                </section>
            </IconContext.Provider>
        </div>
    )
}

export default NavBar
