import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BiDish, BiBook, BiCookie } from "react-icons/bi";
import { IconContext } from "react-icons";

import { AuthContext } from "../context/Auth";

function Sidebar({ data }) {
  const [, authDispatch] = useContext(AuthContext);
  const sideBar = [
    {
      tittle: "Mis platos",
      path: "/dishes",
      icon: <BiCookie />,
      cName: "sidebar__items--route",
    },
    {
      tittle: "Pedidos",
      path: "/orders",
      icon: <BiDish />,
      cName: "sidebar__items--route",
    },
    {
      tittle: "Reservas",
      path: "/reservation",
      icon: <BiBook />,
      cName: "sidebar__items--route",
    },
  ];

  const ItemsSideBar = () =>
    sideBar.map((item, index) => (
      <li key={index} className={item.cName}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.tittle}</span>
        </Link>
      </li>
    ));

  return (
    <div className="main">
      <IconContext.Provider value={{ color: " #85929e " }}>
        <nav className="sidebar">
          <div className="sidebar__container--head">
            <img
              src={data[1]}
              className="sidebar__container--img"
              alt="imagen restaurante"
            />
            <Link to="/profile">
              <h5 className="sidebar__container--name">{data[0]}</h5>
            </Link>
          </div>
          <div className="sidebar__container">
            <ul className="sidebar__items">
              <ItemsSideBar />
            </ul>
          </div>
          <button
            className="button__logout"
            onClick={() => {
              authDispatch({
                type: "reset",
              });
            }}
          >
            Cerrar sesión
          </button>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Sidebar;
