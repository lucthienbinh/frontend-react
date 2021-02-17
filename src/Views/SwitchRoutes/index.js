import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
// import { useCookies } from 'react-cookie';

// import SignIn from '../Public/SignIn';
// import NotFound from '../Public/NotFound';

import CustomerList from '../Auth/Admin/Customer/List';
import CustomerDetail from '../Auth/Admin/Customer/Detail';
import CustomerCreate from '../Auth/Admin/Customer/Create';
import CustomerUpdate from '../Auth/Admin/Customer/Update';

import CustomerCreditList from '../Auth/Admin/CustomerCredit/List';

import LocationList from '../Auth/Admin/Location/List';
import EmployeeType from '../Auth/Admin/EmployeeType/List';

import EmployeeList from '../Auth/Admin/Employee/List';
import EmployeeDetail from '../Auth/Admin/Employee/Detail';
import EmployeeCreate from '../Auth/Admin/Employee/Create';
import EmployeeUpdate from '../Auth/Admin/Employee/Update';

import TransportTypeList from '../Auth/Admin/TransportType/List';
import TransportTypeDetail from '../Auth/Admin/TransportType/Detail';
import TransportTypeCreate from '../Auth/Admin/TransportType/Create';
import TransportTypeUpdate from '../Auth/Admin/TransportType/Update';

import LongShipList from '../Auth/Admin/LongShip/List';
import LongShipDetail from '../Auth/Admin/LongShip/Detail';
import LongShipCreate from '../Auth/Admin/LongShip/Create';
import LongShipUpdate from '../Auth/Admin/LongShip/Update';

import OrderList from '../Auth/Admin/Order/List';
import OrderDetail from '../Auth/Admin/Order/Detail';
import OrderCreate from '../Auth/Admin/Order/Create';

import OrderShortShipList from '../Auth/Admin/OrderShortShip/List';
import OrderShortShipUpdate from '../Auth/Admin/OrderShortShip/Update';

import Zeebe from '../Auth/Admin/Zeebe';

export default function App() {
  // const [cookies] = useCookies(['csrf']);
  // if (typeof cookies.csrf === 'undefined') {
  //   return (
  //     <Router>
  //       <Switch>
  //         <Route exact path="/signin" component={SignIn} />
  //         <Route exact path="*" component={NotFound} />
  //       </Switch>

  //     </Router>
  //   );
  // } else {
  // Move <router> to here to authenticated
  // }
  return (
    <Router>
      <Switch>
        <Route exact path="/customer/list" component={CustomerList} />
        <Route exact path="/customer/detail/:id" component={CustomerDetail} />
        <Route exact path="/customer/create" component={CustomerCreate} />
        <Route exact path="/customer/update/:id" component={CustomerUpdate} />
        <Route exact path="/customer-credit/list" component={CustomerCreditList} />
        <Route exact path="/delivery-location/list" component={LocationList} />
        <Route exact path="/employee-type/list" component={EmployeeType} />
        <Route exact path="/employee/list" component={EmployeeList} />
        <Route exact path="/employee/detail/:id" component={EmployeeDetail} />
        <Route exact path="/employee/create" component={EmployeeCreate} />
        <Route exact path="/employee/update/:id" component={EmployeeUpdate} />
        <Route exact path="/transport-type/list" component={TransportTypeList} />
        <Route exact path="/transport-type/detail/:id" component={TransportTypeDetail} />
        <Route exact path="/transport-type/create" component={TransportTypeCreate} />
        <Route exact path="/transport-type/update/:id" component={TransportTypeUpdate} />
        <Route exact path="/long-ship/list" component={LongShipList} />
        <Route exact path="/long-ship/detail/:id" component={LongShipDetail} />
        <Route exact path="/long-ship/create" component={LongShipCreate} />
        <Route exact path="/long-ship/update/:id" component={LongShipUpdate} />
        <Route exact path="/order/list" component={OrderList} />
        <Route exact path="/order/detail/:id" component={OrderDetail} />
        <Route exact path="/order/create" component={OrderCreate} />
        <Route exact path="/order-short-ship/list" component={OrderShortShipList} /> 
        <Route exact path="/order-short-ship/update/:id" component={OrderShortShipUpdate} /> 
        <Route exact path="/zeebe-api" component={Zeebe} />
      </Switch>
    </Router>
  );
}
