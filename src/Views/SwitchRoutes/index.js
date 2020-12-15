import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import SignIn from '../Public/SignIn';
import NotFound from '../Public/NotFound';

import CustomerList from '../Auth/Admin/Customer/List';
import CustomerDetail from '../Auth/Admin/Customer/Detail';
import CustomerCreate from '../Auth/Admin/Customer/Create';
import CustomerUpdate from '../Auth/Admin/Customer/Update';

import LocationList from '../Auth/Admin/Location/List';

export default function App() {
  const [cookies] = useCookies(['csrf']);
  if (typeof cookies.csrf === 'undefined') {
    return (
      <Router>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="*" component={NotFound} />
        </Switch>
     
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/customer/list" component={CustomerList} />
          <Route exact path="/customer/detail/:id" component={CustomerDetail} />
          <Route exact path="/customer/create" component={CustomerCreate} />
          <Route exact path="/customer/update/:id" component={CustomerUpdate} />
          <Route exact path="/delivery-location/list" component={LocationList} />
        </Switch>
      </Router>
    );
  }
}
