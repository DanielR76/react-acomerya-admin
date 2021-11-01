import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import AuthenticationPage from "./pages/AuthenticationPage";
import AdminLayout from "./layouts/AdminLayout";
import ProfilePage from "./pages/ProfilePage";
import DishesPage from "./pages/DishesPage";
import OrdersPage from "./pages/OrdersPage";
import ReservationPage from "./pages/ReservationPage";
// import NotFound from "./components/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={AuthenticationPage} />
          <Route exact path="/login" component={AuthenticationPage} />
          {/* <Route component={NotFound} /> */}
          <AdminLayout>
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/dishes" component={DishesPage} />
            <Route exact path="/orders" component={OrdersPage} />
            <Route exact path="/reservation" component={ReservationPage} />
          </AdminLayout>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
