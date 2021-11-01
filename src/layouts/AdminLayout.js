import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import SideBar from "../components/SideBar";
import { useRestaurantService } from "../hooks/useRestaurantService";

import { AuthContext } from "../context/Auth";

function AdminLayout({ children }) {
  const [authState] = useContext(AuthContext);
  const history = useHistory();
  const { image, getResume } = useRestaurantService();

  useEffect(() => {
    getResume();
    logout();
  }, [authState.user]);

  const logout = () => {
    if (authState.user === "") {
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <SideBar data={image} />
      <section className="section">
        <div className="section__container">{children}</div>
      </section>
    </React.Fragment>
  );
}

export default AdminLayout;
