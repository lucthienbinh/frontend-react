import React, {useState, useEffect} from 'react';
import './index.css';
import {
  Button,
  Container,
  Form,
  FormGroup,
} from 'react-bootstrap';

import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import CustomerCard from '../../../../../Components/CustomerCard';
import Loading from '../../../../Loading'
import AdminLayout from '../../../../Layouts/AdminLayout'

export default function CustomerCreate() {
  const [cookies, setCookie, removeCookie] = useCookies(['csrf']);
  
  const [ customer, setCustomer] = useState({});
  const [ isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
 
  if (isLoading==false) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
         <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </AdminLayout>
     
    );
  }
  
}