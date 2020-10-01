import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth'
import PrivateRoute from './context/PrivateRoute'
import AuthenticationPage from './pages/AuthenticationPage'
import AdminLayout from './layouts/AdminLayout'
import DishesPage from './pages/DishesPage'
import OrdersPage from './pages/OrdersPage'
import ReservationPage from './pages/ReservationPage'
import NotFound from './components/NotFound'

function App() {
  return (

    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={AuthenticationPage} />
          <Route exact path="/login" component={AuthenticationPage} />
          <AdminLayout>
            <section className="section">
              <div className="section__container">
                <PrivateRoute exact path="/dishes" component={DishesPage} />
                <PrivateRoute exact path="/orders" component={OrdersPage} />
                <PrivateRoute exact path="/reservation" component={ReservationPage} />
                {/* <Route component={NotFound} /> */}
              </div>
            </section>
          </AdminLayout>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
