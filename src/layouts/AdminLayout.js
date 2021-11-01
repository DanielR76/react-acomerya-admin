import React, { useState, useEffect } from "react";

import SideBar from "../components/SideBar";
import { useRestaurantService } from "../hooks/useRestaurantService";

function AdminLayout({ children }) {
  const { image, getResume } = useRestaurantService();
  useEffect(() => {
    getResume();
  }, []);

  return (
    <React.Fragment>
      <SideBar data={image} />
      {children}
    </React.Fragment>
  );
}

export default AdminLayout;
