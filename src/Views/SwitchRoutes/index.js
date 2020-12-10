import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import SignIn from '../Public/SignIn';
import NotFound from '../Public/NotFound';
import CustomerList from '../Auth/Admin/Customer/List';
import CustomerDetail from '../Auth/Admin/Customer/Detail';
import CustomerCreate from '../Auth/Admin/Customer/Create';

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
          <Route exact path="/customer/id/:id" component={CustomerDetail} />
          <Route exact path="/customer/create" component={CustomerCreate} />
        </Switch>
      </Router>
    );
  }
}
