import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { firebaseApp } from './utils/firebase'
//import AuthenticationPage from './pages/AuthenticationPage'
import AdminLayout from './layouts/AdminLayout'
import DishesPage from './pages/DishesPage'
import OrdersPage from './pages/OrdersPage'
import ReservationPage from './pages/ReservationPage'

function App() {
  return (
    <Router>
      <AdminLayout>
        <Switch>
          <Route exact path="/dishes" component={DishesPage} />
          <Route exact path="/orders" component={OrdersPage} />
          <Route exact path="/reservation" component={ReservationPage} />
        </Switch>
      </AdminLayout>
    </Router>
  );
}

export default App;
